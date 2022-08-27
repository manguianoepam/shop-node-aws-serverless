'use strict';
const expect = require('chai').expect;
const lambda = require('lambda-tester');

const getProductList = require('../get-products').getProductsList;
const getProductById = require('../get-product').getProductById;
const createProduct = require('../create-product').createProduct;

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
                expect(JSON.parse(result.body).message).equals('Product not found');
            });


            it('Should return 200 with productId', async () => {
                const result = await lambda(getProductById)
                    .event({'pathParameters': {'productId': 'ABCDE102030'}})
                    .expectResult(response => response);

                expect(result.statusCode).equals(200);
                expect(JSON.parse(result.body).id).equals('ABCDE102030');
            });
        });

        describe('create-product', () => {
            it('Should return 500 when event is wrong' , async () => {
                const result = await lambda(createProduct)
                    .event( {
                        resource: '/products',
                        path: '/products',
                        httpMethod: 'POST',
                        headers: {
                            Accept: '*/*',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'CloudFront-Forwarded-Proto': 'https',
                            'CloudFront-Is-Desktop-Viewer': 'true',
                            'CloudFront-Is-Mobile-Viewer': 'false',
                            'CloudFront-Is-SmartTV-Viewer': 'false',
                            'CloudFront-Is-Tablet-Viewer': 'false',
                            'CloudFront-Viewer-ASN': '28509',
                            'CloudFront-Viewer-Country': 'MX',
                            'Content-Type': 'application/json',
                            Host: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                            'Postman-Token': 'da51eb72-aa2e-41ea-a120-6f14e21b1d94',
                            'User-Agent': 'PostmanRuntime/7.29.2',
                            Via: '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)',
                            'X-Amz-Cf-Id': 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==',
                            'X-Amzn-Trace-Id': 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df',
                            'X-Forwarded-For': '187.253.120.36, 130.176.179.78',
                            'X-Forwarded-Port': '443',
                            'X-Forwarded-Proto': 'https'
                        },
                        multiValueHeaders: {
                            Accept: [ '*/*' ],
                            'Accept-Encoding': [ 'gzip, deflate, br' ],
                            'CloudFront-Forwarded-Proto': [ 'https' ],
                            'CloudFront-Is-Desktop-Viewer': [ 'true' ],
                            'CloudFront-Is-Mobile-Viewer': [ 'false' ],
                            'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
                            'CloudFront-Is-Tablet-Viewer': [ 'false' ],
                            'CloudFront-Viewer-ASN': [ '28509' ],
                            'CloudFront-Viewer-Country': [ 'MX' ],
                            'Content-Type': [ 'application/json' ],
                            Host: [ 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com' ],
                            'Postman-Token': [ 'da51eb72-aa2e-41ea-a120-6f14e21b1d94' ],
                            'User-Agent': [ 'PostmanRuntime/7.29.2' ],
                            Via: [
                                '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)'
                            ],
                            'X-Amz-Cf-Id': [ 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==' ],
                            'X-Amzn-Trace-Id': [ 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df' ],
                            'X-Forwarded-For': [ '187.253.120.36, 130.176.179.78' ],
                            'X-Forwarded-Port': [ '443' ],
                            'X-Forwarded-Proto': [ 'https' ]
                        },
                        queryStringParameters: null,
                        multiValueQueryStringParameters: null,
                        pathParameters: null,
                        stageVariables: null,
                        requestContext: {
                            resourceId: 'cic4y4',
                            resourcePath: '/products',
                            httpMethod: 'POST',
                            extendedRequestId: 'Vr046GH6oAMF93A=',
                            requestTime: '22/Jul/2022:20:00:18 +0000',
                            path: '/dev/products',
                            accountId: '436988374415',
                            protocol: 'HTTP/1.1',
                            stage: 'dev',
                            domainPrefix: 'o3lc79zr1i',
                            requestTimeEpoch: 1658520018467,
                            requestId: 'be81d25d-203b-4d50-9908-b173622b9b35',
                            identity: {
                                cognitoIdentityPoolId: null,
                                accountId: null,
                                cognitoIdentityId: null,
                                caller: null,
                                sourceIp: '187.253.120.36',
                                principalOrgId: null,
                                accessKey: null,
                                cognitoAuthenticationType: null,
                                cognitoAuthenticationProvider: null,
                                userArn: null,
                                userAgent: 'PostmanRuntime/7.29.2',
                                user: null
                            },
                            domainName: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                            apiId: 'o3lc79zr1i'
                        },
                        body: '{\r\n' +
                            '    "title": "Test product :D",\r\n' +
                            '    "description": "Test description",\r\n' +
                            '    "price": 10,\r\n' +
                            '}',
                        isBase64Encoded: false
                    })
                    .expectResult(response => response);

                expect(result.statusCode).equals(500);
                expect(JSON.parse(result.body)).equals('An error occurred');
            });

            it('Should return 501 with not event data', async () => {
                const result = await lambda(createProduct)
                    .event({})
                    .expectResult(response => response);

                expect(result.statusCode).equals(501);
                expect(JSON.parse(result.body)).equals('Data not provided');
            });

            it('Should return 502 whit missing data', async () => {
                const result = await lambda(createProduct)
                    .event( {
                        resource: '/products',
                        path: '/products',
                        httpMethod: 'POST',
                        headers: {
                            Accept: '*/*',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'CloudFront-Forwarded-Proto': 'https',
                            'CloudFront-Is-Desktop-Viewer': 'true',
                            'CloudFront-Is-Mobile-Viewer': 'false',
                            'CloudFront-Is-SmartTV-Viewer': 'false',
                            'CloudFront-Is-Tablet-Viewer': 'false',
                            'CloudFront-Viewer-ASN': '28509',
                            'CloudFront-Viewer-Country': 'MX',
                            'Content-Type': 'application/json',
                            Host: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                            'Postman-Token': 'da51eb72-aa2e-41ea-a120-6f14e21b1d94',
                            'User-Agent': 'PostmanRuntime/7.29.2',
                            Via: '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)',
                            'X-Amz-Cf-Id': 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==',
                            'X-Amzn-Trace-Id': 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df',
                            'X-Forwarded-For': '187.253.120.36, 130.176.179.78',
                            'X-Forwarded-Port': '443',
                            'X-Forwarded-Proto': 'https'
                        },
                        multiValueHeaders: {
                            Accept: [ '*/*' ],
                            'Accept-Encoding': [ 'gzip, deflate, br' ],
                            'CloudFront-Forwarded-Proto': [ 'https' ],
                            'CloudFront-Is-Desktop-Viewer': [ 'true' ],
                            'CloudFront-Is-Mobile-Viewer': [ 'false' ],
                            'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
                            'CloudFront-Is-Tablet-Viewer': [ 'false' ],
                            'CloudFront-Viewer-ASN': [ '28509' ],
                            'CloudFront-Viewer-Country': [ 'MX' ],
                            'Content-Type': [ 'application/json' ],
                            Host: [ 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com' ],
                            'Postman-Token': [ 'da51eb72-aa2e-41ea-a120-6f14e21b1d94' ],
                            'User-Agent': [ 'PostmanRuntime/7.29.2' ],
                            Via: [
                                '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)'
                            ],
                            'X-Amz-Cf-Id': [ 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==' ],
                            'X-Amzn-Trace-Id': [ 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df' ],
                            'X-Forwarded-For': [ '187.253.120.36, 130.176.179.78' ],
                            'X-Forwarded-Port': [ '443' ],
                            'X-Forwarded-Proto': [ 'https' ]
                        },
                        queryStringParameters: null,
                        multiValueQueryStringParameters: null,
                        pathParameters: null,
                        stageVariables: null,
                        requestContext: {
                            resourceId: 'cic4y4',
                            resourcePath: '/products',
                            httpMethod: 'POST',
                            extendedRequestId: 'Vr046GH6oAMF93A=',
                            requestTime: '22/Jul/2022:20:00:18 +0000',
                            path: '/dev/products',
                            accountId: '436988374415',
                            protocol: 'HTTP/1.1',
                            stage: 'dev',
                            domainPrefix: 'o3lc79zr1i',
                            requestTimeEpoch: 1658520018467,
                            requestId: 'be81d25d-203b-4d50-9908-b173622b9b35',
                            identity: {
                                cognitoIdentityPoolId: null,
                                accountId: null,
                                cognitoIdentityId: null,
                                caller: null,
                                sourceIp: '187.253.120.36',
                                principalOrgId: null,
                                accessKey: null,
                                cognitoAuthenticationType: null,
                                cognitoAuthenticationProvider: null,
                                userArn: null,
                                userAgent: 'PostmanRuntime/7.29.2',
                                user: null
                            },
                            domainName: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                            apiId: 'o3lc79zr1i'
                        },
                        body: '{\r\n' +
                            '    "title": "Test product :D",\r\n' +
                            '    "description": "Test description",\r\n' +
                            '    "price": 10\r\n' +
                            '}',
                        isBase64Encoded: false
                    })
                    .expectResult(response => response);

                expect(result.statusCode).equals(502);
                expect(JSON.parse(result.body)).equals('Missing Data');
            });

            it('Should return 400 whit wrong data typeof', async () => {
                const result = await lambda(createProduct)
                    .event( {
                        resource: '/products',
                        path: '/products',
                        httpMethod: 'POST',
                        headers: {
                            Accept: '*/*',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'CloudFront-Forwarded-Proto': 'https',
                            'CloudFront-Is-Desktop-Viewer': 'true',
                            'CloudFront-Is-Mobile-Viewer': 'false',
                            'CloudFront-Is-SmartTV-Viewer': 'false',
                            'CloudFront-Is-Tablet-Viewer': 'false',
                            'CloudFront-Viewer-ASN': '28509',
                            'CloudFront-Viewer-Country': 'MX',
                            'Content-Type': 'application/json',
                            Host: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                            'Postman-Token': 'da51eb72-aa2e-41ea-a120-6f14e21b1d94',
                            'User-Agent': 'PostmanRuntime/7.29.2',
                            Via: '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)',
                            'X-Amz-Cf-Id': 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==',
                            'X-Amzn-Trace-Id': 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df',
                            'X-Forwarded-For': '187.253.120.36, 130.176.179.78',
                            'X-Forwarded-Port': '443',
                            'X-Forwarded-Proto': 'https'
                        },
                        multiValueHeaders: {
                            Accept: [ '*/*' ],
                            'Accept-Encoding': [ 'gzip, deflate, br' ],
                            'CloudFront-Forwarded-Proto': [ 'https' ],
                            'CloudFront-Is-Desktop-Viewer': [ 'true' ],
                            'CloudFront-Is-Mobile-Viewer': [ 'false' ],
                            'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
                            'CloudFront-Is-Tablet-Viewer': [ 'false' ],
                            'CloudFront-Viewer-ASN': [ '28509' ],
                            'CloudFront-Viewer-Country': [ 'MX' ],
                            'Content-Type': [ 'application/json' ],
                            Host: [ 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com' ],
                            'Postman-Token': [ 'da51eb72-aa2e-41ea-a120-6f14e21b1d94' ],
                            'User-Agent': [ 'PostmanRuntime/7.29.2' ],
                            Via: [
                                '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)'
                            ],
                            'X-Amz-Cf-Id': [ 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==' ],
                            'X-Amzn-Trace-Id': [ 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df' ],
                            'X-Forwarded-For': [ '187.253.120.36, 130.176.179.78' ],
                            'X-Forwarded-Port': [ '443' ],
                            'X-Forwarded-Proto': [ 'https' ]
                        },
                        queryStringParameters: null,
                        multiValueQueryStringParameters: null,
                        pathParameters: null,
                        stageVariables: null,
                        requestContext: {
                            resourceId: 'cic4y4',
                            resourcePath: '/products',
                            httpMethod: 'POST',
                            extendedRequestId: 'Vr046GH6oAMF93A=',
                            requestTime: '22/Jul/2022:20:00:18 +0000',
                            path: '/dev/products',
                            accountId: '436988374415',
                            protocol: 'HTTP/1.1',
                            stage: 'dev',
                            domainPrefix: 'o3lc79zr1i',
                            requestTimeEpoch: 1658520018467,
                            requestId: 'be81d25d-203b-4d50-9908-b173622b9b35',
                            identity: {
                                cognitoIdentityPoolId: null,
                                accountId: null,
                                cognitoIdentityId: null,
                                caller: null,
                                sourceIp: '187.253.120.36',
                                principalOrgId: null,
                                accessKey: null,
                                cognitoAuthenticationType: null,
                                cognitoAuthenticationProvider: null,
                                userArn: null,
                                userAgent: 'PostmanRuntime/7.29.2',
                                user: null
                            },
                            domainName: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                            apiId: 'o3lc79zr1i'
                        },
                        body: '{\r\n' +
                            '    "title": false,\r\n' +
                            '    "description": "Test description",\r\n' +
                            '    "price": "10",\r\n' +
                            '    "count": false\r\n' +
                            '}',
                        isBase64Encoded: false
                    })
                    .expectResult(response => response);

                expect(result.statusCode).equals(400);
                expect(JSON.parse(result.body)).equals('Data is Invalid');
            });

            it('Should return 504 whit wrong data typeof', async () => {
                const result = await lambda(createProduct)
                    .event( {
                        resource: '/products',
                        path: '/products',
                        httpMethod: 'POST',
                        headers: {
                            Accept: '*/*',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'CloudFront-Forwarded-Proto': 'https',
                            'CloudFront-Is-Desktop-Viewer': 'true',
                            'CloudFront-Is-Mobile-Viewer': 'false',
                            'CloudFront-Is-SmartTV-Viewer': 'false',
                            'CloudFront-Is-Tablet-Viewer': 'false',
                            'CloudFront-Viewer-ASN': '28509',
                            'CloudFront-Viewer-Country': 'MX',
                            'Content-Type': 'application/json',
                            Host: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                            'Postman-Token': 'da51eb72-aa2e-41ea-a120-6f14e21b1d94',
                            'User-Agent': 'PostmanRuntime/7.29.2',
                            Via: '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)',
                            'X-Amz-Cf-Id': 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==',
                            'X-Amzn-Trace-Id': 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df',
                            'X-Forwarded-For': '187.253.120.36, 130.176.179.78',
                            'X-Forwarded-Port': '443',
                            'X-Forwarded-Proto': 'https'
                        },
                        multiValueHeaders: {
                            Accept: [ '*/*' ],
                            'Accept-Encoding': [ 'gzip, deflate, br' ],
                            'CloudFront-Forwarded-Proto': [ 'https' ],
                            'CloudFront-Is-Desktop-Viewer': [ 'true' ],
                            'CloudFront-Is-Mobile-Viewer': [ 'false' ],
                            'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
                            'CloudFront-Is-Tablet-Viewer': [ 'false' ],
                            'CloudFront-Viewer-ASN': [ '28509' ],
                            'CloudFront-Viewer-Country': [ 'MX' ],
                            'Content-Type': [ 'application/json' ],
                            Host: [ 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com' ],
                            'Postman-Token': [ 'da51eb72-aa2e-41ea-a120-6f14e21b1d94' ],
                            'User-Agent': [ 'PostmanRuntime/7.29.2' ],
                            Via: [
                                '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)'
                            ],
                            'X-Amz-Cf-Id': [ 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==' ],
                            'X-Amzn-Trace-Id': [ 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df' ],
                            'X-Forwarded-For': [ '187.253.120.36, 130.176.179.78' ],
                            'X-Forwarded-Port': [ '443' ],
                            'X-Forwarded-Proto': [ 'https' ]
                        },
                        queryStringParameters: null,
                        multiValueQueryStringParameters: null,
                        pathParameters: null,
                        stageVariables: null,
                        requestContext: {
                            resourceId: 'cic4y4',
                            resourcePath: '/products',
                            httpMethod: 'POST',
                            extendedRequestId: 'Vr046GH6oAMF93A=',
                            requestTime: '22/Jul/2022:20:00:18 +0000',
                            path: '/dev/products',
                            accountId: '436988374415',
                            protocol: 'HTTP/1.1',
                            stage: 'dev',
                            domainPrefix: 'o3lc79zr1i',
                            requestTimeEpoch: 1658520018467,
                            requestId: 'be81d25d-203b-4d50-9908-b173622b9b35',
                            identity: {
                                cognitoIdentityPoolId: null,
                                accountId: null,
                                cognitoIdentityId: null,
                                caller: null,
                                sourceIp: '187.253.120.36',
                                principalOrgId: null,
                                accessKey: null,
                                cognitoAuthenticationType: null,
                                cognitoAuthenticationProvider: null,
                                userArn: null,
                                userAgent: 'PostmanRuntime/7.29.2',
                                user: null
                            },
                            domainName: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                            apiId: 'o3lc79zr1i'
                        },
                        body: '{\r\n' +
                            '    "title": "Test product :D",\r\n' +
                            '    "description": "Test description",\r\n' +
                            '    "price": "10",\r\n' +
                            '    "count": false\r\n' +
                            '}',
                        isBase64Encoded: false
                    })
                    .expectResult(response => response);

                expect(result.statusCode).equals(504);
                expect(JSON.parse(result.body)).equals('An error occurred on Stock creation');
            });

            it('Should return 200 with correct json', async () => {
                const result = await lambda(createProduct)
                    .event(
                        {
                            resource: '/products',
                            path: '/products',
                            httpMethod: 'POST',
                            headers: {
                                Accept: '*/*',
                                'Accept-Encoding': 'gzip, deflate, br',
                                'CloudFront-Forwarded-Proto': 'https',
                                'CloudFront-Is-Desktop-Viewer': 'true',
                                'CloudFront-Is-Mobile-Viewer': 'false',
                                'CloudFront-Is-SmartTV-Viewer': 'false',
                                'CloudFront-Is-Tablet-Viewer': 'false',
                                'CloudFront-Viewer-ASN': '28509',
                                'CloudFront-Viewer-Country': 'MX',
                                'Content-Type': 'application/json',
                                Host: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                                'Postman-Token': 'da51eb72-aa2e-41ea-a120-6f14e21b1d94',
                                'User-Agent': 'PostmanRuntime/7.29.2',
                                Via: '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)',
                                'X-Amz-Cf-Id': 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==',
                                'X-Amzn-Trace-Id': 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df',
                                'X-Forwarded-For': '187.253.120.36, 130.176.179.78',
                                'X-Forwarded-Port': '443',
                                'X-Forwarded-Proto': 'https'
                            },
                            multiValueHeaders: {
                                Accept: ['*/*'],
                                'Accept-Encoding': ['gzip, deflate, br'],
                                'CloudFront-Forwarded-Proto': ['https'],
                                'CloudFront-Is-Desktop-Viewer': ['true'],
                                'CloudFront-Is-Mobile-Viewer': ['false'],
                                'CloudFront-Is-SmartTV-Viewer': ['false'],
                                'CloudFront-Is-Tablet-Viewer': ['false'],
                                'CloudFront-Viewer-ASN': ['28509'],
                                'CloudFront-Viewer-Country': ['MX'],
                                'Content-Type': ['application/json'],
                                Host: ['o3lc79zr1i.execute-api.us-east-1.amazonaws.com'],
                                'Postman-Token': ['da51eb72-aa2e-41ea-a120-6f14e21b1d94'],
                                'User-Agent': ['PostmanRuntime/7.29.2'],
                                Via: [
                                    '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)'
                                ],
                                'X-Amz-Cf-Id': ['AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w=='],
                                'X-Amzn-Trace-Id': ['Root=1-62db01d2-5bca1ccb57b50f957f73a1df'],
                                'X-Forwarded-For': ['187.253.120.36, 130.176.179.78'],
                                'X-Forwarded-Port': ['443'],
                                'X-Forwarded-Proto': ['https']
                            },
                            queryStringParameters: null,
                            multiValueQueryStringParameters: null,
                            pathParameters: null,
                            stageVariables: null,
                            requestContext: {
                                resourceId: 'cic4y4',
                                resourcePath: '/products',
                                httpMethod: 'POST',
                                extendedRequestId: 'Vr046GH6oAMF93A=',
                                requestTime: '22/Jul/2022:20:00:18 +0000',
                                path: '/dev/products',
                                accountId: '436988374415',
                                protocol: 'HTTP/1.1',
                                stage: 'dev',
                                domainPrefix: 'o3lc79zr1i',
                                requestTimeEpoch: 1658520018467,
                                requestId: 'be81d25d-203b-4d50-9908-b173622b9b35',
                                identity: {
                                    cognitoIdentityPoolId: null,
                                    accountId: null,
                                    cognitoIdentityId: null,
                                    caller: null,
                                    sourceIp: '187.253.120.36',
                                    principalOrgId: null,
                                    accessKey: null,
                                    cognitoAuthenticationType: null,
                                    cognitoAuthenticationProvider: null,
                                    userArn: null,
                                    userAgent: 'PostmanRuntime/7.29.2',
                                    user: null
                                },
                                domainName: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                                apiId: 'o3lc79zr1i'
                            },
                            body: '{\r\n' +
                                '    "title": "Test product :D",\r\n' +
                                '    "description": "Test description",\r\n' +
                                '    "price": 10,\r\n' +
                                '    "count": 5\r\n' +
                                '}',
                            isBase64Encoded: false
                        }
                    )
                    .expectResult(result => result);

                expect(result.statusCode).equals(201);
            });
        });
    });

});