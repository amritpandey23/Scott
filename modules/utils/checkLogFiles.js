const fs = require('fs');

const checkLogFiles = () => {
  // check, create blank log files for logging
  const necessaryLogFiles = ['command-activity', 'event-activity', 'errors'];
  // check if log files exist already
  fs.readdir('./logs', (err, files) => {
    if (err) {
      process.stdout.write(`no log directory exists\n`.red);
      fs.mkdirSync('./logs', (err) => {
        if (err) throw err;
      });
      process.stdout.write(
        `log directory created at `.gray + `./logs`.bgYellow.black + `\n`
      );
      return checkLogFiles();
    }
    necessaryLogFiles.forEach((fileName) => {
      if (!files.includes(`${fileName}.txt`)) {
        process.stdout.write(
          `${fileName}.txt does not exist... creating\n`.gray
        );
        fs.writeFile(`./logs/${fileName}.txt`, '', (err) => {
          if (err) throw err;
        });
      }
    });
  });
};

module.exports = checkLogFiles;
