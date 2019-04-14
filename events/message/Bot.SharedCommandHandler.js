const fs = require('fs');
const path = require('path');
const BaseEvent = require('../BaseEvent');
const commandRegistry = require('../../configurations/commands');

class SharedCommandHandler extends BaseEvent {
  isEnabled() {
    const command = this.validate();
    return command && command.isEnabled;
  }

  isAuthorSu() {
    const messageAuthor = this.guild.members.find(
      (mem) => mem.id === this.author.id
    );
    return (
      messageAuthor.hasPermission('ADMINISTRATOR') ||
      messageAuthor.hasPermission('MANAGE_MESSAGES')
    );
  }

  sendManual() {
    fs.readdir(path.join(__dirname, '../commands/manuals'), (err, manuals) => {
      if (err) throw `${err}`.red;
      if (manuals.indexOf(`${this.name}.txt`) !== -1) {
        fs.readFile(
          path.join(__dirname, '../commands/manuals', `${this.name}.txt`),
          { encoding: 'utf8' },
          (err, data) => {
            if (err) throw `${err}`.red;
            return this.author.send(data);
          }
        );
      }
    });
    return '';
  }

  validate() {
    return this.channelType === 'dm'
      ? commandRegistry.gen[this.name]
      : commandRegistry.su[this.name] || commandRegistry.gen[this.name];
  }

  run() {
    const commandToRun = this.validate();
    if (!commandToRun) return;
    if (
      this.channelType !== 'dm' &&
      !this.isAuthorSu() &&
      commandList.su[this.name]
    )
      return this.msg.channel.send(
        "You are not authorized to run 'su' commands. To know more send `!help su`."
      );
    if (!this.args || this.args.length < 1) {
      this.msg.reply(
        'I cannot run empty commands. To read command manual, send `!help <command-name>`.'
      );
      return this.sendManual();
    }
    require(`../../commands/${this.name}.js`).run(
      this.client,
      this.msg,
      this.args
    );
    return this.logUsage();
  }

  logUsage() {
    const logMessage = `COMMAND: ${this.name}, ARGUMENTS: [${this.args.join(
      ', '
    )}], BY: {${this.author.id}, ${this.author.username}}, GUILD: {${
      this.guild.id
    }, ${
      this.guild === 'DM CHANNEL' ? this.guild : this.guild.name
    }}, ON: ${new Date().toString()}\n`;

    fs.appendFile(
      path.join(__dirname, '../../logs/command-activity.txt'),
      logMessage,
      (err) => {
        if (err) throw err;
        process.stdout.write(
          `COMMAND: ${this.msg.content.magenta} ${new Date().toDateString()}\n`
            .gray
        );
      }
    );
  }
  async handle(message) {
    this.msg = message;
    this.args = this.msg.content
      .slice(
        require('../../configurations/config.json').client.botPrefix.length
      )
      .trim()
      .split(/ +/g);
    this.name = this.args.shift().toLowerCase();
    this.author = message.author;
    this.guild = message.guild || 'DM CHANNEL';
    this.channelType = message.channel.type;

    this.run();
  }
}

module.exports = SharedCommandHandler;
