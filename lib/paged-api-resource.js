var rc = require('rc');
var request = require('request');

var SimpleApiResource = require('./simple-api-resource');

var PagedApiResource = function(config) {
    var _resource;

    _resource = this;
    SimpleApiResource.call(_resource, config);

    _resource.count = new SimpleApiResource({
        resource: config.resource + '/count'
    });

    return _resource;
};

PagedApiResource.prototype = new SimpleApiResource();

module.exports = PagedApiResource;
