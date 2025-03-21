const moment = require('moment');
const Temperatura = require('../models/sensors/Temperatura');
const Humedad = require('../models/sensors/Humedad');
const MotorDC = require('../models/actuators/MotorDC');
const Ultrasonido = require('../models/sensors/Ultrasonido');
const Fotorresistor = require('../models/sensors/Fotorresistor');
const Pir = require('../models/sensors/Pir');
const Potenciometro = require('../models/sensors/Potenciometro');
const Infrarrojo = require('../models/sensors/Infrarrojos');
const Luz = require('../models/actuators/Luz');
const Rfid = require('../models/sensors/Rfid');
const Led = require('../models/actuators/LED');

exports.filterByDate = async function (collectionName, desde, hasta) {
    let fromDate = moment(desde);
    let toDate = moment(hasta);

    // Validar las fechas
    if (!fromDate.isValid() || !toDate.isValid()) {
        throw new Error('Las fechas proporcionadas son inválidas');
    }

    fromDate = fromDate.toDate();
    toDate = toDate.toDate();

    console.log(`Buscando en la colección ${collectionName} desde ${fromDate} hasta ${toDate}`);

    let result;
    switch (collectionName) {
        case 'sth_urn_ngsi-ld_TemperatureSensor_001':
            result = await Temperatura.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_HumiditySensor_001':
            result = await Humedad.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_EngineDC_001':
            result = await MotorDC.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_UltrasoundSensor_001':
            result = await Ultrasonido.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_PhotoresistorSensor_001':
            result = await Fotorresistor.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_PirSensor_001':
            result = await Pir.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_PotentiometerSensor_001':
            result = await Potenciometro.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_InfraredSensor_001':
            result = await Infrarrojo.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_Light_001':
            result = await Luz.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_RfidSensor_001':
            result = await Rfid.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        case 'sth_urn_ngsi-ld_LedDetection_001':
            result = await Led.aggregate([
                { $addFields: { notifiedAtDate: { $dateFromString: { dateString: "$notifiedAt" } } } },
                { $match: { notifiedAtDate: { $gte: fromDate, $lte: toDate } } }
            ]);
            break;
        default:
            throw new Error('Nombre de colección desconocido');
    }
    return result;
};




