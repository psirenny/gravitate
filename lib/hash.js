var _ = require('lodash');
var crypto = require('crypto');
var addrs = require('email-addresses');
var util = require('util');

function hash(email) {
  return crypto.createHash('md5').update(email).digest('hex');
}

module.exports = function (email, options) {
  var defaults = {ignorePlus: true};
  options = _.merge({}, defaults, options);
  if (!email) return '';
  if (email.indexOf('@') === -1) return email;
  email = email.replace(' ', '').toLowerCase().trim();
  if (!options.ignorePlus) return hash(email);
  var parsed = addrs.parseOneAddress(email);
  var index = parsed.local.indexOf('+');
  if (index === -1) return hash(email);
  email = parsed.local.substring(0, index) + '@' + parsed.domain;
  return hash(email);
};
