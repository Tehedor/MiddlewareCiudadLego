const { notify_template} = require('../notify_template');
// const {  createSubscriptions, deleteSubscriptions } = require('../control_subs');
const { createSubscriptions, deleteSubscriptions } = require('../create_delete_update_subs');


// // // // // // // // // // // // // // // // // // // // // // 
const headers = {
    'Content-Type': 'application/ld+json',
};
const basePath = process.env.MODE_CONTAINERS === 'true' ? 'fiware-orion' : 'localhost';
const url = `http://${basePath}:1026/ngsi-ld/v1/subscriptions`;
// const url = 'http://localhost:1026/ngsi-ld/v1/subscriptions/';
const default_url_context = "http://context/datamodels.context-ngsi.jsonld";
const defaultformat = "normalized";
// // // // // // // // // // // // // // // // // // // // // // 


// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const draco_uri = "http://draco:5050/ld/notify";
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const number = process.env.ENTITIES_ID || 1;

// **** **** **** **** **** **** **** **** **** //
// **** Buildings
// **** **** **** **** **** **** **** **** **** //
// LegoCity
const LegoCity = notify_template(
    entity_id= `urn:ngsi-ld:LegoCity:${number}`, 
    entity_type= "Building",
    entity_attr= ["type", "category", "address"],
    entity_watch_attr= ["address"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// LegoStreetLight
const LegoStreetLight = notify_template(
    entity_id= `urn:ngsi-ld:LegoStreetLight:${number}`, 
    entity_type= "LegoStreetLight",
    entity_attr= ["type", "category", "controlledAsset"],
    entity_watch_attr= ["controlledAsset"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// LegoTrain
const LegoTrain = notify_template(
    entity_id= `urn:ngsi-ld:LegoTrain:${number}`, 
    entity_type= "LegoTrain",
    entity_attr= ["type", "category", "controlledAsset"],
    entity_watch_attr= ["controlledAsset"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// LegoRadar
const LegoRadar = notify_template(
    entity_id= `urn:ngsi-ld:LegoRadar:${number}`, 
    entity_type= "LegoRadar",
    entity_attr= ["type", "category", "controlledAsset"],
    entity_watch_attr= ["controlledAsset"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// LegoRailoadSwitch
const LegoRailoadSwitch = notify_template(
    entity_id= `urn:ngsi-ld:LegoRailoadSwitch:${number}`, 
    entity_type= "LegoRailoadSwitch",
    entity_attr= ["type", "category", "controlledAsset"],
    entity_watch_attr= ["controlledAsset"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// LegoToll
const LegoToll = notify_template(
    entity_id= `urn:ngsi-ld:LegoToll:${number}`,
    entity_type= "LegoToll",
    entity_attr= ["type", "category", "controlledAsset"],
    entity_watch_attr= ["controlledAsset"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// LegoCrane
const LegoCrane = notify_template(
    entity_id= `urn:ngsi-ld:LegoCrane:${number}`,
    entity_type= "LegoCrane",
    entity_attr= ["type", "category", "controlledAsset"],
    entity_watch_attr= ["controlledAsset"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// LegoWheaterStation
const LegoWheaterStation = notify_template(
    entity_id= `urn:ngsi-ld:LegoWheaterStation:${number}`,
    entity_type= "LegoWheaterStation",
    entity_attr= ["type", "category", "controlledAsset"],
    entity_watch_attr= ["controlledAsset"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// **** **** **** **** **** **** **** **** **** //
// **** Sensors
// **** **** **** **** **** **** **** **** **** //
// PirSensor
const PirSensor = notify_template(
    entity_id= `urn:ngsi-ld:PirSensor:${number}`,
    entity_type= "PirSensor",
    entity_attr= ["type", "category", "presence", "controlledAsset"],
    entity_watch_attr= ["presence"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// PhotoresistorSensor
const PhotoresistorSensor = notify_template(
    entity_id= `urn:ngsi-ld:PhotoresistorSensor:${number}`,
    entity_type= "PhotoresistorSensor",
    entity_attr= ["type", "category", "light", "controlledAsset"],
    entity_watch_attr= ["light"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// PotentiometerSensor
const PotentiometerSensor = notify_template(
    entity_id= `urn:ngsi-ld:PotentiometerSensor:${number}`,
    entity_type= "PotentiometerSensor",
    entity_attr= ["type", "category", "velocityControl", "controlledAsset"],
    entity_watch_attr= ["velocityControl"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// InfraredSensor
const InfraredSensor = notify_template(
    entity_id= `urn:ngsi-ld:InfraredSensor:${number}`,
    entity_type= "InfraredSensor",
    entity_attr= ["type", "category", "presence", "controlledAsset"],
    entity_watch_attr= ["presence"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// SwitchSensor
const SwitchSensor = notify_template(
    entity_id= `urn:ngsi-ld:SwitchSensor:${number}`,
    entity_type= "SwitchSensor",
    entity_attr= ["type", "category", "state", "controlledAsset"],
    entity_watch_attr= ["state"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// RfidSensor
const RfidSensor = notify_template(
    entity_id= `urn:ngsi-ld:RfidSensor:${number}`,
    entity_type= "RfidSensor",
    entity_attr= ["type", "category", "uiddcode", "controlledAsset"],
    entity_watch_attr= ["uiddcode"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// UltrasoundSensor
const UltrasoundSensor = notify_template(
    entity_id= `urn:ngsi-ld:UltrasoundSensor:${number}`,
    entity_type= "UltrasoundSensor",
    entity_attr= ["type", "category", "distance", "controlledAsset"],
    entity_watch_attr= ["distance"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// TemperatureSensor
const TemperatureSensor = notify_template(
    entity_id= `urn:ngsi-ld:TemperatureSensor:${number}`,
    entity_type= "TemperatureSensor",
    entity_attr= ["type", "category", "temperature", "controlledAsset"],
    entity_watch_attr= ["temperature"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// HumiditySensor
const HumiditySensor = notify_template(
    entity_id= `urn:ngsi-ld:HumiditySensor:${number}`,
    entity_type= "HumiditySensor",
    entity_attr= ["type", "category", "humidity", "controlledAsset"],
    entity_watch_attr= ["humidity"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// **** **** **** **** **** **** **** **** **** //
// **** Actuators
// **** **** **** **** **** **** **** **** **** //
// LedDetection
const LedDetection = notify_template(
    entity_id= `urn:ngsi-ld:LedDetection:${number}`,
    entity_type= "LedDetection",
    entity_attr= ["type", "category", "stateLed", "controlledAsset"],
    entity_watch_attr= ["stateLed"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// Light
const Light = notify_template(
    entity_id= `urn:ngsi-ld:Light:${number}`,
    entity_type= "Light",
    entity_attr= ["type", "category", "stateLight", "controlledAsset"],
    entity_watch_attr= ["stateLight"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// EngineDC
const EngineDC = notify_template(
    entity_id= `urn:ngsi-ld:EngineDC:${number}`,
    entity_type= "EngineDC",
    entity_attr= ["type", "category", "velocityEngine", "controlledAsset"],
    entity_watch_attr= ["velocityEngine"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// Servmotor
const Servmotor = notify_template(
    entity_id= `urn:ngsi-ld:Servmotor:${number}`,
    entity_type= "Servmotor",
    entity_attr= ["type", "category", "stateMotor", "controlledAsset"],
    entity_watch_attr= ["stateMotor"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// Camera
const Camera = notify_template(
    entity_id= `urn:ngsi-ld:Camera:${number}`,
    entity_type= "Camera",
    entity_attr= ["type", "mediaURL", "on", "startDataTime", "controlledAsset"],
    entity_watch_attr= ["mediaURL", "on", "startDataTime"],
    url_endpoint= draco_uri,
    notify_format= defaultformat,url_context= default_url_context
);

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
const allActuators =[
    LedDetection, Light, EngineDC, Servmotor, Camera
];
const allSensors = [
    PirSensor, PhotoresistorSensor, PotentiometerSensor, InfraredSensor, SwitchSensor, 
    RfidSensor, UltrasoundSensor, TemperatureSensor, HumiditySensor
];
const allBuildings = [
    LegoCity, LegoStreetLight, LegoTrain, LegoRadar, LegoRailoadSwitch, LegoToll, LegoCrane, LegoWheaterStation
];
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para crear las suscripciones
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Create Buildings Subscriptions
function createSubscriptions_buildings_draco(buildings) {
    let subs_buildings = [];
    if (buildings == 'all') {
        subs_buildings = allBuildings;
    }
    else {
        subs_buildings = buildings
    }
    console.log("\n\x1b[32mSuscripcion Edificios\x1b[0m");
    createSubscriptions(url, subs_buildings, headers);
}

// Create Sensors Subscriptions
function createSubscriptions_sensors_draco(sensors) {
    let subs_sensors = [];
    if (sensors == 'all') { 
        subs_sensors = allSensors;
    } else {
        subs_sensors = sensors;
    }
    console.log("\n\x1b[32mSuscripcion Sensores\x1b[0m");
    createSubscriptions(url, subs_sensors, headers);
}

// Create Actuators Subscriptions
function createSubscriptions_actuators_draco(actuators) {
    let subs_actuators = [];
    if (actuators == 'all') {
        subs_actuators = allActuators;
    } else {
        subs_actuators = actuators;
    }
    console.log("\n\x1b[32mSuscripcion Actuadores\x1b[0m");
    createSubscriptions(url, subs_actuators, headers);
    
}

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para eliminar las suscripciones
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Delete Buildings Subscriptions
function deleteSubscriptions_sensors_draco(sensors) {
    let subs_sensors = [];
    if (sensors == 'all') {
        subs_sensors = allSensors;
    } else {
        subs_sensors = sensors;
    }
    console.log("\n\x1b[31mEliminacion de Suscripciones de Sensores\x1b[0m");
    deleteSubscriptions(url, subs_sensors, headers);
}

// Delete Sensors Subscriptions
function deleteSubscriptions_actuators_draco(actuators) {
    let subs_actuators = [];
    if (sensors == 'all') {
        subs_actuators = allActuators;
    } else {
        subs_actuators = actuators;
    }
    console.log("\n\x1b[31mEliminacion de Suscripciones de Actuadores\x1b[0m");
    deleteSubscriptions(url, subs_actuators, headers);
}

// Delete Actuators Subscriptions
function deleteSubscriptions_buildings_draco(buildings) {
    let subs_buildings = [];
    if (buildings == 'all') {
        subs_buildings = allBuildings;
    } else {
        subs_buildings = buildings;
    }

    console.log("\n\x1b[31mEliminacion de Suscripciones de Edificios\x1b[0m");
    deleteSubscriptions(url, subs_buildings, headers);
}

// Expose
module.exports = { createSubscriptions_buildings_draco, createSubscriptions_sensors_draco, createSubscriptions_actuators_draco, deleteSubscriptions_sensors_draco, deleteSubscriptions_actuators_draco, deleteSubscriptions_buildings_draco };