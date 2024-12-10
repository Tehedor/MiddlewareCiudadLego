const { notify_template} = require('../notify_template');
// const { createSubscriptions, deleteSubscriptions } = require('../control_subs');
const { createSubscriptions, deleteSubscriptions, updateSubscriptions } = require('../create_delete_update_subs');


// // // // // // // // // // // // // // // // // // // // // // 
const simuhost = "simulator-app";
const headers = {
    'Content-Type': 'application/ld+json',
};

const basePath = process.env.MODE_CONTAINERS === 'true' ? 'fiware-orion' : 'localhost';
const url = `http://${basePath}:1026/ngsi-ld/v1/subscriptions`;
const default_url_context = "http://context/datamodels.context-ngsi.jsonld";
const defaultformat = "normalized";
// // // // // // // // // // // // // // // // // // // // // // 

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const uri_pirSensor = `http://${simuhost}:3001/ledDetectionActuator`;
const uri_pirSensor2 = `http://${simuhost}:3001/lightActuator`;
const uri_photoresistorSensor = `http://${simuhost}:3001/lightActuator`;
const uri_potentiometerSensor = `http://${simuhost}:3001/engineDCActuator`;
const uri_switchSensor = `http://${simuhost}:3001/servmotorActuator`;
const uri_infraredSensor = `http://${simuhost}:3001/cameraActuator`;


const realhost = process.env.BROKER_IP || 'localhost';  
const sensorUrisToSimulator = {
    // Simulator
    [`http://${simuhost}:3001/ledDetectionActuator`]: `http://${simuhost}:3001/ledDetectionActuator`, 
    [`http://${simuhost}:3001/lightActuator`]: `http://${simuhost}:3001/lightActuator`,
    [`http://${simuhost}:3001/engineDCActuator`]: `http://${simuhost}:3001/engineDCActuator`,
    [`http://${simuhost}:3001/servmotorActuator`]: `http://${simuhost}:3001/servmotorActuator`,
    [`http://${simuhost}:3001/cameraActuator`]: `http://${simuhost}:3001/cameraActuator`,
    // Real
    [`http://${realhost}:3001/ledDetectionActuator`]: `http://${simuhost}:3001/ledDetectionActuator`, 
    [`http://${realhost}:3001/lightActuator`]: `http://${simuhost}:3001/lightActuator`,
    [`http://${realhost}:3001/engineDCActuator`]: `http://${simuhost}:3001/engineDCActuator`,
    [`http://${realhost}:3001/servmotorActuator`]: `http://${simuhost}:3001/servmotorActuator`,
    [`http://${realhost}:3001/cameraActuator`]: `http://${simuhost}:3001/cameraActuator`
};

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const number = process.env.ENTITIES_ID || 1;


// PirSensor
const PirSensor = notify_template(
    entity_id= `urn:ngsi-ld:PirSensor:${number}`, 
    entity_type= "PirSensor",
    entity_attr= ["type", "category", "presence", "controlledAsset"],
    entity_watch_attr= ["presence"],
    url_endpoint= uri_pirSensor,
    notify_format= defaultformat,url_context= default_url_context
);

const PirSensor2 = notify_template(
    entity_id= `urn:ngsi-ld:PirSensor:${number}`,
    entity_type= "PirSensor",
    entity_attr= ["type", "category", "presence", "controlledAsset"],
    entity_watch_attr= ["presence"],
    url_endpoint= uri_pirSensor2,
    notify_format= defaultformat,url_context= default_url_context
);

// PhotoresistorSensor
const PhotoresistorSensor = notify_template(
    entity_id= `urn:ngsi-ld:PhotoresistorSensor:${number}`,
    entity_type= "PhotoresistorSensor",
    entity_attr= ["type", "category", "light", "controlledAsset"],
    entity_watch_attr= ["light"],
    url_endpoint= uri_photoresistorSensor,
    notify_format= defaultformat,url_context= default_url_context
);

// PotentiometerSensor
const PotentiometerSensor = notify_template(
    entity_id= `urn:ngsi-ld:PotentiometerSensor:${number}`,
    entity_type= "PotentiometerSensor",
    entity_attr= ["type", "category", "velocityControl", "controlledAsset"],
    entity_watch_attr= ["velocityControl"],
    url_endpoint= uri_potentiometerSensor,
    notify_format= defaultformat,url_context= default_url_context
);


// InfraredSensor
const InfraredSensor = notify_template(
    entity_id= `urn:ngsi-ld:InfraredSensor:${number}`,
    entity_type= "InfraredSensor",
    entity_attr= ["type", "category", "presence", "controlledAsset"],
    entity_watch_attr= ["presence"],
    url_endpoint= uri_infraredSensor,
    notify_format= defaultformat,url_context= default_url_context
);


// SwitchSensor
const SwitchSensor = notify_template(
    entity_id= `urn:ngsi-ld:SwitchSensor:${number}`,
    entity_type= "SwitchSensor",
    entity_attr= ["type", "category", "state", "controlledAsset"],
    entity_watch_attr= ["state"],
    url_endpoint= uri_switchSensor,
    notify_format= defaultformat,url_context= default_url_context
);

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const allSensors = [PirSensor, PhotoresistorSensor, PirSensor2, PotentiometerSensor, InfraredSensor, SwitchSensor]
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para crear las suscripciones
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
function createSubscriptions_actuators_simulator(sensors) {
    let subs_sensors = [];
    if (sensors == 'all') {
        subs_sensors = allSensors;
    } else {
        subs_sensors = sensors;
    }    
    console.log("\n\x1b[32mSuscripcion Sensores para Actuadores\x1b[0m");
    createSubscriptions(url, subs_sensors, headers);
}

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para actualizar las suscripciones
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
function updateSubscriptions_actuators_simulator(sensors) {
    let subs_sensors = [];
    if (sensors == 'all') {
        subs_sensors = allSensors;
    } else {
        subs_sensors = sensors;
    }
    console.log("\n\x1b[33mActualizar de Suscripciones de Sensores para Actuadores\x1b[0m");
    updateSubscriptions(url, subs_sensors, headers);
}

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para eliminar las suscripciones
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
function deleteSubscriptions_actuators_simulator(sensors) {
    let subs_sensors = [];
    if (sensors == 'all') {
        subs_sensors = allSensors;
    } else {
        subs_sensors = sensors;
    }
    console.log("\n\x1b[31mEliminacion de Suscripciones de Sensores para Actuadores\x1b[0m");
    deleteSubscriptions(url, subs_sensors, headers);
}

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función cambiar estado a modo simulador
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
function changeStateToSimulator(entities) {
    console.log("entities:", entities);
    console.log("realhost:", realhost);
    const filteredEntities = entities.filter(entity => entity.reference.startsWith(`http://${realhost}:3001`));
    console.log("filteredEntities:", filteredEntities);
    filteredEntities.forEach(async (entity) => {
        url_withSubsId= `${url}/${entity.subs_id}`;
        entity_id= entity.entities_id;
        reference= entity.reference;
        newReference = sensorUrisToSimulator[reference];
        notify_format = defaultformat;  
        updateSubscriptions(url_withSubsId, notify_format,newReference, headers);
    }); 
}

// Expose
module.exports = { createSubscriptions_actuators_simulator, deleteSubscriptions_actuators_simulator, changeStateToSimulator };
