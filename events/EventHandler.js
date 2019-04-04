const events = require('../configurations/events');
const fs = require('fs');

class EventHandler {
  constructor(client) {
    this.client = client;
    this._cache = {};
  }

  async load() {
    for (const [eventName, eventFiles] of Object.entries(events)) {
      this._cache[eventName] = {};
      for (const eventFile of eventFiles) {
        const event = require(`./${eventName}/${eventFile}.js`);
        this._cache[eventName][eventFile] = new event(this.client);
      }
    }
  }

  logEvent(eventName) {
    fs.appendFile(
      './logs/event-activity.txt',
      `EVENT: ${eventName}, ON: ${new Date().toString()}\n`,
      (err) => {
        if (err) throw err;
      }
    );
  }

  async onEvent(eventName, ...args) {
    if (!this._cache[eventName])
      return process.stdout.write(`No event created for ${eventName}\n`.red);

    for (const eventFile of Object.keys(this._cache[eventName])) {
      this._cache[eventName][eventFile].handle(...args);
    }
  }
}

module.exports = EventHandler;
