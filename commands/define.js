/**
 * author: ap4gh(Github), debjay(on CodeCareer Discord Server)
 * license: MIT https://opensource.org/licenses/MIT
 */
const maintainerID = '274434863711518722';
/**
 * command_name: define
 * version: 3.0.1
 * description: Provides definition for words from web.
 * npm_dependencies: { request, request-promise-native }
 */

const request = require('request-promise-native');

const maxRelatedTopics = 4;

/*
    ------------ HELPER FUNCTIONS ------------
*/

const notifyErrors = (message, err = '') => {
  // maintainer can be changed by changing the maintainer ID
  // from the top of the file.
  const author = message.guild.member(maintainerID);
  author.send(`Message ID: ${message.id}`);
  author.send('```' + err + '```');
  message.channel.send(
    `Some internal error occured, maintainer ${author} has been notified.`
  );
};

const sendMessage = (message, messageContent) => {
  try {
    message.channel.send(messageContent);
  } catch (e) {
    console.error(e);
    return notifyErrors(message, e);
  }
};

const generateQueryURL = (phrase, service = 'ddg') => {
  const queryURLs = {
    wiki: `https://en.wikipedia.org/w/api.php?action=opensearch&list=search&search=${phrase}&format=json&formatversion=2`,
    ddg: `https://api.duckduckgo.com/?q=${phrase}&format=json`
  };
  return encodeURI(queryURLs[service]);
};

const runUserCommand = (message, args, commandName = '') => {
  const availableCommands = {
    wiki: wikipediaOpenSearch,
    default: ddgInstantAnswer
  };
  // if commandName does not match any, return default
  return (availableCommands[commandName] || availableCommands.default)(
    message,
    args
  );
};

/*
    ------------ COMMAND FUNCTIONS ------------
*/

/**
 *      •• DUCKDUCKGO INSTANT ANSWER ••
 */
const ddgInstantAnswer = async (message, args) => {
  // join args to create a search phrase
  const searchPhrase = args.slice(0, args.length).join(' ');
  let data;
  try {
    data = await request({
      url: generateQueryURL(searchPhrase),
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.error(e);
    // if request fails report errors
    return notifyErrors(message, e);
  }
  let result = `:mag: \`${searchPhrase}\`\n`;
  const relatedTopics = data['RelatedTopics'];
  const abstractText = data['AbstractText'];
  const abstractURL = data['AbstractURL'];
  // if no data is provided:
  if (relatedTopics.length === 0) {
    result += `Cannot find information on *${searchPhrase}* :no_good: Read the command guide with \`!define --help\` to get accurate results.`;
  } // if abstract data is missing:
  else if (!abstractText || !abstractURL) {
    result += `*"${searchPhrase}" may refer to following things*  :point_down:\n\n`;
    for (let topic of relatedTopics) {
      // keeping maximum of 3 related topics to be displayed.
      // maximum related topics can be changed at the top.
      // NOTE: discord do not allow a message length > 2000
      // characters.
      if (
        topic['Text'] === undefined ||
        topic['FirstURL'] === undefined ||
        relatedTopics.indexOf(topic) >= maxRelatedTopics
      )
        break;
      result += `${topic['Text']}\n${topic['FirstURL']}\n\n`;
    }
  } // if abstract data exist:
  else {
    result += '```' + abstractText + '```:link: ' + abstractURL;
  }
  return sendMessage(message, result);
};

/**
 *      •• WIKIPEDIA OPEN SEARCH ••
 */
const wikipediaOpenSearch = async (message, args) => {
  // join args after 'wiki' to create a search phrase
  const searchPhrase = args.slice(1, args.length).join(' ');
  let data;
  try {
    data = await request({
      url: generateQueryURL(searchPhrase, 'wiki'),
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.error(e);
    return notifyErrors(message, e);
  }
  // all definitions:
  const definitions = data[2];
  // all wikipedia page links:
  const links = data[3];
  // main definition page link:
  let wikipediaPageLink = ':link: ' + links[0];
  let result = definitions[0];
  // no information is received from wikipedia:
  if (!result) {
    result = `No information provided for *${searchPhrase}* :no_good: `;
  } // a word have more than one meaning:
  else if (result.match(/may refer to/g)) {
    result =
      `:mag: **Wikipedia**: \`${searchPhrase}\`\n\n` +
      '```\n' +
      result +
      '\n\n';
    // remove useless definition at index 0:
    definitions.shift();
    // collect related definition:
    let nonEmptyDefinitions = [];
    for (let d of definitions) if (d.length > 0) nonEmptyDefinitions.push(d);
    for (let i = 0; i < maxRelatedTopics; ++i) {
      if (nonEmptyDefinitions[i] == undefined) break;
      result += `${i + 1}. ${nonEmptyDefinitions[i]}\n\n`;
    }
    result += '```';
  } // exact meaning is obtained:
  else {
    result =
      `:mag: ${searchPhrase}` + '```' + result + '```' + wikipediaPageLink;
  }
  return sendMessage(message, result);
};

// run function for !define command:
exports.run = (client, message, args) => runUserCommand(message, args, args[0]);
