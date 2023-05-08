import AWS from 'aws-sdk';
import sendResponse from '../../lib/sendResponse';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const cancel = async(event, context) => {
    const {orderId} = JSON.parse(event.body);
    const params = {
        TableName: process.env.ORDERS_TABLE,
        Key: {id: orderId},
        UpdateExpression: 'set cancelled = :yes',
        ExpressionAttributeValues:{
            ':c' : true,
        }

    }
    try{
        await dynamodb.update(params).promise();
    }catch(err){
        console.error(err)
    }

    return sendResponse(200, {message: "Offer cancelled or rejected!"})
}

export const handler = cancel