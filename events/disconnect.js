exports.run = (client, _) => {
  process.stdout.write(
    `Client is disconnected and is no longer trying to reconnect. Must be some network problem. \n`
  );
};
