const express = require('express');
const router = express.Router();

const generalControllerEntities = require('../controllers/generalControllerEntities');
const generalSubsDraco = require('../controllers/generalSubsDraco');
const generalSubsRelations = require('../controllers/generalSubsRelations');


router.get('/', async (req, res) => {
    try {
        res.render('index.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/entities', async (req, res) => {
    console.log('Pasa1');
    try {
        console.log(await generalControllerEntities());
        res.render('entities.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true', entities: await generalControllerEntities() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/draco', async (req, res) => {
    console.log('Pasa1');
    try {
        res.render('draco.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true', subsDraco: await generalSubsDraco() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/relations', async (req, res) => {
    console.log('Pasa2');
    try {
        res.render('relations.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true', subsRelations: await generalSubsRelations() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/all', async (req, res) => {
    console.log('Pasa1');
    try {
        res.render('all.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true', subsDraco: await generalSubsDraco(), subsRelations: await generalSubsRelations() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/addSub', async (req, res) => {
    console.log('Pasa1');
    try {
        res.render('newSub.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;