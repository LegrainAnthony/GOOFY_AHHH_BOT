
import db from '../../data/database.js'

export default {
    name: "win",
    description: "Ajoute une victoire à un utilisateur",
    help: false,
    async execute(message, client, args) {
        const nameId = [
            {
                name: "Anthony",
                id: 1
            },
            {
                name: "Virgil",
                id: 12
            },
            {
                name: "Micka",
                id: 7
            }        ]



        const players = args.filter(arg => nameId.some(obj => obj.name === arg));
        const uniqueName = players.filter((name, index) => players.indexOf(name) === index);
        const ids = nameId
          .filter(player => uniqueName.includes(player.name))
          .map(player => player.id);

        if(uniqueName.length !== 2) {
           return message.reply("Nombre incorrect de joueurs / les noms acceptés sont : 'Anthony', 'Virgil', 'Micka'.");
        }

       
            const query = `
            SELECT w.win, w.users_id, w.id
            FROM scores s
            JOIN win w ON (s.win1_id = w.id OR s.win2_id = w.id)
            WHERE (s.player1_id = ? AND s.player2_id = ?)
               OR (s.player1_id = ? AND s.player2_id = ?);
                `;
    
                db.query(query, [ids[0], ids[1], ids[1], ids[0]], (error, results) => {
                    if (error) {
                        console.error("Erreur", error);
                    } else {
                        const formatedData = [];
                        for(let elm of results) {
                            for(let player of nameId) {
                                if (elm.users_id === player.id) {
                                    formatedData.push({
                                        name: player.name,
                                        win: elm.win,
                                        win_id: elm.id
                                    })
                                }
                            }
                        }
                    
                        formatedData.sort((a, b) => {
                            const indexA = uniqueName.indexOf(a.name);
                            const indexB = uniqueName.indexOf(b.name);
                            
                            return indexA - indexB;
                          });


                        if(args[0] === '-s') {
                        message.reply(`${formatedData[0].name} - ${formatedData[0].win} | ${formatedData[1].win} - ${formatedData[1].name}`)
                        } else if (args[0] === '-a') {
                            const query = `
                            UPDATE win
                            SET win = win + 1
                            WHERE id = ?
                            `;

                            db.query(query, [formatedData[0].win_id], (error) => {
                                if (error) {
                                    console.error("Erreur", error);
                                } else {
                                    message.reply(`Victoire ajoutée pour ${formatedData[0].name} il a maintenant ${formatedData[0].win + 1} victoires contre ${formatedData[1].name}`);
                                }
                            });
                        }
                    }
                });
        }
    }