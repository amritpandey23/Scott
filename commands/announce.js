exports.run = (client, message, args) => {
  const announcementMsg = args.join(' ');
  message.channel.send(announcementMsg);
};
