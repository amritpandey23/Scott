const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const auth = require('./modules/auth');
const cmdFilter = require('./modules/cmdFilter');
const client = new Discord.Client();

// run existing commands from commands directory on each message event
client.on('message', (message) => {
  // If message does not start with command prefix, ignore them.
  if (
    !message.content.startsWith(auth.getCommandPrefix()) ||
    message.author.bot
  )
    return;
  // arguments passed with the messages.
  const args = message.content
    .slice(auth.getCommandPrefix().length)
    .trim()
    .split(/ +/g);
  // command name
  const commandName = args.shift().toLowerCase();
  // scan command directory
  fs.readdir(path.join(__dirname, 'commands'), (err, files) => {
    if (files.indexOf(`${commandName}.js`) === -1) {
      // check if file with command exist
      return message.channel.send(
        `Command named *${commandName}* does not exist!`
      );
    } else if (!args || args.length < 1 || args[0].toLowerCase() === '--help') {
      // if no argument is passed with a valid command name, show its manual
      fs.readdir(path.join(__dirname, 'commands/manuals'), (err, files) => {
        // if no manual is found for the given command, display notice.
        if (files.indexOf(`${commandName}.txt`) === -1)
          return message.channel.send(
            '```Manual not found, please ask server administrator to update manual for this command.```'
          );
        // show manual text for the command
        else
          fs.readFile(
            path.join(__dirname, 'commands/manuals', `${commandName}.txt`),
            {encoding: 'utf8'},
            (err, data) => {
              if (err) throw err;
              return message.channel.send(data);
            }
          );
      });
    } else {
      if (
        !cmdFilter(
          commandName,
          message.guild.members.find('id', message.author.id)
        )
      )
        return message.channel.send(
          'You are not autorized to use this command.'
        );
      // valid command is run with valid arguments
      try {
        require(`./commands/${commandName}`).run(client, message, args);
      } catch (err) {
        console.error(err);
      }
    }
  });
});

// read existing events from the events directory
fs.readdir('./events/', (err, eventFiles) => {
  if (err) return console.error(err);
  // scan files in event directory and load them here.
  eventFiles.forEach((file) => {
    if (!file.endsWith === '.js') return;
    const eventName = file.split('.')[0];
    const event = require(`./events/${eventName}`);
    client.on(eventName, (obj) => event.run(client, obj));
  });
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

module.exports = client;
