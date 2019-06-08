const BaseEvent = require('../BaseEvent');
const { JSONCollection } = require('../../modules');

class GuildMemberRemove extends BaseEvent {

    async handle(member) {
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

          if (!guildInfo["week_end"] === 0 || (new Date()).getTime() >= guildInfo["week_end"]) {
            guildInfo["week_start"] = (new Date()).getTime();
            guildInfo["week_end"] = (new Date()).getTime() + (7*24*60*60*1000);
            guildInfo["join_previous_week"] = guildInfo["join_current_week"] - guildInfo["leave_current_week"];
            guildInfo["join_current_week"] = 0;
          }

          if (
            (new Date()).getTime() <= guildInfo["week_end"] && 
            (new Date()).getTime() >= guildInfo["week_start"]
          ) {
            guildInfo["leave_current_week"] += 1;
          }
          
          guildsInfo.save(guildsInfoRaw);

    }

}

module.exports = GuildMemberRemove;