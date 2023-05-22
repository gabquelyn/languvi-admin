import sendResponse from "../../lib/sendResponse";
import AWS from "aws-sdk";
const dynamodb = new AWS.DynamoDB.DocumentClient();
export async function get_translators(event, context) {
  if (
    event.queryStringParameters?.sort
  ) {
    const { sort } = event.queryStringParameters;
    const { search='' } = event.queryStringParameters;
    const search_term = search.toLowerCase();
    let KeyConditionExpression;
    let ExpressionAttributeValues;
    const IndexName = "translatorStatus";
    if (sort == "approved") {
      KeyConditionExpression = "approved = :yes";
      ExpressionAttributeValues = {
        ":yes": "true",
      };
    } else if (sort == "unapproved") {
      KeyConditionExpression = "approved = :no";
      ExpressionAttributeValues = {
        ":no": "false",
      };
    }

    const params = {
      TableName: process.env.TRANSLATORS_TABLE,
      IndexName,
      KeyConditionExpression,
      ExpressionAttributeValues,
    };
    const result = await dynamodb.query(params).promise();
    const filtered = result.Items.filter(
      (translator) =>
        translator?.profile.firstname
          .toLowerCase()
          .includes(search_term) ||
        translator?.profile.lastname.toLowerCase().includes(search_term)
    );
    return sendResponse(200, { message: filtered });
  } else if (event.queryStringParameters?.pairs) {
    const { pairs } = event.queryStringParameters;
    const searched_pair = pairs.toLowerCase();
    const result = await dynamodb
      .scan({ TableName: process.env.TRANSLATORS_TABLE })
      .promise();
    const filteredbypair = result.Items.filter((translator) =>
      translator?._details.language_pairs.some(
        (pair) =>
          pair.from.toLowerCase().includes(searched_pair) ||
          pair.to.toLowerCase().includes(searched_pair)
      )
    );
    return sendResponse(200, { message: filteredbypair });
  } else if (event.queryStringParameters?.search) {
    const { search } = event.queryStringParameters;
    const searched_term = search.toLowerCase()
    const result = await dynamodb
      .scan({ TableName: process.env.TRANSLATORS_TABLE })
      .promise();
    const filtered = result.Items.filter(
      (translator) =>
        translator?.profile.firstname
          .toLowerCase()
          .includes(searched_term) ||
        translator?.profile.lastname
          .toLowerCase()
          .includes(searched_term)
    );
    return sendResponse(200, { message: filtered });
  } else if(event.queryStringParameters?.count){
    const result = await dynamodb
      .scan({ TableName: process.env.TRANSLATORS_TABLE })
      .promise();
    const languagePairs = result.Items.flatMap(obj => obj._details.language_pairs);
    const uniqueObjects = [...new Set(languagePairs.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
 
    const approved_params = {
      TableName: process.env.TRANSLATORS_TABLE,
      IndexName: 'translatorStatus',
      KeyConditionExpression: "approved = :yes",
      ExpressionAttributeValues: {
        ":yes": "true",
      }
    };
    const unapproved_params = {
      TableName: process.env.TRANSLATORS_TABLE,
      IndexName: 'translatorStatus',
      KeyConditionExpression: "approved = :no",
      ExpressionAttributeValues: {
        ":no": "false",
      }
    };
    const unapproved_result = await dynamodb.query(unapproved_params).promise();
    const approved_result = await dynamodb.query(approved_params).promise();
    return sendResponse(200, {unapproved: unapproved_result.Count, approved: approved_result.Count, language_pairs: uniqueObjects.length, uniqueObjects, all: result.Count })
  }
  else {
    const result = await dynamodb
      .scan({ TableName: process.env.TRANSLATORS_TABLE })
      .promise();
    return sendResponse(200, { message: result.Items });
  }
}

export const handler = get_translators;

