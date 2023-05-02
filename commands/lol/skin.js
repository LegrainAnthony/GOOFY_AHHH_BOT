import { getFromUrl, getImageFromUrl } from '../../utils/axiosHelper.js'
import getAllNamesChamps from '../../utils/helpers/lol/allChamp.js'
import formatedArgument from '../../utils/helpers/lol/name_formatter.js'
import Discord from 'discord.js'

export default {
    name: 'skin',
    help: true,
    description: 'Cette commande permet de lister tout les skins d\'un champion et permet de voir son Splash Art en le séléctionant',
    async execute(message, client, args) {
        const allNamesChamps = getAllNamesChamps();

        if (args.length > 1 ) {
            message.reply(`Je ne prend qu'un seul argument ex : !lore Aatrox`)
        } else if (args.length <= 0) {
            message.reply(`J'ai besoin d'un argument ex : !lore Aatrox`)
        } 
        else {
                const arg = formatedArgument(args[0]);
                if (allNamesChamps.includes(arg) === false) {
                    message.reply(`${arg} est un argument invalide`)
                } else {
                    const result = await getFromUrl(`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/fr_FR/champion/${arg}.json`);
                    const champDatas =  result.data.data[arg];
                  
                    const skins = champDatas.skins

                    let str = `${champDatas.name} possède ${skins.length} ${skins.length > 1 ? "skins" : "skin"}. Lequel veux-tu voir ? \n  \n `

                    skins.forEach((skin, index) => {
                        str += `${index + 1} ) ${skin.name} \n`;
                    });
                    str += `99 ) Aucun`
                    message.reply(str)

                    const filter = (m) => m.author.id === message.author.id;

                    console.log("Filter function created.");
                    
                    message.channel.awaitMessages({filter: filter, max: 1, time: 60000 })
                      .then(async (response) => {
                        const selectedSkin = parseInt(response.first().content) - 1;
                        if (selectedSkin === 98) {
                            return
                        }
                        if(skins[selectedSkin]) {
                            console.log(skins[selectedSkin].num);
                            const img = await getImageFromUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${arg}_${skins[selectedSkin].num}.jpg`);
                            const buffer = Buffer.from(img.data, 'binary');
                            const attachment = new Discord.MessageAttachment(buffer, 'image.png');
                            message.channel.send({files: [attachment]});
                        }
                        else {
                            message.reply('argument invalide')
                        }
                      })
                      .catch((error) => {
                        console.log("Error or timeout:", error);
                      });
                }
        }
    },
  };

  //   skins: [
  // { id: '266000', num: 0, name: 'default', chromas: false },