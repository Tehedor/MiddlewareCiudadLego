
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Simulator = require('./simulation/simulateSensors');

const generalController = require('./controllers/generalController');

const createJSON = require('./utils/createJSON');
createJSON();

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

const EnvConfig = require('./utils/env.config');

// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const port = 3000; //mirar puerto

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'pug');

const envConfig = EnvConfig();

app.use((req, res, next) => {
    res.locals.envConfig = envConfig;
    next();
});

app.get('/', (req, res) => {
    // res.render('index.pug', { title: 'Hey', message: 'Hello there!' })
    res.render('index', { title: 'app', message: 'Hello there!' })
})



// getPirSensor,
// getPhotoresistorSensor,
// getLedDetectionActuator,
// getLigthActuator



const fs = require('fs');
const path = require('path');
const controlJSONPath = path.join(__dirname, './utils/control.json');
let controlConfigJSON = JSON.parse(fs.readFileSync(controlJSONPath, 'utf8'));

app.get('/monitor', async (req, res) => {

    try {
        res.render('simulationMonitor.pug');
        // res.render('simulationMonitor.pug', { controlConfigJSON: controlConfigJSON });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // Simulator
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
const {simulateLoop} = require('./utils/simulatorLoop');
simulateLoop();    



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


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // Control simulation
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// function rawBody(req, res, next) {
//     req.setEncoding('utf8');
//     req.body = '';
//     req.on('data', function (chunk) {
//         req.body += chunk;
//     });
//     req.on('end', function () {
//         next();
//     });
// }
// app.use(rawBody);

app.use(function (req, res, next) {
    console.log(`Received ${req.method} request on ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

const simulationRoutes = require('./routes/simulationRoutes');
app.use(simulationRoutes);

const streetLightRoutes = require('./routes/streetLightRoutes');
const creaneRoutes = require('./routes/craneRoutes');
const railRoadSwitchRoutes = require('./routes/railroadSwitchRoutes');
const tollRoutes = require('./routes/tollRoutes');
const trainRoutes = require('./routes/trainRoutes');
const weatherStationRoutes = require('./routes/weatherStationRoutes');

const radarRoutes = require('./routes/radarRoute.js');


app.use(streetLightRoutes);
app.use(creaneRoutes);
app.use(railRoadSwitchRoutes);
app.use(tollRoutes);
app.use(trainRoutes);
app.use(weatherStationRoutes);

app.use(radarRoutes);





// app.listen(port, () => {
//     // console.log(`Example app listening at http://localhost:${port}`);
// })



module.exports = app;
