var _ = require('lodash')
  , crypto = require('crypto')
  , qs = require('qs')
  , request = require('request')
  , sprintf = require('sprintf-js').sprintf;

exports.hash = function (email) {
  if (!~email.indexOf('@')) return email;
  email = email.replace(' ', '').toLowerCase();
  return crypto.createHash('md5').update(email).digest('hex');
};

exports.image = {
  url: function (email, options) {
    var domain = options.secure ? 'https://secure.gravatar.com' : 'http://www.gravatar.com';
    var params = qs.stringify(_.reject(options, 'secure'));
    return sprintf('%s/avatar/%s?%s', domain, exports.hash(email), params);
  }
};

exports.profile = {
  data: function (email, options, callback) {
    if (!callback) callback = options;

    var opts = {
      headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'},
      json: true,
      url: this.url(email, options)
    };

    request.get(opts, function (err, res, body) {
      if (res.statusCode !== 200) return callback(res.statusCode);
      callback(err, body);
    });
  },
  url: function (email, options) {
    var domain = options.secure ? 'https://secure.gravatar.com' : 'http://www.gravatar.com';
    return sprintf('%s/%s.json', domain, exports.hash(email));
  }
};