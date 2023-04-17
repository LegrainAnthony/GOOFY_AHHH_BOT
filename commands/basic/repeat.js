export default {
    name: 'repeat',
    execute(message, args) {
        const str = args.join(' ')
        message.channel.send(`${str}`)
    }
}