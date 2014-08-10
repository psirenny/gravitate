var crypto = require('crypto');
var qs = require('qs');
var request = require('request');
var util = require('util');

exports.image = {};
exports.profile = {};

exports.hash = function (email) {
  if (!~email.indexOf('@')) return email;
  email = email.replace(' ', '').toLowerCase();
  return crypto.createHash('md5').update(email).digest('hex');
};

exports.image.url = function (email, options) {
  if (!options) options = {};
  var domain = options.secure ? 'https://secure' : 'http://www';
  domain += '.gravatar.com';
  var params = qs.stringify(options);
  var hash = exports.hash(email);
  return util.format('%s/avatar/%s?%s', domain, hash, params);
};

exports.profile = {};

exports.profile.data = function (email, options, callback) {
  if (!callback) callback = options;

  var opts = {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'},
    json: true,
    url: exports.profile.url(email, options)
  };

  request.get(opts, function (err, res, body) {
    if (err) return callback(err);
    if (res.statusCode === 404) body = {};
    callback(err, body);
  });
};

exports.profile.url = function (email, options) {
  if (!options) options = {};
  var domain = options.secure ? 'https://secure.gravatar.com' : 'http://www.gravatar.com';
  return util.format('%s/%s.json', domain, exports.hash(email));
};
