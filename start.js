require('colors');
const bot = require('./bot');
const { Auth, Utils } = require('./modules');

Utils.checkLogFiles();
bot.login(Auth.botToken);
