const expect = require('chai').expect;
const tester = require('lambda-tester');
const getImage = require('../images').importProductsFile;

describe('import-service', () => {
    describe('lambdas', () => {
        it('Should return 500', async () => {
            const result = await tester(getImage)
                .event({'pathParameters': {'nameImage': ''}})
                .expectResult(data => data);
            expect(JSON.parse(result.statusCode)).equals(500);
            expect(JSON.parse(result.body).message).equals('Name image not provided')
        });

        it('Should return 200', async () => {
            const result = await tester(getImage)
                .event({'pathParameters': {'nameImage': 'Alexa'}})
                .expectResult(data => data);
            expect(JSON.parse(result.statusCode)).equals(200);
            expect(JSON.parse(result.body).message).equals('Success');
        });
    });
});