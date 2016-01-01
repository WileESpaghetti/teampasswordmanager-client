var rc = require('rc');
var SimpleApiResource = require('./lib/simple-api-resource');
var PagedApiResource = require('./lib/paged-api-resource');
var ApiResource = require('./lib/apiresource');

// FIXME need to be able to pass in config params
var TeamPasswordManager = function() {
	var _tpm;
	var _resources;

	_tpm = this;

	_resources = {
		version: new ApiResource({
			resource: 'version',
			pagination: false,
			archives: false,
			favorites: false,
			search: false
		}),
		version: new ApiResource({
			resource: 'generate_password',
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
		}),
		users: new ApiResource(),
		groups: new ApiResource(),
		generate: new ApiResource(),
		myPasswords: new ApiResource(),
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
//new TeamPasswordManager().passwords({ search: 'www',
//	concat: true
//}, function(err, body) {
	//console.log(err);
	//console.log(response);
	//console.log(body.length);
	//console.log(body);
//});

var version = new PagedApiResource({
	resource: 'passwords'
}).count.get(function(err, passwords) {
	console.log(typeof passwords);
    console.log(passwords);
});
