const EntitySubs = require('../models/subscriptions');

async function generalSubsRelations() {
    try {
        // Encuentra entidades donde 'reference' no es igual a 'http://draco:5050/ld/notify'
        const entities = await EntitySubs.find({ "reference": { "$ne": "http://draco:5050/ld/notify" } }, '_id entities conditions createdAt modifiedAt reference status count lastFailure lastNotification timesFailed');
        // console.log(entities);

        // Mapear cada entidad a un nuevo objeto con la estructura deseada
        return entities.map(entity => {
            const subs_id = entity._id;
            // Asegurar que 'entities' es un arreglo y acceder al primer elemento, si existe
            const entities_id = entity.entities?.[0]?.id;
            const entities_type = entity.entities?.[0]?.type;
            const conditions = entity.conditions;
            // Convertir createdAt y modifiedAt a objetos Date válidos
            const createdAt = new Date(entity.createdAt * 1000);
            const modifiedAt = new Date(entity.modifiedAt * 1000);
            const reference = entity.reference;
            const status = entity.status;
            const count = entity.count || 0;
            const lastFailure = entity.lastFailure || 0;
            const lastNotification = entity.lastNotification || 0;
            const timesFailed = entity.timesFailed || 0;


            // Devolver el nuevo objeto
            return {
                subs_id,
                entities_id,
                entities_type,
                conditions,
                createdAt,
                modifiedAt,
                reference,
                status,
                count,
                lastFailure,
                lastNotification,
                timesFailed
            };
        });


    } catch (err) {
        console.log(err);
    }
}

module.exports = generalSubsRelations;