const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Send a Custom Embed',
    args: true,
    usage: '<Color> <Text>',
    owner: true,
    execute(message, args) {
        const embed = new Discord.MessageEmbed();
        const color = args[0];
        args.splice(0, 1);
        const text = args.join(' ');
        embed.setTitle("Next Giveaway VOTE").setColor(Number("0x" + color)).setDescription(text);
        return message.channel.send(embed);
    }
}
