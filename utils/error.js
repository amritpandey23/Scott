const
    { RichEmbed: Embed } = require("discord.js"),
    { settings } = require("../config"),
    { lib } = require("../utils");

let messages = {
    UNKNOWN_EVENT: function(event) { return `Unknown event recieved: ${event}` },
    NO_HANDLE: function(event) { return `${event} does not have handle method.` },
    DISCORD_ERROR: function(error) { return `Discord error: ${error.stack}` },
    DISCORD_API_ERROR: function(error) { return `Discord API error: ${error.stack}` },
    SYNTAX_ERROR: function(command) { return `Wrong syntax: ${command}` },
    TIMEOUT: `The wait for operation expired`
};

function embed(message) {
    let { error_messages } = require(settings.PATHS.RESPONSES);
    let randomNum = lib.randomNumber(0, error_messages.length);
    let embed = new Embed();
    embed
        .setDescription(message)
        .setColor(0xff5c5c)
        .setFooter(error_messages[randomNum]);
    return embed;
}

module.exports = { embed, messages };