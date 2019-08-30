const
  fs = require("fs"),
  colors = require("colors/safe"),
  clear = require("clear"),
  inquirer = require("inquirer"),
  figlet = require("figlet"),
  { PATHS } = require("./settings"),
  { logger } = require("../utils");

let inquirer_questions = [
  {
    name: "bot_token",
    type: "input",
    message: "Enter discord bot token:",
    validate: function (value) {
      if (value.length)
        return true;
      return "Please enter discord bot token:";
    }
  },
  {
    name: "bot_prefix",
    type: "input",
    message: "Enter a suitable command prefix:",
    default: "$",
  },
  {
    name: "database_host",
    type: "input",
    message: "Enter database host address:",
    default: "http://localhost"
  },
  {
    name: "database_port",
    type: "input",
    message: "Enter database port:",
    default: "27017"
  },
  {
    name: "database_username",
    type: "input",
    message: "Enter database username:",
    default: ""
  },  
  {
    name: "database_password",
    type: "input",
    message: "Enter database password:",
    default: ""
  },
];

function save(data) {
  let credentials = {};

  for (let cred of Object.keys(data)) {
    let [field, prop] = cred.split('_');
    if (!credentials[field]) {
      credentials[field] = {};
    }
    credentials[field][prop] = data[cred];
  }

  fs.writeFile(
    PATHS.CREDENTIALS,
    JSON.stringify(credentials),
    function (err) {
      if (err) {
        return logger.error(err);
      }
      return logger.success("credentials were successfully saved!");
    });
}

async function initialise() {

  clear();
  console.log(colors.yellow(
    figlet.textSync("Scott", { horizontalLayout: "full" })
  ));
  save(await inquirer.prompt(inquirer_questions));

}

initialise();
