const axios = require('axios');

const fetchPlayerInfo = async (playerName) => {
	try {
		const response = await axios.get(`https://api.tibiadata.com/v4/character/${playerName}`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar informações do jogador:', error);
		throw new Error('Não foi possível acessar a API do Tibia');
	}
};

module.exports = { fetchPlayerInfo };
