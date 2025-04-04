const mongoose = require('mongoose');
const { getSensorData } = require('../sensoresController');
const { query } = require('../../models/generalSchema');
const { max, min } = require('moment');

// Configura la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/sth_openiot');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Simula una solicitud y respuesta de Express
// PirSensor001
const req = {
    query: {
        ngsiID: 'PirSensor001'
    },
    params: {
            cantidad: 4, 
        // estado: "0", 
        // desde: '2025-04-01T17:42:32.255Z',
        // hasta: '2025-04-01T17:42:45.037Z',
    }
};

// PhotoresistorSensor001
// const req = {
//     query: {
//         ngsiID: 'PhotoresistorSensor001'
//     },
//     params: {
//         orden: 'ascendente',
//         // cantidad: null, 
//         desde: '2025-04-02T18:06:51.777Z',
//         hasta: '2025-04-02T18:10:53.796Z',
//         min: '0', 
//         max: '83',
//     }
// };

// PotentiometerSensor001
// const req = {
//     query: {
//         ngsiID: 'PotentiometerSensor001'
//     },
//     params: {
//         orden: 'ascendente',
//         cantidad: null, 
//         desde: '2025-04-02T18:06:51.777Z',
//         hasta: '2025-04-02T18:10:53.796Z',
//         min: 0, 
//         // max: 100,
//     }
// };

// InfraredSensor001
// const req = {
//     query: {
//         ngsiID: 'InfraredSensor001'
//     },
//     params: {
//         // cantidad: 4, 
//         estado: "0", 
//         // hasta: '2025-04-02T18:10:53.796Z',
//         desde: '2025-04-02T18:06:51.777Z',
//     }
// };

// SwitchSensor001
// const req = {
//     query: {
//         ngsiID: 'SwitchSensor001'
//     },
//     params: {
    //             // cantidad: 4, 
    //         // estado: "1", 
    //         // desde: '2025-03-30T01:14:31.474Z',
    //         // hasta: '2025-03-30T01:24:32.726Z',
    //     }
    // };
    
    
    // UltrasoundSensor001
//     const req = {
//         query: {
//             ngsiID: 'UltrasoundSensor001'
//         },
//         params: {
//             orden: 'ascendente',
//             cantidad: null, 
//             // desde: '2025-03-24T18:46:45',
//             // hasta: '2025-12-01T00:00:00'
//                     // // hasta: '2025-04-02T18:10:53.796Z',
//                     // desde: '2025-04-02T18:06:51.777Z',
//             min: 45, 
//             max: 100,
//     }
// };

// TemperatureSensor001
// const req = {
//         query: {
//                 ngsiID: 'TemperatureSensor001'
//     },
//     params: {
//         orden: 'ascendente',
//         cantidad: null, 
//         // desde: '2025-03-24T18:46:45',
//         // hasta: '2025-12-01T00:00:00'
//         min: 16.95, 
//         max: 100,
//     }
// };

// HumiditySensor001
// const req = {
//         query: {
//                 ngsiID: 'HumiditySensor001'
//     },
//     params: {
//         orden: 'ascendente',
//         cantidad: null, 
//         // desde: '2025-03-24T18:46:45',
//         // hasta: '2025-12-01T00:00:00'
//         min: 58, 
//         max: 100,
//     }
// };


// RfidSensor001// RfidSensor001
// const req = {
//     query: {
//         ngsiID: 'RfidSensor001'
//     },
//     params: {
//             cantidad: 4, 
//         desde: '2025-04-03T18:07:22.724Z',
//         hasta: '2025-04-03T18:08:42.000Z',
//         // id: '157620bb',
//     }
// };





// // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // 
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