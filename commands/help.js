const { Message } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'displays all the other commands available',
    cooldown: 2,
    server: true,
    disabled: false,
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    execute (message, args) {
        message.channel.send(`Here is a list of my commands ${message.author}: \n**help**, **kick**, **ban**, **clear**, **role**, **verify**, **dev**, **youtube**, **fpyoutube**, **say**, **tempmute**, **dolphin**, **meme**, **afk**, **game**. That's all for now but a lot more are coming and on the way. \n*Some of them are just for the STAFF so you may not have access to them* All of the commands needs the prefix ! `);
    }
}
