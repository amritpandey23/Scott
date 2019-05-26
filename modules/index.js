const config = require('../configurations');

module.exports = {
  Auth: new (require('./Authenticator'))(config.config),
  Utils: require('./utils'),
  JSONCollection: require('./JSONCollection')
};
