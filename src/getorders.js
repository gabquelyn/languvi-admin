import AWS from "aws-sdk";
const tableName = process.env.ORDERS_TABLE;
const dynamodb = new AWS.DynamoDB.DocumentClient();
import sendResponse from '../lib/sendResponse'
async function get_orders(event, context) {
  const now = new Date().toISOString();
  let body;
  let statusCode;
  if (event.queryStringParameters) {
    const { sort } = event.queryStringParameters;
    let KeyConditionExpression;
    let ExpressionAttributeValues;
    let IndexName;
    if (sort == "unassigned_order") {
      KeyConditionExpression = "translator = :t";
      ExpressionAttributeValues = {
        ":t": "null",
      };
      IndexName = "translateprojects";
    } else if (sort == "unassigned_proofreading") {
      KeyConditionExpression = "proofreader = :null_value";
      ExpressionAttributeValues = {
        ":null_value": "null",
      };
      IndexName = "proofreadProjects";
    } else if (sort == "ongoing") {
      (KeyConditionExpression = "paid = :p AND due_date > :date"),
        (ExpressionAttributeValues = {
          ":paid": 1,
          ":date": now,
        });
      IndexName = "transaction";
    } else if (sort == "ongoing_proofreading") {
      KeyConditionExpression = "proofreader <> :null_value";
      ExpressionAttributeValues = {
        ":null_value": "null",
      };
      IndexName = "proofreader";
    } else if (sort == "canceled") {
      KeyConditionExpression = "standing = :status";
      ExpressionAttributeValues = {
        ":status": "canceled",
      };
      IndexName = "statusAndDue";
    } else if (sort == "completed") {
      KeyConditionExpression = "standing = :status";
      ExpressionAttributeValues = {
        ":status": "completed",
      };
      IndexName = "statusAndDue";
    } else if (sort == "revision") {
      KeyConditionExpression = "standing = :status";
      ExpressionAttributeValues = {
        ":status": "revision",
      };
      IndexName = "statusAndDue";
    }

    const params = {
      TableName: tableName,
      IndexName,
      KeyConditionExpression,
      ExpressionAttributeValues,
    };

    try {
      const result = await dynamodb.query(params).promise();
      body = result.Items;
      statusCode = 200;
    } catch (err) {
      console.error(err);
      body = { message: err.message };
      statusCode = 501;
    }
  } else {
    try {
      const result = await dynamodb.scan({ TableName: tableName }).promise();
      body = result.Items;
      statusCode = 200;
    } catch (err) {
      body = { message: err.message };
      statusCode = 500;
    }
  }

  return {
    statusCode,
    body: JSON.stringify(body),
  };
}

export const handler = get_orders