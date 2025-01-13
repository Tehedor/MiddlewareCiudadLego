// FILE: app/utils/simulationState.js

const { getInitialStateWithRetry_Raspberry, changeState_Raspberry, getInitialStateWithRetry_SubsController, changeState_SubsController } = require('./checkSimulationStatus');

// State
const state_simulator_true = async () => {
    const raspberry_state = await getInitialStateWithRetry_Raspberry();
    if (raspberry_state === 'running') {
        await changeState_Raspberry('stop');
    }

    const sub_control_Sub = await getInitialStateWithRetry_SubsController();
    if (sub_control_Sub === 'real') {
        await changeState_SubsController('simulator');
    }
};

const state_simulator_false = async () => {
    const sub_control_Sub = await getInitialStateWithRetry_SubsController();
    if (sub_control_Sub === 'simulator') {
        await changeState_SubsController('real');
    }

    const raspberry_state = await getInitialStateWithRetry_Raspberry();
    if (raspberry_state === 'stopped') {
        await changeState_Raspberry('start');
    }
};

// Mode
const mode_simulator_true = async () => {
    
    const sub_control_Sub = await getInitialStateWithRetry_SubsController();
    if (sub_control_Sub === 'real') {
        const raspberry_state = await getInitialStateWithRetry_Raspberry();
        if (raspberry_state === 'stopped') {
            await changeState_Raspberry('start');
        }
    }

};

const mode_simulator_false = async () => {

    const raspberry_state = await getInitialStateWithRetry_Raspberry();
    if (raspberry_state === 'running') {
        await changeState_Raspberry('stop');
    }

};



const startCheckState = async (ini_state = true) => {
    try {
        if (ini_state) {
            await state_simulator_true();
        } else {
            await state_simulator_false();
        }
    } catch (error) {
        console.error('Failed to get initial state:', error);
    }
}


module.exports = {
    mode_simulator_true,
    mode_simulator_false,
    state_simulator_true,
    state_simulator_false,
    startCheckState
};