# Getting Started

This pages have information on setting up and running bot locally on your system. To run bot you will need a bot token. Check the procedure to get token and adding bot to a server [here](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/).

## Installing

1. Clone the repo `git clone https://gitlab.com/amritpandey/discord-bot.git`
2. Move into the directory `cd discord-bot`
3. Install npm/node dependencies `npm install`
4. Rename `/configuration/config.example.json` to `/configuration/config.json`
5. Fill the `botToken` field in `/configuration/config.json` with your own token.
6. Optional. Change `botPrefix` to a desirable symbol like `%` or `^`.

## Running

1. If you are developing, you can run the bot with `npm run watch`. This will watch for changes and restart the bot for every change.
2. Run the bot with `npm start`

## Developing

- [Core Development](core-development)
- [Create a new command](create-command)
- [Add a new event](add-event)

## Hosting

You can host this bot on any provider of your choice. Here is a short tutorial on how to host on google's [Compute Engine](https://cloud.google.com/compute/).

NOTE: Google's App engine is much better than CE for managing the bot but AE often goes inactive even on persistent connection because of no bot activity, hence choose CE if bot is not intended to serve heavy traffic.

- [GCP Compute Engine](https://cloud.google.com/)
  1. Create a CE VM instance
  2. SSH into your instance
  3. Install `nvm`, [know more](https://github.com/creationix/nvm#installation-and-update)
  4. Install nodejs: `nvm install v10.15.3`
  5. Install pm2: npm install -g pm2
  6. Execute the project [install](##installing) steps given above.
  7. Start the bot with pm2 `pm2 start start.js`

Your bot is now online and now can be added to any number of servers. Read the entire procedure [here](https://medium.com/google-cloud/deploying-a-node-js-app-on-google-cloud-8419de45e5dc)
