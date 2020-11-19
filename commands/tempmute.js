const ms = require('ms');


const { Message } = require ('discord.js')

module.exports = {
    name: 'tempmute',
    description: 'Mutes a user for specified amount of time.',
    usage: '<Member> <Time>',
    staff: true,
    server: true,
    args: true,
    /**
     * @param {Message} Message
     * @param {string[]} args
     */
    execute (message, args) {
        const member = message.guild.member(message.mentions.members.first() || message.client.users.cache.get(args[0]));
        args.splice(0, 1);
        const time = args[0];
        if (!member) return message.reply('Please specify a user to mute!');
        if (!time) return message.reply("Please specify an amount of time (10s/1m/1h/1d)");
        const roles = member.roles.cache;
        console.log(`Mute Time : ${ms(time)}ms`);
        try {
            member.roles.remove(roles);
            member.roles.add(member.guild.role.find(role => role.name == "MUTED"))
        } catch (e) {
            console.error(e)
        }
        message.channel.send(`${member.user.tag} has been muted for ${time}`);
        setTimeout(function() {
            message.channel.send(`${member.user.tag} has been unmuted!`);
            member.roles.remove(member.guild.roles.cache.find(role => role.name == 'MUTED'));
            member.roles.add(roles);
        }, ms(time));
    }
}
