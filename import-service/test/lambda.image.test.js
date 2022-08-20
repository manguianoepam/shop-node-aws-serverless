const expect = require('chai').expect;
const lambda = require('lambda-tester');
const handler = require('../handler');

describe('import-service', () => {
    describe('lambdas', () => {
        describe('get-image',  () => {
            it('Should return 500', async () => {
                const result = await lambda(handler.images)
                    .event({'pathParameters': {'nameImage': ''}})
                    .expectResult(data => data);
                expect(JSON.parse(result.statusCode)).equals(500);
                expect(JSON.parse(result.body).message).equals('Name image not provided')
            });

            it('Should return 200', async () => {
                const result = await lambda(handler.images)
                    .event({'pathParameters': {'nameImage': 'Alexa'}})
                    .expectResult(data => data);
                expect(JSON.parse(result.statusCode)).equals(200);
                expect(JSON.parse(result.body).message).equals('Success');
            });
        });

        describe('move-image',  () => {
            it('Should return', async () => {
                const result = await lambda(handler.image)
                    .event(
                        {
                            "Records": [
                                {
                                    "eventVersion": "2.1",
                                    "eventSource": "aws:s3",
                                    "awsRegion": "us-east-1",
                                    "eventTime": "2022-08-06T14:29:57.320Z",
                                    "eventName": "ObjectCreated:Put",
                                    "userIdentity": {
                                        "principalId": "AWS:AIDAWLPUJNWH4HTC6FCEQ"
                                    },
                                    "requestParameters": {
                                        "sourceIPAddress": "187.193.146.100"
                                    },
                                    "responseElements": {
                                        "x-amz-request-id": "398JW4JQ4K36K77H",
                                        "x-amz-id-2": "fNnnzzT9SbH+TsRwnOyqL3VpRskNgK7bF8TlstrSHTeQDk8Y70RkwrroUuN44gWxb5chRgfIERPFGtJLEzbd513QkiXFMEuf"
                                    },
                                    "s3": {
                                        "s3SchemaVersion": "1.0",
                                        "configurationId": "import-service-dev-importFileParser-057a87b0c6d7a62748d8b7e8958d9482",
                                        "bucket": {
                                            "name": "src-image-shop",
                                            "ownerIdentity": {
                                                "principalId": "A62BSUDDNWO6V"
                                            },
                                            "arn": "arn:aws:s3:::src-image-shop"
                                        },
                                        "object": {
                                            "key": "images/Alexa.jpg",
                                            "size": 31761,
                                            "eTag": "607177f4d4599df93e5528f477d8c315",
                                            "sequencer": "0062EE7AE54AF819E8"
                                        }
                                    }
                                }
                            ]
                        }
                    )
                    .expectResult(data => data);

                expect(result.statusCode).equals(200);
            });
        });

    });
});