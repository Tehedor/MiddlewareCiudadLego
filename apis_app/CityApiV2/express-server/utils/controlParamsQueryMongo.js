const sensorsTypeBoolean = ["PirSensor", "InfraredSensor", "SwitchSensor"];
const sensorsTypeNumber = ["PhotoresistorSensor", "PotentiometerSensor", "UltrasoundSensor", "TemperatureSensor", "HumiditySensor"];
const sensorsTypeID = ["RfidSensor"];

const paramsTypeBoolean = ["orden", "cantidad", "desde", "hasta", "estado"];
const paramsTypeNumber = ["orden", "cantidad", "desde", "hasta", "min", "max"];
const paramsTypeID = ["orden", "cantidad", "desde", "hasta", "identificador"];


const  controlParams = require("./controlParams");
const controlParamsQueryMongo = (req, res, type) => {
    let allowedParams = [];

    if (sensorsTypeBoolean.includes(type)) {
        allowedParams = paramsTypeBoolean;
    } else if (sensorsTypeNumber.includes(type)) {
        allowedParams = paramsTypeNumber;
    } else if (sensorsTypeID.includes(type)) {
        allowedParams = paramsTypeID;
    } else {
        return { error: "Invalid sensor type" };
    }

    const receivedParams = { ...req.query, ...req.params };
    const finalParams = {};
    const invalidParams = [];

    for (const key in receivedParams) {
        if (key === "ngsiID") continue; // Ignorar el parámetro "ngsiID"

        if (allowedParams.includes(key)) {
            finalParams[key] = receivedParams[key];
        } else {
            invalidParams.push(key);
        }
    }

    // Control orden
    finalParams.orden = finalParams.orden || "descendente";
    if (!["ascendente", "descendente"].includes(finalParams.orden)) {
        return { error: "Invalid orden parameter" };
    }

    // Control cantidad
    if (finalParams.cantidad === undefined || finalParams.cantidad === null) {
        finalParams.cantidad = 300;
    } else if (!controlParams.isPositiveNumber(finalParams.cantidad)) {
        return { error: "Invalid cantidad parameter" };
    } else {
        finalParams.cantidad = parseInt(finalParams.cantidad);
    }
    
    
    if (finalParams.desde || finalParams.hasta) {
        // Si 'desde' está definido, convertirlo a una fecha válida
        if (finalParams.desde !== undefined && finalParams.desde !== null) {
            finalParams.desde = new Date(finalParams.desde).toISOString();
        }
    
        // Si 'hasta' está definido, convertirlo a una fecha válida
        if (finalParams.hasta !== undefined && finalParams.hasta !== null) {
            finalParams.hasta = new Date(finalParams.hasta).toISOString();
        } else {
            // Si 'hasta' no está definido, asignar la fecha actual
            finalParams.hasta = new Date().toISOString();
        }
    
        // Si 'desde' no está definido, asignar el valor de 'hasta'
        if (finalParams.desde === undefined || finalParams.desde === null) {
            finalParams.desde = finalParams.hasta;
        }
    }
    
    console.log('finalParams.desde:', finalParams.desde);
    console.log('finalParams.hasta:', finalParams.hasta);
    finalParams.hasta = controlParams.setDefaultHastaIfNeeded(finalParams.desde, finalParams.hasta);
    if (finalParams.desde === undefined || finalParams.hasta === undefined || finalParams.desde === null || finalParams.hasta === null) {
        finalParams.desde = null;
        finalParams.hasta = null;
    } else {
        if (!controlParams.isDesdeMenorQueHasta(finalParams.desde, finalParams.hasta)) {
            return { error: "Invalid date range: 'desde' must be less than or equal to 'hasta'" };
        }
    }

    // Control min, max
    const { min, max } = controlParams.setDefaultMinMax(finalParams.min, finalParams.max);
    finalParams.min = min;
    finalParams.max = max;
    if (finalParams.min !== null && finalParams.max !== null) {
        if (!controlParams.isNumber(finalParams.min) || !controlParams.isNumber(finalParams.max)) {
            return { error: "Invalid min or max parameter" };
        }
        if (parseFloat(finalParams.min) > parseFloat(finalParams.max)) {
            return { error: "Invalid range: 'min' must be less than or equal to 'max'" };
        }
    }


    // Control estado
    const validStates = ["HIGH", "LOW", "true", "false"];
    if (finalParams.estado === undefined || finalParams.estado === null) {
        finalParams.estado = null;
    } else if (!validStates.includes(finalParams.estado)) {
        return { error: "Invalid estado parameter" };
    }


    // Control parameters
    if (invalidParams.length > 0) {
        return { 
            error: "Invalid parameters",
            invalidParams
        };
    }

    return finalParams;
};

module.exports = controlParamsQueryMongo;