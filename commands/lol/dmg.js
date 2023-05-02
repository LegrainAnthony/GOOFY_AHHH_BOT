import championsDmg from '../../data/rawData/dmgType.json' assert {type: 'json'}
import formatedArgument from '../../utils/helpers/lol/name_formatter.js';

export default {
    name: 'dmg',
    help: false,
    execute(message, client, args) {
        console.log(args);
        let str = '';
        args.forEach(champ => {
            let modifiedArgs = formatedArgument(champ)
            console.log(modifiedArgs);
            str +=` les dégats de ${modifiedArgs} sont ${championsDmg[modifiedArgs]} \n` 
        });
        message.reply(str)
    },
  };