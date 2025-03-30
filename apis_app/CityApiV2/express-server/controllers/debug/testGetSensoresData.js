const mongoose = require('mongoose');
const { getSensorData } = require('../sensoresController');
const { query } = require('../../models/generalSchema');
const { max } = require('moment');

// Configura la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/sth_openiot');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Simula una solicitud y respuesta de Express
const req = {
    query: {
        // ngsiID: 'PirSensor001'
        ngsiID: 'TemperatureSensor1'
    },
    // params: {
    //     orden: 'ascendente',
    //     cantidad: null, 
    //     // desde: '2025-03-24T18:46:45',
    //     // hasta: '2025-12-01T00:00:00'
    //     // min: 0, 
    //     max: 100,
    // }
    params: {
        desde: '2025-03-30T01:14:31.474Z',
        hasta: '2025-03-30T01:24:32.726Z',
    }
};
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
getSensorData(req, res, next);