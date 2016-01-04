var rc = require('rc');

var tpmConfig = require('./lib/config');
var ApiResource = require('./lib/apiresource');

// FIXME need to be able to pass in config params
var TeamPasswordManager = function(config) {
	var _tpm;

	_tpm = this;

	_tpm.resources = {
		version: new ApiResource({
			resource: 'version',
			pagination: false,
			archives: false,
			favorites: false,
			searchable: false
		}),
		generate: new ApiResource({
			resource: 'generate_password',
			pagination: false,
			archives: false,
			favorites: false,
			searchable: false
		}),
		projects: new ApiResource({
			resource: '/projects',
			pagination: true,
			archives: true,
			favorites: true,
			searchable: true
		}),
		passwords: new ApiResource({
			resource: '/passwords',
			pagination: true,
			archives: true, // is:archived
			favorites: true, // is:favorites
			searchable: true
		}),
		//users: new ApiResource(),
		//groups: new ApiResource()
		//myPasswords: new ApiResource()
	};

	_tpm.version = function(callback) {
		_tpm.resources.version.get(callback);
	};

	_tpm.generate = function(callback) {
		_tpm.resources.generate.get(callback);
	};

	_tpm.projects = function(query, callback) {
		_tpm.resources.projects.get(query, callback);
	};

	_tpm.passwords = function(query, callback) {
		_tpm.resources.passwords.get(query, callback);
	};

	return _tpm;
};

module.exports = TeamPasswordManager;
new TeamPasswordManager().passwords({access: 'http://www'}, function(err, version) {
	console.log(err);
	console.log(version);
});
