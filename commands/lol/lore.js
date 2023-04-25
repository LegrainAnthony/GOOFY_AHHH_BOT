import { getFromUrl } from '../../utils/axiosHelper.js'
import getAllNamesChamps from '../../utils/helpers/lol/allChamp.js'

export default {
    name: 'lore',
    help: false,
    description: 'a',
    async execute(message, client, args) {
        const result = await getFromUrl(`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/fr_FR/champion/${args}.json`)
        message.reply(result.data.data[args].lore)
    },
  };