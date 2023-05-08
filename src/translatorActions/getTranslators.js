import sendResponse from "../../lib/sendResponse";
import AWS from "aws-sdk";
const dynamodb = new AWS.DynamoDB.DocumentClient();
export async function get_translators(event, context) {
  if (event.queryStringParameters?.sort) {
    const { sort } = event.queryStringParameters;
    let KeyConditionExpression;
    let ExpressionAttributeValues;
    const IndexName = "translatorStatus";
    if (sort == "approved") {
      KeyConditionExpression = "approved = :yes";
      ExpressionAttributeValues = {
        ":yes": "true",
      };
    } else if (sort == "unapproved") {
      KeyConditionExpression = "approved = :no";
      ExpressionAttributeValues = {
        ":no": "false",
      };
    }

    const params = {
      TableName: process.env.TRANSLATORS_TABLE,
      IndexName,
      KeyConditionExpression,
      ExpressionAttributeValues,
    };

    try {
      const result = await dynamodb.query(params).promise();
      return sendResponse(200, { message: result.Items });
    } catch (err) {
      console.error(err);
      return sendResponse(501, { message: err.message });
    }
  } else {
    try {
      const result = await dynamodb
        .scan({ TableName: process.env.TRANSLATORS_TABLE })
        .promise();
      return sendResponse(200, { message: result.Items });
    } catch (err) {
      return sendResponse(501, { message: err.message });
    }
  }
}

export const handler = get_translators;
