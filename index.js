
import { Client, Intents } from 'discord.js';
import { commandHandler } from './utils/commandHandler.js';
import { eventHandler } from './utils/eventHandler.js';
import config from './config/config.json' assert {type: 'json'};

  
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

eventHandler(client);
commandHandler(client);

client.login(process.env.BOT_TOKEN);