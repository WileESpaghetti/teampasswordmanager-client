var async = require('async');
var rc = require('rc');
var request = require('request');

var SimpleApiResource = require('./simple-api-resource');
var PathedApiResource = require('./pathed-api-resource');

/**
 * options = {
 *   concat: true|false whether to request all pages and flatten into a single array
 * }
 */
var PaginatedApiResource = function(config) {
    var _resource;

    _resource = this;

    PathedApiResource.call(_resource, config);

    _resource.count = new SimpleApiResource({
        resource: config.resource + '/count'
    });

    _resource.separateOptions = function(path) {
        var defaultOptions;
        var optionNames;
        var pathKeys;

        defaultOptions = {
            concat: false
        };

        optionNames = Object.keys(defaultOptions);

        optionNames.forEach(function(optName) {
            if (typeof path[optName] !== 'undefined') { // FIXME probably want to test against undefined instead
                defaultOptions[optName] = path[optName];
                delete path[optName];
            }
        });

        pathKeys = Object.keys(path);
        path = pathKeys.reduce(function(pathTmp, key) {
            pathTmp += (key + ':' + path[key]);
            return pathTmp;
        }, '').trim();

        return {
            options: defaultOptions,
            path: path
        };
    };

    _resource.get = function(path, callback) {
        var options;

        if (path instanceof Function) {
            callback = path;
            path = null;
        }

        options = {};
        if (path instanceof Object) {
            options = _resource.separateOptions(path);
            path = options.path;
            options = options.options;
        }

        console.log(path);

        if (!options.concat) {
            path = path ? config.resource + '/' + path : config.resource;
            new SimpleApiResource({
                resource: path
            }).get(callback);
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
                return new SimpleApiResource({
                    resource: config.resource + '/page/' + (index + 1) // FIXME resulting path var is not taken into account in here
                });
            });

            async.concat(pages, function(page, pageCallback) {
                page.get(pageCallback);
            }, callback);
        });
    };

    return _resource;
};

PaginatedApiResource.prototype = new SimpleApiResource();

module.exports = PaginatedApiResource;
