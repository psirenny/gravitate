var _ = require('lodash');
var hash = require('./hash');
var qs = require('qs');

exports.url = function (email, options) {
  if (!options) options = {};
  var domain = options.secure ? 'https://secure' : 'http://www';
  var params = _.omit(options, 'secure');
  domain += '.gravatar.com';
  params = qs.stringify(params);
  params = params ? '?' + params : '';
  return domain + '/avatar/' + hash(email, options) + params;
};
