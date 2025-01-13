const express = require('express');
const router = express.Router();

const generalControllerEntities = require('../controllers/generalControllerEntities');
const generalSubsDraco = require('../controllers/generalSubsDraco');
const generalSubsRelations = require('../controllers/generalSubsRelations');


router.get('/', async (req, res) => {
    try {
        // res.render('index.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true' });
        res.render('index.pug');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/entities', async (req, res) => {
    try {
        console.log(await generalControllerEntities());
        res.render('entities.pug', { entities: await generalControllerEntities() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/draco', async (req, res) => {
    try {
        res.render('draco.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true', subsDraco: await generalSubsDraco() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/relations', async (req, res) => {
    try {
        res.render('relations.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true', subsRelations: await generalSubsRelations() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/all', async (req, res) => {
    try {
        res.render('all.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true', subsDraco: await generalSubsDraco(), subsRelations: await generalSubsRelations() });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/addSub', async (req, res) => {
    try {
        res.render('newSub.pug', { MODE_CONTAINERS: process.env.MODE_CONTAINERS === 'true' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;