var async = require('async');
var rc = require('rc');
var request = require('request');

var SimpleApiResource = require('./simple-api-resource');

var PaginatedApiResource = function(config) {
    //console.log(config);
    var _resource;

    config = config || {};
    config.resource = config.resource || '';

    _resource = this;
    _resource.normalizeQuery = function(query) {
        var normalized;

        normalized = {};

        if (Array.isArray(query)) {
            // FIXME should probably flatten array too
            return query.map(normailzeQuery);
        }

        if (/^[0-9]+$/.test(query)) {
            normalized.id = query;
            return normalized;
        }

        if (typeof query === 'string' || query instanceof String) {
            normalized.search = query;
            // FIXME what about if someone puts in a raw search like query = 'in:someproject access:http://'
            return normalized;
        }

        // yay, we are an object!
        return query;
    };

    /**
     * separate search options from a raw query
     * @param query
     */
    _resource.parseQuery = function(query) {
        // FIXME this may only need to be in searchableapiresources and have pagedapiresource accept options only
        var defaultOptions;
        var options;

        // FIXME query params with a ' '?
        query = _resource.normalizeQuery(query); // FIXME if this returns an array, we're hosed ..even through we should be supporting an array returned from here

        defaultOptions = {
            concat: false,
        };

        options = Object.keys(defaultOptions);

        options.forEach(function(optName) {
            if (query[optName]) {
                defaultOptions[optName] = query[optName];
                delete query[optName];
            }
        });

        return {
            options: defaultOptions,
            query: query
        }
    };

    SimpleApiResource.call(_resource, config);

    _resource.count = new SimpleApiResource({
        resource: config.resource + '/count'
    });

    _resource.getSimple = _resource.get;
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

        if (!options.concat) {
            _resource.getSimple(callback);
            return;
        }

        _resource.count.get(function(err, count) {
            var pages;

            if (err) {
                // FIXME is this what you really want?
                callback(err, null);
                return;
            }

            pages = Array.apply(null, Array(count.num_pages)).map(function(current, index) {
                //console.log(config.resource + '/page/' + (index+1));
                return new SimpleApiResource({
                    resource: config.resource + '/page/' + (index + 1)
                });
            });
            //console.log(pages);

            async.concat(pages, function(page, pageCallback) {
                page.get(pageCallback);
            }, callback);
        });

    };

    return _resource;
};

PaginatedApiResource.prototype = new SimpleApiResource();

module.exports = PaginatedApiResource;
