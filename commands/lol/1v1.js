import championsDatas from '../../data/rawData/champions.json' assert {type: 'json'}

export default {
    name: '1v1',
    help: true,
    description: 'Sélectionne deux champions aléatoirement de lol, si la commande est précédé par un type : [Mage, Support, Assasin, Marksman, Fighter] seulement les champions de la catégorie sera choisi. Si vous rajouter des arguments supplémentaire les champions seront associer à ses dernier ex : !1v1 virgil antho',
    execute(message, client, args) {

      const nameChamps = [];
      const tagsChamp = [];

      let firstRandomValue;
      let secondRandomValue;
      let firstChamp;
      let secondChamp;
      let messageReply = '';

      const filteredArgs = args.filter((arg) => arg === "Mage" || arg === "Support" || arg === "Tank" || arg === "Assassin" || arg === "Marksman" || arg === "Fighter" );
      const namesArgs =  args.filter((arg) => arg !== "Mage" && arg !== "Support" && arg !== "Tank" && arg !== "Assassin" && arg !== "Marksman" && arg !== "Fighter" );

      function ramdomArray (array) {
        return Math.floor(Math.random() * array.length)
      }

      for (const champ in championsDatas.data) {
        if (filteredArgs.length > 0) {
          if(championsDatas.data[champ].tags[0].includes(filteredArgs[0])){
            tagsChamp.push(champ)
          }
        }
        nameChamps.push(champ);
      }
           
      if(filteredArgs.length > 0) {
        console.log(filteredArgs);
        secondRandomValue = ramdomArray(tagsChamp);
        firstRandomValue = ramdomArray(tagsChamp)
        firstChamp = tagsChamp[firstRandomValue];
        secondChamp = tagsChamp[secondRandomValue];
        if (namesArgs.length > 0) {
          messageReply = `${namesArgs[0]} va jouer ${firstChamp} et ${namesArgs[1]} ${secondChamp}`
        } else {
          messageReply = `Vous allez jouer ${firstChamp} contre ${secondChamp}`
        }
      } else {
        secondRandomValue = ramdomArray(nameChamps);
        firstRandomValue = ramdomArray(nameChamps)
        firstChamp = nameChamps[firstRandomValue];
        secondChamp = nameChamps[secondRandomValue];
        if (namesArgs.length > 0) {
          messageReply = `${namesArgs[0]} va jouer ${firstChamp} et ${namesArgs[1]} ${secondChamp}`
        } else {
          messageReply = `Vous allez jouer ${firstChamp} contre ${secondChamp}`
        }
      }
      message.reply(messageReply)
    },
  };

  // récupérer les agurment et filtrer faire un tableau pour les types et les joeurs