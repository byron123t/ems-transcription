console.log('Loading gps post function');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

exports.handler = function(event, context, callback) {
    if (event.aid === undefined ||
      event.hospital === undefined ||
      event.latitude === undefined ||
      event.longitude === undefined) {
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
          console.log("Error: viewer does not exist");
          createAmbulance(event, callback);
        } else {
          console.log("Success", data.Item);
          updateAmbulance(event, callback);
        }
      }
    });
    console.log("End of function");
};

function createAmbulance(event, callback) {
  var params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      'aid' : {N: event.aid},
      'hospital' : {N: event.hospital},
      'latitude' : {N: event.latitude},
      'longitude' : {N: event.longitude},
    }
  };
  // Call DynamoDB to read the item from the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(err);
    } else {
      console.log("Success", data.Item);
      callback(null, "GPS updated.");
    }
  });
}

function updateAmbulance(event, callback) {
  var params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      'aid' : {N: event.aid}
    },
    UpdateExpression: "set latitude = :lat, longitude = :long",
    ExpressionAttributeValues:{
        ":lat": {"N":event.latitude},
        ":long": {"N":event.longitude}
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
      callback(null, "GPS updated.");
    }
  });
}
