'use strict';

const expect = require('chai').expect;
const lambda = require('lambda-tester');

const basic = require('../authorization').basicAuthorizer;

describe('Authorization Test', () => {
    describe('lambda', () => {
        describe('authorization', () => {
            it('Should get Allow Effect', async () => {
                const result = await lambda(basic)
                    .event({
                        "type": "TOKEN",
                        "methodArn": "arn:aws:execute-api:us-east-1:436988374415:guouzuadzd/dev/GET/import/Alexa",
                        "authorizationToken": "Basic bWFuZ3VpYW5vZXBhbT1URVNUX1BBU1NXT1JE"
                    })
                    .expectResult((data) => data);

                expect(result.policyDocument.Statement[0].Effect).equals('Allow');
            });

            it('Should get Allow Unauthorized', async () => {
                const result = await lambda(basic)
                    .event({
                        })
                    .expectResult((data) => data);

                expect(result.policyDocument.Statement[0].Effect).equals('Unauthorized');
            });

            it('Should get Deny Effect', async () => {
                const result = await lambda(basic)
                    .event({
                        "type": "TOKEN",
                        "methodArn": "arn:aws:execute-api:us-east-1:436988374415:guouzuadzd/dev/GET/import/Alexa",
                        "authorizationToken": "Basic d2RIM2ZQREwwdkVDVW1xQ3ZDdGk="
                    })
                    .expectResult((data) => data);

                expect(result.policyDocument.Statement[0].Effect).equals('Deny');
            });

        });
    })
});
