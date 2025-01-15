const createError = require('http-errors');
const Led = require('../models/actuators/LED');
const Infrarrojo = require('../models/sensors/Infrarrojos');
const Luz = require('../models/actuators/Luz');

exports.filterByEstado = async function (collectionName, estado) {

    let result;
    switch (collectionName) {
        case 'sth_urn_ngsi-ld_LedDetection_001':
            let ledQueryValue = estado === 'encendido' ? "ON" : "OFF";
            result = await Led.aggregate([
                { $unwind: "$data" },
                { $match: { "data.stateLed.value": ledQueryValue } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_InfraredSensor_001':
            let infraredQueryValue = estado === 'encendido' ? "HIGH" : "LOW";
            result = await Infrarrojo.aggregate([
                { $unwind: "$data" },
                { $match: { "data.presence.value": infraredQueryValue } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_Light_001':
            let lightQueryValue = estado === 'encendido' ? "ON" : "OFF";
            result = await Luz.aggregate([
                { $unwind: "$data" },
                { $match: { "data.stateLight.value": lightQueryValue } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_TemperatureSensor_001':
            result = "Este es el sensor de temperatura y no proporciona un estado.";
            break;
        case 'sth_urn_ngsi-ld_HumiditySensor_001':
            result = "Este es el sensor de humedad y no proporciona un estado.";
            break;
        case 'sth_urn_ngsi-ld_EngineDC_001':
            result = "Este es el sensor de motor y no proporciona un estado.";
            break;
        case 'sth_urn_ngsi-ld_UltrasoundSensor_001':
            result = "Este es el sensor de ultrasonido y no proporciona un estado.";
            break;
            break;
        case 'sth_urn_ngsi-ld_PhotoresistorSensor_001':
            result = "Este es el sensor fotorresistor y no proporciona un estado.";
            break;
        case 'sth_urn_ngsi-ld_PotentiometerSensor_001':
            result = "Este es el sensor potenciómetro y no proporciona un estado.";
            break;
        case 'sth_urn_ngsi-ld_PirSensor_001':
            result = "Este es el sensor pir y no proporciona un estado.";
            break;
        case 'sth_urn_ngsi-ld_RfidSensor_001':
            result = "Este es el sensor rfid y no proporciona un estado.";
            break;
        default:
            throw createError(404, 'Sensor no encontrado');
    }
    return result;
}