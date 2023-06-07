import db from "../../data/database.js";
import { getFromUrl } from "../../utils/axiosHelper.js";
export default {
  name: "add-user-db",
  description: "Ajoute un utilisateur à la base de données avec son ID discord",
  help: false,
  execute(message, client, args) {

    if(message.author.id !== process.env.ADMIN_ID) return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande');

    let guild = message.guild;

    guild.members
    .fetch(args[0]) // Replace with your user's ID
    .then((member) => {
    
        const query = `INSERT INTO users (name, id_discord) VALUES (?, ?)`;
        const userName =  member.user.username.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
        db.query(query, [userName, member.user.id], (error) => {
          if (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
          } else {
            message.channel.send(`L'utilisateur ${member.user.username} a été ajouté avec succès !`);
          }
        });
      })
      .catch((error) => {
        return message.reply("Utilisateur non trouvé");
      });

  },
};
