# Creating new Commands

A command is a script that bot execute when user calls it with or without arguments/input. To create a command, you have to follow three simple steps viz.

1. Write a new command
2. Write manual for the command
3. Update the command list

Lets create a simple command named 'hello'. This command will respond with a _Hi!_ whenever user run it.

### STEP 1 - Update Command list

To create a command, updating the command list is foremost necessary. The command list is available at `/configurations/commands.js`. If your command is admin level, register it in `su` else in `gen`. Hello is a general command, hence we will add it in `gen`.

```js
...
    gen: {
        ...
        reload: {
        category: 'fun',
        description: 'respond with a Hi',
        usage: '$hello',
        isEnabled: true
        ...
        }
    }
...
```

> Registering command this way is very important, it gives maintainers easy interface to enable/disable commands.

### STEP 2 - Writing command

Inside the `/commands/` directory, create a new file called `hello.js`. Inside this file we will add some essential code that will run this command.

```js
exports.run = (client, message, args) => {};
```

Here we have exported a function called `run`. When this command is called, `run` gets executed, hence your final code must always be inside this function. Also, if your command uses client or message objects you can do that too in this function. Arguments passed by the user is available through `args` which is an array of strings.

```js
exports.run = (client, message, args) => {
  // message.channel.send: finds channel and send message
  message.channel.send('Hi!');
};
```

Our command is now complete, if user now run `hello` command, bot will respond with a _Hi_.

### STEP 3 - Writing a manual

Once you are all done with your command's basic functionality, it is time to write an elaborative manual. Manuals are very helpful for users to know command usage. To create a manual, create a new file inside `manuals/` with the name `hello.txt`. The format of manual should follow the convention as shown below. The name of the manual file must always be same as command name.

```
NAME
    hello -- responds with a 'Hi!'.

DESCRIPTION
    A hello command to respond with a 'Hi' to the user.

USAGE
    just run the command!

    >>> <prefix>hello
```

You can add more fields. Make manual as informative as possible keeping size less than 2000 characters.

> The command will still work even if no manual is available. However it is recommemded that you also commit them for consistency.
