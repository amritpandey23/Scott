const bot = require('./bot');
const auth = require('./modules/auth');

bot.login(auth.getBotToken());
