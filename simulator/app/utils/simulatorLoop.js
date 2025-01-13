
const EnvConfig = require('./env.config');
const createJSON = require('./createJSON');
const compareJSON = require('./compareJSON');

const {startCheckState} = require('./submodules/simulationState');

const Simulator = require('../simulation/simulateSensors');

const { 
    // inicial_state,
    time_interval,
} = EnvConfig();



const fs = require('fs');
const path = require('path');
const controlJSONPath = path.join(__dirname, './control.json');
let controlConfigJSON = require(controlJSONPath);

let inicial_state = [controlConfigJSON.inicial_state];    
let mode_state = [controlConfigJSON.mode_state];

let simulate = [
    controlConfigJSON.pir_sensor.simulate_pir_sensor, controlConfigJSON.photoresistor_sensor.simulate_photoresistor_sensor, 
    controlConfigJSON.potentiometer_sensor.simulate_potentiometer_sensor, controlConfigJSON.infra_red_sensor.simulate_infrared_sensor, 
    controlConfigJSON.switch_sensor.simulate_switch_sensor, controlConfigJSON.rfid_sensor.simulate_rfid_sensor, 
    controlConfigJSON.ultrasound_sensor.simulate_ultrasound_sensor, controlConfigJSON.wather_station.simulate_weather_station
];

let inicial_timer = [
    controlConfigJSON.pir_sensor.timer_pir_sensor, controlConfigJSON.photoresistor_sensor.timer_photoresistor_sensor, 
    controlConfigJSON.potentiometer_sensor.timer_potentiometer_sensor, controlConfigJSON.infra_red_sensor.timer_infrared_sensor,
    controlConfigJSON.switch_sensor.timer_switch_sensor, controlConfigJSON.rfid_sensor.timer_rfid_sensor, 
    controlConfigJSON.ultrasound_sensor.timer_ultrasound_sensor, controlConfigJSON.wather_station.timer_weather_station
];
const timer = inicial_timer.map(() => 0);
const time = time_interval;

const simulationFunctions = [
    "simulatePirSensor", "simulatePhotoresistorSensor", "simulatePotentiometerSensor", 
    "simulateInfraredSensor", "simulateSwitchSensor", "simulateRfidSensor", 
    "simulateUltrasoundSensor", "simulateWeatherStation"
];


createJSON();

startCheckState(inicial_state);
setInterval(() => {
    compareJSON(simulate, inicial_timer, inicial_state, mode_state);
}, 500); // Verificar cambios cada 5 segundos


const simulateLoop = () => {

    setInterval(() => {
        SOCKET_IO.emit('update_timer', timer);
        SOCKET_IO.emit('update_simulate', simulate);

        SOCKET_IO.emit('update_iniState', inicial_state[0]);
        SOCKET_IO.emit('update_modeState', mode_state[0]);
        
        console.log(mode_state[0]);
        if (mode_state[0] !== false) {
            if (inicial_state[0] !== false) {
                simulationFunctions.forEach((element, index) => {
                    if (simulate[index] == true) {  
                        timer[index] = timer[index] - time;
                        if (timer[index] <= 0) {
                            timer[index] = inicial_timer[index] + timer[index];
                            Simulator[element](time);
                        }
                    }
                });
            }   
        }
    }, time);

};

const emitSimulationState = (socket) => {
    socket.emit('update_timer', timer);
    socket.emit('update_simulate', simulate);
    socket.emit('update_iniState', inicial_state[0]);
};


module.exports = {simulateLoop, emitSimulationState};