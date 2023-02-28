import AWS from "aws-sdk";
const dynamodb = new AWS.DynamoDB.DocumentClient();
import sendResponse from "../../lib/sendResponse";
async function get_translator(event, context) {
  const { email } = event.pathParameters;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.TRANSLATORS_TABLE,
        Key: { email },
      })
      .promise();
    return sendResponse(200, { message: result.Item });
  } catch (err) {
    console.error(err);
    return sendResponse(501, { message: err.message });
  }
}

export const handler = get_translator;
