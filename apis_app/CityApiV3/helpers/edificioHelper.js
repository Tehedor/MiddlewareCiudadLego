const Temperatura = require('../models/sensors/Temperatura');
const Humedad = require('../models/sensors/Humedad');
const MotorDC = require('../models/actuators/MotorDC');
const Ultrasonido = require('../models/sensors/Ultrasonido');
const Fotorresistor = require('../models/sensors/Fotorresistor');
const Led = require('../models/actuators/LED');
const Infrarrojo = require('../models/sensors/Infrarrojos');
const Luz = require('../models/actuators/Luz');
const Rfid = require('../models/sensors/Rfid');
const Pir = require('../models/sensors/Pir');
const Potenciometro = require('../models/sensors/Potenciometro');

const createError = require('http-errors');

exports.filterByEdificio = async function (edificio) {
    let data = [];
    console.log(`Filtering by edificio: ${edificio}`); // Log the edificio being filtered
    switch (edificio) {
        case 'tiempo':
            try {
                console.log('Fetching temperatura and humedad data');
                const temperaturaData = await Temperatura.find();
                const humedadData = await Humedad.find();
                data = [...temperaturaData, ...humedadData];
            } catch (error) {
                console.error('Error fetching temperatura or humedad data', error);
                throw createError(500, error);
            }
            break;
        case 'tren':
            try {
                console.log('Fetching motor and potenciometro data');
                const motorData = await MotorDC.find();
                const potenciometroData = await Potenciometro.find();
                data = [...motorData, ...potenciometroData];
            } catch (error) {
                console.error('Error fetching motor or potenciometro data', error);
                throw createError(500, error);
            }
            break;
        case 'radar':
            try {
                console.log('Fetching infrarrojo data');
                data = await Infrarrojo.find();
            } catch (error) {
                console.error('Error fetching infrarrojo data', error);
                throw createError(500, error);
            }
            break;
        case 'farolas':
            try {
                console.log('Fetching fotorresistor, led, luz, and pir data');
                const fotorresistorData = await Fotorresistor.find();
                const ledData = await Led.find();
                const luzData = await Luz.find();
                const pirData = await Pir.find();
                data = [...fotorresistorData, ...ledData, ...luzData, ...pirData];
            } catch (error) {
                console.error('Error fetching fotorresistor, led, luz, or pir data', error);
                throw createError(500, error);
            }
            break;
        case 'peaje':
            try {
                console.log('Fetching rfid data');
                data = await Rfid.find();
            } catch (error) {
                console.error('Error fetching rfid data', error);
                throw createError(500, error);
            }
            break;
        case 'grua':
            try {
                console.log('Fetching ultrasonido data');
                data = await Ultrasonido.find();
            } catch (error) {
                console.error('Error fetching ultrasonido data', error);
                throw createError(500, error);
            }
            break;
    }
    console.log(`Data fetched for ${edificio}:`, data);
    return data;
};