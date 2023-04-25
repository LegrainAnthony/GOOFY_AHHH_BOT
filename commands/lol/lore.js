import { getFromUrl, getImageFromUrl } from '../../utils/axiosHelper.js'
import getAllNamesChamps from '../../utils/helpers/lol/allChamp.js'
import formatedArgument from '../../utils/helpers/lol/name_formatter.js'
import Discord from 'discord.js'

export default {
    name: 'lore',
    help: true,
    description: 'Cette commande donne l\'histoire du personnage ainsi que son splash art.',
    async execute(message, client, args) {
        const allNamesChamps = getAllNamesChamps();

        if (args.length > 1 ) {
            message.reply(`Je ne prend qu'un seul argument ex : !lore Aatrox`)
        } else if (args.length <= 0) {
            message.reply(`J'ai besoin d'un argument ex : !lore Aatrox`)
        } 
        else {
            for (let i = 0; i < args.length; i++) {
                const arg = formatedArgument(args[i]);
                if (allNamesChamps.includes(arg) === false) {
                    message.reply(`${arg} est un argument invalide`)
                    break
                } else {
                    const result = await getFromUrl(`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/fr_FR/champion/${arg}.json`)
                    const response = await getImageFromUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${arg}_0.jpg`);
                    const buffer = Buffer.from(response.data, 'binary');
                    const attachment = new Discord.MessageAttachment(buffer, 'image.png');
                    message.channel.send({content: result.data.data[arg].lore, files: [attachment]});
                }
            }
        }
    },
  };