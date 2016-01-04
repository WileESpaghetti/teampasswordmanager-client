var async = require('async');
var rc = require('rc');
var request = require('request');

var SimpleApiResource = require('./simple-api-resource');
var PaginatedApiResource = require('./paginated-api-resource');

var SearchableApiResource = function(config) {
    var _resource;

    _resource = this;

    PaginatedApiResource.call(_resource, config);

    _resource.getPaged = _resource.get;
    _resource.get = function(query, callback) {
        var parsed;
        var options;

        if (query instanceof Function) {
            callback = query;
            query = null;
        }

        if (!query) {
            _resource.getSimple(callback);
            return;
        }

        parsed = _resource.parseQuery(query); // FIXME what about queries in arrays??

        options = parsed.options;
        query = parsed.query; // FIXME may only need options since we added simpleapiresource class

        if (query.id) {
            new SimpleApiResource({
                resource: config.resource + '/' + query.id
            }).get(callback);

            return;
        }

        query.search = query.search || '';
        query.search = Object.keys(query).reduce(function(search, key) {
            if (key !== 'search') {
                search += (' ' + key + ':' + query[key]);
            }

            return search;
        }, query.search).trim();

        if (query.search) {
            var searchResource = config.resource + '/search/' + query.search;
            new PaginatedApiResource({
              resource: searchResource
						}).get(options, callback);
        } else {
        }
    };

    return _resource;
};

SearchableApiResource.prototype = new PaginatedApiResource();

module.exports = SearchableApiResource;
