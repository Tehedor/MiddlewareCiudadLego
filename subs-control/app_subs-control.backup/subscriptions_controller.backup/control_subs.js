const { createSubscriptions: createRealSubscriptions, deleteSubscriptions: deleteRealSubscriptions } = require('./actuators_real-subs');
const { createSubscriptions: createSimulatorSubscriptions, deleteSubscriptions: deleteSimulatorSubscriptions } = require('./actuators_simulator-subs');

const { createSubscriptions_actuators, createSubscriptions_sensors, createSubscriptions_buildings, deleteSubscriptions_sensors, deleteSubscriptions_actuators, deleteSubscriptions_buildings } = require('./draco_subs');

// Cambio de estado
let currentState = 'simulator';
function changeState(mode) {
    if (mode === 'simulator') {
        if (currentState === 'simulator') {
            return 'Already in simulator mode';
        } else {
            deleteRealSubscriptions('all');
            currentState = 'simulator';
            createSimulatorSubscriptions('all');
            return `State changed to ${currentState}`;
        }
    } else if (mode === 'real') {
        if (currentState === 'real') {
            return 'Already in real mode';
        } else {
            deleteSimulatorSubscriptions('all');
            currentState = 'real';
            createRealSubscriptions('all');
            return `State changed to ${currentState}`;
        }
    } else {
        return 'Invalid mode';
    }
}

// Inicio de la aplicación
function start_subscritpions() {
    if (currentState === 'simulator') {
        createSimulatorSubscriptions('all');
        createSubscriptions_actuators('all');
        createSubscriptions_sensors('all'); 
        createSubscriptions_buildings('all');
    } else {
        createRealSubscriptions('all');
        createSubscriptions_actuators('all');
        createSubscriptions_sensors('all'); 
        createSubscriptions_buildings('all');
    }
}


module.exports = { changeState };