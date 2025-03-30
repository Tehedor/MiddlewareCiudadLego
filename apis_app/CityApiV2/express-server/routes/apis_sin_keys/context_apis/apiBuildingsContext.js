var express = require("express");
var router = express.Router();
const axios = require("axios");

const formatNgsiID = require("../../utils/formatNgsiID");

const { remapDataModeID,remapDataModeInfo, remapDataModeDetails} = require("../../utils/remapModes");
const {checkIfIsSensor, checkIfIsLegoBuilding, checkIfIsActuator} = require("../../utils/checkIfIsXXX");

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
 * /api/buildings:
 *   get:
 *     tags:
 *       - Buildings
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
 *                     example: "urn:ngsi-ld:LegoStreetLight:001"
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
    const response = await axios.get(`${url}?type=fiware:LegoBuilding`, 
      {headers: headers});
            
    const filteredData = remapDataModeID(response.data);

    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching buildings:", error);
    res.status(500).send("Error fetching buildings");
  }
});
// [
//     {
//       "id": "urn:ngsi-ld:LegoStreetLight:001",
//       "Relationship": "urn:ngsi-ld:LegoCity:001"
//     },
//     {
//       "id": "urn:ngsi-ld:LegoTrain:001",
//       "Relationship": "urn:ngsi-ld:LegoCity:001"
//     }
//   ]


/**
 * @swagger
 * /api/buildings/info:
 *   get:
 *     tags:
 *       - Buildings
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
router.get("/buildings/info", async (req, res) => {
  try {
    const response = await axios.get(`${url}?type=fiware:LegoBuilding&options=keyValues`, {
      headers: headers
    });

    const remappedData = remapDataModeInfo(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching buildings:", error);
    res.status(500).send("Error fetching buildings");
  }
});

/**
 * @swagger
 * /api/buildings/details:
 *   get:
 *     tags:
 *       - Buildings
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
router.get("/buildings/details", async (req, res) => {
  try {
    const response = await axios.get(`${url}?type=fiware:LegoBuilding`, {
      headers: headers
    });
    const remappedData = remapDataModeDetails(response.data);

    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching buildings:", error);
    res.status(500).send("Error fetching buildings");
  }
});


/**
 * @swagger
 * /api/buildings/{ngsiID}:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve una "Entity" específica.
 *     description: Obtiene "id" y "ralations" de una "Entity" específica desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Entity".
 *     responses:
 *       200:
 *         description: Una "Entity" específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "LegoStreetLight001"
 *                 Relationship:
 *                   type: string
 *                   example: "LegoCity001"
 */
router.get("/buildings/:ngsiID([\\w:-]+)", async (req, res) => {
  try {
    // Reformatear el ngsiID
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);
    const response = await axios.get(`${url}/${ngsiID}`, 
      {headers: headers});

    if (!checkIfIsLegoBuilding(response.data)) {
      return res.status(404).send("Not a LegoBuilding");
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
 * /api/buildings/{ngsiID}/info:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve datos de una "Entity".
 *     description: Obtiene datos de una "Entity" específica desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Enitty".
 *     responses:
 *       200:
 *         description: Una "Entity" específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "LegoStreetLight001"
 *                 type:
 *                   type: string
 *                   example: "LegoBuilding"
 *                 category:
 *                   type: string
 *                   example: "legoSteetLight"
 *                 controlledAsset:
 *                   type: string
 *                   example: "LegoCity001"
 */
router.get("/buildings/:ngsiID([\\w:-]+)/info", async (req, res) => {
  try {

    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);
    const response = await axios.get(`${url}/${ngsiID}?options=keyValues`, 
      {headers: headers});

    if (!checkIfIsLegoBuilding(response.data)) {
      return res.status(404).send("Not a LegoBuilding");
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
 * /api/buildings/{ngsiID}/details:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve todos los datos de una "Entity".
 *     description: Obtiene todos los datos de una "Entity" específica desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Entity".
 *     responses:
 *       200:
 *         description: Los detalles de una "Entity" específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "LegoStreetLight001"
 *                 type:
 *                   type: string
 *                   example: "LegoBuilding"
 *                 category:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: string
 *                       example: "legoSteetLight"
 *                 controlledAsset:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Relationship"
 *                     object:
 *                       type: string
 *                       example: "LegoCity001"
 */
router.get("/buildings/:ngsiID([\\w:-]+)/details", async (req, res) => {
  try {
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);
    console.log("Reformatted ngsiID:", ngsiID);

    const response = await axios.get(`${url}/${ngsiID}`, 
      {headers: headers});

    if (!checkIfIsLegoBuilding(response.data)) { 
      return res.status(404).send("Not a LegoBuilding");
    }

    const remappedData = remapDataModeDetails(response.data);
    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching building details:", error);
    res.status(500).send("Error fetching building details");
  }
});

/**
 * @swagger
 * /api/buildings/{ngsiID}/components:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve componentes de un "Entity" .
 *     description: Obtiene todos los componentes de una "Entity" desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Entity".
 *     responses:
 *       200:
 *         description: Una lista de "Buildings" específicas.
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
router.get("/buildings/:ngsiID([\\w:-]+)/components", async (req, res) => {
  try {
    // Reformatear el ngsiID
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);

    console.log("Reformatted ngsiID:", ngsiID);

    const response = await axios.get(
      `${url}/?q=controlledAsset==%22${ngsiID}%22`,
      {
        headers: headers,
      }
    );

    const filteredData = remapDataModeID(response.data);

    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).send("Error fetching building");
  }
});


/**
 * @swagger
 * /api/buildings/{ngsiID}/components/info:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve datos de los componenetes de una "Entity".
 *     description: Obtiene datos de los componentes de una "Entity" específica desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Entity".
 *     responses:
 *       200:
 *         description: Una lista de "Buildings" específicas.
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
 *                   light:
 *                     type: number
 *                     example: 10
 *                   stateLed:
 *                     type: string
 *                     example: "OFF"
 *                   stateLight:
 *                     type: string
 *                     example: "OFF"
 *                   controlledAsset:
 *                     type: string
 *                     example: "LegoStreetLight001"
 */
router.get("/buildings/:ngsiID([\\w:-]+)/components/info", async (req, res) => {
  try {
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);

    console.log("Reformatted ngsiID:", ngsiID);

    const response = await axios.get(
      `${url}/?q=controlledAsset==%22${ngsiID}%22&options=keyValues`,
      {
        headers: headers,
      }
    );

    console.log("Response:", response.data);
    const remappedData = remapDataModeInfo(response.data);

    res.json(remappedData);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).send("Error fetching building");
  }
});

/**
 * @swagger
 * /api/buildings/{ngsiID}/components/details:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve todos los datos de los componenetes de una "Entity".
 *     description: Obtiene todos los datos de los componentes de una "Entity" específica desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Entity".
 *     responses:
 *       200:
 *         description: Los componentes detallados de una "Entity" específica.
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
router.get(
  "/buildings/:ngsiID([\\w:-]+)/components/details",
  async (req, res) => {
    try {
      const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);

      const response = await axios.get(`${url}/?q=controlledAsset==%22${ngsiID}%22`, {
        headers: headers,
      });

      const remappedData = remapDataModeDetails(response.data);

      res.json(remappedData);
    } catch (error) {
      console.error("Error fetching building details:", error);
      res.status(500).send("Error fetching building details");
    }
  }
);

module.exports = router;
