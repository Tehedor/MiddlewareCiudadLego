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


const create_delete_update_subs = require('../subscriptions_controller/create_delete_update_subs');

let currentState = 'simulator';  

router.post('/changeState', (req, res) => {
    const { mode } = req.query;

    if (mode === 'simulator') {
        if (currentState === 'simulator') {
            res.send('Already in simulator mode');
        } else {
            currentState = 'simulator';
            res.send(`State changed to ${currentState}`);
        }
    } else if (mode === 'real') {
        if (currentState === 'real') {
            res.send('Already in real mode');
        } else {
            currentState = 'real';
            res.send(`State changed to ${currentState}`);
        }
    } else {
        res.status(400).send('Invalid mode');
    }
});

router.post('/execute-command', async (req, res) => {
    try {
        await yourFunction();
        res.status(200).send('Command executed successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error executing command');
    }
});

router.post('/updateSubscriptionsToSimulator', async (req, res) => {
    try {
        const subsRelations = await generalSubsRelations();
        changeStateToSimulator(subsRelations);
        res.status(200).send('Subscriptions updated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating subscriptions');
    }
});

router.post('/updateSubscriptionsToReal', async (req, res) => {
    try {
        const subsRelations = await generalSubsRelations();
        changeStateToReal(subsRelations);
        res.status(200).send('Subscriptions updated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating subscriptions');
    }
});

router.post('/deleteSubscriptions', async (req, res) => {
    // const entity = req.body;
    // console.log(entity);
    // console.log(JSON.stringify(entities, null, 2));
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

// module.exports = routesRequests;
module.exports = router;
