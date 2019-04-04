const commandRegistry = require('../../configurations/commands');
const fs = require('fs');
const path = require('path');

class DMCommandHandler {
  constructor(client) {
    this.client = client;
    this.msg = {};
    this.args = [];
    this.name = '';
    this.author = {};
  }

  isEnabled() {
    const command = this.validate();
    return command && command.isEnabled;
  }

  sendManual() {
    fs.readdir(path.join(__dirname, '../commands/manuals'), (err, manuals) => {
      if (err) return console.error(err);
      if (manuals.indexOf(`${this.name}.txt`) !== -1) {
        fs.readFile(
          path.join(__dirname, '../../commands/manuals', `${this.name}.txt`),
          { encoding: 'utf8' },
          (err, data) => {
            if (err) return console.error(err);
            return this.author.send(data);
          }
        );
      }
    });
    return '';
  }

  validate() {
    return commandRegistry.gen[this.name];
  }

  run() {
    const commandToRun = this.validate();
    if (!commandToRun) return;
    if (!this.args || this.args.length < 1) {
      this.msg.reply(
        'I cannot run empty commands. To read command manual, send `!help <command-name>`.'
      );
      return this.sendManual();
    }
    return require(`../../commands/${this.name}.js`).run(
      this.client,
      this.msg,
      this.args
    );
  }

  handle(message) {
    if (message.channel.type !== 'dm') return;
    this.msg = message;
    this.args = message.content
      .slice(
        require('../../configurations/config.json').client.botPrefix.length
      )
      .trim()
      .split(/ +/g);
    this.name = this.args.shift().toLowerCase();
    this.author = message.author;

    this.run();
  }
}

module.exports = DMCommandHandler;
