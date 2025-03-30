var express = require('express');
var router = express.Router();

const formatNgsiID = require("../../utils/formatNgsiID");

const { 
  getRemapFunction, 
  handleAxiosError, 
  fetchData,
  fetchDataWithId
} = require("../../utils/requestUtils");


const  {
  checkType,
  sendToBlackList,
  controlCheckIfIsSensor,
  controlCheckIfIsActuator,
  controlCheckIfIsCamera,
  controlCheckIfIsLegoBuilding,
  controlCheckIfIsLegoCity
} = require("../../utils/controlCheckIfIsXXX")

// Styles sensors
const styles = ["info", "relations", "details", "value"];

/**
 * @swagger
 * /api/sensors:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Devuelve todas las "Sensors".
 *     description: Obtiene todas las entidades de tipo "Sensor" desde el Context Broker.
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
 *           enum: [info, relations, details, value]
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
router.get("/sensors", async (req, res) => {
  try {
    //style
    const style = req.query.style || "info";
    if (!styles.includes(style)) {
      return res.status(400).send("Invalid style");
    }
    
    // Fetch to context
    const urlQuery = `?q=category==%22sensor%22${style === "info" ? "&options=keyValues" : ""}`;
    const response = await fetchData(urlQuery);
    
    
    // Response
    const remapFunction = getRemapFunction(style);
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
 *     summary: Devuelve un "Sensor" específico.
 *     description: Obtiene una entidad de tipo "Sensor" desde el Context Broker usando su ngsiID.
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
 *         description: Identificador NGSI de la "Sensor".
 *       - in: query
 *         name: style
 *         required: false
 *         schema:
 *           type: string
 *           enum: [info, relations, details, value]
 *         description: Tipo de formato de respuesta (normal por defecto).
 *     responses:
 *       200:
 *         description: Un "Sensor" específico con el formato solicitado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "PirSensor001"
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
 *                       example: "LOW"
 *                 controlledAsset:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Relationship"
 *                     object:
 *                       type: string
 *                       example: "LegoStreetLight001"
 */
router.get("/sensors/:ngsiID([\\w:-]+)", async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);
  try {
    // ngsiID
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }

    // Check if is sensor
    const check = controlCheckIfIsSensor(ngsiID); 
    
    if (check == "notSensor") {
      return res.status(404).send("No is a sensor");
    }
    
    // Style
    const style = req.query.style || "info";
    if (!styles.includes(style)) {
      return res.status(400).send("Invalid style");
    }
    
    // Fetch to context
    const urlQuery = `${style === "info" ? "?options=keyValues" : ""}`;
    const response = await fetchDataWithId(ngsiID, urlQuery);
    
    // No registred
    if (check == "notRegistred") {
      checkType(response.data);
      const check = controlCheckIfIsSensor(ngsiID); 
      if (check == 'notSensor') {
        return res.status(404).send("No is a sensor");
      }    
    }

    // Response
    const remapFunction = getRemapFunction(style);
    const filteredData = remapFunction(response.data);
    res.json(filteredData);

  } catch (error) {
    handleAxiosError(error, ngsiID, res);
  }
});


module.exports = router;