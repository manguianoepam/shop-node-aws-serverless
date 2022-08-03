'use strict';

const getById = require('./controller/product.controller').selectById;

module.exports.getProductById = async (event) => {
    let status = 200;
    let product = {}
    if (event[`pathParameters`].productId === '' || !event[`pathParameters`].productId) {
        status = 500;
    } else {
        const id = event[`pathParameters`].productId;
        product = getById(id);
        if(product === undefined) {
            status = 404
            product = {
                message: 'Product not found'
            }
        }
    }
    console.log(product);
    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(product)
    };
}