var express = require('express');
var router = express.Router();
const axios = require('axios')


const formatNgsiID = require("../../utils/formatNgsiID");

const { remapDataModeRelations,remapDataModeInfo, remapDataModeDetails} = require("../../utils/remapModes");

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
 * /api/sensors:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Devuelve todas las "Buildings".
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
 *         description: Una lista de sensores con el formato especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/sensors", async (req, res) => {
  try {
    const style = req.query.style || "normal";
    let urlQuery = "?q=category==%22sensor%22";
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

    const response = await axios.get(`${url}${urlQuery}`, { headers });
    const filteredData = remapFunction(response.data);
    res.json(filteredData);
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
 *         description: Identificador NGSI de la "Building".
 *       - in: query
 *         name: style
 *         required: false
 *         schema:
 *           type: string
 *           enum: [info, relations, details]
 *         description: Tipo de formato de respuesta (normal por defecto).
 *     responses:
 *       200:
 *         description: Una "Building" específica con el formato solicitado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/sensors/:ngsiID([\\w:-]+)", async (req, res) => {
  try {
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
    console.log("URL:",`${url}/${ngsiID}${urlQuery}`);
    const response = await axios.get(`${url}/${ngsiID}${urlQuery}`, { headers });

    if (!checkIfIsSensor(response.data)) {
      return res.status(404).send("Not a sensor");
    }

    const filteredData = remapFunction(response.data);
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).send("Error fetching building");
  }
});


module.exports = router;