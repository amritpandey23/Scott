const
  fs = require("fs"),
  colors = require("colors/safe"),
  { settings } = require("../config");


let colorScheme = settings.LOG_COLOR_SCHEME;
colors.setTheme(colorScheme);

function write(...args) {
  let line = `[${(new Date()).toISOString()}] `;      // time 
  line += args.join(' ');                             // message
  line += '\n';

  return fs.appendFile(settings.PATHS.LOG_FILE, line, (err) => {
    if (err) throw err;
  });
}

function print(type, ...args) {
  write(type.toUpperCase(), args.join(' '));
  return console.log(colors[colorScheme[type] ? type : "white"](args.join(' ')));
}

module.exports = { 
  write,
  success: function(...args) { print("success", ...args) },
  info: function(...args) { print("info", ...args) },
  log: function(...args) { print("log", ...args) },
  warn: function(...args) { print("warn", ...args) },
  error: function(...args) { print("error", ...args) },
  hl: function(...args) { print("highlight", ...args) }
}