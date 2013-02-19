var path = require('path');
var nconf = require('nconf');
var openweatherwrap = require('../main.js');

// configure config order
nconf.argv().env().file({
    file: path.join(__dirname,'../config.json')
});


exports['findWeatherInStationsByCoords'] = function (test) {
    openweatherwrap.findWeatherInStations({'lat':55, 'lon':73, 'cnt':10}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['findWeatherInStationsByBoundingBox'] = function (test) {
    openweatherwrap.findWeatherInStations({'bbox':'12, 32, 15, 37, 10', 'cluster':'yes', 'lang':'en'}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['findWeatherInStationsByBoundingRadius'] = function (test) {
    openweatherwrap.findWeatherInStations({'lat':55, 'lon':73, 'radius':10, 'cluster':'no', 'lang':'de'}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['findWeatherInCitiesByCoords'] = function (test) {
    openweatherwrap.findWeatherInCities({'lat':55, 'lon':73, 'cnt':10}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['findWeatherInCitiesByBoundingBox'] = function (test) {
    openweatherwrap.findWeatherInCities({'bbox':'12, 32, 15, 37, 10', 'cluster':'yes', 'lang':'en'}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['findWeatherInCitiesByBoundingRadius'] = function (test) {
    openweatherwrap.findWeatherInCities({'lat':55, 'lon':73, 'radius':10, 'cluster':'no', 'lang':'de'}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['findWeatherInCitiesByName'] = function (test) {
    openweatherwrap.findWeatherInCitiesByName({'q':'london', 'units':'imperial'}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['findWeatherInCitiesByFuzzyName'] = function (test) {
    openweatherwrap.findWeatherInCitiesByName({'q':'Maloyarolslav', 'type':'like', 'units':'metric'}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['findWeatherInCitiesByNameAndCountryCode'] = function (test) {
    openweatherwrap.findWeatherInCitiesByName({'q':'london,Uk'}, function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['getCurrentWeatherByCityId'] = function (test) {
    openweatherwrap.getCurrentWeatherByCityId('2935022', {'lan':'de'},  function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['getForecastByCityId'] = function (test) {
    openweatherwrap.getForecastByCityId('2935022', {'lan':'de'},  function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}

exports['getForecastByCityName'] = function (test) {
    openweatherwrap.getForecastByCityName({'1':'london', 'mode':'daily_compact'},  function(error, response) {
        test.ok((response !== false));
        test.done();
    });
}
