const { Message } = require('discord.js');

module.exports = {
    name: 'verify',
    execute (message, args) {
    let role = message.guild.roles.cache.find(role => role.name == "MEMBER");
    message.member.roles.add(role);
    message.reply("You have been verified.");
    message.delete({ timeout: 10 });
    message.channel.bulkDelete(1);
    }
}
