require('colors');

const fs = require('fs');
const { Client } = require('discord.js');

const bot = new Client();

const registerEvents = () => {
  // read existing events from the events directory
  fs.readdir('./events/', (err, eventFiles) => {
    if (err) throw err;
    // scan files in event directory and load them here.
    eventFiles.forEach((file) => {
      // if there is a file that is not js, ignore it
      if (!file.endsWith === '.js') return;

      const eventName = file.split('.')[0];
      const event = require(`./events/${file}`);
      bot.on(eventName, (obj) => {
        // run event
        event.run(bot, obj);
        // log event
        const eventLogMessage = `EVENT: ${eventName}, ON: ${new Date().toString()}\n`;
        fs.appendFile('./logs/event-activity.txt', eventLogMessage, (err) => {
          if (err) throw err;
          process.stdout.write(eventLogMessage.gray);
        });
      });
    });
  });
};

registerEvents();
module.exports = bot;
