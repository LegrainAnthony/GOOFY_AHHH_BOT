import { GetFromUrl } from '../../utils/axiosHelper.js'

export default {
    name: 'lore',
    description: 'Cette commande permet d\'obtenir le lore d\'un champion',
    help: false,
    async execute(message, client, args) {
        // if(args.length < 1)
        // const result = await GetFromUrl(`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/fr_FR/champion/${args}.json`);
        // message.reply(result[args].lore);
    }
}