'use strict';
const expect = require('chai').expect;
const lambda = require('lambda-tester');

const getProductList = require('../get-products').getProductsList;
const getProductById = require('../get-product').getProductsById;

describe('product-service', () => {

    describe('lambdas-aws', () => {
        describe('get-products', () => {
           it('Should return 200 - all products', async () => {
               const result = await lambda(getProductList)
                   .event()
                   .expectResult(response => response);

               expect(result.statusCode).equals(200);
               expect(JSON.parse(result.body).length).greaterThan(1);
           });
        });

        describe('get-product', () => {
            it('Should return 500 with productId not provided', async () => {
                const result = await lambda(getProductById)
                    .event({'pathParameters': {'productId': ''}})
                    .expectResult(response => response);

                expect(result.statusCode).equals(500);
                expect(result.body).equals("{}");
            });

            it('Should return 404 when data is not found', async () => {
                const result = await lambda(getProductById)
                    .event({'pathParameters': {'productId': 'ABSC'}})
                    .expectResult(response => response);

                expect(result.statusCode).equals(404);
                expect(result.body).equals(undefined);
            });

            it('Should return 200 with productId', async () => {
                const result = await lambda(getProductById)
                    .event({'pathParameters': {'productId': 'ABCDE102030'}})
                    .expectResult(response => response);

                expect(result.statusCode).equals(200);
                expect(JSON.parse(result.body).id).equals('ABCDE102030');
            });
        });
    });

});