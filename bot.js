require('colors');

const { Client } = require('discord.js');
const events = require('./configurations/events');
const EventHandler = require('./events/EventHandler');

const bot = new Client();

const eventHandler = new EventHandler(bot);
eventHandler.load();
for (event of Object.keys(events)) {
  eventHandler.onEvent(event);
}

module.exports = bot;
