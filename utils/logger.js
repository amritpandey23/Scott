const
  fs = require("fs"),
  colors = require("colors/safe"),
  { settings } = require("../config");


let colorScheme = settings.LOG_COLOR_SCHEME;
colors.setTheme(colorScheme);

function write(type, ...args) {
  let line = `[${(new Date()).toISOString()}] `;      // time 
  line += `${type}: `;                                // type
  line += args.join(' ');                             // message
  line += '\n';

  return fs.appendFile(settings.PATHS.LOG_FILE, line, (err) => {
    if (err) throw err;
  });
}

function log(type, ...args) {
  write(type, ...args);
  return console.log(colors[colorScheme[type] ? type : "white"](args.join(' ')));
}

module.exports = { log, write }