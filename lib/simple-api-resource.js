var rc = require('rc');
var request = require('request');

var SimpleApiResource = function(config) {
    var _resource;
    var _apiCall;
    var _config;
    var _resSuffix;

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

    _config = rc('teampasswordmanager', {
        apiVersion: 'v4',
        baseUrl: '', // trailingslashit
        user: '',
        pass: '',
        weakSsl: false // true allows self signed certs // FIXME rename to allow self signed certs
    });

    _config.resourceRoot = normalizeBaseUrl(_config.baseUrl);
    console.log(_config.resourceRoot);

    _apiCall = request.defaults({
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
        _apiCall({
            url: config.resource + _resSuffix
        }, function(err, response, body) {
            if (err) {
                handleRequestError(err);
            }

            if (response.statusCode != 200) {
                //err = handleApiError(err); // FIXME something like this would be nice
                err = body;
            }

            callback(err, body);
        });
    };

    return _resource;
};

module.exports = SimpleApiResource;
