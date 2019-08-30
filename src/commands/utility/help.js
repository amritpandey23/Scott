/**
 * command name: help
 * description: shows manuals for the commands.
 * author: Amrit Pandey
 * dependencies: fs, path
 */

const fs = require('fs');
const path = require('path');

exports.run = (client, message, args) => {
  // command name to show manual for:
  const commandReq = args[0];

  fs.readdir(path.join(__dirname, 'manuals'), (err, files) => {
    if (err) return console.error(err);
    // check if manual for the command exist
    if (files.indexOf(`${commandReq}.txt`) !== -1) {
      fs.readFile(
        path.join(__dirname, 'manuals', `${commandReq}.txt`),
        { encoding: 'utf8' },
        (err, data) => {
          message.author.send(data);
        }
      );
    } else
      message.channel.send(
        `Cannot get manual for *${commandReq}*:  **manual not found**`
      );
  });
};
