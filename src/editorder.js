import AWS from "aws-sdk";
import sendResponse from "../lib/sendResponse";
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();
async function edit_order(event, context) {
  const { source, translator, proofreader, due_date, cost } = JSON.parse(
    event.body
  );
  const { orderId } = event.pathParameters;
  let translator_data;
  let proofreader_data;
  let order_result;

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

  // ensure the translator or proofreader exists.
  if (translator) {
    try {
      const result = await dynamodb
        .get({
          TableName: process.env.TRANSLATORS_TABLE,
          Key: { email: translator },
        })
        .promise();
      translator_data = result.Item;
    } catch (err) {
      console.log(err);
      return sendResponse(404, { message: `${translator} does not exist!` });
    }
  }

  // ensure the proofreader exists
  if (proofreader) {
    try {
      const result = await dynamodb
        .get({
          TableName: process.env.TRANSLATORS_TABLE,
          Key: { email: proofreader },
        })
        .promise();
      proofreader_data = result;
    } catch (err) {
      console.log(err);
      return sendResponse(404, { message: `${proofreader} does not exist!` });
    }
  }


//   to update the order
  const order_params = {
    TableName: process.env.ORDERS_TABLE,
    Key: { id: orderId },
    UpdateExpression: `SET ${source ? "source_lang = :s, " : ''} ${
      translator ? "translator = :t, " : ''
    } ${proofreader ? "proofreader = :p, " : ''} ${
      due_date ? "due_date = :d, " : ''
    } ${cost ? "cost = :c" : ''}`,
    ExpressionAttributeValues: {
      ":s": source,
      ":t": translator,
      ":p": proofreader,
      ":d": due_date,
      ":p": proofreader,
      ":c" : cost
    },
    // ExpressionAttributeNames: {
    //   "#source": "source",
    //   "#translator": "translator",
    //   "#proofreader": "proofreader",
    //   "#due_date": "due_date",
    //   "#cost": "cost",
    // },
  };

  const translator_params = {
    TableName: process.env.TRANSLATOR_TABLE,
    Key: { email: proofreader },
    UpdateExpression: "SET #projects = list_append(#projects, :projectId)",
    ExpressionAttributeNames: {
      "#projects": "projects",
    },
    ExpressionAttributeValues: {
      ":projectId": [orderId],
    },
  };

  const proofreader_params = {
    TableName: process.env.TRANSLATOR_TABLE,
    Key: { email: translator },
    UpdateExpression: "SET #projects = list_append(#projects, :projectId)",
    ExpressionAttributeNames: {
      "#projects": "projects",
    },
    ExpressionAttributeValues: {
      ":projectId": [orderId],
    },
  };


  try {
    await dynamodb.update(order_params).promise();
  } catch (err) {
    console.error(err);
    return sendResponse(502, { error: err.message });
  }

  if (proofreader && proofreader_data.email !== proofreader) {
     const {source, target, subject} = order_result
    // update the proofreader's project
    try {
      await dynamodb.update(proofreader_params).promise();
    } catch (err) {
      console.error(err);
      return sendResponse(502, { message: err.message });
    }

    // send a mail
    const email_params = {
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
            subject: 'Congratulations!, lets get to work',
            body: `You have been selected to proofread a translation from ${source} to ${target} on a subject about ${subject}`,
            recipient: proofreader
        })
    }

    try {
        const output = await sqs.sendMessage(email_params).promise()
        console.log(output);
    } catch (err) {
      console.error(err);
    }

  }

  if (translator && translator_data.email !== translator) {
    const {source, target, subject} = order_result
    // update the translator's project
    try {
      await dynamodb.update(translator_params).promise();
    } catch (err) {
      console.error(err);
      sendResponse(502, { message: err.message });
    }

    // send a mail
    const email_params = {
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
            subject: 'Congratulations!, lets get to work',
            body: `You have been selected to perform a translation from ${source} to ${target} on a subject about ${subject}`,
            recipient: translator
        })
    }
    try {
        const output = await sqs.sendMessage(email_params).promise()
        console.log(output);
    } catch (err) {
      console.error(err);
    }
  }

  return sendResponse(201, {message: `${orderId} successfully updated!`})
}

export const handler = edit_order;
