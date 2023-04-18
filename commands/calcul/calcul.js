export default {
    name: 'calcul',
    description: 'Vu ton niveau en math Goofy va t\'aider',
    help: true,
    execute(message, client, ...args) {
        let calcul = '';
        for (let i = 0; i < args[0].length; i++) {
            calcul += args[0][i];
          }
        const isExpressionValid = /^[0-9+\-*/().\s]+$/.test(calcul);
        if (isExpressionValid) {
          const total = eval(calcul);
          message.reply(`${total}`);
        } else {
          message.reply('Expression invalide.');
        }
      }
  };