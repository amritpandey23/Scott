const
  fs = require("fs"),
  { logger } = require("../utils"),
  { PATHS } = require("./settings");

function getCredentials() {

  try {
    let s = fs.statSync(PATHS.CREDENTIALS);
  } catch (err) {
    logger.error("Credential file does not exists.");
    logger.log("Use `npm run setup` to create one.");
    return false;
  }

  return require(PATHS.CREDENTIALS);
}

function getValue(name) {

  let credentials = getCredentials();
  
  if(!credentials)
    return;
  
  let [ field, prop ] = name.split('_');
  return credentials[field][prop];

}

getValue("bot_token");
