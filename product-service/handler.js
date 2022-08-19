'use strict';

const {catalogBatchProcess} = require('./src/batch-process');
const {createProduct} = require('./src/create-product');
const {getProductById} = require('./src/get-product');
const {getProductsList} = require('./src/get-products')

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

module.exports.batch = async (event) => {
    return catalogBatchProcess(event);
}

module.exports.newProduct = async (event) => {
    return createProduct(event);
}

module.exports.product = async (event) => {
    return getProductById(event);
}

module.exports.products = async () => {
    return getProductsList();
}