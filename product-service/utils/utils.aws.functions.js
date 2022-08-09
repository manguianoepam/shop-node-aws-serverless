const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const sns = new AWS.SNS({region: 'us-east-1'});
const topic = process.env.SNS_TOPIC;

const sendEmail = async (product) => {
    console.log(`sendEmail executing`);
    console.log(topic)
    try {
        const params = {
            TopicArn: topic,
            Message: `The product ${product.title} with ID: ${product.id} has been created`
        }

        console.log(`Params SNS: ${params}`);

        await sns.publish(params, (error, data) => {
            if(error) {
                console.log(`Error on sns.publish: ${error}`);
            }
            console.log(`Data: ${JSON.stringify(data)}`);
        });
    } catch (error) {
        console.log(`Error on sendEmail: ${error}`);
    }
};

module.exports = {sendEmail};