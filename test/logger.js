const logger = require("../utils/logger");
const { settings } = require("../config");

/** basic use */    console.log("\n\t--BASIC USE--");
logger.success("SUCCESS: Operation was successful!");           // success
logger.info("INFO: Plain message");                             // info
logger.log("LOG: Do not mind this message.");                   // log
logger.warn("WARN: Deprecation notice, please upgrade.");       // warn
logger.error("ERROR: This is an error");                        // error
logger.hl("Important information");                             // highlight

/** error stack printing */     console.log("\n\t--ERROR PRINTING AND LOGGING--");
let error = new Error("something went wrong.");
logger.error(error.message, "checkout log file for more details");      // print error message on screen.
logger.write(logFile=settings.PATHS.RUNTIME_LOG, error.stack);          // save entire trace in the log file

/** saving logs */
logger.write(logFile=settings.PATHS.ACTIVITY_LOG, "This is a sample I want to save in activity log file!");