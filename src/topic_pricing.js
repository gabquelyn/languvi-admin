import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
const dynamodb = new AWS.DynamoDB.DocumentClient();
AWS.config.update({ region: "us-east-1" });

const tableName = process.env.TOPIC_PRICING_TABLE;

export async function create_topic(event, context) {
  const { topic, type, unit } = JSON.parse(event.body);
  const related_topic = topic.toLowerCase();
  const pricing_type = type.toLowerCase();
  let body;
  let statusCode;

  const params = {
    TableName: tableName,
    FilterExpression: "topic = :t",
    ExpressionAttributeValues: {
      ":t": related_topic,
    },
  };

  const existing = await dynamodb.scan(params).promise();
  if (existing && existing.Items.length !== 0) {
    statusCode = 500;
    body = {
      message: "Topic already exists",
    };
  } else {
    const params = {
      id: uuid(),
      topic: related_topic,
      type: pricing_type,
      unit,
    };

    try {
      await dynamodb
        .put({
          TableName: tableName,
          Item: params,
        })
        .promise();
    } catch (err) {
      console.error(err);
    }
    statusCode = 201;
    body = {
      message: "New Topic Created!",
      output: params,
    };
  }
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}

export async function get_topics(event, context) {
  let topics;
  try {
    if (event.queryStringParameters) {
      const { sort_key } = event.queryStringParameters;
      const params = {
        TableName: tableName,
        FilterExpression: "contains(topic, :s)",
        ExpressionAttributeValues: {
          ":s": sort_key,
        },
      };

      const result = await dynamodb.scan(params).promise();
      topics = result.Items;
    } else {
      const result = await dynamodb
        .scan({
          TableName: tableName,
        })
        .promise();
      topics = result.Items;
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode,
      body: JSON.stringify(err.message),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(topics),
  };
}

export async function edit_topic(event, context) {
  const { id } = event.pathParameters;
  const { topic, type, unit } = JSON.parse(event.body);

  const related_topic = topic.toLowerCase();
  const pricing_type = type.toLowerCase();
  let data;
  const primaryKey = { id: id.toString() };
  const expression = "set #topic = :to, #unit = :c, #type = :t";
  const expression_names = {
    "#topic": "topic",
    "#type" : "type",
    "#unit" : "unit"
  };
  const values = {
    ":to": related_topic,
    ":t" : pricing_type,
    ":c": unit,
  };

  const params = {
    TableName: tableName,
    Key: primaryKey,
    UpdateExpression: expression,
    ExpressionAttributeValues: values,
    ExpressionAttributeNames: expression_names,
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await dynamodb.update(params).promise();
    data = result.Attributes;
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: `Updated the topic of id: ${id} successfully`,
      data,
    }),
  };
}

export async function delete_topic(event, context) {
  let data;
  const { id } = event.pathParameters;
  const params = {
    TableName: tableName,
    Key: { id },
  };
  try {
    const result = await dynamodb.delete(params).promise();
    data = result.Attributes;
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `deleted the pair of id: ${id} successfully`,
      data,
    }),
  };
}
