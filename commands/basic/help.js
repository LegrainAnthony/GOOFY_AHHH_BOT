export default {
    name: 'help',
    execute(message, client, args) {
        console.log('aaa');
        for (let command in client.commands){
            console.log(command);
        }
    }
}