var hash = require('./hash');
var request = require('request');

exports.data = function (email, options, callback) {
  if (!callback) callback = options;

  var opts = {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'},
    json: true,
    url: exports.url(email, options)
  };

  request.get(opts, function (err, res, body) {
    if (err) return callback(err);
    if (res.statusCode === 404) body = {};
    callback(err, body);
  });
};

exports.url = function (email, options) {
  if (!options) options = {};
  var domain = options.secure ? 'https://secure' : 'http://www';
  domain += '.gravatar.com';
  return domain + '/' + hash(email) + '.json';
};
