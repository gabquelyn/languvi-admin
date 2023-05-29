import AWS from "aws-sdk";
import sendResponse from "../lib/sendResponse";
import multipart from "lambda-multipart-parser";
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();
const S3 = new AWS.S3();
async function edit_order(event, context) {
  const user = event.requestContext.authorizer.jwt.claims.username;
  const result = await multipart.parse(event);
  const source_lang = result.source_lang.toLowerCase();
  const target_lang = result.target_lang.toLowerCase();
  const translator = result.translator.toLowerCase();
  const proofreader = result.proofreader.toLowerCase();
  const cost = result.cost;
  const translator_notes = result.translator_notes;
  const admin_notes = result.admin_notes;
  const subject = result.subject;
  const catTools = result.catTools;
  const services = JSON.parse(result.services);
  const plan = result.plan.toLowerCase();
  const delivery = result.delivery;
  const orderId = result.orderId;
  const mandate_proofread = result.mandate_proofread;
  const automatic_assignment = result.automatic_assignment;
  const proofreading_due = result.proofreading_due;
  const translation_due = result.translation_due;
  const order_due = result.order_due;
  const word_count = result.word_count;

  let order_result;
  let UpdateExpression =
    "SET catTools = :bool, services = :_services, mandate_proofread = :compulsory, allow_automatic = :show, word_count = :count";
  let ExpressionAttributeValues = {
    ":bool": catTools,
    ":_services": services,
    ":compulsory": mandate_proofread,
    ":show": automatic_assignment,
    ":count" : word_count
  };
  let ExpressionAttributeNames = {}

  if (result.files.length !== 0) {
    const filekeys = [];
    for (const file of result.files) {
      const fileName = file.filename;
      const fileContent = file.content;
      const fileType = file.contentType;

      // Set up S3 upload parameters
      const uploadParams = {
        Bucket: process.env.CLIENT_BUCKET_NAME,
        Key: `clientdocuments/${fileName}`,
        Body: fileContent,
        ContentType: fileType,  
        ContentDisposition: 'attachment',
      };

      try {
        await S3.upload(uploadParams).promise();
      } catch (err) {
        console.error(err);
        return sendResponse(502, { message: err.message });
      }
      filekeys.push(fileName);
    }
    UpdateExpression +=
      ", translator_file_url = :array, standing = :status, translator =:email";
    ExpressionAttributeValues[":array"] = filekeys;
    ExpressionAttributeValues[":status"] = "completed";
    ExpressionAttributeValues[":email"] = user;
  }

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.ORDERS_TABLE,
        Key: { id: orderId },
      })
      .promise();
    order_result = result.Item;
  } catch (err) {
    console.error(err);
    return sendResponse(404, {
      message: `order with id: ${orderId} does not exist`,
    });
  }

  if (source_lang && order_result.source_lang !== source_lang.toLowerCase()) {
    UpdateExpression += ", source_lang = :source";
    ExpressionAttributeValues[":source"] = source_lang.toLowerCase();
  }

  if (proofreading_due) {
    UpdateExpression += ", proofreading_due = :pd";
    ExpressionAttributeValues[":pd"] = proofreading_due;
  }

  if (translation_due) {
    UpdateExpression += ", translation_due = :td";
    ExpressionAttributeValues[":td"] = translation_due;
  }

  if (order_due) {
    UpdateExpression += ", order_due = :od";
    ExpressionAttributeValues[":od"] = order_due;
  }

  if (target_lang && order_result.target_lang !== target_lang.toLowerCase()) {
    UpdateExpression += ", target_lang = :target";
    ExpressionAttributeValues[":target"] = target_lang.toLowerCase();
  }

  if (delivery) {
    UpdateExpression += ", delivery_address = :email";
    ExpressionAttributeValues[":email"] = delivery.toLowerCase();
  }

  if (cost) {
    UpdateExpression += ", cost = :pay";
    ExpressionAttributeValues[":pay"] = cost;
  }

  if (translator_notes) {
    UpdateExpression += ", translator_request.translator_notes = :tnotes";
    ExpressionAttributeValues[":tnotes"] = translator_notes;
  }

  if (admin_notes) {
    UpdateExpression += ", translator_request.admin_notes = :anotes";
    ExpressionAttributeValues[":anotes"] = admin_notes;
  }

  if (subject && order_result.subject !== subject.toLowerCase()) {
    UpdateExpression += ", subject = :topic";
    ExpressionAttributeValues[":topic"] = subject.toLowerCase();
  }

  if (plan && order_result.plan !== plan.toLowerCase()) {
    UpdateExpression += ", #plan = :package";
    ExpressionAttributeValues[":package"] = plan.toLowerCase();
    ExpressionAttributeNames['#plan'] = 'plan'
  }

  // ensure the translator or proofreader exists.
  if (
    translator &&
    translator !== "null" &&
    translator !== order_result.translator
  ) {
    UpdateExpression += ", translator = :temail";
    ExpressionAttributeValues[":temail"] = translator;
  }

  // ensure the proofreader exists
  if (
    proofreader &&
    proofreader !== "null" &&
    proofreader !== order_result.proofreader
  ) {
    UpdateExpression += ", proofreader = :pemail";
    ExpressionAttributeValues[":pemail"] = proofreader;
  }

  //   to update the order
  const order_params = {
    TableName: process.env.ORDERS_TABLE,
    Key: { id: orderId },
    UpdateExpression,
    ExpressionAttributeValues,
  };

  try {
    await dynamodb.update(order_params).promise();
  } catch (err) {
    console.error(err);
    return sendResponse(502, { error: err.message });
  }

  if (
    automatic_assignment === "true" &&
    order_result.allow_automatic !== automatic_assignment && order_result.standing === "unassigned translation"
  ) {
    const params = {
      TableName: process.env.TRANSLATORS_TABLE,
      IndexName: "translatorStatus",
      KeyConditionExpression: "approved = :yes",
      ExpressionAttributeValues: {
        ":yes": "true",
      },
    };

    const translators = await dynamodb.query(params).promise();
    const ALL_TRANSLATORS_IN_PAIR = translators.Items.filter((translator) =>
      translator._details.language_pairs.some(
        (pair) =>
          pair.from.toLowerCase() === order_result.source_lang &&
          pair.to.toLowerCase() === order_result.target_lang
      )
    );

    // send invitation email to every translator in that pair
    if (ALL_TRANSLATORS_IN_PAIR.length !== 0) {
      for (const translator of ALL_TRANSLATORS_IN_PAIR) {
        const email_params = {
          QueueUrl: process.env.MAIL_QUEUE_URL,
          MessageBody: JSON.stringify({
            subject: "New Awaiting Order",
            body: `Hello ${translator.profile.firstname}, A new translation project of source language of ${order_result.source_lang} and target language of ${order_result.target_lang}. Visit to pick job. Goodluck!`,
            recipient: translator.email,
          }),
        };
        await sqs.sendMessage(email_params).promise();
      }
    }
  }

  return sendResponse(201, {
    message: "Order updated successfully!"
  });
}

export const handler = edit_order;
