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
    var url = exports.buildUrl('find/station/', parameters);
    console.log(url);
    queryData(url, callback);
}

/**
 * Queries current weather in a city defined
 * by the id
 *
 * @param {array} parameters
 * @param {function} callback
 * @return void
 */
exports.getCurrentWeatherByCityId = function (parameters, callback) {
    var url = exports.buildUrl('weather/city/', parameters);
    console.log(url);
    queryData(url, callback);
}

/**
 * Concatenates baseUrl, path and parameters to an url
 *
 * @param {string} path for the request
 * @param {array} parameters for the request 
 * @return {string} the concatenated url string
 */
exports.buildUrl =  function (path, parameters) {
    return nconf.get('baseUrl') + nconf.get('apiVersion') + '/' + path + '?' + encodeParameters(parameters);
}

/**
 * Encodes and concatenates the given parameters  
 *
 * @param {array} parameters for the request
 * @return {string} concatenated and encoded parameters 
 */
function encodeParameters(parameters) {
    return Object.keys(parameters).map(function(key) {
        if (!isNaN(parseInt(key))) {
            return encodeURIComponent(parameters[key]) + '/';
        } else {
            return [key, parameters[key]].map(encodeURIComponent).join("=");
        }
    }).join("&");
}

/**
 * Queries the given url and return
 * the response to callback if successful
 * 
 * @param {string} url 
 * @param {function} callback 
 * @return void
 */
function queryData(url, callback) {
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            callback(JSON.parse(body));
        }
    })
}
