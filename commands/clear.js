const Discord = require('discord.js');

module.exports = {
  name: 'clear',
  server: true,
  args: true,
  staff: true,
  /**
   * @param {Discord.Message} message 
   * @param {string[]} args 
  */
  execute (message, args) {
    const deleteCount = Number(args[0]);
    message.channel.bulkDelete(deleteCount);
    message.reply('Messages cleared sucessfuly');
  }
}
