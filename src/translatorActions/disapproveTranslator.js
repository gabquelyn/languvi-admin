import sendResponse from "../../../languvi-translator/lib/sendResponse";
import { update } from "../../../languvi-translator/lib/actions";

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
    sendResponse(201, {message: `${email} is successfully disapproved!`})
}

export const handler = disapproveTranslator