import sendResponse from '../../lib/sendResponse'
import AWS from 'aws-sdk'
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function get_clients(event, context){
    try{
        const result = await dynamodb.scan({TableName: process.env.CLIENTS_TABLE}).promise()
        return sendResponse(200, {message: result.Items})
    }catch(err){
       return sendResponse(501, {message: err.message})
    }
}

export const handler = get_clients