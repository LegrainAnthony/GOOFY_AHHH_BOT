export default {
    name: 'bonjour',
    description: 'Goofy est poli, il te répondra ',
    help: true,
    execute(message) {
        message.channel.send('Salut comment ça va')
    },
};