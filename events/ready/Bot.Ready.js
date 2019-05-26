const BaseEvent = require('../BaseEvent');
const { config } = require('../../configurations');
const { JSONCollection } = require('../../modules');

const guildInfo = new JSONCollection('guildInfo');

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

      this.client.guilds.array().forEach(guild => {
        const {
            id,
            name, 
            createdTimestamp, 
            iconURL, 
            large,
            memberCount,
            ownerID,
            region,
            verified
        } = guild;
    
        guildInfo.add(id, {
            name, 
            createdTimestamp, 
            iconURL, 
            large,
            memberCount,
            ownerID,
            region,
            verified
        })
    })
  }
}

module.exports = Ready;
