require('colors');

class Authenticator {
  constructor(config) {
    this.botToken = config.client.botToken;
    this.botPrefix = config.client.botPrefix;
    this.clientId = config.client.clientId;
  }

  isAdmin(member) {
    return member.hasPermission('ADMINISTRATOR');
  }

  checkPermission(member, permissionName) {
    return member.hasPermission(permissionName);
  }

  findChannelById(_id, guild) {
    return guild.channels.find((ch) => ch.id === _id);
  }

  findChannelByName(channelName, guild) {
    const chf = guild.channels.find(
      (ch) => ch.name === channelName.toLowerCase()
    );

    if (!chf) {
      const err = new Error(
        `No channel with the name ${channelName} was found in ${
          guild.name
        } discord server.`
      );
      return process.stdout.write(`${err}`.red);
    }

    return chf;
  }
}
module.exports = Authenticator;
