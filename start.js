require('colors');
const fs = require('fs');
const path = require('path');
const bot = require('./bot');
const { Auth, Utils,  JSONCollection } = require('./modules');
const { schemes } = require('./configurations');

const guildInfo = new JSONCollection('guildInfo');

Object.keys(schemes).forEach(schemeName => {
    fs.readdir('./data', { encoding: 'utf8' }, (err, files) => {
        if (!files.includes(`${schemeName}.json`)) {
            fs.writeFileSync(path.join(__dirname, `data/${schemeName}.json`), 
            JSON.stringify(schemes[schemeName])
            ,(err) => {
                if (err) throw err
            })
        }
    })
})

Utils.checkLogFiles();
bot.login(Auth.botToken);