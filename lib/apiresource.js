var rc = require('rc');
var request = require('request');

var ApiResource = function(config) {
	var _apiCall;
	var _callQueue;
	var _config;
	var _resSuffix;
	var _resource;

	function normalizeBaseUrl() {
		if (_config.baseUrl.indexOf('/') !== (_config.baseUrl.length - 1)) {
			_config.baseUrl += '/';
		}

		if (_config.baseUrl.indexOf('/index.php/api/') < 0) {
			_config.baseUrl += 'index.php/api/'
		}
	}

	function normalizeResource() {
		if (! config.resource) {
			config.resource = '/';
		}

		if (config.resource.indexOf('/') !== 0) {
			config.resource = '/' + config.resource;
		}
	}

	function onError(err) {
		var error;

		error = {
			error: true
		};

		if (err instanceof Error) {
			// something went wrong with the getaddrinfo
			error.type = 'Not Found';
			error.message = 'Could not get the address of TeamPasswordManager. Check to make sure the config file has a valid URL';
		}

		return error;
	}

	_resource = this;

	_resSuffix = '.json';

	_config = rc('teampasswordmanager', {
		apiVersion: 'v4',
		baseUrl: '', // trailingslashit
		user: '',
		pass: '',
		weakSsl: false // true allows self signed certs
	});

	normalizeBaseUrl();
	normalizeResource();

	if (config.pagination) {
		_resource.count = new ApiResource({
			resource: config.resource + '/count',
			favorites: false,
			archives: false,
			pagination: false,
			search: false
		});
	}

	_apiCall = request.defaults({
		method: 'GET',
		baseUrl: _config.baseUrl + '/' + _config.apiVersion,
		rejectUnauthorized: (!_config.weakSsl),
		headers: {
			'Content-type': 'application/json; charset=utf-8'
		},
		auth: {
			'user': _config.user,
			'pass': _config.pass
		}
	});

	function normalizeQuery(query) {
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
			normalized.any = query;
			// FIXME what about if someone puts in a raw search like query = 'in:someproject access:http://'
			return normalized;
		}

		// yay, we are an object!
		return query;
	}

	/**
	 * separate search options from a raw query
	 * @param query
	 */
	function parseQuery(query) {
		var defaultOptions;
		var options;

		// FIXME query params with a ' '?
		query = normalizeQuery(query); // FIXME if this returns an array, we're hosed ..even through we should be supporting an array returned from here

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
	}

	_resource.get = function(query, callback) {
		var options;
		var parsed;
		var resource;

		if (query instanceof Function) {
			callback = query;
			query = null;
		}

		if (query) {
			parsed = parseQuery(query); // FIXME what about queries in arrays??

			options = parsed.options;
			query = parsed.query;
		}

		resource = config.resource + '/';

		if (query.id) {
			resource += ('/' + query.id);
			_apiCall({
				url: resource + _resSuffix
			}, function(err, response, body) {
				if (err) {
					err = onError(err);
				}

				if (response.statusCode != 200) {
					err = body;
				}

				callback(err, body);
			});
		} else {
			var params = Object.keys(query);
			var search = params.reduce(function(q, param) {
				if (q.length > 0) {
					q += ' ';
				}
				return q + param + ':' + query[param];
			}, '');
			console.log(search);
			resource += ('/search/' + search);
			_apiCall({
				url: resource + _resSuffix
			}, function(err, response, body) {
				if (err) {
					err = onError(err);
				}

				if (response.statusCode != 200) {
					err = body;
				}

				//console.log(response);

				callback(err, body);
			});
		}
	};

	_resource.all = function(callback) {};
	_resource.next = function(callback) {};
	_resource.task = function (err, data) {};

	return _resource;
};

module.exports = ApiResource;

