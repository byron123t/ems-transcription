console.log('Loading triage post function');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
// Create the DynamoDB service object
ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    var params = {
      TableName: process.env.TABLE_NAME,
      IndexName: 'query-index',
      KeyConditionExpression: "#query = :query",
      ExpressionAttributeNames:{
          "#query": "query"
      },
      ExpressionAttributeValues: {
          ":query": 1
      }
    };

    // Call DynamoDB to read the item from the table
    ddb.query(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        callback(err);
      } else {
        console.log("Success", data);
        var response = { "patients": {} };
        data.Items.forEach(function(element, index, array) {
          response.patients[element.aid] = element;
        });
        callback(null, response);
      }
    });
    console.log("End of function");
};
