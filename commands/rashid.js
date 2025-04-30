const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchRashidCity } = require('../Api/rashidInfo');

module.exports = {
	data: new SlashCommandBuilder().setName('rashid').setDescription('Mostra a localização atual de Rashid'),
	async execute(interaction) {
		try {
			const response = await fetchRashidCity();
			const city = response;

			const embed = new EmbedBuilder().setTitle(`📍 Rashid está em ${city} hoje!`).setColor(0x00ae86);

			if (city === 'Liberty Bay') {
				embed.setImage('https://www.tibiawiki.com.br/images/3/33/Rashid_Liberty_Bay.png');
				embed.setDescription(
					'[Clique aqui para ver a localização exata no mapa interativo](https://tibiamaps.io/map#32303,32840,7:1)'
				);
			}

			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.error('Erro ao obter a localização de Rashid:', error);
			await interaction.reply('Desculpe, não consegui obter a localização de Rashid no momento.');
		}
	},
};
