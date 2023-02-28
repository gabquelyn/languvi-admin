import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
AWS.config.update({ region: "us-east-1" });
const tableName = process.env.SERVICE_TABLE;

export async function put_service(event, context) {
  const { _package, _additional_service } = JSON.parse(event.body);
 let body
 let statusCode
  const param = {
    id: "service",
    _package,
    _additional_service,
  };

  try {
    await dynamodb
      .put({
        TableName: tableName,
        Item: param,
      })
      .promise();
      statusCode = 200;
      body= {message: "Successfully inserted a new service"}
  } catch (err) {
    console.error(err);
    statusCode = 501;
    body = {message: err.message}
  }
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}

export async function get_service(event, context){
    let data;
    try{
        const result = await dynamodb.get({
            TableName: tableName,
            Key: {id: "service"}
        }).promise()
        data = result.Item
    }catch(err){
        console.error(err)
    }
    return{
        statusCode: 200,
        body: JSON.stringify(data)
    }
}