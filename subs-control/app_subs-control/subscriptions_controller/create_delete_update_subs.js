const axios = require('axios');
const { exists } = require('../models/entidades');
const {updateSubscriptionTempleate} = require('./notify_template');
const { json } = require('express');


const basePath = process.env.MODE_CONTAINERS === 'true' ? 'fiware-orion' : 'localhost';
const url = `http://${basePath}:1026/ngsi-ld/v1/subscriptions`;

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para crear las suscripciones
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
function createSubscriptions(url, entities, headers) {

    entities.forEach(async (entity) => {
        try {
            const response = await axios.post(url, entity, { headers });
            if (response.status === 201) {
                // console.log(`Suscripcion ${entity.entity[0].type}`);
                console.log(`Suscripcion para ${entity.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para eliminar las suscripciones
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// curl -X DELETE \
//   --url 'http://localhost:1026/ngsi-ld/v1/subscriptions/urn:ngsi-ld:Subscription:5fd228838b9b83697b855a72'
function deleteSubscriptions(entities) {
    
    // console.log(entities);
    

    entities.forEach(async (entity) => {
        try {
            url_withSubsId= `${url}/${entity.subs_id}`;
            // console.log(url_withSubsId);
            const response = await axios.delete(url_withSubsId);
            if (response.status === 204) {
                console.log(`Eliminada suscripcion ${entity.entities_id}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}


// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para actualizar las suscripciones
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
async function updateSubscriptions(url_withSubsId, notify_format,newReference, headers) {
    const data = updateSubscriptionTempleate(notify_format,newReference);
    console.log(`Updating subscription with ID: ${url_withSubsId}`);
    console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    console.log(`Headers: ${JSON.stringify(headers, null, 2)}`);
    try {
        const response = await axios.patch(url_withSubsId , data, headers);
        if (response.status === 204 || response.status === 200) {
            console.log(`Subscription updated successfully: ${url_withSubsId}`);
        } else {
            console.log("Error updating subscription");
        }
    } catch (error) {
        console.error("Error updating subscription", error);
    }
}


// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// Función para reactivar la suscripción
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## // 
// @SubID = 146cb284-cbdb-11ef-b77d-0242ac120105
// ### Actualizar suscripción
// PATCH http://localhost:1026/ngsi-ld/v1/subscriptions/urn:ngsi-ld:subscription:{{SubID}}
// Content-Type: application/ld+json

// {
//     "isActive": true,
//     "@context": "http://context/datamodels.context-ngsi.jsonld"
// }
function reactivateSubscription(entities) {
    console.log('reactivateSubscription');

    console.log(entities);
    entities.forEach(async (entity) => {
        try {
            const url_withSubsId = `${url}/${entity.subs_id}`;
            console.log(url_withSubsId);
            const response = await axios.patch(
                url_withSubsId,
                {
                    "isActive": true,
                    "@context": "http://context/datamodels.context-ngsi.jsonld"
                },
                {
                    headers: 
                    {
                        'Content-Type': 'application/ld+json'
                    }
                }
            );
            if (response.status === 204 || response.status === 200) {
                console.log(`Subscripción reactivada ${entity.entities_id}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}




module.exports = { createSubscriptions, updateSubscriptions, deleteSubscriptions, reactivateSubscription};