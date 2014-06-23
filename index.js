module.exports = {
	Logger: require('./lib/logger')
};

if (require.main === module) {
	var beautify = require('./lib/beautify');
}
