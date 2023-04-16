import  config  from '../config/config.json' assert { type: 'json' };
console.log(config.prefix);

export default {
    name : 'messageCreate',
    execute(client, message) {
        if(!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(' ');
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        if(!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Il y a eu une erreur lors de l\'exécution de cette commande.')
        }
    }
}