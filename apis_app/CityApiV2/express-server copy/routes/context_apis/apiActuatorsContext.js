var express = require('express');
var router = express.Router();
const axios = require('axios')


const formatNgsiID = require("../../utils/formatNgsiID");

const { remapDataModeID,remapDataModeInfo, remapDataModeDetails} = require("../../utils/remapModes");

const {checkIfIsSensor, checkIfIsLegoBuilding, checkIfIsActuator} = require("../../utils/checkIfIsXXX");


const EnvConfig = require('../../../utils/env.config');
const { mode_container } = EnvConfig();

const basePath = mode_container ? 'fiware-orion' : 'localhost';
const url = `http://${basePath}:1026/ngsi-ld/v1/entities`;
const headers = {
    'Accept': 'application/ld+json',
    'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
};


/**
 * @swagger
 * /api/actuators:
 *   get:
 *     tags:
 *       - Actuators
 *     summary: Devuelve todas las "Buildings".
 *     description: Obtiene todas las entidades de tipo "LegoBuilding" desde el Context Broker.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
 *       - in: header
 *         name: x-api-key
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
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
 *                   id:
 *                     type: string
 *                     example: "PirSensor001"
 *                   Relationship:
 *                     type: string
 *                     example: "LegoStreetLight001"
 */
router.get("/actuators", async (req, res) => {
  try {
    const response = await axios.get(`${url}?q=category==%22actuator%22`, {headers: headers});
    const filteredData = remapDataModeID(response.data);
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching actuators:", error);
    res.status(500).send("Error fetching actuators");
  }
});

/**
 * @swagger
 * /api/actuators/info:
 *   get:
 *     tags:
 *       - Actuators
 *     summary: Devuelve todas las "Buildings".
 *     description: Obtiene todas las entidades de tipo "LegoBuilding" desde el Context Broker.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
 *       - in: header
 *         name: x-api-key
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
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
 *                   id:
 *                     type: string
 *                     example: "PirSensor001"
 *                   type:
 *                     type: string
 *                     example: "PirSensor"
 *                   category:
 *                     type: string
 *                     example: "sensor"
 *                   presence:
 *                     type: string
 *                     example: "LOW"
 *                   controlledAsset:
 *                     type: string
 *                     example: "LegoStreetLight001"
 */
router.get("/actuators/info", async (req, res) => {
  try {
    const response = await axios.get(`${url}?q=category==%22actuator%22&options=keyValues`, {headers: headers});
    const remappedData = remapDataModeInfo(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching actuators:", error);
    res.status(500).send("Error fetching actuators");
  }
});

/**
 * @swagger
 * /api/actuators/details:
 *   get:
 *     tags:
 *       - Actuators
 *     summary: Devuelve todos los datos de los sensores.
 *     description: Obtiene todos los datos de los sensores desde el Context Broker.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
 *       - in: header
 *         name: x-api-key
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
 *     responses:
 *       200:
 *         description: Una lista de todos los sensores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "PirSensor001"
 *                   type:
 *                     type: string
 *                     example: "PirSensor"
 *                   category:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: string
 *                         example: "sensor"
 *                   presence:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: string
 *                         example: "LOW"
 *                   controlledAsset:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Relationship"
 *                       object:
 *                         type: string
 *                         example: "LegoStreetLight001"
 */
router.get("/actuators/details", async (req, res) => {
  try {
    const response = await axios.get(`${url}?q=category==%22actuator%22`, 
      {headers: headers});
    const remappedData = remapDataModeDetails(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching actuators:", error);
    res.status(500).send("Error fetching actuators");
  }
});

/**
 * @swagger
 * /api/actuators/{ngsiID}:
 *   get:
 *     tags:
 *       - Actuators
 *     summary: Devuelve una "Building" específica.
 *     description: Obtiene una entidad de tipo "LegoBuilding" desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
 *       - in: header
 *         name: x-api-key
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
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
router.get("/actuators/:ngsiID([\\w:-]+)", async (req, res) => {
  try {
    const ngsiID = formatNgsiID(req.params.ngsiID);
    const response = await axios.get(`${url}/${ngsiID}`, 
      {headers: headers});

    if (!checkIfIsActuator(response.data)) {
      return res.status(404).send("No is a actuator");
    }

    const filteredData = remapDataModeID(response.data);
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).send("Error fetching building");
  }
});


/**
 * @swagger
 * /api/actuators/{ngsiID}/info:
 *   get:
 *     tags:
 *       - Actuators
 *     summary: Devuelve una "Building" específica.
 *     description: Obtiene una entidad de tipo "LegoBuilding" desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
 *       - in: header
 *         name: x-api-key
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
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
router.get("/actuators/:ngsiID([\\w:-]+)/info", async (req, res) => {
  try {
    const ngsiID = formatNgsiID(req.params.ngsiID);
    const response = await axios.get(`${url}/${ngsiID}?options=keyValues`, 
      {headers: headers});

    if (!checkIfIsActuator(response.data)) {
      return res.status(404).send("No is a actuator");
    }

    const remappedData = remapDataModeInfo(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).send("Error fetching building");
  }
});


/**
 * @swagger
 * /api/actuators/{ngsiID}/details:
 *   get:
 *     tags:
 *       - Actuators
 *     summary: Devuelve los detalles de una "Building" específica.
 *     description: Obtiene los detalles de una entidad de tipo "LegoBuilding" desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
 *       - in: header
 *         name: x-api-key
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición.
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
router.get("/actuators/:ngsiID([\\w:-]+)/details", async (req, res) => {
  try {
    const ngsiID = formatNgsiID(req.params.ngsiID);
    const response = await axios.get(`${url}/${ngsiID}`, {
      headers: headers
    });

    if (!checkIfIsActuator(response.data)) {
      return res.status(404).send("No is a actuator");
    }

    const remappedData = remapDataModeDetails(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching building details:", error);
    res.status(500).send("Error fetching building details");
  }
});


module.exports = router;