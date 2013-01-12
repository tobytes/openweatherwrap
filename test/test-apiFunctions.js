var path = require('path');
var nconf = require('nconf');
var openweatherwrap = require('../main.js');

// configure config order
nconf.argv().env().file({
    file: path.join(__dirname,'../config.json')
});


