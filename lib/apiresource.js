var async = require('async');
var rc = require('rc');
var request = require('request');

var PaginatedApiResource = require('./paginated-api-resource');
var SearchableApiResource = require('./searchable-api-resource');
var SimpleApiResource = require('./simple-api-resource');

/**
 * Factory for getting an API resource
 *
 * @param config
 * @returns {*}
 * @constructor
 */
var ApiResource = function(config) {
	var _resource;

	config = config || {};

	if (config.searchable) {
		_resource = new SearchableApiResource(config);
	} else if (config.paginated) {
		_resource = new PaginatedApiResource(config);
	} else {
		_resource = new SimpleApiResource(config);
	}

	return _resource;
};

module.exports = ApiResource;
