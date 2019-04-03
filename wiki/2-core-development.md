# Core Development

In this page you will find information about howtos, structure, configurations etc. of the project.

## Project Structure

```
.
├── app.yaml
├── bot.js
├── package.json
├── start.js
├── commands/
│   ├── manuals/
├── configurations
│   ├── commands.js
│   ├── config.example.json
├── events/
└── modules/
```

- `bot.js`: This is the file where you will find Discord Client. If you have to change settings/properties of client(bot), this is where you can do it.
- `start.js`: This script start/run the bot.
- `app.yaml`: File specific to GCP, not essential for development purposes.
- `commands/`: This directory contains all the command files along with their manuals.
- `events/`: This directory contains all the bot events.
- `configurations/`: Any bot settings, config, tokens, list etc. goes here.
- `modules/`: This directory has all the usable libraries that are utilised by commands.


## Client
A bot, is an instance of `Discord.Client()`. Read more about Client [here](https://discord.js.org/#/docs/main/stable/class/Client). This client provides us with many APIs in the form of methods, properties and events. We have mainly used `message` event, because thats what a *chatbot* is intended to work on.

## Modules

### Authenticator
- type: `Class`
- constructor: `config: any`
- description: provide authentication methods and props.
- imported as: `Object.prototype`
- usage:
```js
const { Auth } = require('./modules');

console.log(Auth.isAdmin(member, member.guild)); 
```

### CommandHandler
- type: `Class`
- constructor: `client: Discord.Client(), msg: Discord.Message()`
- description: provide command handle and run methods.
- imported as: `Function.prototype`
- usage:
```js
const { CommandHandler } = require('./modules')

const commandHandler = new CommandHandler(client, message)
commandHandler.run()
```