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
    }
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
const pirSensorChange = (presence) => {
    console.log("aaaaaaaaaaa");
    const pirSensor = `urn:ngsi-ld:PirSensor:${device_number}`
    // const pirSensor = "urn:ngsi-ld:PirSensor:002"
    // console.log(pirSensor);
    // console.log(presence);
    // app.patch(`/${pirSensor}/attrs`,{
    app.patch(`/${pirSensor}/attrs`,{
        "presence" : presence,
    })
    .then(response => {
        console.log(response.data);
        // return response.data;
    })
    .catch(error => {
        console.log(error);
    });
};

// PhotoresistorSensor
const photoresistorSensorChange = (intensity) => {
    const photoresistorSensor = `urn:ngsi-ld:PhotoresistorSensor:${device_number}`
    
    return app.patch(`/${photoresistorSensor}/attrs`,{
        "light" : intensity
    })
    .then(response => {
        // console.log(response.data);
        // return response.data;
    });
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Train 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// PotentiometerSensor
const potentiometerSensorChange = (velocityControl) => {
    // console.log("velocidad: ", velocityControl);
    const potentiometerSensor = `urn:ngsi-ld:PotentiometerSensor:${device_number}`
    return app.patch(`/${potentiometerSensor}/attrs`,{
        "velocityControl" : velocityControl
    })
    .then(response => {
        // console.log(response.data);
        // return response.data;
    });
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Radar
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// InfraRedSensor
const infraredSensorChange = (presence) => {
    const infraredSensor = `urn:ngsi-ld:InfraredSensor:${device_number}`
    return app.patch(`/${infraredSensor}/attrs`,{
        "presence" : presence
    })
    .then(response => {
        console.log(response.data);
        return response.data;
    });
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Railroad Switch
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// SwitchSensor
const switchSensorChange = (state) => {
    const switchSensor = `urn:ngsi-ld:SwitchSensor:${device_number}`
    return app.patch(`/${switchSensor}/attrs`,{
        "state" : state
    })
    .then(response => {
        console.log(response.data);
        return response.data;
    });
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Toll
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// RfidSensor
const rfidSensorChange = (uid) => {
    // console.log("uid: ", uid);
    const rfidSensor = `urn:ngsi-ld:RfidSensor:${device_number}`
    return app.patch(`/${rfidSensor}/attrs`,{
        "uiddcode" : uid
    })
    .then(response => {
        console.log(response.data);
        return response.data;
    });
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Crane
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// UltrasonicSensor
const ultrasoundSensorChange = (distance) => {
    const ultrasoundSensor = `urn:ngsi-ld:UltrasoundSensor:${device_number}`
    
    return app.patch(`/${ultrasoundSensor}/attrs`,{
        "distance" : {
            "type": "Property",
            "value": distance,
            "unitCode": "CMT"
        },
    })
    .then(response => {
        console.log(response.data);
        return response.data;
    });
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Wheater Station
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// TemperatureSensor
const temperatureSensorChange = (temperature) => {
    const temperatureSensor = `urn:ngsi-ld:TemperatureSensor:${device_number}`
    // console.log("aaaaaaaaaaaaaaaaa")
    return app.patch(`/${temperatureSensor}/attrs`,{
        "temperature" : {
            "type": "Property",
            "value": temperature,
            "unitCode": "CEL"
        }
    })
    .then(response => {pirSensorChange
        console.log(response.data);
        return response.data;
    });
}

// HumiditySensor
const humiditySensorChange = (humidity) => {
    // console.log("bbbbbbbbbbbbbbb")
    const humiditySensor = `urn:ngsi-ld:HumiditySensor:${device_number}`
    return app.patch(`/${humiditySensor}/attrs`,{
        "humidity" : {
            "type": "Property",
            "value": humidity,
            "unitCode": "P1"
        }
    })
    .then(response => {
        // console.log(response.data);
        return response.data;
    });
}

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