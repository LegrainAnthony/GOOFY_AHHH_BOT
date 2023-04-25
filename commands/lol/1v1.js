import getAllNamesChamps from '../../utils/helpers/lol/allChamp.js'

export default {
    name: '1v1',
    help: false,
    execute(message) {
      const nameChamps = getAllNamesChamps();
      
      let firstRandomValue = Math.floor(Math.random() * nameChamps.length);
      let firstChamp = nameChamps[firstRandomValue];

      let secondRandomValue = Math.floor(Math.random() * nameChamps.length);
      let secondChamp = nameChamps[secondRandomValue];

      message.reply(`Vous allez jouer ${firstChamp} contre ${secondChamp}`)
    },
  };