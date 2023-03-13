import sendResponse from "../../../languvi-translator/lib/sendResponse";
import { update } from "../../../languvi-translator/lib/actions";
import AWS from 'aws-sdk'
const sqs = new AWS.SQS();

async function disapproveTranslator(event, response){
    const {email} = JSON.parse(event.body);
    const params = {
        TableName : process.env.TRANSLATORS_TABLE,
        Key: {email},
        UpdateExpression: 'set #approved = :not',
        ExpressionAttributeValues: {
            ':not' : 'false'
        },
        ExpressionAttributeNames : {
            '#approved' : 'approved'
        }
    }
    const result = await update(params);
    if(result.error){
        console.error(err)
        sendResponse(501, {message: err.message})
    }


    const email_params = {
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
            subject: 'Oops! You have been dispproved',
            body: `Unfortunately you have been disapproved from carrying out translations and proofreading in your selected language pairs. We wil try to resolve the issue as soon as possible`,
            recipient: email
        })
    }
    
    try{
        const output = await sqs.sendMessage(email_params).promise()
        console.log(output);
    }catch(err){
        console.error(err)
    }

    return sendResponse(201, {message: `${email} is successfully disapproved!`})
}

export const handler = disapproveTranslator