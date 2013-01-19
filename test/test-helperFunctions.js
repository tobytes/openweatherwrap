var path = require('path');
var nconf = require('nconf');
var openweatherwrap = require('../main.js');

// configure config order
nconf.argv().env().file({
    file: path.join(__dirname,'../config.json')
});


/**
 * tests the building of a
 * url-parameter string
 */
exports['buildUrlParameters'] = function (test) {
    var parameters = {'foo':'bar', 'baz':'bat'};
    var urlparameters = openweatherwrap.buildParameterString(parameters);
    test.equals('foo=bar&baz=bat', urlparameters);
    test.done();
}

/**
 * tests the query function and its
 * error handling
 */
exports['queryData'] = function (test) {
    var pattern = '{0}{1}/weather/city/{2}?{3}',
        correctUrl = openweatherwrap.buildUrl(pattern, '524901', {'lang':'de'}),
        urlErrorSyntax = 'http;//www.google.de',
        urlErrorNotJson = 'http://www.google.de';

    // test correct url
    openweatherwrap.queryData(correctUrl, function(response) {
        test.ok(response !== undefined); 
    });

    // test syntax error
    openweatherwrap.queryData(urlErrorSyntax, function(response) {
        test.equals(nconf.get('errors:requestFailed'), response.message);
    });

    // test response that is not json
    openweatherwrap.queryData(urlErrorNotJson, function(response) {
        test.equals(nconf.get('errors:notJson'), response.message);
    });

    test.done();
}
