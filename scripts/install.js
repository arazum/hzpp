#! /usr/bin/env node

var fs = require('fs');

var configPath = require('../config').path;
var defaultConfigPath = './defaultConfig.json';

var configData = fs.readFileSync(defaultConfigPath);
fs.writeFileSync(configPath, configData);
