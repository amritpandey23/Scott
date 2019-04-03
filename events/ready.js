require('colors');

exports.run = (client, _) => {
  process.stdout.write(`Logged in as ${client.user.tag.black.bgYellow}\n`.blue);

  client.user
    .setActivity('!bot list-commands')
    .then((presence) => {
      process.stdout.write(
        `Activity set to ${
          presence.game ? presence.game.name.black.bgYellow : 'none'
        }\n`.blue
      );
    })
    .catch((error) => {
      process.stdout.write(error.red);
    });
};
