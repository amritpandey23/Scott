/**
 * module name: cmdFilter
 * description: check if the user is authoriized to run a command
 * dependencies: command list, auth module
 * author: Amrit Pandey
 */

const auth = require('../modules/auth');
const commandList = require('../configurations/commands');

module.exports = (cmdName, member) => {
  /**
   * If a member is an admin or mod, they are able to
   * use any command even if they are disabled, however
   * if the user is not a super user, they cannot use
   * super commands and can only use general commands
   * if those commands are enabled.
   *
   * To disable any command please update it in `command.js`
   * situated in './configurations/` directory.
   */
  const memberIsSu = auth.isAdmin(member) || auth.isMod(member);
  const commandIsSu = commandList.su[cmdName];

  // this is a complex conditional
  if (!memberIsSu) {
    if (commandIsSu) return false;
    else if (!commandList.gen[cmdName].isEnabled) return false;
  }

  return true;
};
