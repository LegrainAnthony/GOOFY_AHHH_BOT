import championsDatas from '../../data/rawData/champions.json' assert {type: 'json'}

export default {
    name: '1v1',
    help: false,
    execute(message) {
      const nameChamps = []; 
      for (const champ in championsDatas.data) {
       nameChamps.push(champ);
       console.log(champ);
      }
      let firstRandomValue = Math.floor(Math.random() * nameChamps.length);
      let firstChamp = nameChamps[firstRandomValue];

      let secondRandomValue = Math.floor(Math.random() * nameChamps.length);
      let secondChamp = nameChamps[secondRandomValue];

      message.reply(`Vous allez jouer ${firstChamp} contre ${secondChamp}`)
    },
  };