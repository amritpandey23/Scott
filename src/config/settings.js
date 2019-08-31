const path = require("path");

module.exports = {
  PATHS: {
    CREDENTIALS: path.resolve(__dirname, "./credentials.json"),
    LOGS: path.resolve(__dirname, "../../logs"),
    RESPONSES: path.resolve(__dirname, "./responses.json")
  },
  LOG_COLOR_SCHEME: {
    error: ["red", "bold"],
    warn: "yellow",
    info: "blue",
    log: "white",
    success: "green",
    highlight: ["black", "bgYellow"]
  },
  ACCESS_LEVELS: {
    all: 0,
    mod: 1,
    admin: 2
  }
}
