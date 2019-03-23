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

exports.getWelcomeChannel = () => config.guild.channels.joins;
exports.getGeneralChannel = () => config.guild.channels.general;
