exports.handler = function(event, context, callback) {
    const response = {
      "hospitals": [
        "UnityPoint Health - Meriter Hospital",
        "UW Health University Hospital",
        "St. Mary's Hospital"
      ]
    };

    callback(null, response);
}
