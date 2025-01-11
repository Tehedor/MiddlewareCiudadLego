const Entity = require('../models/entidades');

async function generalControllerEntities() {
    try {
        const entities = await Entity.find({}, '_id.id _id.type attrs creDate modDate');
        // console.log(entities);
        return entities.map(entity => {
            const id = entity._id.id;
            const rawType = entity._id.type;
            const delimiter = rawType.includes('#') ? '#' : '/';
            const type = rawType.split(delimiter).pop();
            const attrKeys = Object.keys(entity.attrs);
            const type_entity = entity.attrs[attrKeys[0]].value;
            const value = entity.attrs[attrKeys[1]].value;
            const creDate = new Date(entity.creDate * 1000).toISOString();
            const modDate = new Date(entity.modDate * 1000).toISOString();
            return { id, type, type_entity, value, creDate, modDate };
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = generalControllerEntities;

