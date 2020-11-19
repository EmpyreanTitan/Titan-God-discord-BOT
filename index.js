const Discord = require('discord.js');
const fs = require('fs');
const { token, prefix } = require('./core/config.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

let cmdCounter = 0;

for (const file of commandFiles) {
    const commandName = require(`./commands/${file}`);

    client.commands.set(commandName.name, commandName);
    cmdCounter++;
    console.log(`Successfully Loaded ${file}! (${cmdCounter}/${commandFiles.length})`);
}

client.once('ready', () => {
    const statuses = ["Custom Status 1","Custom Status 2"]
    setInterval(function() {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity({type: 'Watching', name: status});
    }, 3500)
})
client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = (client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName)));

    if (command.disabled) return message.reply('This command has been disabled!');

    if (command.server && message.channel.type != 'text') return message.reply('This command cannot be used outside of a server!');

    if (command.staff && !message.member.roles.cache.find(role => role.name != "ADMINS")) return message.reply('You must be staff to execute this command!');

    if (command.mods && !message.member.roles.cache.find(role => role.name != "MODERATORS")) return message.reply('You must be moderator to execute this command!');

    if (command.owner && !message.member.roles.cache.find(role => role.name != "OWNER")) return message.reply('You must be owner to execute this command!');

    if (command.args && !args.length) {
        let reply = `<@${message.author.id}>, You didn't provide any arguments!\n`;
        if (command.usage) {
            reply += `The correct usage for this command would be: \`${prefix}${command.name} ${command.usage}\`.`;
            return message.channel.send(reply);
        }
        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (e) {
        message.reply('There was an error executing that command!');
        console.error(e);
    }
});
client.on("message", (message) => {
    if(message.author.id == "USER ID"){
        message.delete()
    }
});
//i'm back message
client.on('message', message => {
	if (message.content === `i'm back`) {
	message.channel.send(`${message.author.tag} is back from the deads... WELCOME BACK ${message.author.tag}!`);
}
});
client.on('message', message => {
	if(message.content.includes(`question`)) {
	    message.channel.send(`${message.author.tag} please go take a look in <#771374706174853170>`);
    }
});

client.on('guildMemberAdd', member => {
    let welcome_message = "Welcome member to **guild**!\nPlease read the rules and refer to the appropriate channels for assistance"
    if (member.guild.id == "773693304444944425") {
        welcome_message = welcome_message.replace('member', member);
        welcome_message = welcome_message.replace('**guild**', member.guild.name);
        member.guild.systemChannel.send(welcome_message);
    }
})

client.login(token);
