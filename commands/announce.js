/**
 * command name: announce
 * description: creates an text announcement on the channel.
 * author: Amrit Pandey
 * dependencies: Discord.RichEmbed, auth module
 */

const Discord = require('discord.js');
const richEmbed = Discord.RichEmbed;

const { Auth } = require('../modules');
// message categories, emoji symbol and reactions
const messageTypes = {
  danger: [0xc93a2d, '⛔️', '🙁'],
  warning: [0xc4ac13, '⚠️', '✅'],
  regular: [0x2e69c9, '📣', '👍'],
  success: [0x2ec962, '🎉', '👏']
};

exports.run = (client, message, args) => {
  // announcement category passed by the user
  const messageTypeUsed = args.shift().toLowerCase();
  // message content
  const announcementMsg = args.join(' ');
  message.delete();
  // if no content was passed, just throw an error
  if (!announcementMsg || announcementMsg.length < 0)
    return message.channel.send(
      '```Error: cannot send an empty announcement```'
    );
  // invalid announcement category
  if (!messageTypes[messageTypeUsed])
    return message.channel.send(
      '```' +
        `Error: unrecognized announcement type '${messageTypeUsed}'.\nFor help run '${
          Auth.botPrefix
        }help announce' ` +
        '```'
    );
  // message formatting with discord rich embed
  const embed = new richEmbed();
  embed
    .setTitle(`${messageTypes[messageTypeUsed][1]} Announcement`)
    .setDescription(announcementMsg)
    .setColor(messageTypes[messageTypeUsed][0])
    .setTimestamp()
    .setFooter(
      `This announcement is created by ${message.author.username}`,
      message.author.avatarURL
    );
  // send message and add reaction
  message.channel
    .send({ embed })
    .then((msg) => msg.react(messageTypes[messageTypeUsed][2]))
    .catch((err) => console.error(err));
};
