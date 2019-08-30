/** logger.js
 * 
 * A utility which can be used to log
 * colored messages in console. For any
 * bot activity use logger instead of
 * console.log. Anything printed using
 * logger will also end up in log files.
 */

const
  fs = require("fs"),
  colors = require("colors/safe"),
  { settings } = require("../config");


let colorScheme = settings.LOG_COLOR_SCHEME;
colors.setTheme(colorScheme);

/** write() saves log messages in file. */
function write(logFile=settings.PATHS.RUNTIME_LOG, ...args) {
  let line = `[${(new Date()).toISOString()}] `;      // time 
  line += args.join(' ');                             // message
  line += '\n';

  return fs.appendFile(logFile, line, (err) => {
    if (err) throw err;
  });
}

/** print() logs colored messages on console. */
function print(type, ...args) {
  write(logFile=settings.PATHS.RUNTIME_LOG, type.toUpperCase(), args.join(' '));
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