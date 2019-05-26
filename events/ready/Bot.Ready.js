const BaseEvent = require('../BaseEvent');
const { config } = require('../../configurations');
const { JSONCollection } = require('../../modules');
const { slug } = require('../../modules/utils');
const fs = require('fs')
const path = require('path')

const guildInfo = new JSONCollection('guildInfo');

class Ready extends BaseEvent {
	// handler for event
	async handle() {
		process.stdout.write(
			`Logged in as ${this.client.user.tag.black.bgYellow}\n`.blue
		);

		this.client.user
			.setActivity(`use ${config.client['botPrefix']}help me`)
			.then((presence) => {
				process.stdout.write(
					`Activity set to ${
						presence.game ? presence.game.name.black.bgYellow : 'none'
						}\n`.blue
				);
			})
			.catch((error) => {
				process.stdout.write(error.red);
			});

		this.client.guilds.array().forEach(guild => {
			let members = {}
			const {
				id,
				name,
				createdTimestamp,
				iconURL,
				large,
				memberCount,
				ownerID,
				region,
				verified
			} = guild;

			guildInfo.add(id, {
				name,
				createdTimestamp,
				iconURL,
				large,
				memberCount,
				ownerID,
				region,
				verified
			})

			guild.members.forEach(member => {
				const {
					id,
					joinedTimestamp,
					user,
					permissions
				} = member
				members[id] = { 
					id, 
					joinedTimestamp, 
					"username": user.username,
					"avatarURL": user.avatarURL,
					"bot": user.bot,
					"permissions": permissions.bitfield
				}
			})
			fs.writeFileSync(path.join(__dirname, `../../data/guildMembers/${slug(guild.name)}-${guild.id}.json`), JSON.stringify(members), (err) => {
				if (err) throw err
			})
		})
	}
}

module.exports = Ready;
