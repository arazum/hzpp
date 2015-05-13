var package = require('./package');
var configPath = require('./config').path;


var name = package.name;
var helpString =
	'Usage: ' + name + '\nShow HŽ train schedule.\n' +
	'Configuration file path: ' + configPath;

if (process.argv.length > 2) {
	console.log(helpString);
	process.exit(0);
}
