const Authenticator = require('./Authenticator');
const CommandHandler = require('./CommandHandler');

module.exports = {
  Auth: new Authenticator(require('../configurations/config.json')),
  CommandHandler
};
