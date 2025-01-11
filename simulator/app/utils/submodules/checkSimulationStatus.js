const axios = require('axios');
const EnvConfig = require('../env.config');

const { 
    raspberry_ip, raspberry_port, 
    subsContollerApp_host, subsContollerApp_port, 
} = EnvConfig();

// Debuge
// const subsContollerApp_host= 'localhost';
// const subsContollerApp_port= 4040;

// const raspberry_ip= '138.4.22.50';
// const raspberry_port = 80;

const url_AppSubsContoller = `http://${subsContollerApp_host}:${subsContollerApp_port}`;
const url_raspberry = `http://${raspberry_ip}:${raspberry_port}`;
const headers = {
    'Content-Type': 'application/json',
};



// // // // // // // // // // // // // // // // // // // // // // // // 
// SubsController
// real
// // // // // // // // // // // // // // // // // // // // // // // // 
const knowState_SubsController = async () => {
    try {
        const response = await axios.get(`${url_AppSubsContoller}/requests/getSubsRelationsState`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription relations state:', error);
        throw error;
    }
};

const getInitialStateWithRetry_SubsController = async (retries = 5, delay = 5000) => {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const initialState = await knowState_SubsController();
            return initialState;
        } catch (error) {
            attempts++;
            if (attempts < retries) {
                console.log(`Retrying in ${delay / 1000} seconds... (${attempts}/${retries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error('Max retries reached. Could not fetch initial state.');
                throw error;
            }
        }
    }
};


// ###
// POST http://{{host}}:{{port}}/requests/changeState?mode=simulator

// ###
// POST http://{{host}}:{{port}}/requests/changeState?mode=real
const changeState_SubsController = async (mode) => {
    try {
        const response = await axios.post(`${url_AppSubsContoller}/requests/changeState?mode=${mode}`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error changing subscription relations state:', error);
        throw error;
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // 
// Raspberry_iot
// {
//     "state": "stopped", // "state": "running"
//     "status": "success"
//   }
// // // // // // // // // // // // // // // // // // // // // // // // 
const knowState_Raspberry = async () => {
    try {
        const response = await axios.get(`${url_raspberry}/status `, { headers });
        return response.data.state;
    } catch (error) {
        console.error('Error fetching raspberry state:', error);
        throw error;
    }
}


const getInitialStateWithRetry_Raspberry = async (retries = 5, delay = 5000) => {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const initialState = await knowState_Raspberry();
            return initialState;
        } catch (error) {
            attempts++;
            if (attempts < retries) {
                console.log(`Retrying in ${delay / 1000} seconds... (${attempts}/${retries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error('Max retries reached. Could not fetch initial state.');
                throw error;
            }
        }SubsController
    }
}


// ### Start Components
// POST http://{{host}}:{{port}}/start
// Content-Type: application/json

// {}

// ### Stop Components
// POST http://{{host}}:{{port}}/stop 
// Content-Type: application/json

// {}

const changeState_Raspberry = async (mode) => {
    try {
        const response = await axios.post(`${url_raspberry}/${mode}`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error changing raspberry state:', error);
        throw error;
    }
};


// // // // // // // // // // // // // // // // // // // // // // // // 
// Control
// // // // // // // // // // // // // // // // // // // // // // // // 

// const state_simulator_true  = async () => {
    
//     // Configurar todo para modo simulador

//     // Parar raspberry IOT si esta corriendo 
//     // console.log('Parar raspberry IOT si esta corriendo');
//     const raspberry_state = await getInitialStateWithRetry_Raspberry();
//     if (raspberry_state === 'running') {
//         await changeState_Raspberry('stop');
//         // console.log('Raspberry IOT stopped');
//     }
    
//     // Cambiar estado de las suscripciones a simulador
//     // console.log('Cambiar estado de las suscripciones a simulador');
//     const sub_control_Sub = await getInitialStateWithRetry_SubsController();
//     if (sub_control_Sub === 'real') {
//         await changeState_SubsController('simulator');
//     }

//     // modifyJSON(true);
// }


// const state_simulator_false  = async () => {
    
//     // Configurar todo para modo real
//     // modifyJSON(false);

//     // Cambiar estado de las suscripciones a real
//     // console.log('Cambiar estado de las suscripciones a real');
//     const sub_control_Sub = await getInitialStateWithRetry_SubsController();
//     if (sub_control_Sub === 'simulator') {
//         await changeState_SubsController('real');
//     }

//     // Iniciar raspberry IOT si esta parado
//     // console.log('Iniciar raspberry IOT si esta parado');
//     const raspberry_state = await getInitialStateWithRetry_Raspberry();
//     if (raspberry_state === 'stopped') {
//         await changeState_Raspberry('start');
//         // console.log('Raspberry IOT started');
//     }

// }


module.exports = {
    getInitialStateWithRetry_Raspberry,
    changeState_Raspberry,
    getInitialStateWithRetry_SubsController,
    changeState_SubsController,
    // startCheckState
};