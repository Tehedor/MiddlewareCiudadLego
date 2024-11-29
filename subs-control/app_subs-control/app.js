
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


const routesViews = require('./routes/index');
const routesRequests = require('./routes/requests');
const control_subs = require('./subscriptions_controller/control_subs');

const control_entities = require('./entities_controller/controler_entities');

// request controller
// const generalControllerEntities = require('./controllers/generalControllerEntities');
// const generalSubsDraco = require('./controllers/generalSubsDraco');
// const generalSubsRelations = require('./controllers/generalSubsRelations');
// const control_subs = require('./subscriptions_controller/control_subs');

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Conexión a la base de datoss
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
let MongoPort = process.env.MONGO_PORT || 27018;

let hostMongoDB = 'localhost';
if (process.env.MODE_CONTAINERS === 'true') {
    hostMongoDB = 'mongo-db-orion';
    MongoPort = process.env.MONGO_PORT || 27017;
}   

let mongoURI = `mongodb://${hostMongoDB}:${MongoPort}/orion`;

const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    mongoose.connect(mongoURI)
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected! Trying to reconnect...');
    connectWithRetry();
});

mongoose.connection.on('error', err => {
    console.log('MongoDB connection error: ', err);
    mongoose.disconnect();
});
// mongoose.connect(`mongodb://${hostMongoDB}:${MongoPort}/orion`)
//     .then(() => console.log('MongoDB Connected...'))
//     .catch(err => console.log(err));

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Web
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const app = express();

const MODE_CONTAINERS_BOOLEAN = process.env.MODE_CONTAINERS === 'true';
const basePath = MODE_CONTAINERS_BOOLEAN ? '/subsControlApp' : '';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.set('view engine', 'pug');
app.use('/', routesViews);
app.use('/requests', routesRequests);   



// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const time = process.env.TIME_INTERVAL || 2000;
setInterval(() => {

    // console.log('Intervalo');

    // simulationFunctions.forEach((element, index) => {
    //     if (simulate[index] == true) {
    //         timer[index] = timer[index] - time;
    //         if (timer[index] <= 0) {
    //             timer[index] = inicial_timer[index] + timer[index];
    //             Simulator[element](time);
    //         }
    //     }
    // });

}, time);

// app.listen(port, () => {
//     // console.log(`Example app listening at http://localhost:${port}`);
// })


// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Iniciar base de datos 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// control_subs.start_subscritpions();
// control_entities.createEntities();

module.exports = app;
