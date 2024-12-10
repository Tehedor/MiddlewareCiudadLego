const { createSubscriptions_buildings_draco, createSubscriptions_sensors_draco, createSubscriptions_actuators_draco, deleteSubscriptions_sensors_draco, deleteSubscriptions_actuators_draco, deleteSubscriptions_buildings_draco } =  require('./default_subs/draco_subs');
const { createSubscriptions_real, deleteSubscriptions_real} = require('./default_subs/actuators_real-subs');
const { createSubscriptions_actuators_simulator, deleteSubscriptions_actuators_simulator } = require('./default_subs/actuators_simulator-subs');


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
function start_subscritpions(iniState) {
    if (iniState === 'simulator') {
        // Draco
        createSubscriptions_buildings_draco('all');
        createSubscriptions_sensors_draco('all');
        createSubscriptions_actuators_draco('all');
        // Simulator
        createSubscriptions_actuators_simulator('all');

    } else {
        // Draco
        createSubscriptions_buildings_draco('all');
        createSubscriptions_sensors_draco('all');
        createSubscriptions_actuators_draco('all');
        // Real
        createSubscriptions_real('all');
    }
}

// Crear suscripciones
function createSubsciption_standar(subscription) {

}


module.exports = { changeState, start_subscritpions };



