import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();
import sendResponse from '../../lib/sendResponse';
async function sendpayment(event, context){
    const {orderId, owner} = JSON.parse(event.body);
    const params  = {
        TableName: process.env.ORDERS_TABLE,
        Key: {id: orderId},
        UpdateExpression: 'set #standing = :t',
        ExpressionAttributeValues: {
            ':t' : 'awaiting payment'
        },
        ExpressionAttributeNames: {
            '#standing' : 'standing'
        }
    }

    try{
        await dynamodb.update(params).promise()
    }catch(err){
        console.error(err)
        return sendResponse(501, {message: err.message})
    }

    const email_params = {
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
            subject: 'Complete your payment!',
            body: `You can now pay by following this link https://languivi.netlify.app/pay/${orderId}`,
            recipient: owner
        })
    }

    try{
        const output = await sqs.sendMessage(email_params).promise()
        console.log(output);
    }catch(err){
        console.error(err)
    }


}
export const handler = sendpayment