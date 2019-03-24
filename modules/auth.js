const config = require('../configurations/config.json');

// validation methods
exports.isAdmin = (member) =>
  member.roles.find((role) => role.id === config.guild.roles.admin);

exports.isMod = (member) =>
  member.roles.find((role) => role.id === config.guild.roles.mod);

// get data from config
exports.getBotToken = () => config.client.token;
exports.getMaintainerId = () => config.client.maintainerID;
exports.getCommandPrefix = () => config.client.commandPrefix;

exports.getChannelById = (_id, guild) =>
  guild.channels.find((ch) => ch.id === _id);

exports.getChannelByName = (channelName, guild) => {
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
};
