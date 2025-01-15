const axios = require('axios');

const {dataBuildings, dataLegoBuilding} = require('./types/buildings');
const dataActuators = require('./types/actuators');
const dataSensors = require('./types/sensors');



const basePath = process.env.MODE_CONTAINERS === 'true' ? 'fiware-orion' : 'localhost';
const url = `http://${basePath}:1026/ngsi-ld/v1/entityOperations/upsert`;
headers = {
    'Content-Type': 'application/json',
    'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
}


const requestEntities = async (url, headers, data, description) => {
    try {
        const response = await axios.post(url, data, { headers });
        // console.log(`ini ${description}`);
        console.log(response.status);
        // console.log(response.data);
    } catch (error) {
        console.error(`Error posting ${description}:`, error.response ? error.response.data : error.message);
    }
};

const createEntities = async () => {
    console.log('Creating entities...');
    await requestEntities(url, headers, JSON.stringify(dataSensors()));
    await requestEntities(url, headers, JSON.stringify(dataActuators()));
    await requestEntities(url, headers, JSON.stringify(dataBuildings()));
    await requestEntities(url, headers, JSON.stringify(dataLegoBuilding()));
};

module.exports = { createEntities };    