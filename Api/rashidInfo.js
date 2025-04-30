const axios = require('axios');

const fetchRashidCity = async () => {
	try {
		const response = await axios.get('https://api.tibialabs.com/v3/misc/rashid/city');
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar informações do Rashid:', error);
		throw new Error('Não foi possível acessar a API do Tibia');
	}
};

module.exports = { fetchRashidCity };
