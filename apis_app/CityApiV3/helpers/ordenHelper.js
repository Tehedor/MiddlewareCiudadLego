const Temperatura = require('../models/sensors/Temperatura');
const Humedad = require('../models/sensors/Humedad');
const MotorDC = require('../models/actuators/MotorDC');
const Ultrasonido = require('../models/sensors/Ultrasonido');
const Fotorresistor = require('../models/sensors/Fotorresistor');
const Potenciometro = require('../models/sensors/Potenciometro');
const createError = require('http-errors');

exports.filterByOrden = async function (collectionName, orden) {
    let order = orden === 'ascendente' ? 1 : -1;
    let result;
    switch (collectionName) {
        case 'sth_urn_ngsi-ld_TemperatureSensor_001':
            result = await Temperatura.aggregate([
                { $unwind: "$data" },
                { $sort: { "data.temperature.value": order } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_HumiditySensor_001':
            result = await Humedad.aggregate([
                { $unwind: "$data" },
                { $sort: { "data.humidity.value": order } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_EngineDC_001':
            result = await MotorDC.aggregate([
                { $unwind: "$data" },
                { $sort: { "data.velocityEngine.value": order } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_UltrasoundSensor_001':
            result = await Ultrasonido.aggregate([
                { $unwind: "$data" },
                { $sort: { "data.distance.value": order } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_PhotoresistorSensor_001':
            result = await Fotorresistor.aggregate([
                { $unwind: "$data" },
                { $sort: { "data.light.value": order } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_PotentiometerSensor_001':
            result = await Potenciometro.aggregate([
                { $unwind: "$data" },
                { $sort: { "data.velocityControl.value": order } }
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