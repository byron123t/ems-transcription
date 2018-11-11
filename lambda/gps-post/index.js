// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

console.log('Loading gps post function');

exports.handler = async (event) => {
    if (event.aid === undefined || event.latitude === undefined || event.longitude === undefined) {
        const response = {
            statusCode: 400,
            body: JSON.stringify("Invalid input.")
        }
        return response;
    }

    var params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        'aid' : {N: event.aid},
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
          return createAmbulance(event);
        } else {
          console.log("Success", data.Item);
          return updateAmbulance(event);
        }
      }
    });

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

function createAmbulance(event) {
  var params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      'aid' : {N: event.aid},
      'latitude' : {N: event.latitude},
      'longitude' : {N: event.longitude},
    }
  };
  // Call DynamoDB to read the item from the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      const response = {
          statusCode: 500
      }
      return response;
    } else {
      console.log("Success", data.Item);
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify('GPS updated.'),
    };
    return response;
  });
}

function updateAmbulance(event) {
  var params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      'aid' : {N: event.aid},
    },
    UpdateExpression: "set latitude = :lat",
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
      const response = {
          statusCode: 500
      }
      return response;
    } else {
      console.log("Success", data);
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify('GPS updated.'),
    };
    return response;
  });
}
