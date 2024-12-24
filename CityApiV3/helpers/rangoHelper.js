const Temperatura = require('../models/Temperatura');
const Humedad = require('../models/Humedad');
const MotorDC = require('../models/MotorDC');
const Ultrasonido = require('../models/Ultrasonido');
const Fotorresistor = require('../models/Fotorresistor');
const createError = require('http-errors');

exports.filterByRango = async function (collectionName, min, max) {

    let result;
    switch (collectionName) {
        case 'sth_urn_ngsi-ld_TemperatureSensor_001':
            result = await Temperatura.aggregate([
                { $unwind: "$data" },
                { $match: { "data.temperature.value": { $gte: parseFloat(min), $lte: parseFloat(max) } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_HumiditySensor_001':
            result = await Humedad.aggregate([
                { $unwind: "$data" },
                { $match: { "data.humidity.value": { $gte: parseFloat(min), $lte: parseFloat(max) } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_EngineDC_001':
            result = await MotorDC.aggregate([
                { $unwind: "$data" },
                { $match: { "data.velocityEngine.value": { $gte: parseFloat(min), $lte: parseFloat(max) } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_UltrasoundSensor_001':
            result = await Ultrasonido.aggregate([
                { $unwind: "$data" },
                { $match: { "data.distance.value": { $gte: parseFloat(min), $lte: parseFloat(max) } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_PhotoresistorSensor_001':
            result = await Fotorresistor.aggregate([
                { $unwind: "$data" },
                { $match: { "data.light.value": { $gte: parseFloat(min), $lte: parseFloat(max) } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_PotentiometerSensor_001':
            result = await Potenciometro.aggregate([
                { $unwind: "$data" },
                { $sort: { "data.velocityControl.value": { $gte: parseFloat(min), $lte: parseFloat(max) } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_PirSensor_001':
            result = "Este es el sensor Pir y no proporciona datos numéricos.";
            break;
        case 'sth_urn_ngsi-ld_InfraredSensor_001':
            result = "Este es el sensor de infrarrojos y no proporciona datos numéricos.";
            break;
        case 'sth_urn_ngsi-ld_Light_001':
            result = "Este es el sensor de luz y no proporciona datos numéricos.";
            break;
        case 'sth_urn_ngsi-ld_RfidSensor_001':
            result = "Este es el sensor Rfid y no proporciona datos numéricos.";
            break;
        case 'sth_urn_ngsi-ld_LedDetection_001':
            result = "Este es el sensor de detección Led y no proporciona datos numéricos.";
            break;
        default:
            throw createError(404, 'Sensor no encontrado');
    }
    return result;
}