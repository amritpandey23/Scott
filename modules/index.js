const Authenticator = require('./Authenticator');
const CommandHandler = require('./CommandHandler');
const DMCommandHandler = require('./DMCommandHandler');

module.exports = {
  Auth: new Authenticator(require('../configurations/config.json')),
  CommandHandler,
  DMCommandHandler
};
