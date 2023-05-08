import AWS from 'aws-sdk';
import sendResponse from '../../lib/sendResponse';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const undocancel = async(event, context) => {
    const {orderId} = JSON.parse(event.body);
    const params = {
        TableName: process.env.ORDERS_TABLE,
        Key: {id: orderId},
        UpdateExpression: 'set cancelled = :no',
        ExpressionAttributeValues:{
            ':c' : false,
        }

    }
    try{
        await dynamodb.update(params).promise();
    }catch(err){
        console.error(err)
    }

    return sendResponse(200, {message: "Offer reaccepted!"})
}

export const handler = undocancel