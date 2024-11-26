const axios = require('axios');

const host = "138.4.22.50";

const uri_pirSensor = `http://${host}:3000/ledDetectionActuator`;
const uri_pirSensor2 = `http://${host}:3000/lightActuator`;
const uri_photoresistorSensor = `http://${host}:3000/lightActuator`;
const uri_potentiometerSensor = `http://${host}:3000/engineDCActuator`;
const uri_switchSensor = `http://${host}:3000/servmotorActuator`;
const uri_infraredSensor = `http://${host}:3000/cameraActuator`;

const headers = {
    'Content-Type': 'application/ld+json',
};

const url = 'http://localhost:1026/ngsi-ld/v1/subscriptions/';

const number = 1;

const PirSensorAttr = ["type", "category", "presence", "controlledAsset"];
const PirSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:PirSensor:${number}`, "type": "PirSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": PirSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_pirSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
};

const PirSensor2 = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:PirSensor:${number}`, "type": "PirSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": PirSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_pirSensor2,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
};

const PhotoresistorSensorAttr = ["type", "category", "light", "controlledAsset"];
const PhotoresistorSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:PhotoresistorSensor:${number}`, "type": "PhotoresistorSensor"}],
    "watchedAttributes": ["light"],
    "notification": {
        "attributes": PhotoresistorSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_photoresistorSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
};

const PotentiometerSensorAttr = ["type", "category", "velocityControl", "controlledAsset"];
const PotentiometerSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:PotentiometerSensor:${number}`, "type": "PotentiometerSensor"}],
    "watchedAttributes": ["velocityControl"],
    "notification": {
        "attributes": PotentiometerSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_potentiometerSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
};

const InfraredSensorAttr = ["type", "category", "presence", "controlledAsset"];
const InfraredSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:InfraredSensor:${number}`, "type": "InfraredSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": InfraredSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_infraredSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
};

const SwitchSensorAttr = ["type", "category", "state", "controlledAsset"];
const SwitchSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:SwitchSensor:${number}`, "type": "SwitchSensor"}],
    "watchedAttributes": ["state"],
    "notification": {
        "attributes": SwitchSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_switchSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
};

// Función para crear las suscripciones
function createSubscriptions(sensors) {

    let subs_sensors = [];

    if (sensors == all) {
        subs_sensors = [PirSensor, PhotoresistorSensor, PirSensor2, PotentiometerSensor, InfraredSensor, SwitchSensor];
    } else {
        subs_sensors = sensors;
    }
    


    console.log("\n\x1b[32mSuscripcion Sensores para Actuadores\x1b[0m");
    sensors.forEach(async (sensor) => {
        try {
            const response = await axios.post(url, sensor, { headers });
            if (response.status === 201) {
                console.log(`Suscripcion ${sensor.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

function deleteSubscriptions(sensors) {
    let subs_sensors = [];

    if (sensors == 'all') {
        subs_sensors = [PirSensor, PhotoresistorSensor, PirSensor2, PotentiometerSensor, InfraredSensor, SwitchSensor];
    } else {
        subs_sensors = sensors;
    }

    console.log("\n\x1b[31mEliminacion de Suscripciones de Sensores para Actuadores\x1b[0m");
    subs_sensors.forEach(async (sensor) => {
        try {
            const response = await axios.delete(`${url}${sensor.entities[0].id}`, { headers });
            if (response.status === 204) {
                console.log(`Eliminada suscripcion ${sensor.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

module.exports = { createSubscriptions, deleteSubscriptions };
