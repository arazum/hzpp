var fs = require('fs');


var configPath = __dirname + '/' + 'config.json';

function load() {
	return JSON.parse(fs.readFileSync(configPath));
}

module.exports = {
	load: load,
	path: configPath
};
