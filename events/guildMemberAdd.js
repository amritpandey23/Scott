const config = require('../config.json');
exports.run = (client, member) => {
  const welcomeChannel = member.guild.channels.get(config['channels']['joins']);
  if (!welcomeChannel) return;
  channel.send(`Welcome to the server, ${member}`);
};
