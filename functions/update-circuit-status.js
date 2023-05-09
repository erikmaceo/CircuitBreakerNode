"use strict"

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (functionData, context) => {
  try {
    const serviceName = functionData.TargetLambda;
    functionData.CircuitStatus = 'OPEN';
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const expireTimeStamp = Math.floor((Date.now() / 1000) + 20);

    const queryParams = {
      TableName: 'CircuitBreaker',
      Key: {
        ServiceName: serviceName,
        ExpireTimeStamp: expireTimeStamp,
      },
    };

    const getItemParams = {
      TableName: 'CircuitBreaker',
      Key: {
        ServiceName: serviceName,
      },
    };

    const getItemResult = await dynamodb.get(getItemParams).promise();

    if (!getItemResult.Item) {
      const putItemParams = {
        TableName: 'CircuitBreaker',
        Item: {
          ServiceName: serviceName,
          CircuitStatus: 'OPEN',
          ExpireTimeStamp: expireTimeStamp,
        },
      };

      await dynamodb.put(putItemParams).promise();
    }

    return functionData;
  } catch (error) {
    console.log('Error en la función:', error);
    throw error;
  }
};