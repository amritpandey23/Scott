/**
 * Event name: Message, Command
 * Description: One class to handle all the command files
 * Author: Amrit Pandey - ap4gh
 * Dependencies: fs, path, Auth, Utils, configurations
 * License: MIT
 */

const fs = require('fs');
const path = require('path');

const BaseEvent = require('../BaseEvent');
const { Auth } = require('../../modules');
const { commands, config } = require('../../configurations');

/**
 * One class to handle commands in both guild
 * text channel as well as DM channels. All
 * the validation methods are applied on the
 * command before executing it.
 */
class CommandHandler extends BaseEvent {
  /**
   * handler for command event.
   */
  async handle(message) {
    // ignore message if it does not start with specified bot prefix
    if (!message.content.startsWith(Auth.botPrefix) || message.author.bot)
      return;
    // set all the state of the command handler
    this.msg = message;
    this.args = this.msg.content
      .slice(config.client.botPrefix.length)
      .trim()
      .split(/ +/g);
    this.name = this.args.shift().toLowerCase();
    this.author = message.author;
    this.guild = message.guild || 'DM_CHANNEL';
    this.channelType = message.channel.type;

    // execute command
    this.run();
  }

  /**
   * check if the command is enabled by the
   * project owner.
   */
  isEnabled() {
    const command = this.validate();
    return command && command.isEnabled;
  }
  /**
   * check if command user is
   * either admin or moderator
   * of the guild.
   */
  isAuthorSu() {
    const messageAuthor =
      this.guild.members.find((mem) => mem.id === this.author.id);
    return (
      messageAuthor.hasPermission('ADMINISTRATOR') ||
      messageAuthor.hasPermission('MANAGE_MESSAGES')
    );
  }

  /**
   * check if command is valid and
   * is able to run in the channel
   */
  validate() {
    return this.channelType === 'dm'
      ? commands.gen[this.name]
      : commands.su[this.name] || commands.gen[this.name];
  }

  /**
   * log command use details via this method
   */
  logUsage() {
    const logMessage = `COMMAND: ${this.name}, ARGUMENTS: [${this.args.join(', ')}]\
      BY: {${this.author.id}, ${this.author.username}}\
      GUILD: {${this.guild.id}, ${this.guild === 'DM_CHANNEL' ? this.guild : this.guild.name}}\
      ON: ${new Date().toString()}\n`;
    // add log to the log file
    fs.appendFile(
      path.join(__dirname, '../../logs/command-activity.txt'), logMessage, (err) => {
        if (err) throw err;
        process.stdout.write(`COMMAND: ${this.msg.content.magenta} ${new Date().toDateString()}\n`.gray);
      }
    );
  }

  /**
   * validate, import and execute command file
   */
  async run() {
    // validate command
    const commandToRun = this.validate();
    if (!commandToRun) return;

    // stop users from using owner level
    // commands.
    if (commands.su[this.name]) {
      if(commands.su[this.name]['permitLevel'] === 2 && this.author.id !== Auth.maintainerId)
        return;
    }

    // if channel type is 'dm' AND
    // author is not an admin AND
    // the command is an admin command
    // -- end
    if (this.channelType !== 'dm' && !this.isAuthorSu() && commands.su[this.name])
      return this.msg.channel.send(`You are not authorized to run 'su' commands. ` +
        `To know more send \`${Auth.botPrefix}help su\`.`);

    // if no arguments were passed -- end
    if (!this.args || this.args.length < 1) {
      return this.msg.reply(`Running empty commands is not currently supported. ` +
        `To read command manual, run \`${Auth.botPrefix}help [command name]\``);
    }

    // if all the requirements and validations are met
    // -- import and execute command file
    require(`../../commands/${this.name}.js`).run(this.client, this.msg, this.args);
    return this.logUsage();
  }
}

module.exports = CommandHandler;
