const mongoose = require('mongoose');
// const { getSensorData } = require('../sensoresController');
const { getActuatorData } = require('../actuatorsController');
const { query } = require('../../models/generalSchema');
const { max } = require('moment');

// Configura la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/sth_openiot');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Simula una solicitud y respuesta de Express
// const req = {
//     query: {
//         ngsiID: 'LedDetection001'
//     },
//     params: {
//             // cantidad: 3, 
//         estado: "OFF",
//         desde: '2025-04-03T18:22:07.958Z',
//         hasta: '2025-04-03T18:22:27.125Z',
//     }
// };

const req = {
    query: {
        ngsiID: 'Light001'
    },
    params: {
            // cantidad: 3, 
        estado: "false",
    //     desde: '2025-03-30T01:14:31.474Z',
    //     hasta: '2025-03-30T01:24:32.726Z',
    }
};

// const req = {
//     query: {
//         ngsiID: 'EngineDC001'
//     },
//     params: {
//         // orden: 'ascendente',
//         hasta: '2025-04-03T18:24:04.796Z',
//         desde: '2025-04-03T18:22:44.649Z',
//         min: 91, 
//         max: 100,
//     }
// };

// const req = {
//     query: {
//         ngsiID: 'Servmotor001'
//     },
//     params: {
//             // cantidad: 3, 
//         // estado: "false",
//     //     desde: '2025-03-30T01:14:31.474Z',
//     //     hasta: '2025-03-30T01:24:32.726Z',
//     }
// };


const res = {
    status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
    },
    json: function (data) {
        console.log('Response data:', JSON.stringify(data, null, 2)); // Imprime el contenido completo del campo 'data'
        mongoose.connection.close(); // Cierra la conexión a la base de datos después de la prueba
        if (data.error) {
            process.exit(1); // Termina la ejecución del script si hay un error
        }
    },
    send: function (message) {
        // console.log('Response message:', message);
        mongoose.connection.close(); // Cierra la conexión a la base de datos después de la prueba
    }
};
const next = (err) => {
    console.error('Errorrr:', err);
    mongoose.connection.close(); // Cierra la conexión a la base de datos después de la prueba
    process.exit(1); // Termina la ejecución del script si hay un error
};

// Llama a la función de prueba
getActuatorData(req, res, next);