const 
  { Client } = require('discord.js'),
  { Config } = require("./config"),
  events = require("./events/events.registry"),
  EventHandler = require('./events/EventHandler');

class Bot {

  constructor(token) {
    this._token = token;
    this._client = new Client();
    this._events = events;
    this.load_events();
  }

  load_events() {
    const eventHandler = new EventHandler(this._client);
    eventHandler.load();
    for (const e of Object.keys(events)) {
      this._client.on(e, (...args) => {
        eventHandler.onEvent(e, ...args);
        eventHandler.logEvent(e);
      });
    }
  }

  start() {
    Utils.createLogFiles();
    this._client.login(Config.getValue("bot_token"));
  }
}

module.exports = Bot;
