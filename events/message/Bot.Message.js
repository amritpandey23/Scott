class Message {
  constructor(client) {
    this.client = client;
  }

  handle(message) {
    const { Auth, CommandHandler, DMCommandHandler } = require('../../modules');
    if (!message.content.startsWith(Auth.botPrefix) || message.author.bot)
      return;
  }
}

module.exports = Message;
