var prettyjson = require('prettyjson');

exports.handler = function(event, context, callback) {
    if (event.aid === undefined || event.latitude === undefined || event.longitude === undefined) {
        callback("Invalid input.");
    }
    
    const response = {
      "hospitals": [
        "UnityPoint Health - Meriter Hospital",
        "UW Health University Hospital",
        "St. Mary's Hospital"
      ]
    };

    callback(null, prettyjson.render(response, {
      keysColor: 'rainbow',
      dashColor: 'magenta',
      stringColor: 'white'
    }));
}
