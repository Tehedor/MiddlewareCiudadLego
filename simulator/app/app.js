
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Simulator = require('./simulation/simulateSensors');

const generalController = require('./controllers/generalController');

// const streetLightController = require('./controllers/streetLightController');
let hostMongoDB = 'localhost';
if (process.env.MODE_CONTAINERS === 'true') {
    hostMongoDB = 'mongo-db-orion';
}   

// mongoose.connect(`mongodb://${hostMongoDB}:27018/orion`)
// mongoose.connect(`mongodb://mongo-db-orion:27017/orion`)
// mongoose.connect('mongodb://localhost:27018/orion')
console.log(`mongodb://${hostMongoDB}:27017/orion`);
mongoose.connect(`mongodb://db-mongo-orion:27017/orion`)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// // // // // // // // // // // // // // // // // // // //
// Web
// // // // // // // // // // // // // // // // // // // //
const app = express();


// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const port = 3000; //mirar puerto

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    // res.render('index.pug', { title: 'Hey', message: 'Hello there!' })
    res.render('index', { title: 'app', message: 'Hello there!' })
})


// getPirSensor,
// getPhotoresistorSensor,
// getLedDetectionActuator,
// getLigthActuator

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // Simulator
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

const iniState = process.env.INICIAL_STATE ? process.env.INICIAL_STATE === 'true' : true;
// const iniState = process.env.INICIAL_STATE || false;

timer_pirSensor = Number(process.env.TIMER_PIR_SENSOR) || 2000;
timer_photoresistorSensor = Number(process.env.TIMER_PHOTORESISTOR_SENSOR) || 10000;
timer_potentiometerSensor = Number(process.env.TIMER_POTENTIOMETER_SENSOR) || 20000;
timer_infraredSensor = Number(process.env.TIMER_INFRARED_SENSOR) || 3000;
timer_switchSensor = Number(process.env.TIMER_SWITCH_SENSOR) || 50000;
timer_rfidSensor = Number(process.env.TIMER_RFID_SENSOR) || 20000;
timer_ultrasoundSensor = Number(process.env.TIMER_ULTRASOUND_SENSOR) || 20000;
timer_weatherStation = Number(process.env.TIMER_WEATHER_STATION) || 600000;
// timer_weatherStation = process.env.TIMER_WEATHER_STATION || 120000;
// timer_temperatureSensor = process.env.TIMER_TEMPERATURE_SENSOR || 8000;
// timer_humiditySensor = process.env.TIMER_HUMIDITY_SENSOR || 9000;


const simulate_pirSensor = process.env.SIMULATE_PIR_SENSOR ? process.env.SIMULATE_PIR_SENSOR === 'true' : true;
const simulate_photoresistorSensor = process.env.SIMULATE_PHOTORESISTOR_SENSOR ? process.env.SIMULATE_PHOTORESISTOR_SENSOR === 'true' : true;
const simulate_potentiometerSensor = process.env.SIMULATE_POTENTIOMETER_SENSOR ? process.env.SIMULATE_POTENTIOMETER_SENSOR === 'true' : true;
const simulate_infraredSensor = process.env.SIMULATE_INFRARED_SENSOR ? process.env.SIMULATE_INFRARED_SENSOR === 'true' : true;
const simulate_switchSensor = process.env.SIMULATE_SWITCH_SENSOR ? process.env.SIMULATE_SWITCH_SENSOR === 'true' : true;
const simulate_rfidSensor = process.env.SIMULATE_RFID_SENSOR ? process.env.SIMULATE_RFID_SENSOR === 'true' : true;
const simulate_ultrasoundSensor = process.env.SIMULATE_ULTRASOUND_SENSOR ? process.env.SIMULATE_ULTRASOUND_SENSOR === 'true' : true;
const simulate_weatherStation = process.env.SIMULATE_WEATHER_STATION ? process.env.SIMULATE_WEATHER_STATION === 'true' : true;
// simulate_temperatureSensor = process.env.SIMULATE_TEMPERATURE_SENSOR || false;
// simulate_humiditySensor = process.env.SIMULATE_HUMIDITY_SENSOR || false;

const simulate = [simulate_pirSensor, simulate_photoresistorSensor, simulate_potentiometerSensor, simulate_infraredSensor, simulate_switchSensor, simulate_rfidSensor, simulate_ultrasoundSensor, simulate_weatherStation];
const inicial_timer = [timer_pirSensor, timer_photoresistorSensor, timer_potentiometerSensor, timer_infraredSensor, timer_switchSensor, timer_rfidSensor, timer_ultrasoundSensor, timer_weatherStation];
// const timer = inicial_timer;
// const timer = Array.prototype.map.call(inicial_timer, (x) => x);
const timer = inicial_timer.map(() => 0);

const simulationFunctions = ["simulatePirSensor", "simulatePhotoresistorSensor", "simulatePotentiometerSensor", "simulateInfraredSensor", "simulateSwitchSensor", "simulateRfidSensor", "simulateUltrasoundSensor", "simulateWeatherStation"];

const time = process.env.TIME_INTERVAL || 250;


setInterval(() => {

    SOCKET_IO.emit('update_timer', timer);

    simulationFunctions.forEach((element, index) => {
        if (simulate[index] == true) {  
            timer[index] = timer[index] - time;
            if (timer[index] <= 0) {
                timer[index] = inicial_timer[index] + timer[index];
                Simulator[element](time);
            }
        }
    });

}, time);


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // Controlador de simulaciones
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// change_simulate_pirSensor
// change_simulate_photoresistorSensor
// change_simulate_potentiometerSensor
// change_simulate_infraredSensor
// change_simulate_switchSensor
// change_simulate_rfidSensor
// change_simulate_ultrasoundSensor
// change_simulate_weatherStation

// const simulate = [simulate_pirSensor, simulate_photoresistorSensor, simulate_potentiometerSensor, simulate_infraredSensor, simulate_switchSensor, simulate_rfidSensor, simulate_ultrasoundSensor, simulate_weatherStation];

// SOCKET_IO.on('change_simulate_pirSensor', (data) => {
//     simulate[0] = data;
//     console.log('change_simulate_pirSensor',simulate[0]);
// });

// SOCKET_IO.on('change_simulate_photoresistorSensor', (data) => {
//     simulate[1] = data;
//     console.log('change_simulate_photoresistorSensor',simulate[1]);
// });

// SOCKET_IO.on('change_simulate_potentiometerSensor', (data) => {
//     simulate[2] = data;
//     console.log('change_simulate_potentiometerSensor',simulate[2]);
// });

// SOCKET_IO.on('change_simulate_infraredSensor', (data) => {
//     simulate[3] = data;
//     console.log('change_simulate_infraredSensor',simulate[3]);
// });

// SOCKET_IO.on('change_simulate_switchSensor', (data) => {
//     simulate[4] = data;
//     console.log('change_simulate_switchSensor',simulate[4]);
// });

// SOCKET_IO.on('change_simulate_rfidSensor', (data) => {
//     simulate[5] = data;
//     console.log('change_simulate_rfidSensor',simulate[5]);
// });

// SOCKET_IO.on('change_simulate_ultrasoundSensor', (data) => {
//     simulate[6] = data;
//     console.log('change_simulate_ultrasoundSensor',simulate[6]);
// });

// SOCKET_IO.on('change_simulate_weatherStation', (data) => {
//     simulate[7] = data;
//     console.log('change_simulate_weatherStation',simulate[7]);
// });


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // StreetLight
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// app.get('/streetLightEntities', async (req, res) => {
//     try {
//         const entitiesPirSensor = await streetLightController.getPirSensor();
//         const entitiesPhotoresistorSensor = await streetLightController.getPhotoresistorSensor();
//         const entitiesLedDetectionActuator = await streetLightController.getLedDetectionActuator();
//         const entitiesLigthActuator = await streetLightController.getLigthActuator();

//         res.json([entitiesPirSensor, entitiesPhotoresistorSensor, entitiesLedDetectionActuator, entitiesLigthActuator]);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// });



app.get('/monitor', async (req, res) => {
    console.log('Pasa1');

    try {
        res.render('simulationMonitor.pug');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // Entidades
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
app.get('/entities', async (req, res) => {
    try {
        const entities = await generalController.getAllEntities();
        res.json(entities);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// app.listen(port, () => {
//     // console.log(`Example app listening at http://localhost:${port}`);
// })





module.exports = app;
