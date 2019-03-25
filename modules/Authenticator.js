class Authenticator {
  constructor(config) {
    this.botToken = config.client.botToken;
    this.botPrefix = config.client.botPrefix;
    this.clientId = config.client.clientId;
  }

  isAdmin(member) {
    member.hasPermission('ADMINISTRATOR');
  }

  checkPermission(member, permissionName) {
    member.hasPermission(permissionName);
  }

  findChannelById(_id, guild) {
    guild.channels.find((ch) => ch.id === _id);
  }

  findChannelByName(channelName, guild) {
    if (config.guild.channels[channelName.toLowerCase()])
      return guild.channels.find(
        (ch) => ch.id === config.guild.channels[channelName]
      );

    const chf = guild.channels.find(
      (ch) => ch.name === channelName.toLowerCase()
    );

    if (!chf) {
      console.error(
        `Error: No channel with the name ${channelName} was found in ${
          guild.name
        } discord server.`
      );
      return false;
    }

    return chf;
  }
}
module.exports = Authenticator;
