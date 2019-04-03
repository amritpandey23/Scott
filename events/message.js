const { Auth, CommandHandler, DMCommandHandler } = require('../modules');

// run existing commands from commands directory on each message event
exports.run = (client, message) => {
  // If message does not start with command prefix, ignore them.
  if (!message.content.startsWith(Auth.botPrefix) || message.author.bot) return;
  if (message.channel.type === 'dm') {
    const dmCommandHandler = new DMCommandHandler(client, message);
    return dmCommandHandler.run();
  }

  const commandHandler = new CommandHandler(client, message);
  return commandHandler.run();
};
