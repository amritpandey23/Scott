require('colors');

const { Client } = require('discord.js');
const { events } = require('./configurations');
const EventHandler = require('./events/EventHandler');

const bot = new Client();

/**
 * event handler class is specifically made to handle commands
 * i.e. run them, load them in cache etc. If you wish to add
 * a command managing functionality checkout EventHandler file.
 */
const eventHandler = new EventHandler(bot);
// initialise and load all the available command in a cache store
eventHandler.load();
for (const e of Object.keys(events)) {
  bot.on(e, (...args) => {
    eventHandler.onEvent(e, ...args);
    eventHandler.logEvent(e);
  });
}

module.exports = bot;
