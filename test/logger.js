const logger = require("../utils/logger");

/** basic use */    logger.log("\n\t--BASIC USE--");
logger.success("SUCCESS: Operation was successful!");           // success
logger.info("INFO: Plain message");                             // info
logger.log("LOG: Do not mind this message.");                   // log
logger.warn("WARN: Deprecation notice, please upgrade.");       // warn
logger.error("ERROR: This is an error");                        // error
logger.hl("Important information");                             // highlight

/** error stack printing */     logger.log("\n\t--ERROR PRINTING AND LOGGING--");
let error = new Error("something went wrong.");
logger.error(error.message, "checkout log file for more details");      // print error message on screen.
logger.write(error.stack);                                              // save entire trace in the log file
