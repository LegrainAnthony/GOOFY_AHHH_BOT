import Canvas from '@napi-rs/canvas';
import Discord from 'discord.js';

export default {
    name: 'hide',
    help: false,
    description: 'aaa',
    async execute(message, client, args) {
                class Map {
            constructor(canvas, ctx, background) {
              this.canvas = canvas;
              this.ctx = ctx;
              this.background = background;
            }
          
            async draw() {
              const attachment = new Discord.MessageAttachment(await this.canvas.encode('png'), 'map.png');
              message.channel.send({ files: [attachment] });
            }
          }
          
          async function mapWithPlayers(players) {
            const canvas = Canvas.createCanvas(500, 500);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('/home/legrain/Bureau/GOOFY_AHHH_BOT/assets/images/map11.png');
          
            // Dessiner l'image de fond
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          
            // Dessiner les cercles des joueurs
            for (const player of players) {
              console.log(player);
              const avatarUrl = player.avatar;
              const avatar = await Canvas.loadImage(avatarUrl);
              ctx.beginPath();
              ctx.arc(player.x + 15, player.y + 15, 15, 0, 2 * Math.PI);
              ctx.closePath();
              ctx.clip();
              ctx.drawImage(avatar, player.x, player.y, 30, 30);
              ctx.strokeStyle = 'white';
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.restore(); // Ajoutez cette ligne pour restaurer le contexte initial
            }
          
            new Map(canvas, ctx, background).draw();
          }
          
        async function createFirstMap() {
            const canvas = Canvas.createCanvas(500, 500);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('/home/legrain/Bureau/GOOFY_AHHH_BOT/assets/images/map11.png');

            // Draw the background first
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
            // Set the stroke color and text color to white and set the font
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'white';
            ctx.font = '25px sans-serif';
    
    
            // Draw horizontal lines every 100 pixels
            for (let y = 100; y < canvas.height; y += 100) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
    
            for (let y = 10; y < canvas.height; y += 10) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                if(y === 50 || y === 150 || y === 250 || y === 350 || y === 450) {
                    ctx.lineTo(20, y);
                } else {
                    ctx.lineTo(10, y); 
                }
                ctx.stroke();
            }
    
            // Draw vertical lines every 100 pixels and add numbers at the bottom
            for (let x = 100; x < canvas.width; x += 100) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
    
            for (let x = 10; x < canvas.width; x += 10) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                if(x === 50 || x === 150 || x === 250 || x === 350 || x === 450) {
                ctx.lineTo(x, 20);
                } else {
                ctx.lineTo(x, 10); 
                }
                
                ctx.stroke();
            }
    
    
            ctx.fillText('0', 5, 495);
            ctx.fillText('50 y', 5, 20);
            ctx.fillText('x 0', 455, 495);
    
            const attachment = new Discord.MessageAttachment(await canvas.encode('png'), 'map.png');
            message.channel.send({ files: [attachment] });
            
            const responsesObjects = []
            const potitions = message.channel.awaitMessages({time: 10000 })
                potitions.then((responses) => {             
                responses.forEach((response) => {
                    responsesObjects.push({name: response.author.username, content : response.content, avatar: message.author.avatarURL()})
                })
            }).then(() => {
                const lastValues = {};
                const goodFormat = /\b(x|y):\d{1,2}\b/
              
                for (const response of responsesObjects) {
                  if (goodFormat.test(response.content)) {
                    lastValues[response.name] = {
                      content: response.content,
                      avatar: response.avatar // inclure la propriété avatar dans la structure de données
                    };
                  }
                }
              
                const result = Object.entries(lastValues).map(([name, value]) => ({
                  name,
                  content: value.content,
                  avatar: value.avatar // récupérer la propriété avatar depuis la structure de données
                }));
              
                const players = result.map(element => {
                  const contentSplit = element.content.split(' ');
                  const x = Number(contentSplit[0].split(':')[1] * 10);
                  const y = Number(contentSplit[1].split(':')[1] * 10);
                  return { name: element.name, x: x, y: y, avatar: element.avatar };
                });
              
                if (players.length > 0) {
                  mapWithPlayers(players)
                } else {
                  message.channel.send('Il n\'y a pas de joueurs')
                }
              })
        }

        createFirstMap();
     },
};
