/**
 * Author: Amrit Pandey, @ap4gh
 * Type: Command
 * Name: news
 * Bio: fetches latest headlines from google news
 * Dependency: rss-parser
 *
 * License: MIT
 */

const rssParser = new (require('rss-parser'))();
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  // if nothing is specified, set the news topic to world.
  const searchTerm = args.join(' ') || 'world';
  let feed = await rssParser.parseURL(
    `https://news.google.com/rss/search?q=${searchTerm}`
  );
  // no feed?
  if (!feed.items || feed.items.length === 0)
    return message.channel.send(`No news found for __${searchTerm}__ .`);
  // create a digest
  let digest = '';
  for (i = 0; i < 10; i++) {
    if (digest.length > 1800) break;
    digest += `[${feed.items[i].title}](${feed.items[i].link})\n\`${new Date(
      feed.items[i].pubDate
    ).toDateString()}\`\n\n`;
  }

  const newsEmbed = new RichEmbed();
  newsEmbed
    .setTitle(feed.title.toUpperCase())
    .setDescription(digest)
    .setURL('https://news.google.com/search?q=politics')
    .setColor(0xdfb91f)
    .setFooter(`Generated on: ${new Date().toString()}`);

  message.channel.send(
    `Here are some latest headlines related to __${searchTerm}__.\n`,
    newsEmbed
  );
};
