import AWS from 'aws-sdk';
import sendResponse from '../../lib/sendResponse';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const markcomplete = async(event, context) => {
    const {orderId} = JSON.parse(event.body);
    const params = {
        TableName: process.env.ORDERS_TABLE,
        Key: {id: orderId},
        UpdateExpression: 'set standing = :done',
        ExpressionAttributeValues:{
            ':done' : "completed",
        }
    }
    
    await dynamodb.update(params).promise();
    return sendResponse(200, {message: "Offer completed!"})
}

export const handler = markcomplete