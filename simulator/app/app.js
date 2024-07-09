
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Simulator = require('./simulation/simulateSensors');

const generalController = require('./controllers/generalController');

let MongoPort = process.env.MONGO_PORT || 27018;

let hostMongoDB = 'localhost';
if (process.env.MODE_CONTAINERS === 'true') {
    hostMongoDB = 'mongo-db-orion';
    MongoPort = process.env.MONGO_PORT || 27017;
}   


console.log(`mongodb://${hostMongoDB}:${MongoPort}/orion`);
mongoose.connect(`mongodb://${hostMongoDB}:${MongoPort}/orion`)
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

const timer_pirSensor = Number(process.env.TIMER_PIR_SENSOR) || 2000;
const timer_photoresistorSensor = Number(process.env.TIMER_PHOTORESISTOR_SENSOR) || 10000;
const timer_potentiometerSensor = Number(process.env.TIMER_POTENTIOMETER_SENSOR) || 20000;
const timer_infraredSensor = Number(process.env.TIMER_INFRARED_SENSOR) || 3000;
const timer_switchSensor = Number(process.env.TIMER_SWITCH_SENSOR) || 50000;
const timer_rfidSensor = Number(process.env.TIMER_RFID_SENSOR) || 20000;
const timer_ultrasoundSensor = Number(process.env.TIMER_ULTRASOUND_SENSOR) || 20000;
const timer_weatherStation = Number(process.env.TIMER_WEATHER_STATION) || 600000;
// timer_weatherStation = process.env.TIMER_WEATHER_STATION || 120000;
// timer_temperatureSensor = process.env.TIMER_TEMPERATURE_SENSOR || 8000;
// timer_humiditySensor = process.env.TIMER_HUMIDITY_SENSOR || 9000;

// Función para simplificar la asignación de valores basada en variables de entorno
function simulateSensor(envVar, defaultState) {
    return envVar ? envVar === 'true' : defaultState;
}

let simulate_pirSensor;
let simulate_photoresistorSensor;
let simulate_potentiometerSensor;
let simulate_infraredSensor;
let simulate_switchSensor;
let simulate_rfidSensor;
let simulate_ultrasoundSensor;
let simulate_weatherStation;

// Corrección del operador de comparación
if (iniState === false) {
    simulate_pirSensor = false;
    simulate_photoresistorSensor = false;
    simulate_potentiometerSensor = false;
    simulate_infraredSensor = false;
    simulate_switchSensor = false;
    simulate_rfidSensor = false;
    simulate_ultrasoundSensor = false;
    simulate_weatherStation = false;
} else {
    simulate_pirSensor = simulateSensor(process.env.SIMULATE_PIR_SENSOR, true);
    simulate_photoresistorSensor = simulateSensor(process.env.SIMULATE_PHOTORESISTOR_SENSOR, true);
    simulate_potentiometerSensor = simulateSensor(process.env.SIMULATE_POTENTIOMETER_SENSOR, true);
    simulate_infraredSensor = simulateSensor(process.env.SIMULATE_INFRARED_SENSOR, true);
    simulate_switchSensor = simulateSensor(process.env.SIMULATE_SWITCH_SENSOR, true);
    simulate_rfidSensor = simulateSensor(process.env.SIMULATE_RFID_SENSOR, true);
    simulate_ultrasoundSensor = simulateSensor(process.env.SIMULATE_ULTRASOUND_SENSOR, true);
    simulate_weatherStation = simulateSensor(process.env.SIMULATE_WEATHER_STATION, true);
}


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
