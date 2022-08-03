'use strict';

const selectAll = require('./controller/product.controller').selectAll;

module.exports.getProductsList = async () => {
    console.log('getProductsList Started')
    const products = selectAll();
    console.log('getProductsList executed')
    console.log(JSON.stringify(products));
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products)
    };
}