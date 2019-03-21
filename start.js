const config = require('./config.json');
const bot = require('./bot');

bot.login(config['botToken']);
