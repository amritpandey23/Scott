const { User } = require('discord.js');

exports.run = (client, message, args) => {
  // collect discord user ID
  const userID = args.shift();
  // check if the format of ID is valid.
  // NOTE: this is not a correct
  // way to check whether this ID
  // belongs to a user on discord.
  if (userID.length !== 18 || !parseInt(userID)) {
    return message.author.send('INVALID USER ID');
  }
  // create a discord user
  const user = new User(client, { id: userID });

  const messageContent = args.join(' ');
  if (!messageContent || messageContent.length === 0) {
    return message.author.send('I cannot send an empty message! Duh! 😕');
  }
  // send secret/anonymous message
  user.send(`Somebody sent you an anonymous message: *${messageContent}*`);

  // cannot perform a message.delete() in a DM channel
  if (message.channel.type !== 'dm') message.delete();
};
