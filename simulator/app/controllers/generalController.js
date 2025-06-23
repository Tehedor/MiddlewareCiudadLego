const Entity = require('../models/entidades');

async function getAllEntities() {
    try {
        const entities = await Entity.find({});
        // console.log(entities);
        return entities;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllEntities
};

