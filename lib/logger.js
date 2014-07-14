var _ = require('lodash');
var util = require('util');
var fs = require('fs');
var path = require('path');

var rootDir = path.dirname(require.main.filename);

const DEFAULT_LEVEL = 'WARN';
const DEFAULT_STREAM = process.stdout;
const DEFAULT_USE_ABSOLUTE_PATH = false;

var logLevels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];

function Logger(option) {
	this.configure(option);
}

var logger = Logger.prototype;

logger.configure = function(option) {
	var self = this;
	var level = option && option.level || DEFAULT_LEVEL;
	var stream = option && option.stream || DEFAULT_STREAM;

	self.useAbsolutePath = option && option.useAbsolutePath || DEFAULT_USE_ABSOLUTE_PATH;

	var specifiedLevel = logLevels.indexOf(level.toUpperCase());
	if (specifiedLevel == -1) {
		specifiedLevel = logLevels.indexOf(DEFAULT_LEVEL);
	}

	logLevels.forEach(function(levelString, level) {
		self[levelString.toLowerCase()] = level >= specifiedLevel ? function() {
			self.log.call(self, levelString.toUpperCase(), arguments);
		} : _.noop;
	});

	self.stream = typeof stream == 'string' ? fs.createWriteStream(stream, {
		flags: 'a',
		encoding: 'utf8',
		mode: 0666
	}) : stream;
};

logger.log = function(levelString, args) {
	var data = format.call(this, levelString, args);
	this.stream.write(JSON.stringify(data) + '\n');
};

function format(levelString, args) {
	var body = _.toArray(args);
	body.forEach(function(part, i) {
		if (part instanceof Error) {
			body[i] = part.stack || part.message;
		} else if (typeof part == 'object') {
			body[i] = util.inspect(part);
		}
	});

	var originalPST = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error, rawStackTrace) {
		return rawStackTrace;
	};
	var error = {};
	Error.captureStackTrace(error, format);
	var stack = error.stack;
	Error.prepareStackTrace = originalPST;

	var st = stack[2];

	return {
		date: new Date(),
		levelString: levelString,
		message: body.join('\n'),
		typeName: st.getTypeName(),
		functionName: st.getFunctionName(),
		methodName: st.getMethodName(),
		fileName: this.useAbsolutePath ? st.getFileName() : path.relative(rootDir, st.getFileName()),
		lineNumber: st.getLineNumber(),
		columnNumber: st.getColumnNumber()
	};
};

module.exports = Logger;
