console.log('Loading triage post function');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

exports.handler = function(event, context, callback) {
    if (event.aid === undefined ||
      event.p1 === undefined ||
      event.p2 === undefined) {
        callback("Invalid input.");
    }

    var params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        'aid' : {N: event.aid}
      }
    };

    // Call DynamoDB to read the item from the table
    ddb.getItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        const response = {
            statusCode: 500
        }
        return response;

      } else {
        if (data.Item == undefined) {
          console.log("Error: report does not exist");
          createReport(event, callback);
        } else {
          console.log("Success", data.Item);
          updateReport(event, callback);
        }
      }
    });
    console.log("End of function");
};

function createReport(event, callback) {
  var params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      'aid' : {N: event.aid},
      'p1' : {S: event.p1},
      'p2' : {S: event.p2}
    }
  };
  // Call DynamoDB to read the item from the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(err);
    } else {
      console.log("Success", data.Item);
      callback(null, "Report created.");
    }
  });
}

function updateReport(event, callback) {
  var params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      'aid' : {N: event.aid}
    },
    UpdateExpression: "set p1 = :one, p2 = :two",
    ExpressionAttributeValues:{
        ":one": {S:event.p1},
        ":two": {S:event.p2}
    },
    ReturnValues:"UPDATED_NEW"
  };

  // Call DynamoDB to add the item to the table
  ddb.updateItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(err);
    } else {
      console.log("Success", data);
      callback(null, "Report updated.");
    }
  });
}
