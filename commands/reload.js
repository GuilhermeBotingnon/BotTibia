const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder().setName('reload').setDescription('Recarrega os comandos do bot'),

	async execute(interaction) {
		try {
			// Caminho para a pasta de comandos
			const commandsPath = path.join(__dirname, '../commands');
			const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

			// Limpa o cache dos módulos
			commandFiles.forEach((file) => {
				delete require.cache[require.resolve(path.join(commandsPath, file))];
			});

			// Recarrega os comandos
			interaction.client.commands.clear();
			for (const file of commandFiles) {
				const command = require(path.join(commandsPath, file));
				interaction.client.commands.set(command.data.name, command);
			}

			await interaction.reply('Comandos recarregados com sucesso!');
		} catch (error) {
			console.error(error);
			await interaction.reply('Erro ao recarregar os comandos.');
		}
	},
};
