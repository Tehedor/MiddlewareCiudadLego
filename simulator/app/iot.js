const express = require('express');
const debug = require('debug')('tutorial:iot-device');
const createError = require('http-errors');

const SimulateActuators = require('./simulation/simulateActuators.js');

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

// // // // // // // // // // // // // // // // // // // //
// catch 404 and forward to error handler
// // // // // // // // // // // // // // // // // // // //
iot.use(function (req, res) {
    res.status(404).send(new createError.NotFound());
});

module.exports = iot;
