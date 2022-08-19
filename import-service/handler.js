'use strict';

const {importProductsFile} = require('./src/images');
const {importFileParser} = require('./src/image');

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
};


module.exports.images = async (event) => {
    return importProductsFile(event);
}

module.exports.image = async (event) => {
    return importFileParser(event);
}