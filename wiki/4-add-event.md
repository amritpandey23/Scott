# Add new Events

Event refers to an entity that gets triggered when some action happens in the server. Eg. member joins server, member gets banned etc. All events resides in the `/events/` directory. Lets create a simple trigger for a client(bot) event that gets executed whenever a new channel is created on any server. All the client events can be found [here](https://discord.js.org/#/docs/main/stable/class/Client).

## STEP 1 - Write an Event

Lets create an event file named `createChannel.js` inside `events/` directory. Inside this file we will add some essential code that will help run this event.

```js
exports.run = (client, channel) => {};
```

In the above code we have just exported a function named `run`, this function accepts two arguments, `client: Discord.Client()` and `obj: any`. Here client is our bot and object is channel which gets emitted by the event trigger whenever any channel is created. Lets now log a message.

```js
exports.run = (client, channel) => {
  console.log(
    `A new channel with id ${channel.id} and type ${
      channel.type
    } was created at ${channel.createdAt}.`
  );
};
```

> Everything you want to happen needs to end up inside `run` function block.
