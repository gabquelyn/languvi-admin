import AWS from 'aws-sdk'
import sendResponse from "../lib/sendResponse";
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function topic_pricing(event, context){
    let data
  const {topic} = event.pathParameters
  const params = {
    TableName: process.env.TOPIC_PRICING_TABLE,
    IndexName: 'topics',
    KeyConditionExpression: "#topic = :t",
    ExpressionAttributeValues: {
        ":t" : topic
    },
    ExpressionAttributeNames: {
        '#topic' : 'topic'
    }
  };

  try {
    const result = await dynamodb.query(params).promise();
    data = result.Items
    if(data.length == 0){
        return sendResponse(404, {message: 'No price for this topic'})
    }
    return sendResponse(200, {message: data})
  } catch (err) {
    console.error(err);
    return sendResponse(501, {message: err.message})
  }
}

export const handler = topic_pricing