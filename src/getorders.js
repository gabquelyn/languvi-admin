import AWS from "aws-sdk";
const TableName = process.env.ORDERS_TABLE;
const dynamodb = new AWS.DynamoDB.DocumentClient();
import sendResponse from "../lib/sendResponse";
async function get_orders(event, context) {
  if (event.queryStringParameters?.sort) {
    const { sort } = event.queryStringParameters;
    let KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      IndexName;
      
      if (sort === "unapproved") {
        KeyConditionExpression = "#status = :t";
        ExpressionAttributeValues = {
          ":t": "unapproved",
        };
        ExpressionAttributeNames = {
          "#status": "standing",
        };
        IndexName = "orderStatus";
      }

    if (sort === "paid") {
      KeyConditionExpression = "#paid = :t";
      ExpressionAttributeValues = {
        ":t": 1,
      };
      ExpressionAttributeNames = {
        "#paid": "paid",
      };
      IndexName = "transactions";
    }

    if (sort === "completed") {
      KeyConditionExpression = "#status = :t";
      ExpressionAttributeValues = {
        ":t": "completed",
      };
      ExpressionAttributeNames = {
        "#status": "standing",
      };
      IndexName = "orderStatus";
    }
    
    if (sort === "revision") {
      KeyConditionExpression = "#status = :t";
      ExpressionAttributeValues = {
        ":t": "revision",
      };
      ExpressionAttributeNames = {
        "#status": "standing",
      };
      IndexName = "orderStatus";
    }

    if (sort === "ongoing_translation") {
      KeyConditionExpression = "#status = :t";
      ExpressionAttributeValues = {
        ":t" : "translating"
      };
      ExpressionAttributeNames = {
        "#status": "standing",
      };
      IndexName = "orderStatus";
    }

    if (sort === "unassigned_translation") {
      KeyConditionExpression = "#status = :t";
      ExpressionAttributeValues = {
        ":t" : "unassigned translation"
      };
      ExpressionAttributeNames = {
        "#status": "standing",
      };
      IndexName = "orderStatus";
    }

    if (sort === "unassigned_proofreading") {
      KeyConditionExpression = "#status = :t";
      ExpressionAttributeValues = {
        ":t" : "unassigned proofreading"
      };
      ExpressionAttributeNames = {
        "#status": "standing",
      };
      IndexName = "orderStatus";
    }

    if (sort === "ongoing_proofreading") {
      KeyConditionExpression = "#status = :t";
      ExpressionAttributeValues = {
        ":t" : "proofreading"
      };
      ExpressionAttributeNames = {
        "#status": "standing",
      };
      IndexName = "orderStatus";
    }

    if (sort === "awaiting_revision") {
      KeyConditionExpression = "#status = :p";
      ExpressionAttributeValues = {
        ":p": "awaiting revision",
      };
      ExpressionAttributeNames = {
        "#status": "standing",
      };
      IndexName = "orderStatus";
    }

    const params = {
      TableName,
      KeyConditionExpression,
      ExpressionAttributeValues,
      ExpressionAttributeNames,
      IndexName
    }

    try {
      const result = await dynamodb.query(params).promise();
      return sendResponse(200, { message: result.Items });
    } catch (err) {
      console.error(err);
      return sendResponse(501, { message: err.message });
    }
  } else {
    try {
      const result = await dynamodb.scan({ TableName }).promise();
      return sendResponse(200, { message: result.Items });
    } catch (err) {
      return sendResponse(501, { message: err.message });
    }
  }
}

export const handler = get_orders;
