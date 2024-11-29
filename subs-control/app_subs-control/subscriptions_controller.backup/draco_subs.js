const axios = require('axios');

const draco_uri = "http://draco:5050/ld/notify";

const number = process.env.ENTITIES_ID || 1;
// const number = process.argv[2];

const formato = "normalized";

const headers = {
    'Content-Type': 'application/ld+json',
};

const url = 'http://localhost:1026/ngsi-ld/v1/subscriptions/';


// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// ####### ####### Buildings
// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
const LegoCityAttr = ["type", "category", "address"];
const LegoCity = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LegoCity:${number}`, "type": "Building"}],
    "watchedAttributes": ["address"],
    "notification": {
        "attributes": LegoCityAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const LegoStreetLightAttr = ["type", "category", "controlledAsset"];
const LegoStreetLight = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LegoStreetLight:${number}`, "type": "LegoStreetLight"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": LegoStreetLightAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const LegoTrainAttr = ["type", "category", "controlledAsset"];
const LegoTrain = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LegoTrain:${number}`, "type": "LegoTrain"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": LegoTrainAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const LegoRadarAttr = ["type", "category", "controlledAsset"];
const LegoRadar = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LegoRadar:${number}`, "type": "LegoRadar"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": LegoRadarAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const LegoRailoadSwitchAttr = ["type", "category", "controlledAsset"];
const LegoRailoadSwitch = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LegoRailoadSwitch:${number}`, "type": "LegoRailoadSwitch"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": LegoRailoadSwitchAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const LegoTollAttr = ["type", "category", "controlledAsset"];
const LegoToll = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LegoToll:${number}`, "type": "LegoToll"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": LegoTollAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const LegoCraneAttr = ["type", "category", "controlledAsset"];
const LegoCrane = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LegoCrane:${number}`, "type": "LegoCrane"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": LegoCraneAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const LegoWheaterStationAttr = ["type", "category", "controlledAsset"];
const LegoWheaterStation = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LegoWheaterStation:${number}`, "type": "LegoWheaterStation"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": LegoWheaterStationAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// ####### ####### Sensors
// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
const PirSensorAttr = ["type", "category", "presence", "controlledAsset"];
const PirSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:PirSensor:${number}`, "type": "PirSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": PirSensorAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const RfidSensorAttr = ["type", "category", "uiddcode", "controlledAsset"];
const RfidSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:RfidSensor:${number}`, "type": "RfidSensor"}],
    "watchedAttributes": ["uiddcode"],
    "notification": {
        "attributes": RfidSensorAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const UltrasoundSensorAttr = ["type", "category", "distance", "controlledAsset"];
const UltrasoundSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:UltrasoundSensor:${number}`, "type": "UltrasoundSensor"}],
    "watchedAttributes": ["distance"],
    "notification": {
        "attributes": UltrasoundSensorAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const TemperatureSensorAttr = ["type", "category", "temperature", "controlledAsset"];
const TemperatureSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:TemperatureSensor:${number}`, "type": "TemperatureSensor"}],
    "watchedAttributes": ["temperature"],
    "notification": {
        "attributes": TemperatureSensorAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const HumiditySensorAttr = ["type", "category", "humidity", "controlledAsset"];
const HumiditySensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:HumiditySensor:${number}`, "type": "HumiditySensor"}],
    "watchedAttributes": ["humidity"],
    "notification": {
        "attributes": HumiditySensorAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// ####### ####### Actuators
// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
const LedDetectionAttr = ["type", "category", "stateLed", "controlledAsset"];
const LedDetection = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:LedDetection:${number}`, "type": "LedDetection"}],
    "watchedAttributes": ["stateLed"],
    "notification": {
        "attributes": LedDetectionAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const LightAttr = ["type", "category", "stateLight", "controlledAsset"];
const Light = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:Light:${number}`, "type": "Light"}],
    "watchedAttributes": ["stateLight"],
    "notification": {
        "attributes": LightAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const EngineDCAttr = ["type", "category", "velocityEngine", "controlledAsset"];
const EngineDC = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:EngineDC:${number}`, "type": "EngineDC"}],
    "watchedAttributes": ["velocityEngine"],
    "notification": {
        "attributes": EngineDCAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const ServmotorAttr = ["type", "category", "stateMotor", "controlledAsset"];
const Servmotor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:Servmotor:${number}`, "type": "Servmotor"}],
    "watchedAttributes": ["stateMotor"],
    "notification": {
        "attributes": ServmotorAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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

const CameraAttr = ["type", "mediaURL", "on", "startDataTime", "controlledAsset"];
const Camera = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": `urn:ngsi-ld:Camera:${number}`, "type": "Camera"}],
    "watchedAttributes": ["mediaURL", "on", "startDataTime"],
    "notification": {
        "attributes": CameraAttr,
        "format": formato,
        "endpoint": {
            "uri": draco_uri,
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



    // ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
    // ####### ####### ####### ####### Peticiones Http
    // ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// Create subscriptions
function createSubscriptions_actuators(actuators) {
    // const actuators = [LedDetection, Light, EngineDC, Servmotor, Camera];
    let subs_actuators = [];

    if (sensors == 'all') {
        subs_actuators = [
            LedDetection, Light, EngineDC, Servmotor, Camera
        ];
    } else {
        subs_actuators = actuators;
    }
    
    console.log("\n\x1b[32mSuscripcion Actuadores\x1b[0m");
    subs_actuators.forEach(async (actuator) => {
        try {
            const response = await axios.post(url, actuator, { headers });
            if (response.status === 201) {
                console.log(`Suscripcion ${actuator.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

function createSubscriptions_sensors(sensors) {
    // const sensors = [
    //     PirSensor, PhotoresistorSensor, PotentiometerSensor, InfraredSensor, SwitchSensor, 
    //     RfidSensor, UltrasoundSensor, TemperatureSensor, HumiditySensor
    // ];
    let subs_sensors = [];

    if (sensors == 'all') { 
        subs_sensors = [
            PirSensor, PhotoresistorSensor, PotentiometerSensor, InfraredSensor, SwitchSensor, 
            RfidSensor, UltrasoundSensor, TemperatureSensor, HumiditySensor
        ];
    } else {
        subs_sensors = sensors;
    }

    
    console.log("\n\x1b[32mSuscripcion Sensores\x1b[0m");
    subs_sensors.forEach(async (sensor) => {
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

function createSubscriptions_buildings(buildings) {
    // const buildings = [LegoCity, LegoStreetLight, LegoTrain, LegoRadar, LegoRailoadSwitch, LegoToll, LegoCrane, LegoWheaterStation];
    let subs_buildings = [];

    if (buildings == 'all') {
        subs_buildings = [
            LegoCity, LegoStreetLight, LegoTrain, LegoRadar, LegoRailoadSwitch, LegoToll, LegoCrane, LegoWheaterStation
        ];
    }
    else {
        subs_buildings = buildings
    }

    console.log("\n\x1b[32mSuscripcion Edificios\x1b[0m");
    subs_buildings.forEach(async (building) => {
        try {
            const response = await axios.post(url, building, { headers });
            if (response.status === 201) {
                console.log(`Suscripcion ${building.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

// Delete subscriptions
function deleteSubscriptions_sensors(sensors) {
    let subs_sensors = [];

    if (sensors == 'all') {
        subs_sensors = [
            PirSensor, PhotoresistorSensor, PotentiometerSensor, InfraredSensor, SwitchSensor, 
            RfidSensor, UltrasoundSensor, TemperatureSensor, HumiditySensor
        ];
    } else {
        subs_sensors = sensors;
    }

    console.log("\n\x1b[31mEliminacion de Suscripciones de Sensores\x1b[0m");
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

function deleteSubscriptions_actuators(actuators) {
    let subs_actuators = [];

    if (sensors == 'all') {
        subs_actuators = [
            LedDetection, Light, EngineDC, Servmotor, Camera
        ];
    } else {
        subs_actuators = actuators;
    }

    console.log("\n\x1b[31mEliminacion de Suscripciones de Actuadores\x1b[0m");
    subs_actuators.forEach(async (actuator) => {
        try {
            const response = await axios.delete(`${url}${actuator.entities[0].id}`, { headers });
            if (response.status === 204) {
                console.log(`Eliminada suscripcion ${actuator.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

function deleteSubscriptions_buildings(buildings) {
    let subs_buildings = [];

    if (buildings == 'all') {
        subs_buildings = [
            LegoCity, LegoStreetLight, LegoTrain, LegoRadar, LegoRailoadSwitch, LegoToll, LegoCrane, LegoWheaterStation
        ];
    } else {
        subs_buildings = buildings;
    }

    console.log("\n\x1b[31mEliminacion de Suscripciones de Edificios\x1b[0m");
    subs_buildings.forEach(async (building) => {
        try {
            const response = await axios.delete(`${url}${building.entities[0].id}`, { headers });
            if (response.status === 204) {
                console.log(`Eliminada suscripcion ${building.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}






module.exports = { createSubscriptions_actuators, createSubscriptions_sensors, createSubscriptions_buildings, deleteSubscriptions_sensors, deleteSubscriptions_actuators, deleteSubscriptions_buildings };