var fs = require('fs');


var configName = 'config.json';
var configPath = __dirname + '/' + configName;

function load() {
	return JSON.parse(fs.readFileSync(configPath));
}

module.exports = {
	load: load,
	path: configPath
};
