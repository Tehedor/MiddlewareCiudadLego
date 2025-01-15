const axios = require('axios');

const EnvConfig = require('../utils/env.config');
const { device_number, mode_containers } = EnvConfig();


let host = 'localhost';
// console.log('mode_containers', mode_containers);
if (mode_containers=== true) {
    host = 'fiware-orion';
    // console.log('host', host);
}


const app = axios.create({
    baseURL : `http://${host}:1026/ngsi-ld/v1/entities`,
    headers : {
        'Content-Type': 'application/json',
        'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
    },
    timeout: 500
});


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Street Light 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// PhotoresistorSensor

// LedDetection
const ledDetectionChange = async (stateLed) => {
    const ledDetection = `urn:ngsi-ld:LedDetection:${device_number || '002'}`;
    try {
        const response = await app.patch(`/${ledDetection}/attrs`, {
            "stateLed": stateLed
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in ledDetectionChange:', error.message);
        throw error;
    }
};

// LedDetection
const lightChange = async (stateLight) => {
    const light = `urn:ngsi-ld:Light:${device_number || '002'}`;
    try {
        const response = await app.patch(`/${light}/attrs`, {
            "stateLight": stateLight
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in lightChange:', error.message);
        throw error;
    }
};
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Train 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// EngineDC
const engineDCChange = async (velocityEngine_engineDCAtuator) => {
    const engineId = `urn:ngsi-ld:EngineDC:${device_number || '002'}`;
    try {
        const response = await app.patch(`/${engineId}/attrs`, {
            "velocityEngine": velocityEngine_engineDCAtuator
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in engineDCChange:', error.message);
        throw error;
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Railroad Switch
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// ServoMotor
const servmotorChange = async (stateServmotor) => {
    const servmotor = `urn:ngsi-ld:Servmotor:${device_number || '002'}`;
    try {
        const response = await app.patch(`/${servmotor}/attrs`, {
            "stateMotor": stateServmotor
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in servmotorChange:', error.message);
        throw error;
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Radar
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// Camera
const cameraChange = async (stateCamera) => {
    const camera = `urn:ngsi-ld:Camera:${device_number || '002'}`;
    try {
        const response = await app.patch(`/${camera}/attrs`, {
            "stateCamera": stateCamera
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in cameraChange:', error.message);
        throw error;
    }
};


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Toll
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Crane
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Wheater Station
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


module.exports = {
    ledDetectionChange,
    lightChange,
    engineDCChange,
    servmotorChange,
    cameraChange
};