'use strict';

const selectAll = require('./controller/product.controller').selectAll;

module.exports.getProductsList = async () => {
    const products = selectAll();
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products)
    };
}