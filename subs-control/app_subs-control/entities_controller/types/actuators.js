// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// ####### ####### ####### ####### Actuators
// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// # LedDetection -> stateLed on/off
// # Light -> stateLight on/off
// # EngineDC -> velocityEngine
// # Servmotor -> stateMotor 1/2
// # Camera -> on/off

const number = process.env.ENTITIES_ID || 1;

const dataActuators = () => [
    {
        id: `urn:ngsi-ld:LedDetection:${number}`,
        type: "LedDetection",
        category: {
            type: "Property",
            value: "actuator"
        },
        stateLed: "OFF",
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoStreetLight:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:Light:${number}`,
        type: "Light",
        category: {
            type: "Property",
            value: "actuator"
        },
        stateLight: "OFF",
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoStreetLight:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:EngineDC:${number}`,
        type: "EngineDC",
        category: {
            type: "Property",
            value: "actuator"
        },
        velocityEngine: 0,
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoTrain:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:Servmotor:${number}`,
        type: "Servmotor",
        category: {
            type: "Property",
            value: "actuator"
        },
        stateMotor: 0,
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoRailoadSwitch:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:Camera:${number}`,
        type: "Camera",
        mediaURL: "http://",
        on: false,
        startDataTime: new Date().toISOString(),
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoRadar:${number}`
        }
        // "static_attributes": [
            //         #     {
            //         #     "name": "controlledAsset",
            //         #     "type": "Relationship",
            //         #     "value": f"urn:ngsi-ld:LegoRadar:{Number}"
            //         #     }
            //         # ]
    }
];

module.exports = dataActuators;