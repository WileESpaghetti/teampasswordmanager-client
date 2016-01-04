var rc = require('rc');
var request = require('request');
var tpmConfig = require('./config');

var SimpleApiResource = function(config) {
    var _resource;
    var _apiCall;
    var _config;
    var _resSuffix;
    console.log(config)

    function handleRequestError(err) {}
    function handleApiError(err) {}
    function normalizeBaseUrl(baseUrl) {
        var resourceRoot;

        // add trailing '/' if needed
        if (baseUrl.indexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }

        // check for resource root
        resourceRoot = 'index.php/api/' + _config.apiVersion + '/';
        if (baseUrl.indexOf(resourceRoot) === -1) {
            baseUrl += resourceRoot;
        }

        return baseUrl;
    }

    _resource = this;
    _resSuffix = '.json';

    _config = tpmConfig();

    _config.resourceRoot = normalizeBaseUrl(_config.baseUrl);

    _resource._apiCall = request.defaults({
        method: 'GET',
        json: true,
        baseUrl: _config.resourceRoot,
        rejectUnauthorized: (!_config.weakSsl),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        auth: {
            'user': _config.user,
            'pass': _config.pass
        }
    });

    _resource.get = function(callback) {
        var resource = encodeURIComponent(config.resource).replace(/%2F/g, '/'); // something funky going on with the way '/' is handled
        _resource._apiCall({
            url: resource + _resSuffix
        }, function(err, response, body) {
            if (err) {
                err = handleRequestError(err);
                body = null;
                callback(err, body);
                return;
            }

            // FIXME if URL is invalid then response does not get set
            if (response.statusCode != 200) {
                //err = handleApiError(err); // FIXME something like this would be nice
                err = body;
                body = null;
            }

            if (callback instanceof Function) {
                callback(err, body);
            }
        });
    };

    return _resource;
};

module.exports = SimpleApiResource;
