const axios = require('axios');



coords = `lat=40.453029668993466&lon=-3.726161408178773`
// apikey = process.env.WEATHER_API_KEY || `d9cde8b16d65f14446e43bd0c7e7dffd`; 
apikey = process.env.WEATHER_API_KEY ; 
url = `https://api.openweathermap.org/data/2.5/weather?${coords}&units=metric&appid=${apikey}`

const app = axios.create({
    baseURL : url,
    headers : {
        'Content-Type': 'application/json',
    }
});

const getWeather = () => {
    return app.get()
    .then(response => {
        // console.log(response.data);
        return response.data;
    });
}

module.exports = {
    getWeather
};