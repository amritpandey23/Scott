const Discord = require('discord.js');
const fs = require('fs');

const config = require('./config.json');
const client = new Discord.Client();

// read existing commands from commands directory
client.on('message', (message) => {
  // If message does not start with command prefix, ignore them.
  if (!message.content.startsWith(config.commandPrefix) || message.author.bot)
    return;
  // arguments passed with the messages.
  const args = message.content
    .slice(config.commandPrefix.length)
    .trim()
    .split(/ +/g);
  // command name
  const commandName = args.shift().toLowerCase();
  // check if file with commandName exist
  try {
    require(`./commands/${commandName}`).run(client, message, args);
  } catch (err) {
    console.error(err);
    message.channel.send(`Command named ${commandName} does not exist!`);
  }
});

// read existing events from the events directory
fs.readdir('./events/', (err, eventFiles) => {
  if (err) return console.error(err);

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
