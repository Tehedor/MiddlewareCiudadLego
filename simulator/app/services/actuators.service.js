const axios = require('axios');

const app = axios.create({
    baseURL : 'http://localhost:1026/ngsi-ld/v1/entities',
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
    const ledDetection = `urn:ngsi-ld:LedDetection:${process.env.DEVICE_NUMBER || '002'}`
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
    const light = `urn:ngsi-ld:Light:${process.env.DEVICE_NUMBER || '002'}`
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
// "id": `urn:ngsi-ld:EngineDC:${process.env.DEVICE_NUMBER || '002'}`,

const engineDCChange = (velocityEngine_engineDCAtuator) => {
    const engineId = `urn:ngsi-ld:EngineDC:${process.env.DEVICE_NUMBER || '002'}`
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
// "id": `urn:ngsi-ld:Servmotor:${process.env.DEVICE_NUMBER || '002'}`,

const servmotorChange = (stateServmotor) => {
    const servmotor = `urn:ngsi-ld:Servmotor:${process.env.DEVICE_NUMBER || '002'}`
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
// "id": `urn:ngsi-ld:Camera:${process.env.DEVICE_NUMBER || '002'}`,

const cameraChange = (stateCamera) => {
    const camera = `urn:ngsi-ld:Camera:${process.env.DEVICE_NUMBER || '002'}`
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