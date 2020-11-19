const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description : 'bans a user',
    usage: '<user> <reason>',
    server: true,
    args: true,
    staff: true,
    /**
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    execute(message, args) {
        let user = message.guild.member(message.mentions.members.first() || message.client.users.cache.get(args[0]));
        if(!user) return message.reply('You must specify a user to ban!');
        if (user.hasPermission("BAN_MEMBERS")) return message.reply('This user cannot be banned!')
        args.shift();
        let reason = args.join(' ');
        if(!reason) reason = 'Unspecified';
        user.ban({reason: reason});
    }
}
