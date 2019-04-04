class Disconnect {
  constructor(client) {
    this.client = client;
  }
  async handle() {
    process.stdout.write(
      `Client is disconnected and is no longer trying to reconnect. Must be some network problem. \n`
    );
  }
}

module.exports = Disconnect;
