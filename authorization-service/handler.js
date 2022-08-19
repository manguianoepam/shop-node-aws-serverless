'use strict';

const {basicAuthorizer} = require('./src/authorization');

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.test = async (event, context, callback ) => {
    const policy = await basicAuthorizer(event).then(result => result).catch(error => error);

    callback(null, policy);
}

