const Entity = require('../models/entidades');

// function async getAllEntities() {
//     // return Entity.find({}, '_id.id _id.type _id.servicePath attrNames attrs creDate modDate lastCorrelator')
//     return Entity.find({})
//         .then(entities => {
//             console.log(entities);
//             return entities;
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

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

