var rc = require('rc');

var TeamPasswordManager = function() {
	var _config;

	_config = rc('teampasswordmanager', {
		apiVersion: 'v4',
		baseUrl: '', // trailingslashit
		user: '',
		pass: '',
		weakSsl: false // true allows self signed certs
	});
};

module.exports = TeamPasswordManager;