var express = require("express");
var router = express.Router();
const axios = require("axios");

const formatNgsiID = require("../../utils/formatNgsiID");

const { remapDataModeRelations,remapDataModeInfo, remapDataModeDetails} = require("../../utils/remapModes");
const { checkIfIsLegoCity} = require("../../utils/checkIfIsXXX");


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
 * /api/cities:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Devuelve todas las "Cities".
 *     description: Obtiene todas las entidades de tipo "LegoBuilding" desde el Context Broker.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición. También se puede añadir en body (apiKey) o en headers (['x-api-key']).
 *       - in: query
 *         name: style
 *         required: false
 *         schema:
 *           type: string
 *           enum: [info, relations, details]
 *         description: Tipo de formato de respuesta (normal por defecto).
 *     responses:
 *       200:
 *         description: Una lista de todas las "Cities".
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
router.get("/cities", async (req, res) => {
  try {
    const style = req.query.style || "normal";
    let urlQuery = "?type=Building";
    let remapFunction;

    switch (style) {
      case "relations":
        remapFunction = remapDataModeRelations;
        break;
      case "details":
        remapFunction = remapDataModeDetails;
        break;
      default:
        urlQuery += "&options=keyValues";
        remapFunction = remapDataModeInfo;
        break;
    }
    
    const response = await axios.get(`${url}${urlQuery}`, 
      {headers: headers});
            
    console.log("Response:", response.data);
    const filteredData = remapFunction(response.data);

    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).send("Error fetching cities");
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
 * /api/cities/{ngsiID}:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Devuelve una "Entity" específica.
 *     description: Obtiene "id" y "ralations" de una "Entity" específica desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición. También se puede añadir en body (apiKey) o en headers (['x-api-key']).
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Entity".
 *       - in: query
 *         name: style
 *         required: false
 *         schema:
 *           type: string
 *           enum: [info, relations, details]
 *         description: Tipo de formato de respuesta (normal por defecto).
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
router.get("/cities/:ngsiID([\\w:-]+)", async (req, res) => {
  try {
    // Reformatear el ngsiID
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);

    const style = req.query.style || "normal";
    let urlQuery = "";
    let remapFunction;

    switch (style) {
      case "relations":
        remapFunction = remapDataModeRelations;
        break;
      case "details":
        remapFunction = remapDataModeDetails;
        break;
      default:
        urlQuery += "?options=keyValues";
        remapFunction = remapDataModeInfo;
        break;
    }

    console.log("URL:", `${url}/${ngsiID}${urlQuery}`);
    // const response = await axios.get(`${url}/${ngsiID}`, {headers: headers});
    const response = await axios.get(`${url}/${ngsiID}${urlQuery}`, { headers });

    if (!checkIfIsLegoCity(response.data)) {
      return res.status(404).send("Not a LegoCity");
    }

    const filteredData = remapFunction(response.data);
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).send("Error fetching building");
  }
});

/**
 * @swagger
 * /api/cities/{ngsiID}/components:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Devuelve componentes de un "Entity" .
 *     description: Obtiene todos los componentes de una "Entity" desde el Context Broker usando su ngsiID.
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición. También se puede añadir en body (apiKey) o en headers (['x-api-key']).
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador NGSI de la "Entity".
 *       - in: query
 *         name: style
 *         required: false
 *         schema:
 *           type: string
 *           enum: [info, relations, details]
 *         description: Tipo de formato de respuesta (normal por defecto).
 *     responses:
 *       200:
 *         description: Una lista de "Cities" específicas.
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
router.get("/cities/:ngsiID([\\w:-]+)/components", async (req, res) => {
  try {
    // Reformatear el ngsiID
    const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);

    console.log("Reformatted ngsiID:", ngsiID);

    const style = req.query.style || "normal";
    let urlQuery = `?q=controlledAsset==%22${ngsiID}%22`;
    let remapFunction;

    switch (style) {
      case "relations":
        remapFunction = remapDataModeRelations;
        break;
      case "details":
        remapFunction = remapDataModeDetails;
        break;
      default:
        urlQuery += "&options=keyValues";
        remapFunction = remapDataModeInfo;
        break;
    }

    console.log("URL:", `${url}${urlQuery}`);
    const response = await axios.get(`${url}${urlQuery}`,{headers: headers});

    const filteredData = remapFunction(response.data);

    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).send("Error fetching building");
  }
});

module.exports = router;
