const axios = require('axios');

const EnvConfig = require('../utils/env.config');
const { wather_api_key } = EnvConfig();

const coords = `lat=40.453029668993466&lon=-3.726161408178773`;
const apikey = wather_api_key;
const url = `https://api.openweathermap.org/data/2.5/weather?${coords}&units=metric&appid=${apikey}`;

const app = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    }
});

const getWeather = async () => {
    try {
        const response = await app.get();
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in getWeather:', error.message);
        // Handle the error appropriately here
        throw error; // Re-throw the error if needed
    }
}

module.exports = {
    getWeather
};