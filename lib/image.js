var except = require('except');
var hash = require('./hash');
var qs = require('qs');

exports.url = function (email, options) {
  if (!options) options = {};
  var domain = options.secure ? 'https://secure' : 'http://www';
  var params = except(options, 'secure');
  domain += '.gravatar.com';
  params = qs.stringify(params);
  params = params ? '?' + params : '';
  return domain + '/avatar/' + hash(email) + params;
};
