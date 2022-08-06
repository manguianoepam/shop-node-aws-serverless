'use strict';

const utils = require('./utils/utils.aws.functions');

module.exports.importFileParser = async (event) => {
    console.log(`Event: ${JSON.stringify(event)}`);
    for (const record of event.Records) {
        await utils.moveImage(record.s3.object.key);
    }

    return {
        statusCode: 200,
        body: `importFileParser executed`
    };
}