'use strict';
const AWS = require('aws-sdk'); 
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.deleteFile = (event, context, callback) => {
  console.log('file deleted');
  console.log(event.Records);
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const eventType = record.eventName
    const eventTime = record.eventTime

    const params = {
      TableName: 'minidropbox',
      Item: {
        id: uuid.v1(),
        fileName: filename,
        eventType: eventType,
        eventTime: eventTime
      }
    }

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("record inserted")
    })

});
};
