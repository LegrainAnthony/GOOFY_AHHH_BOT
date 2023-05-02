import championsDmg from '../../data/rawData/dmgType.json' assert {type: 'json'}

export default {
    name: 'dmg',
    help: false,
    execute(message, client, args) {
        console.log(args);
        let str = '';
        args.forEach(champ => {
            const champRectified = champ.charAt(0).toUpperCase() + champ.slice(1).toLowerCase();
            str +=` les dégats de ${champRectified} sont ${championsDmg[champRectified]} \n`;
        });
        message.reply(str)
    },
  };