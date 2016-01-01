var rc = require('rc');
var ApiResource = require('./lib/apiresource');

// FIXME need to be able to pass in config params
var TeamPasswordManager = function() {
	var _tpm;
	var _resources;

	_tpm = this;

	_resources = {
		version: new ApiResource({
			resource: '/version',
			pagination: false,
			archives: false,
			favorites: false,
			search: false
		}),
		projects: new ApiResource({
			resource: '/projects',
			pagination: true,
			archives: true,
			favorites: true,
			search: true
		}),
		passwords: new ApiResource({
			resource: '/passwords',
			pagination: true,
			archives: true,
			favorites: true,
			search: true
		})
	};

	_tpm.version = function(callback) {
		_resources.version.get(callback);
	};

	_tpm.projects = function(query, callback) {
		_resources.projects.get(callback);
	};

	_tpm.passwords = function(query, callback) {
		_resources.passwords.get(query, callback);
	};

	return _tpm;
};

module.exports = TeamPasswordManager;
//new TeamPasswordManager().version(function(err, response, body) {
//	console.log(err);
//	console.log(body);
//});
new TeamPasswordManager().passwords({ search: 'www',
	concat: true
}, function(err, body) {
	//console.log(err);
	//console.log(response);
	console.log(body.length);
	//console.log(body);
});
