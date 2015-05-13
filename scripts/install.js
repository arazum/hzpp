#! /usr/bin/env node

var fs = require('fs');

var configPath = require('../config').path;
var defaultConfigPath = './defaultConfig.json';

fs.access(configPath, fs.F_OK, function(error) {
	if (error) {
		var configData = fs.readFileSync(defaultConfigPath);
		fs.writeFileSync(configPath, configData);
	}
});
