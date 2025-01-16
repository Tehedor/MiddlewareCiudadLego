var express = require('express');
var router = express.Router();
const axios = require('axios')


const formatNgsiID = require("../../utils/formatNgsiID");

const { remapDataModeID,remapDataModeInfo, remapDataModeDetails} = require("../../utils/remapModes");

const {checkIfIsSensor, checkIfIsLegoBuilding, checkIfIsActuator} = require("../../utils/checkIfIsXXX");


const basePath = process.env.MODE_CONTAINER === 'true' ? 'fiware-orion' : 'localhost';
const url = `http://${basePath}:1026/ngsi-ld/v1/entities`;
const headers = {
    'Accept': 'application/ld+json',
    'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
};



/**
 * @swagger
 * /api/sensors:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Devuelve todas las "Buildings".
 *     description: Obtiene todas las entidades de tipo "LegoBuilding" desde el Context Broker.
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
router.get("/sensors", async (req, res) => {
  try {
    const response = await axios.get(`${url}?q=category==%22sensor%22`, {headers: headers});
    const filteredData = remapDataModeID(response.data);
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching sensors:", error);
    res.status(500).send("Error fetching sensors");
  }
});

/**
 * @swagger
 * /api/sensors/info:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Devuelve todas las "Buildings".
 *     description: Obtiene todas las entidades de tipo "LegoBuilding" desde el Context Broker.
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
router.get("/sensors/info", async (req, res) => {
  try {
    const response = await axios.get(`${url}?q=category==%22sensor%22&options=keyValues`, {headers: headers});
    const remappedData = remapDataModeInfo(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching sensors:", error);
    res.status(500).send("Error fetching sensors");
  }
});

/**
 * @swagger
 * /api/sensors/details:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Devuelve todos los datos de los sensores.
 *     description: Obtiene todos los datos de los sensores desde el Context Broker.
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
router.get("/sensors/details", async (req, res) => {
  try {
    const response = await axios.get(`${url}?q=category==%22sensor%22`, 
      {headers: headers});
    const remappedData = remapDataModeDetails(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching sensors:", error);
    res.status(500).send("Error fetching sensors");
  }
});

/**
 * @swagger
 * /api/sensors/{ngsiID}:
 *   get:
 *     tags:
 *       - Sensors
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
router.get("/sensors/:ngsiID([\\w:-]+)", async (req, res) => {
  try {
    const ngsiID = formatNgsiID(req.params.ngsiID);
    const response = await axios.get(`${url}/${ngsiID}`, 
      {headers: headers});

    if (!checkIfIsSensor(response.data)) {
      return res.status(404).send("No is a sensor");
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
 * /api/sensors/{ngsiID}/info:
 *   get:
 *     tags:
 *       - Sensors
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
router.get("/sensors/:ngsiID([\\w:-]+)/info", async (req, res) => {
  try {
    const ngsiID = formatNgsiID(req.params.ngsiID);
    const response = await axios.get(`${url}/${ngsiID}?options=keyValues`, 
      {headers: headers});

    if (!checkIfIsSensor(response.data)) {
      return res.status(404).send("No is a sensor");
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
 * /api/sensors/{ngsiID}/details:
 *   get:
 *     tags:
 *       - Sensors
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
router.get("/sensors/:ngsiID([\\w:-]+)/details", async (req, res) => {
  try {
    const ngsiID = formatNgsiID(req.params.ngsiID);
    const response = await axios.get(`${url}/${ngsiID}`, {
      headers: headers
    });

    if (!checkIfIsSensor(response.data)) {
      return res.status(404).send("No is a sensor");
    }

    const remappedData = remapDataModeDetails(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching building details:", error);
    res.status(500).send("Error fetching building details");
  }
});


module.exports = router;