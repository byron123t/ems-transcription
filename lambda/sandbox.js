// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var params = {
  TableName: "triage-trio-location"
};

// Call DynamoDB to read the item from the table
// ddb.query(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     if (data.Item == undefined) {
//       console.log("Error: ambulance does not exist");
//     } else {
//       console.log("Success", data.Item);
//     }
//   }
// });

var count = 0;

ddb.scan(params, function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Scan succeeded.");
        data.Items.forEach(function(itemdata) {
           console.log("Item :", ++count,JSON.stringify(itemdata));
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
});
