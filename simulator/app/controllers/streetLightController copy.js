const Entity = require('../models/entidades');

// function getPirSensor() {

//     return Entity.find({'_id.id': 'urn:ngsi-ld:PirSensor:${process.env.DEVICE_NUMBER || '002'}'}, '_id.id _id.type  attrs creDate modDate')
//         .then(entities => {
//             return entities.map(entity => {
//                 const id = entity._id.id;
//                 const attrKeys = Object.keys(entity.attrs);
//                 const value = entity.attrs[attrKeys[1]].value;
//                 const creDate = entity.creDate;
//                 const modDate = entity.modDate;
//                 return { id, value, creDate, modDate };
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }


async function getStreetLight() {
    try {
        const entities = await Entity.find({ 'attrs.https://uri=fiware=org/ns/data-models#controlledAsset.value': `urn:ngsi-ld:LegoStreetLight:${process.env.DEVICE_NUMBER || '002'}` }, '_id.id _id.type attrs creDate modDate');
        
        const pirSensor = entities.find(entity => entity._id.id === `urn:ngsi-ld:PirSensor:${process.env.DEVICE_NUMBER || '002'}`);
        const photoresistorSensor = entities.find(entity => entity._id.id === `urn:ngsi-ld:PhotoresistorSensor:${process.env.DEVICE_NUMBER || '002'}`);
        const ledDetectionActuator = entities.find(entity => entity._id.id === `urn:ngsi-ld:LedDetection:${process.env.DEVICE_NUMBER || '002'}`);
        const ligthActuator = entities.find(entity => entity._id.id === `urn:ngsi-ld:Light:${process.env.DEVICE_NUMBER || '002'}`);
        return {pirSensor, photoresistorSensor, ledDetectionActuator, ligthActuator}

    } catch (err) {
        console.log(err);
    }
}


async function getPirSensor() {
    try {
        const entities = await Entity.find({ '_id.id': `urn:ngsi-ld:PirSensor:${process.env.DEVICE_NUMBER || '002'}` }, '_id.id _id.type  attrs creDate modDate');
        return entities.map(entity => {
            const id = entity._id.id;
            const rawType = entity._id.type;
            const type = rawType.split('#')[1];
            const attrKeys = Object.keys(entity.attrs);
            const value = entity.attrs[attrKeys[1]].value;
            const creDate = new Date(entity.creDate * 1000);
            const modDate = new Date(entity.modDate * 1000);
            return { id, type, value, creDate, modDate };
        });
    } catch (err) {
        console.log(err);
    }
}

async function getPhotoresistorSensor() {
    try {
        const entities = await Entity.find({ '_id.id': `urn:ngsi-ld:PhotoresistorSensor:${process.env.DEVICE_NUMBER || '002'}` }, '_id.id _id.type  attrs creDate modDate');
        return entities.map(entity => {
            const id = entity._id.id;
            const rawType = entity._id.type;
            const type = rawType.split('#')[1];
            const attrKeys = Object.keys(entity.attrs);
            const value = entity.attrs[attrKeys[1]].value;
            const creDate = new Date(entity.creDate * 1000);
            const modDate = new Date(entity.modDate * 1000);
            return { id, type, value, creDate, modDate };
        });
    } catch (err) {
        console.log(err);
    }
}

async function getLedDetectionActuator() {
    try {
        const entities = await Entity.find({ '_id.id': `urn:ngsi-ld:LedDetection:${process.env.DEVICE_NUMBER || '002'}` }, '_id.id _id.type  attrs creDate modDate');
        return entities.map(entity => {
            const id = entity._id.id;
            const rawType = entity._id.type;
            const type = rawType.split('#')[1];
            const attrKeys = Object.keys(entity.attrs);
            const value = entity.attrs[attrKeys[1]].value;
            const creDate = new Date(entity.creDate * 1000);
            const modDate = new Date(entity.modDate * 1000);
            return { id, type, value, creDate, modDate };
        });
    } catch (err) {
        console.log(err);
    }
}

async function getLigthActuator() {
    try {
        const entities = await Entity.find({ '_id.id': `urn:ngsi-ld:Light:${process.env.DEVICE_NUMBER || '002'}` }, '_id.id _id.type  attrs creDate modDate');
        return entities.map(entity => {
            const id = entity._id.id;
            const rawType = entity._id.type;
            const type = rawType.split('#')[1];
            const attrKeys = Object.keys(entity.attrs);
            const value = entity.attrs[attrKeys[1]].value;
            const creDate = new Date(entity.creDate * 1000);
            const modDate = new Date(entity.modDate * 1000);
            return { id, type, value, creDate, modDate };
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getPirSensor,
    getPhotoresistorSensor,
    getLedDetectionActuator,
    getLigthActuator,
    getStreetLight
};