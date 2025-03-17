const EnvConfig = require('../utils/env.config.js');
const { device_number, intensity_threshold } = EnvConfig();




const ActuatorsService = require('../services/actuators.service.js');

const actuatorsController = require('../controllers/actuatorsController.js');   

const cameraController = require('../controllers/cameraController.js');

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Iniciar actuadores
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
let state_ledDetectionActuator = undefined; // "OFF"
let ctrl_lightActuator = undefined; // "OFF"
let state_lightAtuator = undefined; // "OFF"
let velocityEngine_engineDCAtuator = undefined; // 0
let state_servmotorAtuator = undefined; // "0" / "1"

async function iniciarActuadores() {
    try {
        const entities = await actuatorsController.getActuatros();
        // console.log(entities);
        
        let entitiesById = {};
        entities.forEach(entity => {
            entitiesById[entity.id] = entity;
        });
        
        state_ledDetectionActuator = entitiesById[`urn:ngsi-ld:LedDetection:${device_number}`].value;
        ctrl_lightActuator = entitiesById[`urn:ngsi-ld:LedDetection:${device_number}`].value;
        state_lightAtuator = entitiesById[`urn:ngsi-ld:Light:${device_number}`].value;
        velocityEngine_engineDCAtuator = entitiesById[`urn:ngsi-ld:EngineDC:${device_number}`].value;
        state_servmotorAtuator = entitiesById[`urn:ngsi-ld:Servmotor:${device_number}`].value;
        
    } catch (err) {
        console.error(err);
        // res.status(500).send(err);
    }
}



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Iniciar Camera
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// mediaURL, on , startDataTime
let medidaURL_camera = undefined; // "http://"
let on_camera = undefined; // "false"
let startDataTime_camera = undefined; // "2021-06-01T00:00:00Z"

async function iniciarCamera() {
    try {
        const cameraEntities = await cameraController.getCamera();
        console.log(cameraEntities);
        

        let entitiesById = {};
        cameraEntities.forEach(entity => {
            entitiesById[entity.id] = entity;
        });

        medidaURL_camera = entitiesById[`urn:ngsi-ld:Camera:${device_number}`].mediaURL;
        on_camera = entitiesById[`urn:ngsi-ld:Camera:${device_number}`].on;
        startDataTime_camera = entitiesById[`urn:ngsi-ld:Camera:${device_number}`].startDataTime;


        // state_cameraAtuator = entitiesById['urn:ngsi-ld:Camera:002'].value;
    } catch (err) {
        console.error(err);
        //
    }
}
    


 // Acutators
// urn:ngsi-ld:LedDetection:002
// urn:ngsi-ld:Light:002
// urn:ngsi-ld:EngineDC:002
// urn:ngsi-ld:Servmotor:002
// urn:ngsi-ld:Camera:002

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// urn:ngsi-ld:LedDetection:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
async function simulateLedDetectionActuator(data) {
    if (state_ledDetectionActuator == undefined) {
        iniciarActuadores();
    }
    if (data.id === `urn:ngsi-ld:PirSensor:${device_number}`) {
        // state_ledDetectionActuator
        if (data.presence.value === 'HIGH' && state_ledDetectionActuator === 'OFF') {
            state_ledDetectionActuator = 'ON';
            // console.log('Gente');
            try {
                await ActuatorsService.ledDetectionChange(state_ledDetectionActuator);

            }catch (error) {
                console.error('Error in ledDetectionChange:', error.message);
            }   
            SOCKET_IO.emit('update_ledDetectionActuator', state_ledDetectionActuator);
            // console.log('Encendido');
        } else if (data.presence.value === 'LOW' && state_ledDetectionActuator === 'ON') {
            state_ledDetectionActuator = 'OFF';
            try {
                await ActuatorsService.ledDetectionChange(state_ledDetectionActuator);
            } catch (error) {   
                console.error('Error in ledDetectionChange:', error.message);
            }
                SOCKET_IO.emit('update_ledDetectionActuator', state_ledDetectionActuator);
            // console.log('Apagado');
            // console.log('No hay gente');
        }
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// urn:ngsi-ld:Light:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
const intensityThreshold = Number(intensity_threshold) || 70;
async function simulateLightActuator(data) {
    if (state_lightAtuator == undefined || ctrl_lightActuator == undefined) {
        iniciarActuadores();
    }

    if (data.id === `urn:ngsi-ld:PhotoresistorSensor:${device_number}`) {
        console.log(data.light.value);
        if (data.light.value > intensityThreshold) {
            ctrl_lightActuator = 'ON';
            // console.log('Lus');
            if (state_lightAtuator === 'OFF') {
                state_lightAtuator = 'ON';
                // console.log('Encendido');
                try {
                    await ActuatorsService.lightChange(state_lightAtuator);
                } catch (error) {
                    console.error('Error in lightChange:', error.message);
                }
                    SOCKET_IO.emit('update_lightActuator', state_lightAtuator);
            }
        } else if (data.light.value <= intensityThreshold){
            ctrl_lightActuator = 'OFF';
            // console.log('No hay gente');
            if (state_lightAtuator === 'ON') {
                state_lightAtuator = 'OFF';
                // console.log('Apagado'); 
                try {
                    await ActuatorsService.lightChange(state_lightAtuator);
                }catch (error) {
                    console.error('Error in lightChange:', error.message);
                }
                SOCKET_IO.emit('update_lightActuator', state_lightAtuator);
                // console.log('Apagado');
            }
        }
    }
    
       // state_lightAtuator
    if (data.id === `urn:ngsi-ld:PirSensor:${device_number}`) {
        if (data.presence.value === 'HIGH' && ctrl_lightActuator === 'ON' && state_lightAtuator === 'OFF') {
            state_lightAtuator = 'ON';
            try {
                await ActuatorsService.lightChange(state_lightAtuator);
            } catch (error) {
                console.error('Error in lightChange:', error.message);
            }
            SOCKET_IO.emit('update_lightActuator', state_lightAtuator);
            // console.log('Encendido');
        } else if (data.presence.value === 'LOW' && state_lightAtuator === 'ON') {
            state_lightAtuator = 'OFF';
            try {
                await ActuatorsService.lightChange(state_lightAtuator);
            } catch (error) {
                console.error('Error in lightChange:', error.message);  
            }
            SOCKET_IO.emit('update_lightActuator', state_lightAtuator);
            // console.log('Apagado');
        } else if (ctrl_lightActuator === 'OFF'){
            state_lightAtuator = 'OFF';
            try {
                await ActuatorsService.lightChange(state_lightAtuator);
            }catch (error) {
                console.error('Error in lightChange:', error.message);
            }

            SOCKET_IO.emit('update_lightActuator', state_lightAtuator);
            // console.log('Apagado');
        }
    }
    
    
    
    // debug(`Received ${req.method} request on ${req.path}`);
    // debug('Headers:', req.headers);
    // debug('Body:', req.body);
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// urn:ngsi-ld:EngineDC:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
async function simulateEngineDCActuator(data) {
    if (velocityEngine_engineDCAtuator == undefined) {
        iniciarActuadores();
    }

    if (data.id === `urn:ngsi-ld:PotentiometerSensor:${device_number}`){
        if (velocityEngine_engineDCAtuator !== data.velocityControl.value){
            velocityEngine_engineDCAtuator = data.velocityControl.value;
            try {
                await ActuatorsService.engineDCChange(velocityEngine_engineDCAtuator);
            } catch (error) {
                console.error('Error in engineDCChange:', error.message);
            }
            SOCKET_IO.emit('update_engineDCActuator', velocityEngine_engineDCAtuator);
        }
    }
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// urn:ngsi-ld:Servmotor:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
async function simulateServmotorActuator(data) {
    if (state_servmotorAtuator == undefined) {
        iniciarActuadores();
    }
    

    if (data.id === `urn:ngsi-ld:SwitchSensor:${device_number}`){
        const aux = data.state.value === 'ON' ? 1 : 0;
        // console.log("cocitas",aux);
        if (state_servmotorAtuator !== aux){
            // console.log("pruebas2");
            state_servmotorAtuator = aux;
            try {
                await ActuatorsService.servmotorChange(state_servmotorAtuator);
            } catch (error) {
                console.error('Error in servmotorChange:', error.message);
            }
            SOCKET_IO.emit('update_servmotorActuator', state_servmotorAtuator);
        }
    }

}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// urn:ngsi-ld:Camera:002
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
let lastMediaURL = 0; 
async function simulateCameraActuator(data) {
    if (on_camera == undefined) {
        await iniciarCamera();
    }

    if (data.id === `urn:ngsi-ld:InfraredSensor:${device_number}`) {
        if (data.presence.value === 'HIGH' && on_camera === false) {
            on_camera = true;
            if (lastMediaURL === 0) {
                mediaURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFwFsbONWRBpBJo8rucnZZmRq-hsb1_xFMPKALIkjRr9IX8pkHsJAsVuAH1fyn33JWsg&usqp=CAU";
                lastMediaURL = 1;
            } else {
                mediaURL = "https://media.gettyimages.com/id/165764784/es/vector/tren-de-historieta.jpg?s=612x612&w=0&k=20&c=m-vcEvoDGYHOKPyTBgVzA4rAXu4Dosi8CGJ9ZfwFuhs=";
                lastMediaURL = 0;
            }
            try {
                await ActuatorsService.cameraChange(on_camera, mediaURL, startDataTime_camera);
            } catch (error) {
                console.error('Error in cameraChange:', error.message);
            }
        } else if (data.presence.value === 'LOW' && on_camera === true) {
            on_camera = false;
            // mediaURL = "http://";
            try {
                await ActuatorsService.cameraChange(on_camera, mediaURL, startDataTime_camera);
            } catch (error) {
                console.error('Error in cameraChange:', error.message);
            }
        }
    }
    SOCKET_IO.emit('update_cameraActuator', on_camera, mediaURL, startDataTime_camera);
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// Iniciar actuadores Client
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
function iniActuatorsClient (){
    iniciarActuadores();
    SOCKET_IO.emit('update_ledDetectionActuator', state_ledDetectionActuator);
    SOCKET_IO.emit('update_lightActuator', state_lightAtuator);
    SOCKET_IO.emit('update_engineDCActuator', velocityEngine_engineDCAtuator);
    SOCKET_IO.emit('update_servmotorActuator', state_servmotorAtuator);
    SOCKET_IO.emit('update_cameraActuator',on_camera, medidaURL_camera, startDataTime_camera);

}

module.exports = {
    simulateLedDetectionActuator,
    simulateLightActuator,
    simulateEngineDCActuator,
    simulateServmotorActuator,
    simulateCameraActuator,
    iniActuatorsClient,
    iniciarCamera,
};
