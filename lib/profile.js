var hash = require('./hash');
var request = require('superagent');

exports.data = function (email, options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  request
    .get(exports.url(email, options))
    .set('User-Agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13')
    .end(function (err, res) {
      var body = res.status === 404 ? {} : res.body;
      callback(err, body);
    });
};

exports.url = function (email, options) {
  if (!options) options = {};
  if (!email) return '';
  var domain = options.secure ? 'https://secure' : 'http://www';
  domain += '.gravatar.com';
  return domain + '/' + hash(email, options) + '.json';
};
