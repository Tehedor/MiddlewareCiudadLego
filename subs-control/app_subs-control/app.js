
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const generalControllerEntities = require('./controllers/generalControllerEntities');
const generalSubsDraco = require('./controllers/generalSubsDraco');
const generalSubsRelations = require('./controllers/generalSubsRelations');



let MongoPort = process.env.MONGO_PORT || 27018;

let hostMongoDB = 'localhost';
if (process.env.MODE_CONTAINERS === 'true') {
    hostMongoDB = 'mongo-db-orion';
    MongoPort = process.env.MONGO_PORT || 27017;
}   


mongoose.connect(`mongodb://${hostMongoDB}:${MongoPort}/orion`)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// Crear una nueva conexión para la base de datos subsController
// const subsControllerConnection = mongoose.createConnection(`mongodb://${hostMongoDB}:${MongoPort}/subsController`)
//     .then(() => console.log('Connected to MongoDB subsController...'))
//     .catch(err => console.log('Error connecting to MongoDB subsController:', err));

// // // // // // // // // // // // // // // // // // // //
// Web
// // // // // // // // // // // // // // // // // // // //
const app = express();


// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const port = 3000; //mirar puerto

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index.pug', { title: 'Hey', message: 'Hello there!' })
    // res.render('index', { title: 'app', message: 'Hello there!' })
})

app.get('/entities', async (req, res) => {
    console.log('Pasa1');

    try {
        console.log(await generalControllerEntities());
        res.render('entities.pug', {  MODE_CONTAINERS: process.env.MODE_CONTAINERS, entities: await generalControllerEntities() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/draco', async (req, res) => {
    console.log('Pasa1');

    try {
        res.render('draco.pug', {  MODE_CONTAINERS: process.env.MODE_CONTAINERS, subsDraco: await generalSubsDraco() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/relations', async (req, res) => {
    console.log('Pasa2');
    try {
        res.render('relations.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS , subsRelations: await generalSubsRelations() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/all', async (req, res) => {
    console.log('Pasa1');


    try {
        // console.log(await generalSubsRelations());
        // console.log(await generalSubsDraco());
        res.render('all.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS ,  subsDraco: await generalSubsDraco(), subsRelations: await generalSubsRelations()});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



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





module.exports = app;
