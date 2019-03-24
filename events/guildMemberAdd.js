const { auth } = require('../modules');

exports.run = (client, member) => {
  let welcomeChannel = auth.getChannelByName('welcome', member.guild);
  welcomeChannel
    ? welcomeChannel.send(`Welcome to the server ${member}`)
    : () => {};
};
