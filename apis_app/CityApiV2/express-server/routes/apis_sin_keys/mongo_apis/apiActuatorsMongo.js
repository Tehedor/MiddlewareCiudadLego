var express = require('express');
var router = express.Router();
const axios = require('axios')

const contextLink = '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"';

const EnvConfig = require('../../../../utils/env.config');
const { mode_container } = EnvConfig();

const basePath = mode_container ? 'fiware-orion' : 'localhost';
const url = `http://${basePath}:1026/ngsi-ld/v1/entities`;
const headers = {
    'Accept': 'application/ld+json',
    'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
};




/**
 * @swagger
 * /buildings:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve todas las "Buildings".
 *     description: Obtiene todas las entidades de tipo "LegoBuilding" desde el Context Broker.
 *     parameters:
 *       - in: path
 *         name: numid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador numérico del sensor.
 *     responses:
 *       200:
 *         description: Una lista de todas las "Buildings".
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   @context:
 *                     type: string
 *                     example: "http://context/datamodels.context-ngsi.jsonld"
 *                   id:
 *                     type: string
 *                     example: "urn:ngsi-ld:LegoStreetLight:001"
 *                   type:
 *                     type: string
 *                     example: "LegoBuilding"
 *                   category:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: string
 *                         example: "legoSteetLight"
 *                   controlledAsset:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Relationship"
 *                       object:
 *                         type: string
 *                         example: "urn:ngsi-ld:LegoCity:001"
 */
router.get("/buildings", async (req, res) => {
  try {
    const response = await axios.get(`${contextBrokerUrl}?type=fiware:LegoBuilding`, {
        headers: headers
      });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching buildings:", error);
    res.status(500).send("Error fetching buildings");
  }
});
// [
//     {
//       "@context": "http://context/datamodels.context-ngsi.jsonld",
//       "id": "urn:ngsi-ld:LegoStreetLight:001",
//       "type": "LegoBuilding",
//       "category": {
//         "type": "Property",
//         "value": "legoSteetLight"
//       },
//       "controlledAsset": {
//         "type": "Relationship",
//         "object": "urn:ngsi-ld:LegoCity:001"
//       }
//     },
//     {
//       "@context": "http://context/datamodels.context-ngsi.jsonld",
//       "id": "urn:ngsi-ld:LegoTrain:001",
//       "type": "LegoBuilding",
//       "category": {
//         "type": "Property",
//         "value": "legoTrain"
//       },
//       "controlledAsset": {
//         "type": "Relationship",
//         "object": "urn:ngsi-ld:LegoCity:001"
//       }
//     },....
//   ]




/**
 * @swagger
 * /buildings/{ngsiID}:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve una "Building" específica.
 *     description: Obtiene una entidad de tipo "LegoBuilding" desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Building".
 *     responses:
 *       200:
 *         description: Una "Building" específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "urn:ngsi-ld:PirSensor:001"
 */
router.get("/buildings/:ngsiID([\\w:-]+)", async (req, res) => {
    try {
      const response = await axios.get(`${contextBrokerUrl}/${req.params.ngsiID}`, {
        headers: headers
      });
  
      const filteredData = response.data.map(item => ({
        "id": item["id"],
      }));
  
      res.json(filteredData);
    } catch (error) {
      console.error("Error fetching building:", error);
      res.status(500).send("Error fetching building");
    }
  });
  
// [
//     {
//       "id": "urn:ngsi-ld:PirSensor:001",
//     },
//     {
//       "id": "urn:ngsi-ld:PhotoresistorSensor:001",
//     },
//     {
//       "id": "urn:ngsi-ld:LedDetection:001",
//     },
//     {
//       "id": "urn:ngsi-ld:Light:001",
//     }
//   ]



/**
 * @swagger
 * /buildings/{ngsiID}/details:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve los detalles de una "Building" específica.
 *     description: Obtiene los detalles de una entidad de tipo "LegoBuilding" desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Building".
 *     responses:
 *       200:
 *         description: Los detalles de una "Building" específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 @context:
 *                   type: string
 *                   example: "http://context/datamodels.context-ngsi.jsonld"
 *                 id:
 *                   type: string
 *                   example: "urn:ngsi-ld:PirSensor:001"
 *                 type:
 *                   type: string
 *                   example: "PirSensor"
 *                 category:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: string
 *                       example: "sensor"
 *                 presence:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: string
 *                       example: "HIGH"
 *                 controlledAsset:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Relationship"
 *                     object:
 *                       type: string
 *                       example: "urn:ngsi-ld:LegoStreetLight:001"
 */
router.get("/buildings/:ngsiID([\\w:-]+)/details", async (req, res) => {
  try {
    const response = await axios.get(`${contextBrokerUrl}/${req.params.ngsiID}`, {
        headers: headers
      });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching building details:", error);
    res.status(500).send("Error fetching building details");
  }
});
// [
//     {
//       "@context": "http://context/datamodels.context-ngsi.jsonld",
//       "id": "urn:ngsi-ld:PirSensor:001",
//       "type": "PirSensor",
//       "category": {
//         "type": "Property",
//         "value": "sensor"
//       },
//       "presence": {
//         "type": "Property",
//         "value": "HIGH"
//       },
//       "controlledAsset": {
//         "type": "Relationship",
//         "object": "urn:ngsi-ld:LegoStreetLight:001"
//       }
//     },
//     {
//       "@context": "http://context/datamodels.context-ngsi.jsonld",
//       "id": "urn:ngsi-ld:PhotoresistorSensor:001",
//       "type": "PhotoresistorSensor",
//       "category": {
//         "type": "Property",
//         "value": "sensor"
//       },
//       "light": {
//         "type": "Property",
//         "value": 92
//       },
//       "controlledAsset": {
//         "type": "Relationship",
//         "object": "urn:ngsi-ld:LegoStreetLight:001"
//       }
//     },
//     {
//       "@context": "http://context/datamodels.context-ngsi.jsonld",
//       "id": "urn:ngsi-ld:LedDetection:001",
//       "type": "LedDetection",
//       "category": {
//         "type": "Property",
//         "value": "actuator"
//       },
//       "stateLed": {
//         "type": "Property",
//         "value": "OFF"
//       },
//       "controlledAsset": {
//         "type": "Relationship",
//         "object": "urn:ngsi-ld:LegoStreetLight:001"
//       }
//     },
//     {
//       "@context": "http://context/datamodels.context-ngsi.jsonld",
//       "id": "urn:ngsi-ld:Light:001",
//       "type": "Light",
//       "category": {
//         "type": "Property",
//         "value": "actuator"
//       },
//       "stateLight": {
//         "type": "Property",
//         "value": "OFF"
//       },
//       "controlledAsset": {
//         "type": "Relationship",
//         "object": "urn:ngsi-ld:LegoStreetLight:001"
//       }
//     }
//   ]

module.exports = router;