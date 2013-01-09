var request = require('request');
var url = 'http://openweathermap.org/data/2.1/weather/city/2935022?type=json';
var responseJson = "";


exports.getCity = function(callback) {
    requestData(callback);
}

function requestData(callback) {
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            callback(JSON.parse(body));
        }
    })
}
