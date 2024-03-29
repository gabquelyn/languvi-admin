import AWS from 'aws-sdk'
import sendResponse from "../lib/sendResponse"
const dynamodb = new AWS.DynamoDB.DocumentClient()
async function getorder(event, context){
    const {orderId} = event.pathParameters
    try{
        const order_result = await dynamodb.get({
            TableName: process.env.ORDERS_TABLE,
            Key : {id : orderId}
        }).promise();

        const client = await dynamodb.get({
            TableName: process.env.CLIENTS_TABLE,
            Key: {email: order_result.Item.owner}
        }).promise()

        return sendResponse(200, {message: order_result.Item, owner: client.Item})
    }catch(err){
        console.error(err)
        return sendResponse(404, {message: `Order of id: ${orderId} does not exist!`})
    }
}

export const handler = getorder