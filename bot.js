const Discord = require('discord.js');

const config = require('./config.json');
const client = new Discord.Client();

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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

module.exports = client;
