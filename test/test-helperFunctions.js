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
    var pattern = '{0}{1}/weather/city/{2}?{3}';
        correctUrl = buildUrl(pattern, '524901', {}),
        urlErrorSyntax = 'http;//www.google.de',
        urlErrorNotJson = 'http://www.google.de';

    openweatherwrap.queryData(correctUrl, function(response) {
        test.ok(response !== undefined); 
    });

    openweatherwrap.queryData(urlErrorSyntax, function(response) {
        test.equals(nconf.get('errors:requestFailed', response.message));
    });

    openweatherwrap.queryData(urlErrorNotJson, function(response) {
        test.equals(nconf.get('errors:notJson', response.message));
    });

    test.done();

}
