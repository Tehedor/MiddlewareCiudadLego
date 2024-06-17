const apiExterna = require('../services/api.externa.service.js');

function simulateTemperature() {
    return Math.random() * 40;
}

function simulateHumidity() {
    return Math.random() * 100;
}


async function simulateWeatherStation() {

    const data = await apiExterna.getWeather();

    return {
        temperature: data.main.temp,
        humidity: data.main.humidity
    }
}

module.exports = {  
    simulateWeatherStation,
    simulateTemperature,
    simulateHumidity
}
