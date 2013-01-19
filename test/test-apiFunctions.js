var path = require('path');
var nconf = require('nconf');
var openweatherwrap = require('../main.js');

// configure config order
nconf.argv().env().file({
    file: path.join(__dirname,'../config.json')
});


exports['findStationNearPoint'] = function (test) {
    openweatherwrap.findStationsNearPoint({'lat':55, 'lon':73, 'cnt':10}, function(error, response) {
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
