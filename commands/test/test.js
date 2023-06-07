 import axios from 'axios';
 import db from '../../data/database.js';

export default {
  name: 'test',
  help: false,
   async execute(message, client, args) {

    // const str = args.join(' ');

    //     const encodedParams = new URLSearchParams();
    //     encodedParams.set('source', 'fr');
    //     encodedParams.set('target', 'de');
    //     encodedParams.set('q', `${str}`);

    //     const options = {
    //       method: 'POST',
    //       url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    //       headers: {
    //         'content-type': 'application/x-www-form-urlencoded',
    //         'Accept-Encoding': 'application/gzip',
    //         'X-RapidAPI-Key': 'de65c214b9msh3ad6642938dc20cp184046jsn7595a3d4e88c',
    //         'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    //       },
    //       data: encodedParams,
    //     };

    //     try {
    //       const response = await axios.request(options);
    //       message.reply(response.data.data.translations[0].translatedText);
    //     } catch (error) {
    //       console.error(error);
    //     }

    const query = `INSERT INTO user (name) VALUES (?)`;

    db.query(query,['test'], (error) => {
      if (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      } else {
        message.channel.send('Utilisateur ajouté avec succès !');
      }
    });

      },
  };