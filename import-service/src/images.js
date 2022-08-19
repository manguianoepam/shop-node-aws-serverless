'use strict';
const utils = require('../utils/utils.aws.functions');

const importProductsFile = async (event) => {
    const body = {};
    let status = 200

    if (!event[`pathParameters`].nameImage) {
        status = 500;
        body.message = 'Name image not provided'
    } else {
        const image = event[`pathParameters`].nameImage;
        const result = await utils.getSignedImage(image).then((data) => data).catch(error => error);

        body.message = result.message;
        body.url = result.status === 200 ? result.url : '';
    }

    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body)
    };
}

module.exports = {importProductsFile}