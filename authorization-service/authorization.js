'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './.env')});

const utils = require('./utils/util.function');

module.exports.basicAuthorizer = async (event, context, callback) => {
    console.log(`Event: ${JSON.stringify(event)}`)
    let effect;
    let token = '';

    if (event[`type`] !== 'TOKEN') {
        effect = 'Unauthorized'
    } else {
        token = event.authorizationToken;
        console.log(`Token ${token}`);
        effect = await utils.getEffect(token);
        console.log(`Effect: ${effect}`);
    }

    console.log(`Token for Policy: ${token}`);
    console.log(`Method for Policy: ${event.methodArn}`);
    console.log(`Effect for Policy ${effect}`);

    const policy = utils.generatePolicy(token, event.methodArn, effect);

    console.log(`Policy: ${JSON.stringify(policy)}`);

    callback(null, policy);
};
