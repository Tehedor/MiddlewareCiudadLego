const axios = require('axios');

const EnvConfig = require('../utils/env.config');
const { device_number, mode_containers } = EnvConfig();



let host = 'localhost';
// console.log('mode_containers', mode_containers);
if (mode_containers === true) {
    host = 'fiware-orion';
    // console.log('host', host);  
}
let baseURL = `http://${host}:1026/ngsi-ld/v1/entities`;

const app = axios.create({
    baseURL : baseURL,
    headers : {
        'Content-Type': 'application/json',
        'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
    },
    timeout: 5000
});


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Street Light 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// # urn:ngsi-ld:PirSensor:001
// url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PirSensor:002/attrs'
// presence = simulatePresence(presence)
// dataPirSensor = {
//     "presence" : "HIGH",
// }
// # print(presence)
// requests.patch(url, headers=headers, json=dataPirSensor)



// PirSensor
const pirSensorChange = async (presence) => {
    console.log("aaaaaaaaaaa");
    const pirSensor = `urn:ngsi-ld:PirSensor:${device_number}`;
    try {
        const response = await app.patch(`/${pirSensor}/attrs`, {
            "presence": presence,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in pirSensorChange:', error.message);
        throw error;
    }
};

// PhotoresistorSensor
const photoresistorSensorChange = async (intensity) => {
    const photoresistorSensor = `urn:ngsi-ld:PhotoresistorSensor:${device_number}`;
    try {
        const response = await app.patch(`/${photoresistorSensor}/attrs`, {
            "light": intensity
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in photoresistorSensorChange:', error.message);
        throw error;
    }
};


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Train 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// PotentiometerSensor
const potentiometerSensorChange = async (velocityControl) => {
    const potentiometerSensor = `urn:ngsi-ld:PotentiometerSensor:${device_number}`;
    try {
        const response = await app.patch(`/${potentiometerSensor}/attrs`, {
            "velocityControl": velocityControl
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in potentiometerSensorChange:', error.message);
        throw error;
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Radar
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// InfraRedSensor
const infraredSensorChange = async (presence) => {
    const infraredSensor = `urn:ngsi-ld:InfraredSensor:${device_number}`;
    try {
        const response = await app.patch(`/${infraredSensor}/attrs`, {
            "presence": presence
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in infraredSensorChange:', error.message);
        throw error;
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Railroad Switch
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// SwitchSensor
const switchSensorChange = async (state) => {
    const switchSensor = `urn:ngsi-ld:SwitchSensor:${device_number}`;
    try {
        const response = await app.patch(`/${switchSensor}/attrs`, {
            "state": state
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in switchSensorChange:', error.message);
        throw error;
    }
};


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Toll
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// RfidSensor
const rfidSensorChange = async (uid) => {
    const rfidSensor = `urn:ngsi-ld:RfidSensor:${device_number}`;
    try {
        const response = await app.patch(`/${rfidSensor}/attrs`, {
            "uiddcode": uid
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in rfidSensorChange:', error.message);
        throw error;
    }
};


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Crane
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// UltrasonicSensor
const ultrasoundSensorChange = async (distance) => {
    const ultrasoundSensor = `urn:ngsi-ld:UltrasoundSensor:${device_number}`;
    try {
        const response = await app.patch(`/${ultrasoundSensor}/attrs`, {
            "distance": {
                "type": "Property",
                "value": distance,
                "unitCode": "CMT"
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in ultrasoundSensorChange:', error.message);
        throw error;
    }
};
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Wheater Station
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// TemperatureSensor
const temperatureSensorChange = async (temperature) => {
    const temperatureSensor = `urn:ngsi-ld:TemperatureSensor:${device_number}`;
    try {
        const response = await app.patch(`/${temperatureSensor}/attrs`, {
            "temperature": {
                "type": "Property",
                "value": temperature,
                "unitCode": "CEL"
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in temperatureSensorChange:', error.message);
        throw error;
    }
};

// HumiditySensor
const humiditySensorChange = async (humidity) => {
    const humiditySensor = `urn:ngsi-ld:HumiditySensor:${device_number}`;
    try {
        const response = await app.patch(`/${humiditySensor}/attrs`, {
            "humidity": {
                "type": "Property",
                "value": humidity,
                "unitCode": "P1"
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in humiditySensorChange:', error.message);
        throw error;
    }
};

module.exports = {
    pirSensorChange,
    photoresistorSensorChange,
    potentiometerSensorChange,
    infraredSensorChange,
    switchSensorChange,
    rfidSensorChange,
    ultrasoundSensorChange,
    temperatureSensorChange,
    humiditySensorChange
}