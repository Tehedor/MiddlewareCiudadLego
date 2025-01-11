const express = require('express');
const router = require('express').Router();

const control_subs = require('../subscriptions_controller/control_subs');

const generalControllerEntities = require('../controllers/generalControllerEntities');
const generalSubsDraco = require('../controllers/generalSubsDraco');
const generalSubsRelations = require('../controllers/generalSubsRelations');

// const updateSubscriptions = require('../subscriptions_controller/updateSubscriptions');
const {changeStateToSimulator} = require('../subscriptions_controller/default_subs/actuators_simulator-subs'); 
const {changeStateToReal} = require('../subscriptions_controller/default_subs/actuators_real-subs'); 

// const {deleteControlSubscriptions} = require('subscriptions_controller/create_delete_update_subs.js');
const {showState, changeInicialState} = require('../utils/controlJSON');


const create_delete_update_subs = require('../subscriptions_controller/create_delete_update_subs');

// let currentState = 'simulator';  

const changeState = (mode) => {
    const currentState = showState();
    if (mode !== currentState) {
        changeInicialState(mode);
    }
    return currentState;
};

// Petición cambiar estado de las suscripciones
router.post('/changeState', (req, res) => {
    const { mode } = req.query;
    const currentState = showState();

    if (mode === 'simulator' || mode === 'real') {
        if (mode !== currentState) {
            changeState(mode);
            res.send(`State changed to ${currentState}`);
        } else {
            res.status(200).send(`Already in ${currentState} mode`);
        }
    } else {
        res.status(400).send('Invalid mode');
    }
});


router.get('/getSubsRelationsState', (req, res) => {
    try {
        const currentState = showState();
        console.log('currentState', currentState);
        res.status(200).send(currentState);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting subscriptions');
    }
});

// Ni idea pa
router.post('/execute-command', async (req, res) => {
    try {
        await yourFunction();
        res.status(200).send('Command executed successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error executing command');
    }
});

// Petición para actualizar las suscripciones a 'Simulator'
router.post('/updateSubscriptionsToSimulator', async (req, res) => {
    try {
        const subsRelations = await generalSubsRelations();
        changeStateToSimulator(subsRelations);
        res.status(200).send('Subscriptions updated successfully to Simulator');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating subscriptions');
    }
});

// Petición para actualizar las suscripciones a 'Real'
router.post('/updateSubscriptionsToReal', async (req, res) => {
    try {
        const subsRelations = await generalSubsRelations();
        changeStateToReal(subsRelations);
        res.status(200).send('Subscriptions updated successfully to Real');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating subscriptions');
    }
});

// Petición para eliminar las suscripciones
router.post('/deleteSubscriptions', async (req, res) => {
    try {
        let entities = req.body;
        if (!Array.isArray(entities)) {
            entities = [entities]; 
        }
        // console.log(JSON.stringify(entities, null, 2));
        create_delete_update_subs.deleteSubscriptions(entities);
        res.status(200).send('Subscriptions deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting subscriptions');
    }
});

// Petición para reactivar la suscripción
router.post('/reactivateSubscription', async (req, res) => {
    // Petición para eliminar las suscripciones
    try {
        let entities = req.body;
        if (!Array.isArray(entities)) {
            entities = [entities]; 
        }
        // console.log(JSON.stringify(entities, null, 2));
        create_delete_update_subs.reactivateSubscription(entities);
        res.status(200).send('Subscriptions reactivated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error reactivating subscriptions');
    }
});

module.exports = router;
