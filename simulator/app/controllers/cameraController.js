const Entity = require('../models/entidades');

const EnvConfig = require('../utils/env.config');
const { device_number } = EnvConfig();

async function getCamera() {
    try {
        const entities = await Entity.find({ '_id.id' : `urn:ngsi-ld:Camera:${device_number}` }, '_id.id _id.type attrs creDate modDate');
        // console.log(entities);
        return entities.map(entity => {
            const id = entity._id.id;
            const type = entity._id.type;

            // const type = rawType.split('#')[1];
            const attrKeys = Object.keys(entity.attrs);
            // const value = entity.attrs[attrKeys[1]].value;
            
            const mediaURL = entity.attrs[attrKeys[0]].value;
            const on = entity.attrs[attrKeys[1]].value;
            const startDataTime =  new Date(entity.attrs[attrKeys[2]].value * 1000);
            const creDate = new Date(entity.creDate * 1000);
            const modDate = new Date(entity.modDate * 1000);

            return { id, type, mediaURL, on , startDataTime , creDate, modDate };
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCamera,
};