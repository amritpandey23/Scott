const BaseEvent = require('../BaseEvent');

class Disconnect extends BaseEvent {
  // hander for event
  async handle() {
    return process.stdout.write(
      `Client is disconnected and is no longer trying to reconnect. Must be some network problem. \n`
        .red
    );
  }
}

module.exports = Disconnect;
