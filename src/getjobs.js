import sendResponse from "../lib/sendResponse";
import AWS from "aws-sdk";
const dynamodb = new AWS.DynamoDB.DocumentClient();
const getJobs = async (event, context) => {
  const user = event.requestContext.authorizer.jwt.claims.username;
  if (event.queryStringParameters?.sort) {
    const { sort } = event.queryStringParameters;
    let KeyConditionExpression, ExpressionAttributeValues, IndexName;
    if (sort === "translateprojects") {
      KeyConditionExpression = "translator = :t";
      ExpressionAttributeValues = {
        ":t": user,
      };
      IndexName = "translateprojects";
    } else if ((sort === "proofreadprojects")) {
      KeyConditionExpression = "proofreader = :p";
      ExpressionAttributeValues = {
        ":p": user,
      };
      IndexName = "proofreadProjects";
    }

    const params = {
      TableName: process.env.ORDERS_TABLE,
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
    let orders = [];
    const t_params = {
      TableName: process.env.ORDERS_TABLE,
      IndexName: "translateprojects",
      KeyConditionExpression: "translator = :t",
      ExpressionAttributeValues: {
        ":t": user,
      },
    };

    const p_params = {
        TableName: process.env.ORDERS_TABLE,
        IndexName: "proofreadProjects",
        KeyConditionExpression: "proofreader = :p",
        ExpressionAttributeValues: {
          ":p": user,
        },
      };

    try{
      const t_result = await dynamodb.query(t_params).promise();
      const p_result = await dynamodb.query(p_params).promise();
      orders = t_result.Items.concat(p_result.Items)
    }catch(err){
        console.error(err);
    }

    const completed = orders.filter(order => order?.standing === "completed");
    const revision = orders.filter(order => order?.standing === "revision");
    return sendResponse(200, {completed, revision})
  }
};
export const handler = getJobs;
