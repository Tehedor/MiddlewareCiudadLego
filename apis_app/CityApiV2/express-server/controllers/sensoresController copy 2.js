// Propósito: Realizar las operaciones de los sensores
var createError = require('http-errors');
const mongoose = require('mongoose');



const { sensorDict,actuatorDict} = require('../utils/controlCheckIfIsXXX');

const formatNgsiID = require("../utils/formatNgsiID");
const formatNgsiIDToMongo = require('../utils/formatNgsiIDToMongo')


const { 
  getRemapFunction, 
  handleAxiosError, 
  fetchData,
  fetchDataWithId
} = require("../utils/requestUtils");


const  {
  checkType,
  sendToBlackList,
  controlCheckIfIsSensor,
  controlCheckIfIsActuator,
  controlCheckIfIsCamera,
  controlCheckIfIsLegoBuilding,
  controlCheckIfIsLegoCity
} = require("../utils/controlCheckIfIsXXX")


//importar las funciones de ayuda
// const indexHelper = require('../helpers/index');
// const dateHelper = require('../helpers/dateHelper');
// const ordenHelper = require('../helpers/ordenHelper');
// const rangoHelper = require('../helpers/rangoHelper');
// const estadoHelper = require('../helpers/estadoHelper');
// const edificioHelper = require('../helpers/edificioHelper');

//importar el modelo de los sensores
const sensorSchema = require('../models/sensorSchema');

//función para obtener los datos de los sensores
// const getSensoresData2 = async (req, res, next) => {
//     try {
//         const sensoresData = await Sensores.find({});
//         res.json(sensoresData);
//     } catch (err) {
//         next(err); // Llama a `next` con el error para que Express maneje el error
//     }
// };


// const getSensoresData2 = async (numidMongo, req, res, next) => {
//     try {
//         // Crear el modelo dinámicamente utilizando la variable numidMongo
//         const Sensores = mongoose.model(numidMongo, sensorSchema, numidMongo);

//         // Buscar los datos en la colección dinámica
//         const sensoresData = await Sensores.find({}, 'data'); // Solo selecciona el campo 'data'
//         if (sensoresData.length === 0) {
//             console.log(`No se encontraron datos en la colección ${numidMongo}`);
//             return res.status(404).send(`No se encontraron datos en la colección ${numidMongo}`);
//         }

//         // Verifica que los datos existen y están en el formato correcto antes de mapear
//         const mappedData = sensoresData.map(sensor => sensor.data).filter(data => data !== undefined);
//         if (mappedData.length === 0) {
//             console.log(`Los datos en la colección ${numidMongo} no están en el formato esperado`);
//             return res.status(500).send(`Los datos en la colección ${numidMongo} no están en el formato esperado`);
//         }

//         res.json(mappedData); // Devuelve solo el campo 'data'
//     } catch (err) {
//         console.error(`Error al obtener datos de la colección ${numidMongo}:`, err);
//         next(err); // Llama a `next` con el error para que Express maneje el error
//     }
// };


const getSensoresData2 = async (numidMongo, req, res, next) => {
    try {
        // Crear el modelo dinámicamente utilizando la variable numidMongo
        // const Sensores = mongoose.models[numidMongo] || mongoose.model(numidMongo, sensorSchema, numidMongo);
        const Sensores =  mongoose.model(numidMongo, sensorSchema, numidMongo);

        // Buscar los datos en la colección dinámica
        const sensoresData = await Sensores.find({}, 'data'); // Solo selecciona el campo 'data'
        console.log('sensoresData:', sensoresData);
        if (sensoresData.length === 0) {
            console.log(`No se encontraron datos en la colección ${numidMongo}`);
            return res.status(404).send(`No se encontraron datos en la colección ${numidMongo}`);
        }

        // Verifica que los datos existen y están en el formato correcto antes de mapear
        const mappedData = sensoresData.map(sensor => sensor.data).flat().filter(data => data !== undefined);
        if (mappedData.length === 0) {
            console.log(`Los datos en la colección ${numidMongo} no están en el formato esperado`);
            return res.status(500).send(`Los datos en la colección ${numidMongo} no están en el formato esperado`);
        }

        res.json(mappedData); // Devuelve solo el campo 'data'
    } catch (err) {
        console.error(`Error al obtener datos de la colección ${numidMongo}:`, err);
        next(err); // Llama a `next` con el error para que Express maneje el error
    }
};


// ["PirSensor", "PhotoresistorSensor", "PotentiometerSensor", "InfraredSensor", "SwitchSensor", "RfidSensor", "UltrasoundSensor" , "TemperatureSensor" ,"HumiditySensor"], 

const sensorsTypeBoolean = ["PirSensor", "InfraredSensor", "SwitchSensor" ]
const sensorsTypeNumber  = [ "PhotoresistorSensor", "PotentiometerSensor",  "UltrasoundSensor" , "TemperatureSensor" ,"HumiditySensor"]
const sensorsTypeID  = [ "RfidSensor"]


const getSensorData = async function (req, res, next) {
    console.log('req.params.ngsiID:', req.params.ngsiID);
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);
    console.log('ngsiID:', ngsiID);
    try {
        if (!ngsiID) {
            return res.status(400).send("Invalid ngsiID format");
        }
    
        // Check if is sensor
        const check = controlCheckIfIsSensor(ngsiID); 


        if (check == "notSensor") {
            return res.status(404).send("No is a sensor");
        }

        const response = await fetchDataWithId(ngsiID, "");
        
        // No registred
        if (check == "notRegistred") {
            checkType(response.data);
            const check = controlCheckIfIsSensor(ngsiID); 
            if (check == 'notSensor') {
                return res.status(404).send("No is a sensor");
            }    
        }

        const type = sensorDict[ngsiID];
        console.log('type:', type);
        // const numidMongo = formatNgsiIDToMongo(ngsiID);
        
        // Checkear si es sensor
        
        
        const numidMongo = formatNgsiIDToMongo(ngsiID);
        console.log('numidMongo:', numidMongo);

        // await getSensoresData2(numidMongo, req, res, next);


        const sensoresData = await getSensoresData2(numidMongo, req, res, next);
        console.log('sensoresData:', sensoresData[0].id);

        // if (!sensoresData || sensoresData.length === 0) {
        //     throw createError(404, 'Sensor no encontrado');
        // }

        // let responseData = sensoresData;

        // Si no hay parámetros en la consulta, busca el sensor
        // if (req.query && Object.keys(req.query).length === 0) {
        //     responseData = sensoresData;
        // }

        // if (!responseData) {
        //     responseData = "Algo has hecho mal, revisa los parámetros de la consulta";
        // }

        //     // Si no hay parámetros en la consulta, busca el sensor
        // if (Object.keys(req.query).length === 0) {
        //     console.log(getSensoresData2(numidMongo, req, res, next))
        //     const sensor = await getSensoresData2(numidMongo, req, res, next);
            
        //     if (!sensor) {
        //         throw createError(404, 'Sensor no encontrado');
        //     }
        //     const responseData = sensor;
        //     } else if (req.query.desde && req.query.hasta) {
        //         responseData = await dateHelper.filterByDate(collectionName, req.query.desde, req.query.hasta);
        //     } else if (req.query.orden) {
        //         responseData = await ordenHelper.filterByOrden(collectionName, req.query.orden);
        //     } else if (req.query.min && req.query.max) {
        //         responseData = await rangoHelper.filterByRango(collectionName, req.query.min, req.query.max);
        //     } else if (req.query.estado) {
        //         responseData = await estadoHelper.filterByEstado(collectionName, req.query.estado);
        //     } else if (req.query.edificio) {
        //         responseData = await edificioHelper.filterByEdificio(collectionName, req.query.edificio);
        //     }
        //     // Si hay otros parámetros, llama a indexHelper.getCollection
        //     else {
        //         for (let param in req.query) {
        //             if (!allowedParams.includes(param)) {
        //                 throw new Error(`El parámetro '${param}' no está permitido`);
        //             }
        //         }
        //         console.log('Obteniendo colección con parámetros:', req.query);
        //         responseData = await indexHelper.getCollection(collectionName, sensorId, req.query);
            // }

            // if (!responseData) {
            //     responseData = "Algo has hecho mal, revisa los parámetros de la consulta";
            // }
            // res.json(responseData);
        
    } catch (err) {
        console.error('Error al obtener datos del sensor o edificio:', err);
        next(err);
    }
};



module.exports = {
    getSensoresData2,
    getSensorData,   
}