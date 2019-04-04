class GuildMemberAdd {
  constructor(client) {
    this.client = client;
  }
  async handle(member) {
    const { Auth } = require('../../modules');
    let welcomeChannel = Auth.findChannelByName('welcome', member.guild);
    welcomeChannel
      ? welcomeChannel.send(`Welcome to the server ${member}`)
      : () => {};
  }
}

module.exports = GuildMemberAdd;
