const EnvConfig = require('./env.config'); // Asegúrate de que la ruta sea correcta
const fs = require('fs');
const path = require('path');
const controlJSONPath = path.join(__dirname, 'control.json');

const envConfig = EnvConfig();
const content = {
    inicial_state: envConfig.inicial_state,
    time_interval: envConfig.time_interval,
    pir_sensor: {
        simulate_pir_sensor: envConfig.simulate_pir_sensor,
        timer_pir_sensor: envConfig.timer_pir_sensor
    },
    photoresistor_sensor: {
        simulate_photoresistor_sensor: envConfig.simulate_photoresistor_sensor,
        timer_photoresistor_sensor: envConfig.timer_photoresistor_sensor
    },
    potentiometer_sensor: {
        simulate_potentiometer_sensor: envConfig.simulate_potentiometer_sensor,
        timer_potentiometer_sensor: envConfig.timer_potentiometer_sensor
    },
    infra_red_sensor: {
        simulate_infrared_sensor: envConfig.simulate_infrared_sensor,
        timer_infrared_sensor: envConfig.timer_infrared_sensor
    },
    switch_sensor: {
        simulate_switch_sensor: envConfig.simulate_switch_sensor,
        timer_switch_sensor: envConfig.timer_switch_sensor
    },
    rfid_sensor: {
        simulate_rfid_sensor: envConfig.simulate_rfid_sensor,
        timer_rfid_sensor: envConfig.timer_rfid_sensor
    },
    ultrasound_sensor: {
        simulate_ultrasound_sensor: envConfig.simulate_ultrasound_sensor,
        timer_ultrasound_sensor: envConfig.timer_ultrasound_sensor
    },
    wather_station: {
        simulate_weather_station: envConfig.simulate_weather_station,
        timer_weather_station: envConfig.timer_weather_station,
        wather_api_key: envConfig.wather_api_key
    }
};

const createJSON = () => {
    if (!fs.existsSync(controlJSONPath) || fs.readFileSync(controlJSONPath, 'utf8').trim() === '') {
        fs.writeFileSync(controlJSONPath, JSON.stringify(content, null, 2), 'utf8');
        console.log('control.json file created');

    }else{
        console.log('control.json file already exists');
    }
}

module.exports = createJSON;