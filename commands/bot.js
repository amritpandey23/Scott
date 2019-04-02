const commandReg = require('../configurations/commands');
const Discord = require('discord.js');
const RichEmbed = Discord.RichEmbed;
const { Auth } = require('../modules');

const runUserCommand = (message, args, commandName = '', client) => {
  const availableCommands = {
    'list-commands': listAvailableCommands,
    'admin-commands': listAdminCommands,
    info: botInfo,
    default: listAvailableCommands
  };
  // if commandName does not match any, return default
  return (availableCommands[commandName] || availableCommands.default)(
    message,
    args,
    client
  );
};

const timeConversion = (millisec) => {
  let seconds = (millisec / 1000).toFixed(1);
  let minutes = (millisec / (1000 * 60)).toFixed(1);
  let hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) return seconds + ' Sec';
  else if (minutes < 60) return minutes + ' Min';
  else if (hours < 24) return hours + ' Hrs';
  else return days + ' Days';
};

const commandListEmbed = () => {
  const embed = new RichEmbed();
  embed
    .setTitle('Mr. Scott v1.2 | Admin Commands')
    .setDescription(
      '*Find all the commands grouped by category below. Commands are followed by valid arguments \
    enclosed between `<` and `>`, arguments prefixed with `?` are optional.*'
    )
    .setColor(0xcc4063);

  return embed;
};

const botInfo = (message, args, client) => {
  const embed = new RichEmbed();
  embed
    .setColor(0xf4e242)
    .setDescription(
      `A robot made for programming/coding/development discord servers. Run \`${
        Auth.botPrefix
      }bot list-commands\` to see all available commands.`
    )
    .setAuthor(client.user.username)
    .setThumbnail(client.user.avatarURL)
    .addField('Uptime', timeConversion(client.uptime), true)
    .addField('ID', client.user.id, true)
    .addField('Guilds', client.guilds.size, true)
    .addField('Tag', client.user, true)
    .addField('Written in', 'JavaScript/NodeJS', true)
    .setFooter('Source: https://gitlab.com/amritpandey/discord-bot');

  message.channel.send({ embed });
};

const listAdminCommands = (message, args, client) => {
  const member = message.guild.members.find(
    (mem) => mem.id === message.author.id
  );
  if (Auth.isAdmin(member) || Auth.checkPermission(member, 'BAN_MEMBERS')) {
    const embed = commandListEmbed();
    const suCommands = commandReg.su;
    let commands = '';
    Object.keys(suCommands).forEach((cmd) => {
      commands += `\`${Auth.botPrefix}${cmd} ${suCommands[cmd]['usage']}\` ${
        suCommands[cmd]['description']
      }\n`;
    });
    embed.addBlankField().addField('🛡 ADMIN', commands);
    return member.send({ embed });
  }
  return member.send(
    `Sorry ${
      member.user.username
    }! I cannot show you admin commands as you neither an admin or a moderator in ${
      message.guild.name
    } server.`
  );
};

const listAvailableCommands = (message, args, client) => {
  const arr = {};
  const generalCommands = commandReg.gen;
  const embed = commandListEmbed();

  Object.keys(generalCommands).forEach((cmd) => {
    let cat = generalCommands[cmd].category;
    if (!arr[cat]) {
      arr[cat] = {};
    }
    arr[cat][cmd] = generalCommands[cmd];
  });

  Object.keys(arr).forEach((cat) => {
    const commandsInCategory = arr[cat];
    let commands = '';
    Object.keys(commandsInCategory).forEach((cmd) => {
      commands += `\`${Auth.botPrefix}${cmd} ${
        commandsInCategory[cmd]['usage']
      }\` ${commandsInCategory[cmd]['description']}\n`;
    });
    embed.addBlankField();
    embed.addField(cat.toUpperCase(), commands);
  });

  embed
    .addBlankField()
    .addField(
      '🔎 OTHER',
      `To see admin commands, run \`${Auth.botPrefix}bot admin-commands\`.`
    );

  message.channel.send({ embed });
};

exports.run = (client, message, args) => {
  const commandName = args[0];
  args.shift();
  runUserCommand(message, args, commandName, client);
};
