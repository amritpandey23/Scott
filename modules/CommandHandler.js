const commandList = require('../configurations/commands');
const fs = require('fs');
const path = require('path');

class CommandHandler {
  constructor(client, msg) {
    this.msg = msg;
    this.client = client;
    this.args = this.msg.content
      .slice(require('../configurations/config.json').client.botPrefix.length)
      .trim()
      .split(/ +/g);
    this.name = this.args.shift().toLowerCase();
    this.author = this.msg.guild.members.find(
      (mem) => mem.id === msg.author.id
    );
  }
  isEnabled() {
    const command = this.validate();
    return command && command.isEnabled;
  }
  isAuthorSu() {
    return (
      this.author.hasPermission('ADMINISTRATOR') ||
      this.author.hasPermission('BAN_MEMBERS')
    );
  }
  sendManual() {
    fs.readdir(path.join(__dirname, '../commands/manuals'), (err, manuals) => {
      if (err) return console.error(err);
      if (manuals.indexOf(`${this.name}.txt`) !== -1) {
        fs.readFile(
          path.join(__dirname, '../commands/manuals', `${this.name}.txt`),
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
    return commandList.su[this.name] || commandList.gen[this.name];
  }
  run() {
    const commandToRun = this.validate();
    if (!commandToRun) return;
    if (!this.isAuthorSu() && commandList.su[this.name])
      return this.msg.channel.send(
        "You are not authorized to run 'su' commands. To know more send `!help su`."
      );
    if (!this.args || this.args.length < 1) {
      this.msg.reply(
        'I cannot run empty commands. To read command manual, send `!help <command-name>`.'
      );
      return this.sendManual();
    }
    return require(`../commands/${this.name}.js`).run(
      this.client,
      this.msg,
      this.args
    );
  }
}

module.exports = CommandHandler;
