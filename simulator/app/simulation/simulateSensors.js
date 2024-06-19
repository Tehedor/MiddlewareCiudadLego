const SensorService = require('../services/sensores.service.js');
const ActuatorsService = require('../services/actuators.service.js');

const sensorController = require('../controllers/sensorController.js');

const randomStreetLight = require("./randomStreetLight.js");
const randomTrain = require("./randomTrain.js");
const randomWeatherStation = require("./randomWheaterStation.js");
const randomRadar = require("./randomRadar.js");
const randomRailoadSwitch = require("./randomRailoadSwitch.js");
const randomToll = require("./randomToll.js");
const randomCrane = require("./randomCrane.js");

// "id": "urn:ngsi-ld:PirSensor:002",
let presence_pirSensor = undefined; // "LOW"

// "id": "urn:ngsi-ld:PotentiometerSensor:002",
let light_potentiometerSensor = undefined; // 30

// "id": "urn:ngsi-ld:PotentiometerSensor:002",
let velocityControl_potentiometerSensor = undefined; // 30

// "id": "urn:ngsi-ld:InfraredSensor:002",
let presence_infraredSensor = undefined; // "LOW"

// "id": "urn:ngsi-ld:SwitchSensor:002", 
let state_switchSensor = undefined; // "OFF"

// "id": "urn:ngsi-ld:RfidSensor:002",
let uiddcode_rfidSensor = undefined; // 4FF32FF4

// "id": "urn:ngsi-ld:UltrasoundSensor:002",
let distance_ultrasoundSensor = undefined; // 20

// "id": "urn:ngsi-ld:TemperatureSensor:002",
let temperature_temperatureSensor = undefined; // 20

// "id": "urn:ngsi-ld:HumiditySensor:002",
let humidity_humiditySensor = undefined; // 0.5

async function iniciarSimulacion() {
    try {
        const entities = await  sensorController.getSensors();
        // console.log("oooooooooooooooooooooooo");

        // console.log(entities);

        let entitiesById = {};
        entities.forEach(entity => {
            entitiesById[entity.id] = entity;
        });

        // urn:ngsi-ld:PirSensor:002
        // urn:ngsi-ld:PhotoresistorSensor:002
        // urn:ngsi-ld:PotentiometerSensor:002
        // urn:ngsi-ld:InfraredSensor:002
        // urn:ngsi-ld:SwitchSensor:002
        // urn:ngsi-ld:RfidSensor:002
        // urn:ngsi-ld:UltrasoundSensor:002
        // urn:ngsi-ld:TemperatureSensor:002
        // urn:ngsi-ld:HumiditySensor:002

        presence_pirSensor = entitiesById[`urn:ngsi-ld:PirSensor:${process.env.DEVICE_NUMBER || '002'}`].value;
        light_potentiometerSensor = entitiesById[`urn:ngsi-ld:PhotoresistorSensor:${process.env.DEVICE_NUMBER || '002'}`].value;
        velocityControl_potentiometerSensor = entitiesById[`urn:ngsi-ld:PotentiometerSensor:${process.env.DEVICE_NUMBER || '002'}`].value;
        presence_infraredSensor = entitiesById[`urn:ngsi-ld:InfraredSensor:${process.env.DEVICE_NUMBER || '002'}`].value;
        state_switchSensor = entitiesById[`urn:ngsi-ld:SwitchSensor:${process.env.DEVICE_NUMBER || '002'}`].value;
        uiddcode_rfidSensor = entitiesById[`urn:ngsi-ld:RfidSensor:${process.env.DEVICE_NUMBER || '002'}`].value;
        distance_ultrasoundSensor = entitiesById[`urn:ngsi-ld:UltrasoundSensor:${process.env.DEVICE_NUMBER || '002'}`].value;
        temperature_temperatureSensor = entitiesById[`urn:ngsi-ld:TemperatureSensor:${process.env.DEVICE_NUMBER || '002'}`].value;
        humidity_humiditySensor = entitiesById[`urn:ngsi-ld:HumiditySensor:${process.env.DEVICE_NUMBER || '002'}`].value;

    } catch (err) {
        console.error(err);
        // res.status(500).send(err);
    }
}


async function simulatePirSensor(time) {
    console.log('Simulating PIR Sensor');
    if (presence_pirSensor == undefined) {
        await iniciarSimulacion();
    }
    // console.log('Simulating PIR Sensor');
    // console.log(randomStreetLight.simulatePresence(presence_pirSensor));
    const aux = presence_pirSensor;
    presence_pirSensor = randomStreetLight.simulatePresence(presence_pirSensor);
    // presence_pirSensor = "HIGH";
    if (aux != presence_pirSensor) {
        SensorService.pirSensorChange(presence_pirSensor);
        SOCKET_IO.emit('update_pirSensor', presence_pirSensor);
    }
}

async function simulatePhotoresistorSensor(time) {
    if (light_potentiometerSensor == undefined) {
        await iniciarSimulacion();
    }
    // console.log('Simulating Photoresistor Sensor');
    const aux = light_potentiometerSensor;
    light_potentiometerSensor = randomStreetLight.simulateIntensity(light_potentiometerSensor);
    // SensorService.photoresistorSensorChange(light_potentiometerSensor);
    if (aux != light_potentiometerSensor) {
        SensorService.photoresistorSensorChange(light_potentiometerSensor);
        SOCKET_IO.emit('update_photoresistorSensor', light_potentiometerSensor);
    }
    

    // console.log('Simulating Photoresistor Sensor');
    // SOCKET_IO.emit('update_photoresistorSensor', data);
}

async function simulatePotentiometerSensor(time) {
    if (velocityControl_potentiometerSensor == undefined) {
        await iniciarSimulacion();
    }
    // console.log('Simulating Potentiometer Sensor');
    const aux = velocityControl_potentiometerSensor;
    velocityControl_potentiometerSensor = randomTrain.simulateVelocityControl(velocityControl_potentiometerSensor);
    
    if (aux != velocityControl_potentiometerSensor) {
        SensorService.potentiometerSensorChange(velocityControl_potentiometerSensor);
        SOCKET_IO.emit('update_potentiometerSensor', velocityControl_potentiometerSensor);
    }
}

async function simulateInfraredSensor(time) {
    if (presence_infraredSensor == undefined) {
        await iniciarSimulacion();
    }
    // console.log('Simulating Infrared Sensor');
    const aux = presence_infraredSensor;
    presence_infraredSensor = randomRadar.simulatePresenceRadar(presence_infraredSensor);

    if (aux != presence_infraredSensor) {
        SensorService.infraredSensorChange(presence_infraredSensor);
        SOCKET_IO.emit('update_infraredSensor', presence_infraredSensor);
    }
}

async function simulateSwitchSensor(time) {
    if (state_switchSensor == undefined) {
        await iniciarSimulacion();
    }
    const aux = state_switchSensor;
    state_switchSensor = randomRailoadSwitch.simulateState(state_switchSensor);
    // console.log(state_switchSensor);
    if (aux != state_switchSensor) {
        SensorService.switchSensorChange(state_switchSensor);
        SOCKET_IO.emit('update_switchSensor', state_switchSensor);
    }
    
    // console.log('Simulating Switch Sensor');
}

async function simulateRfidSensor(time) {
    if (uiddcode_rfidSensor == undefined) {
        await iniciarSimulacion();
    }
    const aux = uiddcode_rfidSensor;
    uiddcode_rfidSensor = randomToll.simulateUIDD(uiddcode_rfidSensor);
    if (aux != uiddcode_rfidSensor) {
        SensorService.rfidSensorChange(uiddcode_rfidSensor);
        SOCKET_IO.emit('update_rfidSensor', uiddcode_rfidSensor);
    }
    // console.log('Simulating RFID Sensor');
    // console.log(uiddcode_rfidSensor);
}

async function simulateUltrasoundSensor(time) {
    if (distance_ultrasoundSensor == undefined) {
        await iniciarSimulacion();
    }

    const aux = distance_ultrasoundSensor;
    distance_ultrasoundSensor = randomCrane.simulateDistance(distance_ultrasoundSensor);
    
    if (aux != distance_ultrasoundSensor) {
        SensorService.ultrasoundSensorChange(distance_ultrasoundSensor);
        SOCKET_IO.emit('update_ultrasoundSensor', distance_ultrasoundSensor);
    }
}


async function simulateWeatherStation(time) {
    // console.log('Simulating Temperature Sensor');

    const { temperature, humidity } = await randomWeatherStation.simulateWeatherStation();

    const auxTemperature = temperature_temperatureSensor;
    const auxHumidity = humidity_humiditySensor;

    if (auxTemperature != temperature || auxHumidity != humidity) {
        SensorService.temperatureSensorChange(temperature);
        SensorService.humiditySensorChange(humidity);

        SOCKET_IO.emit('update_temperatureSensor', temperature);
        SOCKET_IO.emit('update_humiditySensor', humidity);
    }
}

function iniSensorsClient(){
    // if(presence_pirSensor == undefined){
        iniciarSimulacion();
    // }
    SOCKET_IO.emit('update_pirSensor', presence_pirSensor);
    SOCKET_IO.emit('update_photoresistorSensor', light_potentiometerSensor);
    SOCKET_IO.emit('update_potentiometerSensor', velocityControl_potentiometerSensor);
    SOCKET_IO.emit('update_infraredSensor', presence_infraredSensor);
    SOCKET_IO.emit('update_switchSensor', state_switchSensor);
    SOCKET_IO.emit('update_rfidSensor', uiddcode_rfidSensor);
    SOCKET_IO.emit('update_ultrasoundSensor', distance_ultrasoundSensor);
    SOCKET_IO.emit('update_temperatureSensor', temperature_temperatureSensor);
    SOCKET_IO.emit('update_humiditySensor', humidity_humiditySensor);
}


module.exports = {
    simulatePirSensor,
    simulatePhotoresistorSensor,
    simulatePotentiometerSensor,
    simulateInfraredSensor,
    simulateSwitchSensor,
    simulateRfidSensor,
    simulateUltrasoundSensor,
    simulateWeatherStation,
    iniSensorsClient
};
