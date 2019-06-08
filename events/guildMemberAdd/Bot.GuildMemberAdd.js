const BaseEvent = require('../BaseEvent');
const { Auth, JSONCollection } = require('../../modules');

class GuildMemberAdd extends BaseEvent {
  // handler for event
  async handle(member) {
    let welcomeChannel = Auth.findChannelByName('welcome', member.guild);
    welcomeChannel
      ? welcomeChannel.send(`Welcome to the server ${member}`)
      : () => {};

    this.updateGuildStats(member);
  }

  updateGuildStats(member) {
    const guildsInfo = new JSONCollection('guildInfo');
    const guildsInfoRaw = guildsInfo.fetch();
    let guildInfo = guildsInfoRaw[member.guild.id];

    if (!guildInfo || guildInfo === undefined) {
      guildInfo = {
        "week_start": 0,
        "week_end": 0,
        "join_current_week": 0,
        "join_previous_week": 0,
        "leave_current_week": 0,
        "last_join_timestamp": 0,
        "newest_member": {
          "id": 0,
          "username": "",
          "tag": ""
        },

      };
      guildsInfoRaw[member.guild.id] = guildInfo;
    }

    if (guildInfo["week_end"] === 0 || member.joinedTimestamp >= guildInfo["week_end"]) {
      guildInfo["week_start"] = (new Date()).getTime();
      if (guildInfo["week_end"] > 0 && member.joinedTimestamp >= guildInfo["week_end"]);
        guildInfo["week_start"] = guildInfo["week_end"] + 1000;
      guildInfo["week_end"] = guildInfo["week_start"] + (7*24*60*60*1000);
      guildInfo["join_previous_week"] = guildInfo["join_current_week"] - guildInfo["leave_current_week"];
      guildInfo["join_current_week"] = 0;
    }

    if (
      member.joinedTimestamp <= guildInfo["week_end"] && 
      member.joinedTimestamp >= guildInfo["week_start"]
    ) {
      guildInfo["join_current_week"] = guildInfo["join_current_week"] + 1;
      guildInfo["last_join_timestamp"] = member.joinedTimestamp;
      guildInfo["newest_member"]["id"] = member.id;
      guildInfo["newest_member"]["username"] = member.user.username;
      guildInfo["newest_member"]["tag"] = member.user.tag;
    }

    return guildsInfo.save(guildsInfoRaw);

  }

}

module.exports = GuildMemberAdd;
