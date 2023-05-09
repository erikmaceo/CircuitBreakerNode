
'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (functionData, context) => {
  try {
    const serviceName = functionData.TargetLambda;
    const currentTimeStamp = Math.floor(Date.now() / 1000);

    const queryParams = {
      TableName: 'CircuitBreaker',
      KeyConditionExpression: 'ServiceName = :serviceName AND ExpireTimeStamp > :currentTimeStamp',
      ExpressionAttributeValues: {
        ':serviceName': serviceName,
        ':currentTimeStamp': currentTimeStamp,
      },
    };

    const result = await dynamodb.query(queryParams).promise();

    for (const item of result.Items) {
      console.log(item.ServiceName);
      console.log(item.ExpireTimeStamp.toString());
    }

    if (result.Count > 0) {
      functionData.CircuitStatus = result.Items[0].CircuitStatus;
    } else {
      functionData.CircuitStatus = '';
    }

    return functionData;
  } catch (error) {
    console.log('Error en la función:', error);
    throw error;
  }
};