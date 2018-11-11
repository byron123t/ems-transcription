console.log('Loading gps get function');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

exports.handler = function(event, context, callback) {
    var params = {
      TableName: process.env.TABLE_NAME
    };

    // Call DynamoDB to read the item from the table
    ddb.query(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        callback(err);

      } else {
        if (data.Item == undefined) {
          console.log("Error: ambulance does not exist");
          callback(err);
        } else {
          console.log("Success", data.Item);
          callback(null, data.Item);
        }
      }
    });
    console.log("End of function");
};
