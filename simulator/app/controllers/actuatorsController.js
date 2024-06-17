const Entity = require('../models/entidades');


async function getActuatros() {
    try {
        const entities = await Entity.find({ 'attrs.https://uri=fiware=org/ns/data-models#category.value': 'actuator' }, '_id.id _id.type attrs creDate modDate');
        // console.log(entities);
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
    getActuatros,
};