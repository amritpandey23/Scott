const config = require('../configurations/config.json');

const fs = require('fs');
const path = require('path');

const isAdmin = (member) => member.hasPermission('ADMINISTRATOR');

// this is a lame way to check if a member is a moderator.
const isMod = (member) => member.hasPermission('BAN_MEMBERS');

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
