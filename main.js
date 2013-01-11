var path = require('path');
var nconf = require('nconf');
var request = require('request');

// config order
nconf.argv().env().file({file: path.join(__dirname,'config.json')});

/**
 * Find weather stations near a point 
 *
 * @param {array} parameters
 * @param {function} callback
 * @return void
 */
exports.findStationsNearPoint = function (parameters, callback) {
    var pattern = '{0}{1}/find/station?{2}';
    var url = pattern.format(
        nconf.get('baseUrl'), 
        nconf.get('apiVersion'), 
        buildUrlParameters(parameters));

    queryData(url, callback);
}

/**
 * Queries current weather in a city defined
 * by the id
 *
 * @param {string} cityId
 * @param {array} parameters
 * @param {function} callback
 * @return void
 */
exports.getCurrentWeatherByCityId = function (cityId, parameters, callback) {
    var pattern = '{0}{1}/weather/city/{2}?{3}';
    var url = pattern.format(
        nconf.get('baseUrl'), 
        nconf.get('apiVersion'), 
        encodeURIComponent(cityId), 
        buildUrlParameters(parameters));

    queryData(url, callback);
}

/**
 * Replaces placeholder in an string
 * with given arguments
 */
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

/**
 * Encodes and concatenates array
 * to a GET-String
 *
 * @param {array} parameters for the request
 * @return {string} GET-String  
 */
var buildUrlParameters = function(parameters) {
    return Object.keys(parameters).map(function(key) {
        return [key, parameters[key]].map(encodeURIComponent).join("=");
    }).join("&");
}
exports.buildUrlParameters = buildUrlParameters;

/**
 * Queries the given url and return
 * the response to callback if successful
 * 
 * @param {string} url 
 * @param {function} callback 
 * @return void
 */
var queryData = function queryData(url, callback) {
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            if (typeof(callback) == 'function') {
                callback(JSON.parse(body));
            }
        } else {
            throw new Error('Request nicht erfolgreich');
            //console.log(error);
        }
    })
}
exports.queryData = queryData;
