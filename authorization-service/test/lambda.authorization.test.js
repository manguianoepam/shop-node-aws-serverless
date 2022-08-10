'use strict';

const expect = require('chai').expect;
const lambda = require('lambda-tester');

const basic = require('../authorization').basicAuthorizer;

describe('Authorization Test', () => {
    describe('lambda', () => {
        describe('authorization', () => {
            it('test', async () => {
                const result = await lambda(basic)
                    .event({})
                    .expectResult((data) => data);
            });
        });
    })
});
