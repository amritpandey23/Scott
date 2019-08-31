class BaseEvent {
  /**
   * base class for all the events
   * @params {Client} client
   */

  constructor(client) {
    this.client = client;
  }
  /**
   * public handler for events, throws an error
   * if no handler is set for an event.
   */
  async handle() {
    throw new Error(`No handle set for ${this.constructor.name}`);
  }
}

module.exports = BaseEvent;
