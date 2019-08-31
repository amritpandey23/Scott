const { Client } = require('discord.js');
const { Auth, Utils } = require('./modules');
const events = require("./events/events.registry");
const EventHandler = require('./events/EventHandler');

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
    this._client.login(Auth.botToken);
  }
}

module.exports = Bot;