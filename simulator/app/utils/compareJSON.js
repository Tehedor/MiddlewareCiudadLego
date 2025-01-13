const fs = require('fs');
const path = require('path');
const controlJSONPath = path.join(__dirname, 'control.json');

let currentControlJSON = require(controlJSONPath);

const compareJSON = (simulate, inicial_timer, inicial_state, mode_state) => {
    fs.readFile(controlJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading control.json:', err);
            return;
        }

        const newControlJSON = JSON.parse(data);

        if (JSON.stringify(newControlJSON) !== JSON.stringify(currentControlJSON)) {
        
            currentControlJSON = newControlJSON;
            
            inicial_state[0] = newControlJSON.inicial_state;
            mode_state[0] = newControlJSON.mode_state;
            console.log('Updated inicial_state based on control.json');
            console.log('Updated inicial_state based on control.json');
            console.log(inicial_state);
            console.log('Updated inicial_state based on control.json');
            console.log('Updated inicial_state based on control.json');
            // simulate = [simulate_pir_sensor, simulate_photoresistor_sensor, simulate_potentiometer_sensor, simulate_infrared_sensor, simulate_switch_sensor, simulate_rfid_sensor, simulate_ultrasound_sensor, simulate_weather_station];
            simulate[0] = newControlJSON.pir_sensor.simulate_pir_sensor;
            simulate[1] = newControlJSON.photoresistor_sensor.simulate_photoresistor_sensor;
            simulate[2] = newControlJSON.potentiometer_sensor.simulate_potentiometer_sensor;
            simulate[3] = newControlJSON.infra_red_sensor.simulate_infrared_sensor;
            simulate[4] = newControlJSON.switch_sensor.simulate_switch_sensor;
            simulate[5] = newControlJSON.rfid_sensor.simulate_rfid_sensor;
            simulate[6] = newControlJSON.ultrasound_sensor.simulate_ultrasound_sensor;
            simulate[7] = newControlJSON.wather_station.simulate_weather_station;

            // inicial_timer = [timer_pir_sensor, timer_photoresistor_sensor, timer_potentiometer_sensor, timer_infrared_sensor, timer_switch_sensor, timer_rfid_sensor, timer_ultrasound_sensor, timer_weather_station];
            inicial_timer[0] = newControlJSON.pir_sensor.timer_pir_sensor;
            inicial_timer[1] = newControlJSON.photoresistor_sensor.timer_photoresistor_sensor;
            inicial_timer[2] = newControlJSON.potentiometer_sensor.timer_potentiometer_sensor;
            inicial_timer[3] = newControlJSON.infra_red_sensor.timer_infrared_sensor;
            inicial_timer[4] = newControlJSON.switch_sensor.timer_switch_sensor;
            inicial_timer[5] = newControlJSON.rfid_sensor.timer_rfid_sensor;
            inicial_timer[6] = newControlJSON.ultrasound_sensor.timer_ultrasound_sensor;
            inicial_timer[7] = newControlJSON.wather_station.timer_weather_station;

            console.log('Updated simulate and inicial_timer arrays based on control.json');
        }
    });
};

module.exports = compareJSON;