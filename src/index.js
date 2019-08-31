const
  colors = require('colors/safe'),
  Bot = require("./bot"),
  { settings } = require("./config");


colors.setTheme(settings.LOG_COLOR_SCHEME);
(new Bot()).start();
