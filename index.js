const { createClient } = require('./client');
require("./keepAlive");

const startBot = async () => {
	try {
		const client = await createClient();

		client.once('ready', () => {
			console.log(`✅ Bot online como ${client.user.tag}`);
		});

		client.on('interactionCreate', async (interaction) => {
			if (!interaction.isCommand()) return;

			const command = client.commands.get(interaction.commandName);
			if (!command) {
				console.log(`Comando ${interaction.commandName} não encontrado.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'Erro ao executar o comando.',
					ephemeral: true,
				});
			}
		});

		await client.login(process.env.DISCORD_TOKEN);
	} catch (error) {
		console.error('Erro ao iniciar o bot:', error);
	}
};

startBot();
