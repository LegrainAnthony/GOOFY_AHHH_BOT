
import { Client, Intents } from 'discord.js';
import { commandHandler } from './utils/commandHandler.js';
import { eventHandler } from './utils/eventHandler.js';
import * as dotenv from 'dotenv'

dotenv.config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });

eventHandler(client);
commandHandler(client);

client.login(process.env.BOT_TOKEN);