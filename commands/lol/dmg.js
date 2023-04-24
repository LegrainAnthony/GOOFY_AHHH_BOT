import championsDmg from '../../data/rawData/dmgType.json' assert {type: 'json'}

export default {
    name: 'dmg',
    help: false,
    execute(message, client, args) {
        let str = '';
        args.forEach(champ => {
            let modifiedArgs = champ.charAt(0).toUpperCase() + champ.slice(1).toLowerCase();
            str +=` les dégats de ${modifiedArgs} sont ${championsDmg[modifiedArgs]} \n` 
        });
        message.reply(str)
    },
  };