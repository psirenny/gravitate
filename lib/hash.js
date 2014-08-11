var crypto = require('crypto');

module.exports = function (email) {
  if (!email) return '';
  if (!~email.indexOf('@')) return email;
  email = email.replace(' ', '').toLowerCase().trim();
  return crypto.createHash('md5').update(email).digest('hex');
};
