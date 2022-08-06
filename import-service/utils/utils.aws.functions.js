'use strict';

const AWS = require('aws-sdk');
const path = require('path');
const csv = require('csv-parser')
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const s3 = new AWS.S3({region: 'us-east-1'});
const sqs = new AWS.SQS({region: 'us-east-1'});

const bucket = process.env.BUCKET;
const uploaded = process.env.PATH_AWS;
const SQS_URL = process.env.SQS_URL;

const getSignedImage = (image) => new Promise(async (resolve, reject) => {
    try {
        console.log(`getSignedImage executing`);
        console.log(`Image: ${image}`);
        const params = {
            Bucket: bucket,
            Key: `${uploaded}/${image}.jpg`
        };

        console.log(JSON.stringify(params));

        console.log(`Start getSignedUrl function`);

        await s3.getSignedUrl('getObject', params, (error, url) => {
            if (error) {
                console.log(error);
                reject({status: 500, error, message: 'An error occurred getting signed url'});
            }
            resolve({status: 200, url, message: 'Success'});
        });
    } catch (error) {
        console.log(`Error on getSignedImage: ${error}`);
        reject({status: 500, message: `Error on getSignedImage: ${error}`})
    }
});

const moveImage = async (image) => {
    try {
        const params = {
            Bucket: bucket,
            Key: image
        };

        /*console.log(`Params: ${JSON.stringify(params)}`);

        const s3Stream = await s3.getObject(params).createReadStream();

        console.log(`s3Stream: ${JSON.stringify(s3Stream)}`);

        await s3Stream.pipe(csv())
            .on('data', data => {
                console.log(data);
            })
            .on('end', async () => {
                console.log(`${bucket}/${image}`);
                await s3.copyObject({
                    Bucket: bucket,
                    CopySource: `${bucket}/${image}`,
                    Key: image.replace('images', path)
                }).promise();

                await s3.deleteObject({
                    Bucket: bucket,
                    Key: image
                }).promise();

                console.log(`Copied into ${bucket}/${image.replace('images', path)}`);
            });*/

        console.log(`${bucket}/${image}`);
        console.log(`path`)

        await s3.copyObject({
            Bucket: bucket,
            CopySource: `${bucket}/${image}`,
            Key: image.replace('images', uploaded)
        }).promise();

        await s3.deleteObject(params).promise();

        const data = {}

        data.title = 'Test SQS';
        data.description = 'Description From SQS';
        data.price = 0;
        data.count = 0;

        await sender(data);

        console.log(`Copied into ${bucket}/${image.replace('images', uploaded)}`);
        return true;
    } catch (error) {
        console.log(`Error on moveImage: ${error}`);
        return false;
    }
}

const sender = async (dataPorduct) => {
    console.log(`Sender SQS executing`);
    const params = {
        MessageBody: JSON.stringify(dataPorduct),
        QueueUrl: SQS_URL
    };

    console.log(`Params SQS ${JSON.stringify(params)}`)

    await sqs.sendMessage(params, (error, data) => {
        console.log(`sqs.sendMessage`);
        if(error) {
            console.log(`Error on sqs send message ${JSON.stringify(error)}`);
        }
        console.log(`Data: ${JSON.stringify(data)}`);
    })
}

module.exports = {getSignedImage, moveImage}