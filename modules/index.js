const Authenticator = require('./Authenticator');

module.exports = {
  Auth: new Authenticator(require('../configurations/config.json'))
};
