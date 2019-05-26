const { JSONCollection } = require('../modules');

const guildInfo = new JSONCollection('guildInfo');
const guildStats = new JSONCollection('guildStats');

exports.run = (client, message, args) => runUserCommand(message, args, args[0]);

const runUserCommand = (message, args, commandName = '') => {
    const availableCommands = {
        'info': getGuildInfo,
        'stats': getGuildStats,
        default: unknownCommand
    };
    // if commandName does not match any, return default
    return (availableCommands[commandName] || availableCommands.default)(message, args);
};

const getGuildInfo = (message, args) => {

    const {
        id,
        name,
        createdTimestamp,
        iconURL,
        large,
        memberCount,
        ownerID,
        owner,
        channels,
        region,
        roles,
        verified } = message.guild;

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

    let roleStr = '';
    roles.array().forEach(role => {
        if (role !== '' && role !== undefined)
            roleStr += `${role.name}, `
    })

    const embed = {
        "author": {
            "name": `${name} ${verified ? '✅' : ''}`,
            "icon_url": iconURL
        },
        "color": 0xdfb91f,
        "footer": {
            "text": `Generated on ${(new Date()).toDateString()}`
        },
        "fields": [
            {
                "name": "Created on",
                "value": (new Date(createdTimestamp)).toDateString(),
                "inline": true
            },
            {
                "name": "Region",
                "value": region.toUpperCase(),
                "inline": true
            },
            {
                "name": "Owner",
                "value": `${owner.user.username}#${owner.user.discriminator}`,
                "inline": true
            },
            {
                "name": "Total Members",
                "value": memberCount,
                "inline": true
            },
            {
                "name": "Total Channels",
                "value": channels.size,
                "inline": true
            },
            {
                "name": `Roles(${roles.size})`,
                "value": roleStr,
                "inline": false
            }
        ]
    }

    message.channel.send({ embed })

}

const getGuildStats = async (message, args) => {

    const {
        id,
        name,
        iconURL,
        members, } = message.guild;

    // console.log(guildMembers[2]['joinedTimestamp'])
    const today = new Date()
    const daysToSub = today.getDay() === 0 ? 7 : today.getDay()
    const lastSun = new Date(today.getTime() - (daysToSub * 24 * 60 * 60 * 1000))
    const lastMon = new Date(lastSun.getTime() - (6 * 24 * 60 * 60 * 1000))
    const lastMonth = today.getMonth() - 1
    const currYear = today.getFullYear()

    let membersLastWeek = 0;
    let membersThisWeek = 0;
    let membersLastMonth = 0;

    let loadingEmbed = {
        "footer": {
            "text": `preparing data...`
        }
    }

    const msg = await message.channel.send({embed: loadingEmbed});
    members.array().forEach(member => {
        const joinDate = new Date(member['joinedTimestamp'])
        if (joinDate.getTime() >= lastMon.getTime() && joinDate.getTime() <= lastSun.getTime())
            membersLastWeek++;
        if (joinDate.getTime() >= lastSun.getTime())
            membersThisWeek++;
        if (joinDate.getMonth() === lastMonth && joinDate.getFullYear() === currYear)
            membersLastMonth++;
    });
    const embed = {
        "author": {
            "name": `${name}`,
            "icon_url": iconURL
        },
        "color": 0xdfb91f,
        "fields": [
            {
                "name": "\u200b",
                "value": "Member joined"
            },
            {
                "name": `This Week`,
                "value": membersThisWeek,
                "inline": true
            },
            {
                "name": `Previous Week`,
                "value": membersLastWeek,
                "inline": true
            },
            {
                "name": `Previous Month`,
                "value": membersLastMonth,
                "inline": true
            },
            {
                "name": "\u200b",
                "value": `Generated on ${(new Date()).toDateString()}`
            }
        ]
    }
    
    setTimeout(function(){ msg.edit({ embed }); }, 3500);

    guildStats.add(id, {
        "joined_last_week": membersLastWeek,
        "joined_this_week": membersThisWeek,
        "joined_last_month": membersLastMonth
    })

}

const unknownCommand = (message, args) => {
    message.reply(`Unknown option: ${args[0]}, Try \`$help guild\`.`)
}