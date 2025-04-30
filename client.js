const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs').promises;
require('dotenv').config();

const createClient = async () => {
	const client = new Client({
		intents: [GatewayIntentBits.Guilds],
	});

	client.commands = new Collection();

	const commandFiles = await fs.readdir('./commands');
	for (const file of commandFiles.filter((file) => file.endsWith('.js'))) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name, command);
	}

	return client;
};

module.exports = { createClient };
