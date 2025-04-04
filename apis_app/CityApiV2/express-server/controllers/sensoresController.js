// Propósito: Realizar las operaciones de los sensores
var createError = require('http-errors');
const mongoose = require('mongoose');



const { sensorDict,actuatorDict} = require('../utils/controlCheckIfIsXXX');

const formatNgsiID = require("../utils/formatNgsiID");
const formatNgsiIDToMongo = require('../utils/formatNgsiIDToMongo')

const { fetchDataWithId} = require("../utils/requestUtils");

const  {
  checkType,
  controlCheckIfIsSensor,
} = require("../utils/controlCheckIfIsXXX")

//importar el modelo de los sensores
const generalSchema  = require('../models/generalSchema');

const  controlParamsQueryMongo = require("../utils/controlParamsQueryMongo.js");

const {formatHistoricalMongo} = require('../utils/formatHistoricalMongo.js');

const propertyMap = {
    PirSensor: "presence",               // Propiedad relevante para PirSensor
    PhotoresistorSensor: "light",        // Propiedad relevante para PhotoresistorSensor
    PotentiometerSensor: "velocityControl", // Propiedad relevante para PotentiometerSensor
    InfraredSensor: "presence",          // Propiedad relevante para InfraredSensor
    SwitchSensor: "state",               // Propiedad relevante para SwitchSensor
    RfidSensor: "uiddcode",              // Propiedad relevante para RfidSensor
    UltrasoundSensor: "distance",        // Propiedad relevante para UltrasoundSensor
    TemperatureSensor: "temperature",    // Propiedad relevante para TemperatureSensor
    HumiditySensor: "humidity"           // Propiedad relevante para HumiditySensor
};

const getSensoresDataMongo = async (numidMongo, req, res, next, params, type) => {
    try {
        // Crear el modelo dinámicamente utilizando la variable numidMongo
        const Sensores = mongoose.models[numidMongo] || mongoose.model(numidMongo, generalSchema, numidMongo);
        
        let filter = {};
    
        // Control rangos:  desde, hasta
        if (params.desde || params.hasta) {
            filter.notifiedAt = {};
            if (params.desde !== undefined && params.desde !== null) filter.notifiedAt.$gte = params.desde;
            if (params.hasta !== undefined && params.hasta !== null) filter.notifiedAt.$lte = params.hasta;            
            if (Object.keys(filter.notifiedAt).length === 0) delete filter.notifiedAt; // Eliminar notifiedAt si está vacío
        }
        
        // Control estado:  true, false, HIGH, LOW
        if (params.estado !== undefined && params.estado !== null) {
            const estado = params.estado.toString().toUpperCase();
            const propertyKey = propertyMap[type] || "state"; 
            const propertyPath = `data.${propertyKey}.value`;
            if (params.estado === "true" || params.estado.toUpperCase() === "HIGH" || params.estado.toUpperCase() === "ON" || 
            params.estado === "1" || params.estado === true) 
            {
                filter[propertyPath] = { $in: ["HIGH", "true", "ON", "1", 1, true] };
            } else if ( params.estado === "false" || params.estado.toUpperCase() === "LOW" || params.estado.toUpperCase() === "OFF" || 
            params.estado === "0" || params.estado === false ) {
                filter[propertyPath] = { $in: ["LOW", "false", "OFF","0", 0, false] };
            }
        }
        
        // Control min, max
        if (params.min || params.max) {
            const propertyKey = propertyMap[type] || "state"; 
            const propertyPath = `data.${propertyKey}.value`;
            if (!filter[propertyPath]) filter[propertyPath] = {};
            if (params.min !== undefined && params.min !== null) filter[propertyPath].$gte = Number(params.min);
            if (params.max !== undefined && params.max !== null) filter[propertyPath].$lte = Number(params.max);
            if (Object.keys(filter[propertyPath]).length === 0) delete filter[`data.${propertyKey}.value`]; // Eliminar data.value si está vacío
        }
        
        // Control id:  id
        if (params.id !== undefined && params.id !== null) {
            const propertyKey = propertyMap[type] || "uiddcode"; 
            const propertyPath = `data.${propertyKey}.value`;
            filter[propertyPath] = params.id;
        }
        
        console.log('filter:', filter);

        // Buscar los datos con los filtros aplicados
        const sensoresData = await Sensores.find(filter)
            .sort({ notifiedAt: params.orden === 'ascendente' ? 1 : -1 })
            .limit(parseInt(params.cantidad));

        if (sensoresData.length === 0) {
            return res.status(404).json({ error: `No se encontraron datos en la colección ${numidMongo}` });
        }

        const transformedData = formatHistoricalMongo(sensoresData, orden = params.orden);

        res.json(transformedData);
    } catch (err) {
        console.error(`Error al obtener datos de la colección ${numidMongo}:`, err);
        next(err);
    }
};

// ["PirSensor", "PhotoresistorSensor", "PotentiometerSensor", "InfraredSensor", "SwitchSensor", "RfidSensor", "UltrasoundSensor" , "TemperatureSensor" ,"HumiditySensor"], 


// const getSensorData = async function (req, res, next) {
const getSensorData = async function (req, res, next) {
    console.log('req.params.ngsiID:', req.params.ngsiID);
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);
    console.log('ngsiID:', ngsiID);
    
    try {
        if (!ngsiID) {
            return res.status(400).json({ error: "Invalid ngsiID format" });
        }
    
        const check = controlCheckIfIsSensor(ngsiID);
        if (check === "notSensor") {
            return res.status(404).json({ error: "Not a sensor" });
        }
    
        const response = await fetchDataWithId(ngsiID, "");
        
        if (check === "notRegistred") {
            checkType(response.data);
            const reCheck = controlCheckIfIsSensor(ngsiID);
            if (reCheck === 'notSensor') {
                return res.status(404).json({ error: "Not a sensor" });
            }    
        }
    
        const type = sensorDict[ngsiID];
        console.log('type:', type);

    
        const numidMongo = formatNgsiIDToMongo(ngsiID);
        console.log('numidMongo:', numidMongo);
    
        // Control params
        const params = controlParamsQueryMongo(req, res, type);
        if (params.error) {
            return res.status(400).json(params);
        }
        console.log(params);

        const sensoresData = await getSensoresDataMongo(numidMongo, req, res, next, params, type);
        
        console.log('sensoresData:', sensoresData);

        if (!sensoresData || sensoresData.length === 0) {
            return res.status(404).json({ error: "Sensor data not found" });
        }
    
        res.json(sensoresData);

    } catch (err) {
        console.error('Error fetching sensor data:', err);
        next(err);
    }
};

module.exports = {
    getSensorData,   
}