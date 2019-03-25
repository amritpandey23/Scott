const { Auth, CommandHandler } = require('../modules');

// run existing commands from commands directory on each message event
exports.run = (client, message) => {
  // If message does not start with command prefix, ignore them.
  if (!message.content.startsWith(Auth.botPrefix) || message.author.bot) return;

  const commandHandler = new CommandHandler(client, message);
  commandHandler.run();
};
