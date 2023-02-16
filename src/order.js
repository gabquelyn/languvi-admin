import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
const tableName = process.env.ORDERS_TABLE;
const dynamodb = new AWS.DynamoDB.DocumentClient();
AWS.config.update({ region: "us-east-1" });

export async function get_orders(event, context) {
  const now = new Date().toISOString();
  let body
  let statusCode;
  if (event.queryStringParameters) {
    const { sort } = event.queryStringParameters;
    let KeyConditionExpression
    let ExpressionAttributeValues
    let IndexName
    if ((sort == "unassigned_order")) {
      KeyConditionExpression = "paid = :true AND translator = :t";
      ExpressionAttributeValues = {
        ":true": 1,
        ":t": "null",
      };
      IndexName = 'orderQuery'
    } else if (sort == "unassigned_proofreading") {
      KeyConditionExpression = "paid = :true AND proofreader = :null_value";
      ExpressionAttributeValues = {
        ":true": 1,
        ":null_value": "null",
      };
      IndexName = 'proofreadingQuery'
    } else if (sort == "ongoing") {
      (KeyConditionExpression = "standing = :status AND due_date > :date"),
        (ExpressionAttributeValues = {
          ":status": 'good',
          ":date": now,
        });
        IndexName = "statusAndDue"
    } else if (sort == "ongoing_proofreading") {
      KeyConditionExpression =
        "translator <> :null_value AND due_date > :date";
      ExpressionAttributeValues = {
        ":date": now,
        ":null_value": "null",
      };
      IndexName = 'proofreadingQuery'
    } else if (sort == "canceled") {
      KeyConditionExpression = "standing = :status";
      ExpressionAttributeValues = {
        ":status": "canceled",
      };
      IndexName = "statusAndDue"
    } else if (sort == "completed") {
      KeyConditionExpression = "standing = :status";
      ExpressionAttributeValues = {
        ":status": "completed",
      };
      IndexName = 'statusAndDue'
    } else if (sort == "revision") {
      KeyConditionExpression = "standing = :status";
      ExpressionAttributeValues = {
        ":status": "revision",
      };
      IndexName = 'statusAndDue'
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
  }else{
    try{
        const result = await dynamodb.scan({TableName: tableName}).promise()
        body = result.Items
        statusCode = 200
    }catch(err){
        body = {message: err.message}
        statusCode = 500
    }
  }

  return{
    statusCode,
    body: JSON.stringify(body)
  }
  }



export async function create_order(event, context){
  const {translator, proofreader, paid, due_date, standing} = JSON.parse(event.body)
  const param = {
    id: uuid(),
    translator,
    proofreader,
    paid,
    standing,
    createdAt : new Date().toISOString(),
    due_date : due_date
  }

  try{
    await dynamodb.put({
      TableName: tableName,
      Item: param
    }).promise()
  }catch(err){
    console.error(err)
  }

  return{
    statusCode: 201,
    body: JSON.stringify({
      message: "Placed order successfully",
      output: param
    })
  }
}