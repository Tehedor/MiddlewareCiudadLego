// Propósito: Realizar las operaciones de los Camera
var createError = require('http-errors');
const mongoose = require('mongoose');

const formatNgsiID = require("../utils/formatNgsiID");
const formatNgsiIDToMongo = require('../utils/formatNgsiIDToMongo')

const { 
  fetchDataWithId
} = require("../utils/requestUtils");

const  {
  checkType,
  controlCheckIfIsCamera,
} = require("../utils/controlCheckIfIsXXX")

//importar el modelo de los sensores
const generalSchema  = require('../models/generalSchema');

const  controlParamsQueryMongo = require("../utils/controlParamsQueryMongo.js");
const {formatHistoricalCameraMongo} = require('../utils/formatHistoricalMongo.js');

const propertyMap = {
    Camera: "on", 
};

const getCameraDataMongo = async (numidMongo, req, res, params, type) => {
    try {
        // Crear el modelo dinámicamente utilizando la variable numidMongo
        const Camera = mongoose.models[numidMongo] || mongoose.model(numidMongo, generalSchema, numidMongo);
        
        let filter = {};
    
        // Control rangos:  desde, hasta
        if (params.desde || params.hasta) {
            filter.notifiedAt = {};
            if (params.desde !== undefined && params.desde !== null) filter.notifiedAt.$gte = params.desde;
            if (params.hasta !== undefined && params.hasta !== null) filter.notifiedAt.$lte = params.hasta;            
            if (Object.keys(filter.notifiedAt).length === 0) delete filter.notifiedAt; // Eliminar notifiedAt si está vacío
        }
        
        // Control estado: true, false, HIGH, LOW, ON, 1, True (boolean)
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
        
        
        // console.log('filter:', filter);

        // Buscar los datos con los filtros aplicados
        const CameraData = await Camera.find(filter)
            .sort({ notifiedAt: params.orden === 'ascendente' ? 1 : -1 })
            .limit(parseInt(params.cantidad));

        if (CameraData.length === 0) {
            return res.status(404).json({ error: `No se encontraron datos en la colección ${numidMongo}` });
        }

        return transformedData = formatHistoricalCameraMongo(CameraData, orden = params.orden);

    } catch (err) {
        if (err.name === 'MongoError' || err.name === 'CastError') {
            return res.status(404).json({ 
                error: `El componente ${numidMongo} no existe en la base de datos`,
                details: err.message
            });
        }

        // console.error(`Error al obtener datos de la colección ${numidMongo}:`, err);
        // Enviar un error genérico si ocurre otro problema
        return res.status(500).json({ 
            error: "Error al obtener datos de la colección",
            details: err.message
        });
    }
};



const getCameraData = async function (req, res, next) {
    // console.log('req.params.ngsiID:', req.params.ngsiID);
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);
    // console.log('ngsiID:', ngsiID);
    
    try {
        if (!ngsiID) {
            return res.status(400).json({ error: "Invalid ngsiID format" });
        }
    
        const check = controlCheckIfIsCamera(ngsiID);
        if (check == "notCamera") {
            return res.status(404).send("No is a Camera");
        }
    
        
        if (check === "notRegistred") {
            try {
                const response = await fetchDataWithId(ngsiID, "");
                // console.log('response:', response.data);
                checkType(response.data);
                const reCheck = controlCheckIfIsCamera(ngsiID);
                
                if (reCheck === 'notCamera') {
                    return res.status(404).json({ error: "Not an Camera" });
                }    
            }catch (error) {
                const response = {
                    id: ngsiID,
                    type: 'Notype',
                }
                checkType(response);
                return res.status(500).json({ 
                    message: `ngsiID: ${ngsiID} no existe o error con el context broker` 
                });
            }
        }
    
        type = 'Camera'

        const numidMongo = formatNgsiIDToMongo(ngsiID);
        // console.log('numidMongo:', numidMongo);
        
        // Control params
        const params = controlParamsQueryMongo(req, res, type);
        if (params.error) {
            return res.status(400).json(params);
        }
        // console.log(params);

        
        const CameraData = await getCameraDataMongo(numidMongo, req, res, params, type);
        // console.log('CameraData:', CameraData);
        
        if (!CameraData || CameraData.length === 0) {
            return res.status(404).json({ error: "Camera data not found" });
        }
    
        res.json(CameraData);

    } catch (err) {
        if (!res.headersSent) { // Check if headers have already been sent
            return res.status(500).json({ error: "Internal server error" });
        }
        // return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getCameraData,   
}