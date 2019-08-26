const
    bot = require("./helpers/test_bot"),
    { embed: Embed, messages } = require("../utils/error"),
    { Auth } = require("../modules");

bot.on("message", function(message) {
    let embed = Embed(messages.AWAIT_EXPIRED);
    if(message.content === "error")
        message.channel.send({ embed });
});

bot.login(Auth.botToken);