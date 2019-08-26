const path = require("path");

module.exports = {
    PATHS: {
        LOG_FILE: path.resolve(__dirname, "../logs/activity.log")
    },
    LOG_COLOR_SCHEME: {
        error: ["red", "bold"],
        warn: "yellow",
        info: "blue",
        log: "white",
        success: "green",
        highlight: ["black", "bgYellow"]
    }
}