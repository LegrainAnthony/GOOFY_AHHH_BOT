import Canvas from '@napi-rs/canvas';
import Discord from 'discord.js';

export default {
    name: 'hide',
    help: false,
    description: 'aaa',
    async execute(message, client, args) {

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
                    responsesObjects.push({name: response.author.username, content : response.content})
                })
            }).then(() => {
                console.log(responsesObjects);
            })

        }



        createFirstMap();
    },
};
