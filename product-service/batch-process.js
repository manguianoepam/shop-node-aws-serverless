'use strict';

const util = require('./utils/utils.aws.functions');

const product = require('./controller/product.controller').create;
const stock = require('./controller/stock.controller').create;

module.exports.catalogBatchProcess = async (event) => {
    console.log(JSON.stringify(event));
    //revived sqs event
    for (const record of event.Records) {
        //create product
        console.log(JSON.stringify(record));
        const body = JSON.parse(record.body);
        const p = {};
        p.id = body.id;
        p.title = body.title;
        p.price = body.price;
        p.description = body.description;

        console.log(JSON.stringify(p));

        let isCreated = await product(p);

        const s = {}
        s.productId = p.id;
        s.count = body.count;

        if(isCreated) {
            isCreated = await stock(s);

            if (isCreated) {
                await util.sendEmail(p);
            }
        }
    }

    return {
        statusCode: 200,
        body: `catalogBatchProcess executed`
    };
};