'use strict';

const {v4: uuidv4} = require('uuid');

const util = require('./utils/utils.aws.functions');

const product = require('./controller/product.controller').create;
const stock = require('./controller/stock.controller').create;

module.exports.catalogBatchProcess = async (event) => {
    //revived sqs event
    for (const record of event.Records) {
        //create product
        const body = JSON.parse(record.body);

        const p = {};
        p.id = uuidv4();
        p.title = body.title;
        p.price = body.price;

        let isCreated = await product(p);

        const s = {}
        s.productId = p.id;
        s.count = body.count;

        if(isCreated) {
            isCreated = await stock(s);

            if (isCreated) {
                util.sendEmail(p);
            }
        }
    }

    return {
        statusCode: 200,
        body: `catalogBatchProcess executed`
    };
};