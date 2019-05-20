const { commands } = require('../configurations');
const { RichEmbed } = require('discord.js');
const { Auth, Utils } = require('../modules');

exports.run = (client, message, args) =>
  runUserCommand(message, args, args[0], client);

  /**
   * filter sub commands.
   * Instead of a switch case, I have used
   * objects.
   */
const runUserCommand = (message, args, commandName = '', client) => {
  const availableCommands = {
    commands: listAvailableCommands,
    'admin-commands': listAdminCommands,
    about: botInfo,
    default: showError
  };
  // if commandName does not match any, return default
  return (availableCommands[commandName] || availableCommands.default)(message, args, client);
};

// create embed for containing command list
const commandListEmbed = () => {
  const embed = new RichEmbed();
  embed
    .setTitle('Mr. Scott(Beta) | Commands')
    .setDescription(
      '*Find all the commands grouped by category below. Commands are followed by valid arguments \
    enclosed between `<` and `>`, arguments prefixed with `?` are optional.*'
    )
    .setColor(0xdfb91f);

  return embed;
};

// if unknown sub command is passed, display error
const showError = (message, args, client) => {
  const responseMessages = [
    `for command list run \`${Auth.botPrefix}bot commands\``,
    `for overview run \`${Auth.botPrefix}bot about\``,
    `to read bot manual, \`${Auth.botPrefix}help bot\``
  ]
  message.reply(`I do not understand that information type, ${responseMessages[Math.floor(Math.random()*3)]}.`)
}

// bot overview information
const botInfo = (message, args, client) => {
  const embed = new RichEmbed();
  embed
    .setColor(0xdfb91f)
    .setDescription(
    `A friendly chatbot assistant for Discord. ` + 
    `[Free and Open Source](https://github.com/ap4gh/mr_scott/blob/master/LICENSE) for everyone. ` +
    `[Invite](https://ap4gh.github.io/mr_scott) Mr. Scott to your server today. ` + 
    `If you have any suggestion, bug or request, discuss it in our [support server](https://discord.gg/XnjpKkM).`
    )
    .setAuthor(client.user.username)
    .setThumbnail(client.user.avatarURL)
    .addBlankField()
    .addField('Uptime', Utils.timeConversion(client.uptime), true)
    .addField('Bot Prefix', `\`${Auth.botPrefix}\``, true)
    .addField('Guilds', client.guilds.size, true)
    .addField('Build with', 'JavaScript/NodeJS', true)
    .addField('Homepage', '[https://ap4gh.github.io/mr_scott](https://ap4gh.github.io/mr_scott)')
    .addBlankField()
    .setFooter(`Run \`${Auth.botPrefix}bot commands\` to see list of available commands.`);

  message.channel.send({ embed });
};

// admin command list
const listAdminCommands = (message, args, client) => {
  if (message.channel.type === 'dm')
    return message.channel.send(
      'Admin commands only made for servers, you cannot use them in DMs.'
    );

  const member = message.guild.members.find((mem) => mem.id === message.author.id);
  if (Auth.isAdmin(member) || Auth.checkPermission(member, 'BAN_MEMBERS')) {
    const embed = commandListEmbed();
    let commandCollect = '';
    Object.keys(commands.su).forEach((cmd) => {
      commandCollect += `\`${Auth.botPrefix}${cmd} ${commands.su[cmd]['usage']}\` ${
        commands.su[cmd]['description']
      }\n`;
    });
    embed.addField('🛡 ADMIN', commandCollect);
    return member.send({ embed });
  }
  return member.send(
    `Sorry ${member.user.username}! I cannot show you admin commands. ☹️`
  );
};

// all public command list
const listAvailableCommands = (message, args, client) => {
  const arr = {};
  const generalCommands = commands.gen;
  const embed = commandListEmbed();

  Object.keys(generalCommands).forEach((cmd) => {
    let cat = generalCommands[cmd].category;
    if (!arr[cat]) 
      arr[cat] = {};
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
