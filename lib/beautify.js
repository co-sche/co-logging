var colorize = require('ansi-color').set;
var util = require('util');

var LEVEL_COLOR = {
	'FATAL': 'red_bg+black',
	'ERROR': 'red',
	'WARN': 'yellow',
	'INFO': 'blue',
	'DEBUG': 'cyan'
};

require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
}).on('line', function(line) {
	try {
		var log = JSON.parse(line);
	} catch (e) {
		return;
	}

	var date = new Date(log.date);
	var title = util.format(
		'[%s] %s %s (%d:%d)',
		log.levelString,
		date.toString().substr(16, 8),
		log.fileName,
		log.lineNumber,
		log.columnNumber
	);

	var string = colorize(title, LEVEL_COLOR[log.levelString]) + '\n' + log.message;

	console.log(string);
});
