module.exports = {
  su: {
    announce: {
      category: '🛠 utility',
      description: 'makes an announcement on the channel',
      usage: '<message>',
      isEnabled: true
    }
  },
  gen: {
    help: {
      category: '🛠 utility',
      description: 'display manual for a command',
      usage: '<command name>',
      isEnabled: true
    },
    reload: {
      category: '🛠 utility',
      description: 'clear cache generated by any command',
      usage: '<command names>',
      isEnabled: true
    },
    define: {
      category: '🌐 web',
      description: 'provides definition for words from web',
      usage: '?wiki <search string>',
      isEnabled: true
    },
    bot: {
      category: '🛠 utility',
      description: 'gets information about bot',
      usage: '<information type>',
      isEnabled: true
    },
    gupt: {
      category: '👻 fun',
      description: 'send anonymous message to anyone',
      usage: '<user id> <message>',
      isEnabled: true
    }
  }
};
