import fs from 'fs';

export const commandHandler = async (client) => {
    client.commands = new Map();
    const readCommand = async (dir) => {
        const files = fs.readdirSync(dir);
        
        for(const file of files) {
            const path = `${dir}/${file}`;
            const stat = fs.statSync(path);
            
            if(stat.isDirectory()) {
                await readCommand(path);
            } else if (file.endsWith('.js')) {
                const commandModule = await import(`../${path}`);
                const commandObj = commandModule.default;
                client.commands.set(commandObj.name, commandObj);
            }
        }
    }
    
    await readCommand('./commands');
}