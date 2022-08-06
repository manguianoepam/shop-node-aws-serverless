'use strict';
const {v4: uuidv4} = require('uuid');

const product = require('./controller/product.controller').create;
const stock = require('./controller/stock.controller').create;

const utils = require('./utils/utils.functions');

module.exports.createProduct = async (event) => {
    let data;
    let status = 201;

    try {
        if (!event.body) {
            status = 501;
            data = 'Data not provided'
        } else {
            let body = JSON.parse(event.body);

            if (body.title === undefined
                || body.description === undefined
                || body.price === undefined
                || body.count === undefined) {
                status = 502;
                data = 'Missing Data';
            } else {

                if (!utils.validateProductData(body)) {
                    status = 400;
                    data = 'Data is Invalid';
                } else {
                    const p = {}
                    p.id = uuidv4();
                    p.title = body.title;
                    p.price = body.price;

                    let isCreated = await product(p);

                    if(isCreated) {
                        console.log(`Create Stock from Product`);
                        const s = {};
                        s.productId = p.id;
                        s.count = body.count;

                        isCreated = await stock(s);

                        if(isCreated) {
                            data = `Product created ID: ${p.id}`;
                        } else {
                            status = 504;
                            data = `An error occurred on Stock creation`;
                        }
                    } else {
                        status = 503;
                        data = `Can't created product, an error occurred`;
                    }
                }
            }
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        status = 500;
        data = `An error occurred`
    }

    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data)
    };
}