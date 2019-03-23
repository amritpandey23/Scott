const auth = require('../modules/auth');

exports.run = (client, member) => {
  let welcomeChannel = member.guild.channels.get(auth.getWelcomeChannel());
  if (!welcomeChannel)
    welcomeChannel = member.guild.channels.get(auth.getGeneralChannel());

  channel.send(`Welcome to the server, ${member}`);
};
