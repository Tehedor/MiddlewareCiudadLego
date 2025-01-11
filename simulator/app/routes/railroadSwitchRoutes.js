const express = require('express');
const { changeSwitchSensor } = require('../utils/controlJSON.js');
// const SimulateActuators = require('../path/to/SimulateActuators'); // Asegúrate de que la ruta sea correcta

function convertToBoolean(envVar) {
    return envVar ? envVar === 'true' : false;
}

const simulationRoutes = express.Router();
simulationRoutes.post('/railroadSwitch/toggle', function (req, res) {
    // const { state } = req.body; // Espera un JSON con { state: true/false }
    const state = convertToBoolean(req.body.state); // Espera un JSON con { state: true/false }
    try {
        const stateChanged = changeSwitchSensor(state);
        if (stateChanged) {
            if (state) {
                // SimulateActuators.activateSimulation();
                res.status(201).send('Simulation activated');
            } else {
                // SimulateActuators.deactivateSimulation();
                res.status(201).send('Simulation deactivated');
            }
        } else {
            if (state) {
                res.status(200).send('Simulation already activated');
            } else {
                res.status(200).send('Simulation already deactivated');
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error toggling simulation');
    }
});

module.exports = simulationRoutes;