var SimpleApiResource = require('./simple-api-resource');

var PathedApiResource = function(config) {
    var _resource;

    _resource = this;

    SimpleApiResource.call(_resource, config);

    _resource.getSimple = _resource.get;
    _resource.get = function(path, callback) {
        if (path instanceof Function) {
            callback = path;
            path = null;
        }

        if (!path) {
            _resource.getSimple(callback);
            return;
        }

        if (path instanceof Object) {
            path = Object.toString();
        }

				new SimpleApiResource({
						resource: config.resource + '/' + path
				}).get(callback);
    };

    return _resource;
};

PathedApiResource.prototype = new SimpleApiResource(); // FIXME Object to create style

module.exports = PathedApiResource;
