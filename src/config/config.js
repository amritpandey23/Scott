const
  fs = require("fs"),
  { logger } = require("../utils"),
  settings = require("./settings");

class ConfigManager {

  constructor() {
    let credentials;
    try {
      credentials = require("./credentials.json");
    } catch (err) {
      credentials = undefined;
      this.fileMissing();
    }
    this.credentials = credentials;
  }

  fileMissing() {
    return logger.warn([
      "It looks like you do not have a credentials file.",
      "You need to run setup before running the bot.",
      "Use `npm run setup` to store credentials. Thank you."
    ].join('\n'));
  }

  getValue(name) {
    if (!this.credentials) {
      return null;
    }
    let [field, prop] = name.split('_');
    return this.credentials[field][prop];
  }

  setValue(name, value) {
    if (!this.credentials) {
      return false;
    }
    let [field, prop] = name.split('_');
    this.credentials[field][prop] = value;
    fs.writeFile(settings.PATHS.CREDENTIALS,
      JSON.stringify(this.credentials),
      (err) => {
        if (err)
          return logger.error(err);
      });
  }

}

module.exports = new ConfigManager();
