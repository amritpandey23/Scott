const fs = require('fs');
const path = require('path');

const errorLogFilePath = path.join(__dirname, '../../logs/errors.txt');

module.exports = (err) => {
  fs.appendFile(
    errorLogFilePath,
    `message: ${err.message}, code: ${
      err.code
    }, on: ${new Date().toString()}\n`,
    (err) => {
      if (err) throw `${err}`.red;
    }
  );
};
