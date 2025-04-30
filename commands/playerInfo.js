const { SlashCommandBuilder } = require('discord.js');
const { fetchPlayerInfo } = require('../Api/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('char')
		.setDescription('Obter informações sobre um jogador no Tibia')
		.addStringOption((option) => option.setName('nome').setDescription('Nome do Char').setRequired(true)),

	async execute(interaction) {
		const playerName = interaction.options.getString('nome');

		try {
			const playerData = await fetchPlayerInfo(playerName);
			const playerInfo = playerData.character;

			await interaction.reply(
				`Informações que podem ser úteis:\nNome: ${playerInfo.character.name}\nLevel: ${playerInfo.character.level}\nVocação: ${playerInfo.character.vocation}\nGuilda: ${playerInfo.character.guild.name}\nCargo: ${playerInfo.character.guild.rank}`
			);
		} catch (error) {
			await interaction.reply('Erro ao buscar informações do jogador,\nVerifique se o nome esta correto.');
		}
	},
};
