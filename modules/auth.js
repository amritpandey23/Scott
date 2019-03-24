const config = require('../configurations/config.json');

const isAdmin = (member) =>
  member.roles.find((role) => role.id === config.guild.roles.admin);

// validation methods
const isMod = (exports.isMod = (member) =>
  member.roles.find((role) => role.id === config.guild.roles.mod));

// get data from config
const getBotToken = () => config.client.token;
const getMaintainerId = () => config.client.maintainerID;
const getCommandPrefix = () => config.client.commandPrefix;

const getChannelById = (_id, guild) =>
  guild.channels.find((ch) => ch.id === _id);

const getChannelByName = (channelName, guild) => {
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

module.exports = {
  isAdmin,
  isMod,
  getBotToken,
  getMaintainerId,
  getCommandPrefix,
  getChannelById,
  getChannelByName
};
