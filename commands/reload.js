const fs = require('fs');

exports.run = (client, message, args) => {
  if (!args || args.length < 1)
    return message.channel.send('Please provide a command name to reload.');
  const commandName = args[0];
  fs.readdir('./commands/', (err, commandFiles) => {
    if (commandFiles.indexOf(`${commandName}.js`) !== -1) {
      delete require.cache[require.resolve(`./${commandName}.js`)];
      message.channel.send(
        'RELOAD SUCCESSFUL FOR `' +
          commandName +
          '` COMMAND. :white_check_mark:'
      );
    } else
      message.channel.send('`' + commandName + '` COMMAND DO NOT EXIST. :x:');
  });
};
