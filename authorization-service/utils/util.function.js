'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const getEffect = (token) => {
    console.log(`Executing getEffect...`);
    try {
        const credentials = token.split(' ')[1];
        console.log(`Credentials BS64: ${credentials}`);
        const buffer = Buffer.from(credentials, 'base64');
        const creds = buffer.toString('utf-8').split('=');
        console.log(`Credentials: ${creds}`);
        const username = creds[0];
        const password = creds[1];
        const userPass = process.env[username];

        console.log(`User: ${userPass}`);

        return !userPass || userPass !== password ? 'Deny' : 'Allow';
    } catch (error) {
        return 'Deny';
    }
}

const generatePolicy = (principalId, resource, effect = 'Allow') => {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement:[
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    }
};

module.exports = {
    getEffect,
    generatePolicy
}