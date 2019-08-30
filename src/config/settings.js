const path = require("path");

module.exports = {
    PATHS: {
        RUNTIME_LOG: path.resolve(__dirname, "../logs/runtime.log"),
        ACTIVITY_LOG: path.resolve(__dirname, "../logs/activity.log"),
        RESPONSES: path.resolve(__dirname, "./responses.json")
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