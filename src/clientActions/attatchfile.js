import AWS from "aws-sdk";
import multipart from "lambda-multipart-parser";
import sendResponse from "../../lib/sendResponse";
const S3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

const attatchFiles = async (event, contet) => {
  const result = await multipart.parse(event);
  const orderId = result.orderId;
  const order_result = await dynamodb
    .get({
      TableName: process.env.ORDERS_TABLE,
      Key: {
        id: orderId,
      },
    })
    .promise();
  const newfilekeys = [];
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
    };

    try {
      await S3.upload(uploadParams).promise();
    } catch (err) {
      console.error(err);
      return sendResponse(502, { message: err.message });
    }
    newfilekeys.push(fileName);
  }

  const new_filelist = order_result.Item.filekeys.concat(newfilekeys)

  const updateParams = {
    TableName: process.env.ORDERS_TABLE,
    Key: {
      id : orderId
    },
    UpdateExpression: `SET filekeys = :array`,
    ExpressionAttributeValues: {
        ':array': [...new_filelist]
      },
  };

  await dynamodb.update(updateParams).promise();

  return sendResponse(201, {message: `attatched files to orders successfully!`})

};

export const handler = attatchFiles;
