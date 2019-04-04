require('colors');

const { Client } = require('discord.js');
const events = require('./configurations/events');
const EventHandler = require('./events/EventHandler');

const bot = new Client();

const eventHandler = new EventHandler(bot);
eventHandler.load();
for (const e of Object.keys(events)) {
  bot.on(e, (...args) => {
    eventHandler.onEvent(e, ...args);
    eventHandler.logEvent(e);
  });
}

module.exports = bot;
