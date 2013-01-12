var path = require('path');
var nconf = require('nconf');
var openweatherwrap = require('../main.js');

// configure config order
nconf.argv().env().file({
    file: path.join(__dirname,'../config.json')
});

// test url building
exports['buildUrlParameters'] = function (test) {
    var parameters = {'foo':'bar', 'baz':'bat'};
    var urlparameters = openweatherwrap.buildParameterString(parameters);
    test.equals('foo=bar&baz=bat', urlparameters);
    test.done();
}

exports['queryData'] = function (test) {
    var correctUrl = 'http://openweathermap.org/data/2.1/weather/city/524901'; 
    var wrongUrl = 'http://openweathermap.org/data/2.1/wther/city/524901'; 

    openweatherwrap.queryData(correctUrl, function(response) {
        test.ok(response !== undefined); 
    });

    test.throws(
        function() {
            openweatherwrap.queryData(wrongUrl)
        },
        Error
    );
    test.done();

}
