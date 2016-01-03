var rc = require('rc');

var TeamPasswordManagerConfig = function(config) {
    var defaults;

    config = config || {};
    defaults = {
        apiVersion: 'v4',
        baseUrl:    '',
        auth:       'http',
        user:       '',
        pass:       '',
        debug:      false,
        weakSsl:    false // true allows self signed certs // FIXME rename to allow self signed certs
    };

   Object.keys(defaults).forEach(function(option) {
       config[option] = config[option] || defaults[option];
    });

    config = rc('teampasswordmanager', config);

    return config;
};

module.exports = TeamPasswordManagerConfig;
