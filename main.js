var path = require('path');
var nconf = require('nconf');
var request = require('request');

// config order
nconf.argv().env().file({file: path.join(__dirname,'config.json')});

/**
 * Find weather stations 
 *
 * @param {array} parameters
 * @param {function} callback
 * @return void
 */
exports.findWeatherInStations = function (parameters, callback) {
    var pattern = '{0}{1}/find/station?{2}',
        url = buildUrl(pattern, parameters);

    queryData(url, callback);
}

/**
 * Find weather in cities
 *
 * @param {array} parameters
 * @param {function} callback
 * @return void
 */
exports.findWeatherInCities = function (parameters, callback) {
    var pattern = '{0}{1}/find/city/?{2}',
        url = buildUrl(pattern, parameters);
    queryData(url, callback);
}

/**
 * Find weather in cities
 * by a given name
 *
 * @param {array} parameters
 * @param {function} callback
 * @return void
 */
exports.findWeatherInCitiesByName = function (parameters, callback) {
    var pattern = '{0}{1}/find/name/?{2}',
        url = buildUrl(pattern, parameters);
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
        url = buildUrl(pattern, cityId, parameters);

    queryData(url, callback);
}

/**
 * Queries Forcast for city defined
 * by the city id
 *
 * @param {string} cityId
 * @param {array} parameters
 * @param {function} callback
 * @return void
 */
exports.getForecastByCityId = function (cityId, parameters, callback) {
    var pattern = '{0}{1}/forecast/city/{2}?{3}';
        url = buildUrl(pattern, cityId, parameters);

    queryData(url, callback);
}

/**
 * Queries forecast for city by
 * name
 * 
 * @param {array} parameters
 * @param {function} callback
 * @return void
 */
exports.getForecastByCityName = function (parameters, callback) {
    var pattern = '{0}{1}/forecast/city/?{2}';
        url = buildUrl(pattern, parameters);

    queryData(url, callback);
}


/**
 * Build url from pattern
 * with parameters
 */
var buildUrl = function() {
    var args = arguments,
        pattern = args[0];

    // concats all parameter in an array
    // first: static parameters from config
    // second: dynamic paramters that are not part of the GET-String
    // third: GET-String parameters 
    paramsArray= [
        nconf.get('baseUrl'),
        nconf.get('apiVersion')
    ].concat(
        [].slice.call(args).slice(1, -1).map(encodeURIComponent),
        [buildParameterString(args[args.length - 1])]
    )

    return pattern.format.apply(pattern, paramsArray);
}
exports.buildUrl = buildUrl;

/**
 * Replaces placeholder in pattern 
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
var buildParameterString = function(parameters) {
    return Object.keys(parameters).map(function(key) {
        return [key, parameters[key]].map(encodeURIComponent).join("=");
    }).join("&");
}
exports.buildParameterString = buildParameterString;

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
            try {
                response = JSON.parse(body);
                callback(null, response);
            } catch (e) {
                callback(new Error(nconf.get('errors:notJson')));
            }
        } else {
            callback(new Error(nconf.get('errors:requestFailed')));
        }
    })
}
exports.queryData = queryData;
