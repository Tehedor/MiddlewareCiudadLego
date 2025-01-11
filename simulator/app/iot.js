const express = require('express');
const debug = require('debug')('tutorial:iot-device');
const createError = require('http-errors');

const ActuatorsService = require('./services/actuators.service.js');

// const streetLightController = require('./controllers/streetLightController.js');


const SimulateActuators = require('./simulation/simulateActuators.js');

/* global MQTT_CLIENT */
const DEVICE_TRANSPORT = process.env.DUMMY_DEVICES_TRANSPORT || 'HTTP';

// The motion sensor offers no commands, hence it does not need an endpoint.

// parse everything as a stream of text
function rawBody(req, res, next) {
    req.setEncoding('utf8');
    req.body = '';
    req.on('data', function (chunk) {
        req.body += chunk;
    });
    req.on('end', function () {
        next();
    });
}

const iot = express();
iot.use(rawBody);

const iotRouter = express.Router();

iot.use(function (req, res, next) {
    console.log(`Received ${req.method} request on ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});


iot.use('/', iotRouter);

// Degault route
// iotRouter.post('/*', function(req, res) {
//     res.send('Este es el nuevo endpoint');
// });

// // // // // // // // // // // // // // // // // // // //
// // Actuators
// // // // // // // // // // // // // // // // // // // //

// Endpoint subscription
// uri_pirSensor = f"http://{host}:3001/ledDetectionActuator"
// uri_pirSensor2 = f"http://{host}:3001/lightActuator"
// uri_photoresistorSensor = f'http://{host}:3001/lightActuator'
// uri_potentiometerSensor = f'http://{host}:3001/engineDCActuator'
// uri_infraredSensor = f'http://{host}:3001/cameraActuator'
// uri_switchSensor = f'http://{host}:3001/servmotorActuator'

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// urn:ngsi-ld:LedDetection:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
iotRouter.post('/ledDetectionActuator', function (req, res) {
    // console.log("ledDetectionActuator")
    
    const data = JSON.parse(req.body).data[0];
    
    SimulateActuators.simulateLedDetectionActuator(data);
    
    res.status(201).send('Led detection ta bien ');
});


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// urn:ngsi-ld:Light:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// intensityThreshold = process.env.INTENSITY_THRESHOLD || 70;

iotRouter.post('/lightActuator', function (req, res) {
    // console.log("lightActuator")
    const data = JSON.parse(req.body).data[0];
    
    SimulateActuators.simulateLightActuator(data);
    
    res.status(201).send('Light ta bien ');
});



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// urn:ngsi-ld:EngineDC:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
iotRouter.post('/engineDCActuator', function (req, res) {
    // console.log("engineDCActuator")
    const data = JSON.parse(req.body).data[0];
    
    SimulateActuators.simulateEngineDCActuator(data);
    
    res.status(201).send('Engine ta bien ');
}); 

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// urn:ngsi-ld:Servmotor:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
iotRouter.post('/servmotorActuator', function (req, res) {
    console.log("pruebas")
    const data = JSON.parse(req.body).data[0];
    
    SimulateActuators.simulateServmotorActuator(data);
    
    res.status(201).send('Servmotor ta bien');
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// urn:ngsi-ld:Camera:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
iotRouter.post('/cameraActuator', function (req, res) {
    
    const data = JSON.parse(req.body).data[0]; 

    SimulateActuators.simulateCameraActuator(data);


    res.status(201).send('Camera ta bien ');
});



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Control simulation
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// const fs = require('fs');
// const path = require('path');
// const controlJSONPath = path.join(__dirname, './utils/control.json');

// {
//     "inicial_state": true,
//     "time_interval": 200,
//     "pir_sensor": {
//       "simulate_pir_sensor": true,
//       "timer_pir_sensor": 2125
//     },
//     "photoresistor_sensor": {
//       "simulate_photoresistor_sensor": true,
//       "timer_photoresistor_sensor": 10500
//     },
//     "potentiometer_sensor": {
//       "simulate_potentiometer_sensor": false,
//       "timer_potentiometer_sensor": 20000
//     },
//     "infra_red_sensor": {
//       "simulate_infrared_sensor": false,
//       "timer_infrared_sensor": 3750
//     },
//     "switch_sensor": {
//       "simulate_switch_sensor": false,
//       "timer_switch_sensor": 500000
//     },
//     "rfid_sensor": {
//       "simulate_rfid_sensor": false,
//       "timer_rfid_sensor": 40000
//     },
//     "ultrasound_sensor": {
//       "simulate_ultrasound_sensor": false,
//       "timer_ultrasound_sensor": 200125
//     },
//     "wather_station": {
//       "simulate_weather_station": false,
//       "timer_weather_station": 600000,
//       "wather_api_key": "d9cde8b16d65f14446e43bd0c7e7dffd"
//     }
//   }


// // // // // // // // // // // // // // // // // // // //
// catch 404 and forward to error handler
// // // // // // // // // // // // // // // // // // // //
iot.use(function (req, res) {
    res.status(404).send(new createError.NotFound());
});


module.exports = iot;
