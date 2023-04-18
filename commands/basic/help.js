export default {
    name: 'help',
    description: 'Goofy va te lister toutes ses commandes',
    help: true,
    execute(message, client) {
        const commands = [];
        for (let command of client.commands){
            commands.push(command);
        };
        let str = `Ça fais pitié de demander de l'aide mais bref   😹 👎\n \n`;
        for (let i = 0; i < commands.length; i++) {
            if (commands[i][1].help) {
                const help_str = `!${commands[i][1].name} => ${commands[i][1].description} \n \n`;
                str += help_str;
            };
        };

        message.reply(str);
    }
}