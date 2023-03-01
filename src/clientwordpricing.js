import AWS from 'aws-sdk'
import sendResponse from '../lib/sendResponse';
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function word_pricing(event, context){
    let data
  const {source, target} = event.pathParameters;
  const params = {
    TableName: process.env.LANGUAGE_PAIR_TABLE,
    IndexName: 'sourceAndTarget',
    KeyConditionExpression: "#source = :s, #target = :t",
    ExpressionAttributeValues: {
        ":s" : source,
        ":t" : target
    },
    ExpressionAttributeNames: {
        '#source' : 'source',
        '#target' : 'target'
    }
  };

  try {
    const result = await dynamodb.query(params).promise();
    data = result.Items
    if(data.length == 0){
        return sendResponse(404, {message: 'No price for this language pair'})
    }
    return sendResponse(200, {message: data})
  } catch (err) {
    console.error(err);
    return sendResponse(501, {message: err.message})
  }
}

export const handler = word_pricing