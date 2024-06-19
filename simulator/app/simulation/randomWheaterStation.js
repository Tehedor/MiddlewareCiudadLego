const apiExterna = require('../services/api.externa.service.js');

function simulateTemperature() {
    return Math.random() * 40;
}

function simulateHumidity() {
    return Math.random() * 100;
}


async function simulateWeatherStation() {
    try {
        const data = await apiExterna.getWeather();

        return {
            temperature: data.main.temp,
            humidity: data.main.humidity
        }
    } catch (error) {
        console.error(error);
        return {
            temperature: 0,
            humidity: 0
        }
    }
}

module.exports = {  
    simulateWeatherStation,
    simulateTemperature,
    simulateHumidity
}
