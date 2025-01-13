
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const routesViews = require('./routes/index');
const routesRequests = require('./routes/requests');

const control_subs = require('./subscriptions_controller/control_subs');
const control_entities = require('./entities_controller/controler_entities');

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Conexión a la base de datoss
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
let MongoPort = process.env.MONGO_DB_PORT || 27018;

let hostMongoDB = 'localhost';
console.log('#########')
console.log('process.env.MODE_CONTAINERS', process.env.MODE_CONTAINERS);
console.log('#########')
console.log(process.env.MODE_CONTAINERS === 'true')
if (process.env.MODE_CONTAINERS === 'true') {
    hostMongoDB = 'mongo-db-orion';
    MongoPort = process.env.MONGO_DB_PORT || 27017;
}   
console.log('#########')
console.log('hostMongoDB', hostMongoDB, 'MongoPort', MongoPort);
console.log('#########')

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
// app.use('/public', express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.set('view engine', 'pug');
app.use('/', routesViews);
app.use('/requests', routesRequests);   

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Control temporal subs
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
let relationSubs = process.env.INI_STATE || "real" //real;

const {createJSON, checkIfJSONExists, checkIfJSONWellFormed} = require('./utils/createJSON');
const {showState} = require('./utils/controlJSON');


if (checkIfJSONExists()) {
    createJSON();
}

const maxAttempts = 3;let attempts = 0;
while (attempts < maxAttempts) {
    if (checkIfJSONWellFormed()) {
        console.log('control.json file is well-formed.');
        break;
    } else {
        console.log(`Error in control.json file, attempting to recreate... (Attempt ${attempts + 1}/${maxAttempts})`);
        createJSON();
        attempts++;
    }
}
if (attempts === maxAttempts) {
    console.log('Failed to create a well-formed control.json file after 3 attempts');
    process.exit(1);
}

// Ini Subs
// Existen las entidades?
const generalControllerEntities = require('./controllers/generalControllerEntities');    
(async () => {
    const entities = await generalControllerEntities();
    if (entities.length === 0) {
        console.log('No se encontraron entidades en la base de datos.');
        control_entities.createEntities();
    } else {
        console.log(`Se encontraron ${entities.length} entidades en la base de datos.`);
    }
})();



// Existen las subscripciones draco
const generalSubsDraco = require('./controllers/generalSubsDraco');
(async () => {
    const subsDraco = await generalSubsDraco();
    if (subsDraco.length === 0) {
        console.log('No se encontraron subscripciones Draco en la base de datos.');
        control_subs.start_subscritpions_Draco();
    } else {
        console.log(`Se encontraron ${subsDraco.length} subscripciones Draco en la base de datos.`);
    }
})();

// Existen las subscripciones relations
const generalSubsRelations = require('./controllers/generalSubsRelations');
(async () => {
    const subsRelations = await generalSubsRelations();
    if (subsRelations.length === 0) {
        console.log('No se encontraron subscripciones Relations en la base de datos.');
        if (showState() === 'real') {
            control_subs.start_subscritpions_Real();
            console.log('Real');
        }else {
            control_subs.start_subscritpions_Simulator();
            console.log('Simulator');
        }

    } else {
        console.log(`Se encontraron ${subsRelations.length} subscripciones Relations en la base de datos.`);
    }
})();




// const primeraVez = !checkIfJSONExists();
// if (primeraVez){
//     control_subs.start_subscritpions(showState());
// }


module.exports = app;
