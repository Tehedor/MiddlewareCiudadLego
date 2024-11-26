const axios = require('axios');

// Función para crear las suscripciones
function createSubscriptions(url, entities, headers) {

    entities.forEach(async (entity) => {
        try {
            const response = await axios.post(url, entity, { headers });
            if (response.status === 201) {
                console.log(`Suscripcion ${sensor.entity[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

// Función para eliminar las suscripciones
// curl -X DELETE \
//   --url 'http://localhost:1026/ngsi-ld/v1/subscriptions/urn:ngsi-ld:Subscription:5fd228838b9b83697b855a72'
function deleteSubscriptions(entities, url) {

    entities.forEach(async (entity) => {
        try {
            // const response = await axios.delete(`${url}${entity.entities[0].id}`, { headers });
            const url_withSubsId = `${url}${entity.entities[0].id}`;
            const response = await axios.delete(url_withSubsId);
            if (response.status === 204) {
                console.log(`Eliminada suscripcion ${entity.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

// curl -iX PATCH \
//   --url 'http://localhost:1026/ngsi-ld/v1/subscriptions/urn:ngsi-ld:Subscription:5fd228838b9b83697b855a72' \
//   --header 'content-type: application/json' \
//   --data '{
//   "notification": {
//     "format": "normalized",
//     "endpoint": {
//       "uri": "http://tutorial:3000/subscription/price-change",
//       "accept": "application/json"
//     }
//   }
// }'
// Funcion para actualizar las suscripciones
function updateSubscriptions(url_withSubsId, entities, headers) {

    entities.forEach(async (entity) => {
        try {
            const response = await axios.patch(`${url}${entity.entities[0].id}`, entity, { headers });
            if (response.status === 204) {
                console.log(`Actualizada suscripcion ${entity.entities[0].type}`);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    });
}

// const base = {
//     format: "normalized",
//     ur
// }
// const Camera = notify_template(
//     // entity_id= `urn:ngsi-ld:Camera:${number}`,
//     // entity_type= "Camera",
//     entity_watch_attr= ["mediaURL", "on", "startDataTime"],
//     url_endpoint= draco_uri,
//     notify_format= defaultformat,url_context= default_url_context
// );

module.exports = { createSubscriptions, deleteSubscriptions };