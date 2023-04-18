export default {
    name: 'repeat',
    description: 'Goofy va répéter ce que tu va lui dire après le !repeat',
    help: true,
    execute(message, args) {
        const str = args.join(' ')
        message.channel.send(`${str}`)
    }
}