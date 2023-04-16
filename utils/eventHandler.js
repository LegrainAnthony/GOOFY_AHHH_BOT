import fs from 'fs';

export const eventHandler = (client) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = import(`../events/${file}`)
        event.then((event) => {
            const configObj = event.default;
            if(configObj.once) {
                client.once(configObj.name, (...args) => configObj.execute(client, ...args));
            } else {
                client.on(configObj.name, (...args) => configObj.execute(client, ...args));
            }
        });
    }
};