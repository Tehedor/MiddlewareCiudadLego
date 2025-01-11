// import   { state_simulator_true, state_simulator_false } from './checkSimulationStatus';
const EnvConfig = require('./env.config'); // Asegúrate de que la ruta sea correcta
const fs = require('fs');
const path = require('path');
const controlJSONPath = path.join(__dirname, 'control.json');

// const { state_simulator_true, state_simulator_false } = require('./checkSimulationStatus');
const { state_simulator_true, state_simulator_false } = require('./submodules/simulationState');


const changeInicialState = async (state) => {
    if (state) {
        await state_simulator_true();
        modifyJSON(state);
    } else {
        modifyJSON(state);
        await state_simulator_false();
    }
    // if (controlJSON.inicial_state !== state) {
        //     controlJSON.inicial_state = state;
        //     fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        //     return true; 
        //     controlJSON.inicial_state = state;
    // } else {
    //     return false; 
    // }
};

// const modifyJSON = () => {
const modifyJSON = (state) => {

    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);
    if (controlJSON.inicial_state !== state) {
        controlJSON.inicial_state = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

const changeTimeInterval = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);
    if (controlJSON.time_interval !== time) {
        controlJSON.time_interval = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    }
    return false;
}

// Pir Sensor
    //      simulate_pir_sensor: envConfig.simulate_pir_sensor,
    //      timer_pir_sensor: envConfig.timer_pir_sensor
const changePirSensor = (state) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (state !== null && state !== undefined) {
        if (controlJSON.pir_sensor.simulate_pir_sensor !== state) {
            controlJSON.pir_sensor.simulate_pir_sensor = state;
            fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
            return true; 
        } else {
            return false; 
        }
    }
    return false;

};

const changeTimerPirSensor = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);
    if (controlJSON.pir_sensor.timer_pir_sensor !== time) {
        controlJSON.pir_sensor.timer_pir_sensor = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    }
    return false;
};


// photoresistor_sensor
    //     simulate_photoresistor_sensor: envConfig.simulate_photoresistor_sensor,
    //     timer_photoresistor_sensor: envConfig.timer_photoresistor_sensor
const changePhotoresistorSensor = (state) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.photoresistor_sensor.simulate_photoresistor_sensor !== state) {
        controlJSON.photoresistor_sensor.simulate_photoresistor_sensor = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

const changeTimerPhotoresistorSensor = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);
    if (controlJSON.photoresistor_sensor.timer_photoresistor_sensor !== time) {
        controlJSON.photoresistor_sensor.timer_photoresistor_sensor = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    }
    return false;
}    


// potentiometer_sensor: 
    //     simulate_potentiometer_sensor: envConfig.simulate_potentiometer_sensor,
    //     timer_potentiometer_sensor: envConfig.timer_potentiometer_sensor
const changePotentiometerSensor = (state) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.potentiometer_sensor.simulate_potentiometer_sensor !== state) {
        controlJSON.potentiometer_sensor.simulate_potentiometer_sensor = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

const changeTimerPotentiometerSensor = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.potentiometer_sensor.timer_potentiometer_sensor !== time) {
        controlJSON.potentiometer_sensor.timer_potentiometer_sensor = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

// infra_red_sensor: 
    //     simulate_infrared_sensor: envConfig.simulate_infrared_sensor,
    //     timer_infrared_sensor: envConfig.timer_infrared_sensor
const changeInfraredSensor = (state) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.infra_red_sensor.simulate_infrared_sensor !== state) {
        controlJSON.infra_red_sensor.simulate_infrared_sensor = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

const changeTimerInfraredSensor = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.infra_red_sensor.timer_infrared_sensor !== time) {
        controlJSON.infra_red_sensor.timer_infrared_sensor = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

// switch_sensor:
    //     simulate_switch_sensor: envConfig.simulate_switch_sensor,
    //     timer_switch_sensor: envConfig.timer_switch_sensor
const changeSwitchSensor = (state) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.switch_sensor.simulate_switch_sensor !== state) {
        controlJSON.switch_sensor.simulate_switch_sensor = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

const changeTimerSwitchSensor = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.switch_sensor.timer_switch_sensor !== time) {
        controlJSON.switch_sensor.timer_switch_sensor = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

// rfid_sensor: 
    //     simulate_rfid_sensor: envConfig.simulate_rfid_sensor,
    //     timer_rfid_sensor: envConfig.timer_rfid_sensor
const changeRfidSensor = (state) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.rfid_sensor.simulate_rfid_sensor !== state) {
        controlJSON.rfid_sensor.simulate_rfid_sensor = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

const changeTimerRfidSensor = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.rfid_sensor.timer_rfid_sensor !== time) {
        controlJSON.rfid_sensor.timer_rfid_sensor = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}


// ultrasound_sensor:
    //     simulate_ultrasound_sensor: envConfig.simulate_ultrasound_sensor,
    //     timer_ultrasound_sensor: envConfig.timer_ultrasound_sensor
const changeUltrasoundSensor = (state) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.ultrasound_sensor.simulate_ultrasound_sensor !== state) {
        controlJSON.ultrasound_sensor.simulate_ultrasound_sensor = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

const changeTimerUltrasoundSensor = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.ultrasound_sensor.timer_ultrasound_sensor !== time) {
        controlJSON.ultrasound_sensor.timer_ultrasound_sensor = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

// wather_station: 
    //     simulate_weather_station: envConfig.simulate_weather_station,
    //     timer_weather_station: envConfig.timer_weather_station,
    //     wather_api_key: envConfig.wather_api_key
const changeWeatherStation = (state) => {  
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.wather_station.simulate_weather_station !== state) {
        controlJSON.wather_station.simulate_weather_station = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

const changeTimerWeatherStation = (time) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);

    if (controlJSON.wather_station.timer_weather_station !== time) {
        controlJSON.wather_station.timer_weather_station = time;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
}

module.exports = {
    changeInicialState, changeTimeInterval, 
    changePirSensor, changeTimerPirSensor, 
    changePhotoresistorSensor, changeTimerPhotoresistorSensor, 
    changePotentiometerSensor, changeTimerPotentiometerSensor, 
    changeInfraredSensor, changeTimerInfraredSensor, 
    changeSwitchSensor, changeTimerSwitchSensor, 
    changeRfidSensor, changeTimerRfidSensor, 
    changeUltrasoundSensor, changeTimerUltrasoundSensor, 
    changeWeatherStation, changeTimerWeatherStation,
    modifyJSON
};

