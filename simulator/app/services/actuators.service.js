const axios = require('axios');

const EnvConfig = require('../utils/env.config');
const { device_number, mode_containers } = EnvConfig();


let host = 'localhost';
// console.log('mode_containers', mode_containers);
if (mode_containers=== true) {
    host = 'orion';
    // console.log('host', host);
}


const app = axios.create({
    baseURL : `http://${host}:1026/ngsi-ld/v1/entities`,
    headers : {
        'Content-Type': 'application/json',
        'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
    }
});


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Street Light 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// PhotoresistorSensor


// LedDetection
const ledDetectionChange = (stateLed) => {
    const ledDetection = `urn:ngsi-ld:LedDetection:${device_number|| '002'}`
    return app.patch(`/${ledDetection}/attrs`,{
        "stateLed" : stateLed
    })
    .then(response => {
        // console.log(response.data);
        return response.data;
    });
}

// Light
// "stateLight": "OFF",
const lightChange = (stateLight) => {
    const light = `urn:ngsi-ld:Light:${device_number|| '002'}`
    return app.patch(`/${light}/attrs`,{
        "stateLight" : stateLight
    })
    .then(response => {
        // console.log(response.data);
        return response.data;
    });
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Train 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// EngineDC
// "id": `urn:ngsi-ld:EngineDC:${device_number|| '002'}`,

const engineDCChange = (velocityEngine_engineDCAtuator) => {
    const engineId = `urn:ngsi-ld:EngineDC:${device_number|| '002'}`
    return app.patch(`/${engineId}/attrs`,{
        "velocityEngine" : velocityEngine_engineDCAtuator
    })
    .then(response => {
        // console.log(response.data);
        return response.data;
    });
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Railroad Switch
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// ServoMotor 
// "id": `urn:ngsi-ld:Servmotor:${device_number|| '002'}`,

const servmotorChange = (stateServmotor) => {
    const servmotor = `urn:ngsi-ld:Servmotor:${device_number|| '002'}`
    return app.patch(`/${servmotor}/attrs`,{
        "stateMotor" : stateServmotor
    })
    .then(response => {
        // console.log(response.data);
        return response.data;
    });
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Radar
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// Camera
// "id": `urn:ngsi-ld:Camera:${device_number|| '002'}`,

const cameraChange = (stateCamera) => {
    const camera = `urn:ngsi-ld:Camera:${device_number|| '002'}`
    return app.patch(`/${camera}/attrs`,{
        "stateCamera" : stateCamera
    })
    .then(response => {
        // console.log(response.data);
        return response.data;
    });
}


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