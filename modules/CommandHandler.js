const Discord = require('.discord.js');
const permission = new Discord.Permission();

const commandList = require('../configurations/commands');

class CommandHandler {
  constructor(msg, client) {
    this.msg = msg;
    this.client = client;
    this.args = msg.content
      .slice(auth.getCommandPrefix().length)
      .trim()
      .split(/ +/g);
    this.name = args.shift().toLowerCase();
    this.author = msg.author;
  }
  validateCommand() {
    return commandList.su[this.name] || commandList.gen[this.name];
  }
  isEnabled() {
    const command = this.validateCommand();
    return command && command.isEnabled;
  }
  isAuthorSu() {
    return (
      this.author.hasPermission(permission.ADMINISTRATOR) ||
      this.author.hasPermission(permission.BAN_MEMBERS)
    );
  }
  runCommand() {
    const commandToRun = this.validateCommand();
    if (!commandToRun) return;
    if (!this.isAuthorSu() && commandList.su[this.name])
      return this.msg.channel.send(
        'You are not authorized to run this command.'
      );
    return require(`../commands/${this.name}.js`).run(
      this.client,
      this.msg,
      this.args
    );
  }
}
