const { notify_template} = require('../notify_template');
// const { createSubscriptions, deleteSubscriptions } = require('../control_subs');
const { createSubscriptions, deleteSubscriptions } = require('../create_delete_update_subs');


// // // // // // // // // // // // // // // // // // // // // // 
const host = "simulator-app";
const headers = {
    'Content-Type': 'application/ld+json',
};
const url = 'http://localhost:1026/ngsi-ld/v1/subscriptions/';
const default_url_context = "http://context/datamodels.context-ngsi.jsonld";
const defaultformat = "normalized";
// // // // // // // // // // // // // // // // // // // // // // 

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const uri_pirSensor = `http://${host}:3001/ledDetectionActuator`;
const uri_pirSensor2 = `http://${host}:3001/lightActuator`;
const uri_photoresistorSensor = `http://${host}:3001/lightActuator`;
const uri_potentiometerSensor = `http://${host}:3001/engineDCActuator`;
const uri_switchSensor = `http://${host}:3001/servmotorActuator`;
const uri_infraredSensor = `http://${host}:3001/cameraActuator`;
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const number = 1;


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

// Expose
module.exports = { createSubscriptions_actuators_simulator, deleteSubscriptions_actuators_simulator };
