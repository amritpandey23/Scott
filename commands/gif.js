/**
 * Author: Amrit Pandey, @ap4gh
 * Type: Command
 * Name: gif
 * Bio: sends gif to the channel
 * Dependency: request-promise-native, request
 *
 * License: MIT
 */

const request = require('request-promise-native');
const api_keys = require('../configurations/api_keys.json');

exports.run = async (client, message, args) => {
  const gifTerm = args.join(' ');
  const gifRequest = await request({
    url: `https://api.tenor.com/v1/search?q=${gifTerm}&key=${
      api_keys.tenor
    }&limit=8`,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!gifRequest.results || gifRequest.results.length === 0) return;
  message.channel.send({
    embed: {
      color: 0xdfb91f,
      title: `Gif: ${gifTerm}`,
      image: {
        url:
          gifRequest['results'][Math.floor(Math.random() * 8) + 1]['media'][0][
            'gif'
          ]['url']
      }
    }
  });
};
