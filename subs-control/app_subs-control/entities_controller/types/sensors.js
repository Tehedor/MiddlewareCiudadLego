// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// ####### ####### ####### ####### Sensor
// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
//     # pirSensor
//     # photoresistorSensor
//     # potentiometerSensor
//     # infraredSensor
//     # switchSensor
//     # rfidSensor
//     # ultrasoundSensor
//     # temperatureSensor
//     # humiditySensor
const number = process.env.ENTITIES_ID || 1;
const dataSensors = () => [
    // PirSensor
    {
        id: `urn:ngsi-ld:PirSensor:${number}`,
        type: "PirSensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        presence: "LOW",
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoStreetLight:${number}`
        }
    },
    // PhotoresistorSensor
    {
        id: `urn:ngsi-ld:PhotoresistorSensor:${number}`,
        type: "PhotoresistorSensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        light: 100,
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoStreetLight:${number}`
        }
    },
    // PotentiometerSensor
    {
        id: `urn:ngsi-ld:PotentiometerSensor:${number}`,
        type: "PotentiometerSensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        velocityControl: 30,
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoTrain:${number}`
        }
    },
    // InfraredSensor
    {
        id: `urn:ngsi-ld:InfraredSensor:${number}`,
        type: "InfraredSensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        presence: "LOW",
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoRadar:${number}`
        }
    },
    // SwitchSensor
    {
        id: `urn:ngsi-ld:SwitchSensor:${number}`,
        type: "SwitchSensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        state: "OFF",
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoRailoadSwitch:${number}`
        }
    },
    // RfidSensor
    {
        id: `urn:ngsi-ld:RfidSensor:${number}`,
        type: "RfidSensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        uiddcode: "4FF32FF4",
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoToll:${number}`
        }
    },
    // UltrasoundSensor
    {
        id: `urn:ngsi-ld:UltrasoundSensor:${number}`,
        type: "UltrasoundSensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        distance: {
            type: "Property",
            value: 20,
            unitCode: "CMT"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoCrane:${number}`
        }
    },
    // TemperatureSensor
    {
        id: `urn:ngsi-ld:TemperatureSensor:${number}`,
        type: "TemperatureSensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        temperature: {
            type: "Property",
            value: 20,
            unitCode: "CEL"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoWheaterStation:${number}`
        }
    },
    // HumiditySensor
    {
        id: `urn:ngsi-ld:HumiditySensor:${number}`,
        type: "HumiditySensor",
        category: {
            type: "Property",
            value: "sensor"
        },
        humidity: {
            type: "Property",
            value: 0.5,
            unitCode: "P1"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoWheaterStation:${number}`
        }
    }
];

module.exports = dataSensors;


