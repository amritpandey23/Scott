const BaseEvent = require('../BaseEvent');
const config = require('../../configurations/config.json');

class Ready extends BaseEvent {
  // handler for event
  async handle() {
    process.stdout.write(
      `Logged in as ${this.client.user.tag.black.bgYellow}\n`.blue
    );

    this.client.user
      .setActivity(`use ${config.client['botPrefix']}help me`)
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
  }
}

module.exports = Ready;
