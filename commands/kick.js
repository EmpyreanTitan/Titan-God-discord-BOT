module.exports = {
    name: "say",
    description: "Get the bot to say what ever you want!",
    usage: "<msg>",
    args: true,
    execute (message, args) {
        message.delete({timeout: 10});
        const msg = args.join(' ');
        message.channel.send(msg);
    },
  };
