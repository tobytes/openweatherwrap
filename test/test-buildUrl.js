var path = require('path');
var nconf = require('nconf');
var openweatherwrap = require('../main.js');

// configure config order
nconf.argv().env().file({
    file: path.join(__dirname,'../config.json')
});

exports['buildUrl'] = function (test) {
    var url = openweatherwrap.buildUrl('foo/bar/', {'baz':'bat'});
    //test.equal(url, nconf.get('baseUrl') + 'foo/bar/?baz=bat');
    test.equals(nconf.get('baseUrl'), 'http://www.openweathermap.org/data/', __dirname);
    test.done();
}

