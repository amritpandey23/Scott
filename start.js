const bot = require('./bot');
const { Auth } = require('./modules');

bot.login(Auth.botToken);
