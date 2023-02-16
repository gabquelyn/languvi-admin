import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
AWS.config.update({ region: "us-east-1" });
const tableName = process.env.LANGUAGE_PAIR_TABLE

export async function create_pair(event, context) {
  const { source, target, cost } = JSON.parse(event.body);
  // check for the existence of the language pair before adding another
  let body;
  let statusCode;
  const source_lang = source.toLowerCase();
  const target_lang = target.toLowerCase();
  const param = {
    TableName: tableName,
    FilterExpression: "#source = :s AND target = :t",
    ExpressionAttributeValues: {
      ":s": source_lang,
      ":t": target_lang,
    },
    ExpressionAttributeNames: {
      "#source": "source",
    },
  };
  const existing = await dynamodb.scan(param).promise();
  if (existing && existing.Items.length !== 0) {
    statusCode = 501;
    body = {
      message: "The language pair already exists!",
    };
  } else {
    const params = {
      id: uuid(),
      source: source_lang,
      target: target_lang,
      cost,
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
      message: "New languge pair created successfully!",
      output: params,
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
  };
}

export async function get_pairs(event, context) {
  let pairs;

  try {
    if (event.queryStringParameters) {
      const { sort_key } = event.queryStringParameters;
      const params = {
        TableName: tableName,
        FilterExpression: "contains(#source, :s) OR contains(target, :s)",
        ExpressionAttributeValues: {
          ":s": sort_key,
        },
        ExpressionAttributeNames: {
          "#source": "source",
        },
      };

      const result = await dynamodb.scan(params).promise();
      pairs = result.Items;
    } else {
      const result = await dynamodb
        .scan({
          TableName: tableName,
        })
        .promise();
      pairs = result.Items;
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
    body: JSON.stringify(pairs),
  };
}

export async function edit_pair(event, context) {
  const { id } = event.pathParameters;
  const { source, target, cost } = JSON.parse(event.body);
  const source_lang = source.toLowerCase();
  const target_lang = target.toLowerCase();
  let data;
  const primaryKey = { id: id.toString() };
  const expression = "set #source = :s, target = :t, cost = :c";
  const expression_names = {
    "#source": "source",
  };

  const values = {
    ":s": source_lang,
    ":t": target_lang,
    ":c": cost,
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
      message: `Updated the pair of id: ${id} successfully`,
      data,
    }),
  };
}

export async function delete_pair(event, context) {
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
