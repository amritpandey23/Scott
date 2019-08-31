const
  { ACCESS_LEVELS } = require("../config/settings");

class BaseCommand {
  constructor(client, message) {
    this.accessLevel = ACCESS_LEVELS.all;
    this.accessChannel = ["server"];
    this.client = client;
    this.message = message;
    this.args = message
      .slice(config.client.botPrefix.length)
      .trim()
      .split(/ +/g);
  }

  help() {
    return this.message.channel.send("Help is on its way.");
  }

  async run() {

  }

}

module.exports = BaseCommand;
