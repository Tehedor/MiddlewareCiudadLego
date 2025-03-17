// Propósito: Realizar las operaciones de los sensores
var createError = require('http-errors');

//importar las funciones de ayuda
const indexHelper = require('../helpers/index');
const dateHelper = require('../helpers/dateHelper');
const ordenHelper = require('../helpers/ordenHelper');
const rangoHelper = require('../helpers/rangoHelper');
const estadoHelper = require('../helpers/estadoHelper');
const edificioHelper = require('../helpers/edificioHelper');

//importar el modelo de los sensores
const Sensores = require('../models/Sensores');

//función para obtener los datos de los sensores
exports.getSensoresData = async (req, res, next) => {
    try {
        const sensoresData = await Sensores.find({});
        res.json(sensoresData);
    } catch (err) {
        next(err); // Llama a `next` con el error para que Express maneje el error
    }
};

const sensorMapping = {
    1: {
        numid: "urn:ngsi-ld:TemperatureSensor:001",
        collectionName: "sth_urn_ngsi-ld_TemperatureSensor_001",
        allowed_params: [],
    },
    2: {
        numid: "urn:ngsi-ld:HumiditySensor:001",
        collectionName: "sth_urn_ngsi-ld_HumiditySensor_001",
        allowed_params: [],
    },
    3: {
        numid: "urn:ngsi-ld:EngineDC:001",
        collectionName: "sth_urn_ngsi-ld_EngineDC_001",
        allowed_params: ["mayorque", "menorque", "igualque"],
    },
    4: {
        numid: "urn:ngsi-ld:UltrasoundSensor:001",
        collectionName: "sth_urn_ngsi-ld_UltrasoundSensor_001",
        allowed_params: [],
    },
    5: {
        numid: "urn:ngsi-ld:PhotoresistorSensor:001",
        collectionName: "sth_urn_ngsi-ld_PhotoresistorSensor_001",
        allowed_params: [],
    },
    6: {
        numid: "urn:ngsi-ld:PirSensor:001",
        collectionName: "sth_urn_ngsi-ld_PirSensor_001",
        allowed_params: [],
    },
    7: {
        numid: "urn:ngsi-ld:PotentiometerSensor:001",
        collectionName: "sth_urn_ngsi-ld_PotentiometerSensor_001",
        allowed_params: [],
    },
    8: {
        numid: "urn:ngsi-ld:InfraredSensor:001",
        collectionName: "sth_urn_ngsi-ld_InfraredSensor_001",
        allowed_params: [],
    },
    9: {
        numid: "urn:ngsi-ld:Light:001",
        collectionName: "sth_urn_ngsi-ld_Light_001",
        allowed_params: [],
    },
    10: {
        numid: "urn:ngsi-ld:RfidSensor:001",
        collectionName: "sth_urn_ngsi-ld_RfidSensor_001",
        allowed_params: [],
    },
    11: {
        numid: "urn:ngsi-ld:LedDetection:001",
        collectionName: "sth_urn_ngsi-ld_LedDetection_001",
        allowed_params: [],
    },
    12: {
        numid: "urn:ngsi-ld:Servmotor:001",
        collectionName: "sth_urn_ngsi-ld_Servmotor_001",
        allowed_params: [],
    },
    13: {
        numid: "urn:ngsi-ld:SwitchSensor:001",
        collectionName: "sth_urn_ngsi-ld_SwitchSensor_001",
        allowed_params: [],
    }
};

exports.getSensorData = async function (req, res, next) {
    try {
        const { numid, edificio } = req.params;

        if (edificio) {
            const responseData = await edificioHelper.filterByEdificio(edificio);
            res.json(responseData);
        } else if (numid) {
            const sensorId = parseInt(numid); // Asegúrate de que numid es un número
            const sensorInfo = sensorMapping[sensorId];

            if (!sensorInfo) {
                throw createError(404, 'Sensor no encontrado');
            }

            const collectionName = sensorInfo.collectionName;
            const allowedParams = sensorInfo.allowed_params;

            console.log('Sensor ID:', sensorId);
            console.log('Sensor Info:', sensorInfo);
            console.log('Query Params:', req.query);

            let responseData;

            // Si no hay parámetros en la consulta, busca el sensor
            if (Object.keys(req.query).length === 0) {
                const sensor = await Sensores.findOne({numid: sensorInfo.numid});
                if (!sensor) {
                    throw createError(404, 'Sensor no encontrado');
                }
                responseData = sensor;
            } else if (req.query.desde && req.query.hasta) {
                responseData = await dateHelper.filterByDate(collectionName, req.query.desde, req.query.hasta);
            } else if (req.query.orden) {
                responseData = await ordenHelper.filterByOrden(collectionName, req.query.orden);
            } else if (req.query.min && req.query.max) {
                responseData = await rangoHelper.filterByRango(collectionName, req.query.min, req.query.max);
            } else if (req.query.estado) {
                responseData = await estadoHelper.filterByEstado(collectionName, req.query.estado);
            } else if (req.query.edificio) {
                responseData = await edificioHelper.filterByEdificio(collectionName, req.query.edificio);
            }
            // Si hay otros parámetros, llama a indexHelper.getCollection
            else {
                for (let param in req.query) {
                    if (!allowedParams.includes(param)) {
                        throw new Error(`El parámetro '${param}' no está permitido`);
                    }
                }
                console.log('Obteniendo colección con parámetros:', req.query);
                responseData = await indexHelper.getCollection(collectionName, sensorId, req.query);
            }

            if (!responseData) {
                responseData = "Algo has hecho mal, revisa los parámetros de la consulta";
            }
            res.json(responseData);
        } else {
            throw createError(404, 'Sensor o edificio no encontrado');
        }
    } catch (err) {
        console.error('Error al obtener datos del sensor o edificio:', err);
        next(err);
    }
};

