const { Message } = require('discord.js');

module.exports = {
    name: 'dolphin',
    description: 'dolphin rape meme',
    cooldown: 1,
    server: true,
    staff: true,
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    execute (message, args) {
        message.channel.send(`https://media.discordapp.net/attachments/543546943071059988/543546998029156362/rapey_rapey-1.gif`);
    }
}
