#! /usr/bin/env node

require('./help');

var util = require('util');

var jsdom = require('jsdom');
var moment = require('moment');
var jquery = require('jquery');

var config = require('./config').load();


var urlString = 'http://vred.hzinfra.hr/hzinfo/Default.asp?NKOD1=%s&NKDO1=%s&DT=%s&DV=D&Category=hzinfo&Service=vred3&LANG=hr&SCREEN=2';
var timeSelector = 'body > table:nth-child(2) > tbody > tr > td:nth-child(1) > font > b';

var now = moment();
var date = now.format('DD.MM.YY');

output('\n');

config.lines.forEach(function(line) {
	jsdom.env({
		url: util.format(urlString, line.from, line.to, date),
		done: handler.bind(null, line.label)
	});
});

function handler(label, error, window) {
	if (error !== null) {
		console.error(error);
		return;
	}
	
	output(' [' + label + ']\n');
	
	var $ = jquery(window);
	var index = 0;
	
	$(timeSelector).each(function () {
		var text = $(this).html();
		var time = moment(text, 'HH:mm');
		
		if (now.isBefore(time) && index < config.limit) {
			output('  ' + text);
			index++;
		}
	});
	
	output('\n\n');
}

function output() {
	process.stdout.write(util.format.apply(this, arguments));
}
