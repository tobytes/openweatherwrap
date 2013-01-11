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
    var urlparameters = openweatherwrap.buildUrlParameters(parameters);
    test.equals('foo=bar&baz=bat', urlparameters);
    test.done();
}
