const { User } = require('discord.js');

exports.run = (client, message, args) => {
    let i = client.guilds.size - 1;
    const ownerMessage = args.join(' ');
    const guildArray = client.guilds.array();
    while (i >= 0) {
        const guildOwner = new User(client, { id: client.guilds.array()[i]['ownerID'] });
        let msg = `This message was sent to the owner of __${guildArray[i]['name']}__ server.`
        guildOwner
            .send({embed: {
                title: 'From: Mr. Scott\'s maintainer' ,
                description: msg,
                color: 0xdfb91f,
                fields: [
                    {
                        name: 'Message',
                        value: ownerMessage
                    },
                    {
                        name: 'Help & Support',
                        value: 'To report any bugs, errors, feedback etc. Feel free to speak in our support server https://discord.gg/XnjpKkM.'
                    }
                ],
                footer: {
                    text: `Sent on ${(new Date()).toDateString()}`
                }
            }})
            .catch((err) => {
                process.stdout.write(`${err.message}\n${err.code}\n`.red);
            });
        i--;
    }
    message.react('✅')
        .then()
        .catch(console.error)
}