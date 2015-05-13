#! /usr/bin/env node

require('./help');

var util = require('util');

var jsdom = require('jsdom');
var moment = require('moment');
var jquery = require('jquery');
var merge = require('merge');

var config = require('./config').load();


var urlString = 'http://vred.hzinfra.hr/hzinfo/Default.asp?NKOD1=%s&NKDO1=%s&DT=%s&DV=D&Category=hzinfo&Service=vred3&LANG=hr&SCREEN=2';

var rowSelector = 'body > table:nth-child(2) > tbody > tr';
var departureSelector = 'td:nth-child(1) > font > b';
var arrivalSelector = 'td:nth-child(3) > font > table > tbody > tr > td:nth-child(1)';

var now = moment();
var date = now.format('DD.MM.YY');

output('\n');

config.lines.forEach(function(line) {
	line = merge.recursive(true, config.defaults, line);
	
	jsdom.env({
		url: util.format(urlString, line.from, line.to, date),
		done: handler.bind(null, line)
	});
});

function handler(line, error, window) {
	if (error !== null) {
		console.error(error);
		return;
	}
	
	output(' [' + line.label + ']\n');
	
	var $ = jquery(window);
	var index = 0;
	
	$(rowSelector).each(function () {		
		var text = $(departureSelector, this).html();
		var time = moment(text, 'HH:mm');
		
		if (now.isBefore(time) && index < line.limit) {
			if (line.showArrival) {
				text += ' (' + $(arrivalSelector, this).html() + ')';
			}
			
			output('  ' + text);
			index++;
		}
	});
	
	output('\n\n');
}

function output() {
	process.stdout.write(util.format.apply(this, arguments));
}
