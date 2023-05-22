import AWS from "aws-sdk";
import sendResponse from "../../lib/sendResponse";
const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

async function removeFile(event, context) {
  const { filekey, orderId } = JSON.parse(event.body);
  const params = {
    Bucket: process.env.CLIENT_BUCKET_NAME,
    Key: `clientdocuments/${filekey}`,
  };

  const result = await dynamodb.get({
    TableName: process.env.ORDERS_TABLE,
    Key: {
        id : orderId
      },
  }).promise();

  const new_filelist = result.Item.filekeys.filter(key => key !== filekey)

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


  try {
    await s3.deleteObject(params).promise();
  } catch (err) {
    return sendResponse(501, { message: err.message });
  }

  try{
    await dynamodb.update(updateParams).promise();
  }catch(err){
    return sendResponse(501, {message: err.message})
  }

  return sendResponse(201, {message: `${filekey} detatched from order and bucket`})

}
export const handler = removeFile;
