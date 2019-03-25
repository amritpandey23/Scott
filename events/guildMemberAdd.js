const { Auth } = require('../modules');

exports.run = (client, member) => {
  let welcomeChannel = Auth.findChannelByName('welcome', member.guild);
  welcomeChannel
    ? welcomeChannel.send(`Welcome to the server ${member}`)
    : () => {};
};
