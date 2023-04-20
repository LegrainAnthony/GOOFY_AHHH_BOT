import championsDmg from '../../data/rawData/dmgType.json' assert {type: 'json'}

export default {
    name: 'dmg',
    help: false,
    execute(message, client, args) {
        let str = '';
        args.forEach(champ => {
            console.log(champ);
            str +=` les dégats de ${champ} sont ${championsDmg[champ]} \n` 
        });
        message.reply(str)
    },
  };