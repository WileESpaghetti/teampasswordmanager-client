var rc = require('rc');
var SimpleApiResource = require('./lib/simple-api-resource');
var PaginatedApiResource = require('./lib/paginated-api-resource');
var SearchableApiResource = require('./lib/searchable-api-resource');
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
		users: new ApiResource(),
		groups: new ApiResource(),
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
new TeamPasswordManager().version(function(err, version) {
	console.log(err);
	console.log(version);
});
//new TeamPasswordManager().passwords({ search: 'www',
//	concat: true
//}, function(err, body) {
	//console.log(err);
	//console.log(response);
	//console.log(body.length);
	//console.log(body);
//});

//var version = new SearchableApiResource({
//	resource: 'passwords',
//}).get(/*{
//	concat: true,
//	access: 'www',
//},*/ function(err, passwords) {
//	console.log(typeof passwords);
//    console.log(passwords);
//    //console.log(err);
//});
