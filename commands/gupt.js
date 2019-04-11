const { User } = require('discord.js');
const { ErrorHandler } = require('../modules/utils');

exports.run = (client, message, args) => {
  // collect discord user ID
  const userID = args.shift();
  // check if the format of ID is valid.
  // NOTE: this is not a correct
  // way to check whether this ID
  // belongs to a user on discord.
  if (userID.length !== 18 || !parseInt(userID)) {
    return message.author.send('You have given me an invalid user id!');
  }
  // create a discord user
  const user = new User(client, { id: userID });

  const messageContent = args.join(' ');
  if (!messageContent || messageContent.length === 0) {
    return message.author.send(
      'Please specify what do you want to send after user id.'
    );
  }
  // send secret/anonymous message
  user
    .send(`Somebody sent you an anonymous message: ||${messageContent}||`)
    .catch((err) => {
      process.stdout.write(`${err.message}\n${err.code}\n`.red);
      ErrorHandler(err);
    });

  // cannot perform a message.delete() in a DM channel
  if (message.channel.type !== 'dm') message.delete();
};
