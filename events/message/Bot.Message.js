const BaseEvent = require('../BaseEvent');
const { Auth } = require('../../modules');

class Message extends BaseEvent {
  // handler for message event
  async handle(message) {
    if (!message.content.startsWith(Auth.botPrefix) || message.author.bot)
      return;
  }
}

module.exports = Message;
