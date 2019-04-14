const BaseEvent = require('../BaseEvent');
const { Auth } = require('../../modules');

class GuildMemberAdd extends BaseEvent {
  // handler for event
  async handle(member) {
    let welcomeChannel = Auth.findChannelByName('welcome', member.guild);
    welcomeChannel
      ? welcomeChannel.send(`Welcome to the server ${member}`)
      : () => {};
  }
}

module.exports = GuildMemberAdd;
