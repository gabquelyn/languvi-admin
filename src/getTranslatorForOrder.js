import sendResponse from "../lib/sendResponse"
import AWS from 'aws-sdk'
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function get_translator_for_order(event, context){
    const {from, to} = event.pathParameters
    const source = from.toLowerCase();
    const target = to.toLowerCase();
    const params = {
        TableName: process.env.TRANSLATORS_TABLE,
        IndexName: 'translatorStatus',
        KeyConditionExpression: "approved = :yes",
        ExpressionAttributeValues : {
            ":yes" : "true"
        }
      };
      
    try {
        const translators = await dynamodb.query(params).promise();
        const belongsTo = translators.Items.filter(translator => translator._details.language_pairs.some(pair => pair.from.toLowerCase() === source && pair.to.toLowerCase() === target))
        return sendResponse(200, {message: belongsTo})
      } catch (err) {
        console.error(err);
        return sendResponse(501, {message: err.message})
      }
}
export const handler = get_translator_for_order