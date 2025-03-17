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

// Styles actuators
const styles = ["info", "relations", "details", "value"];


/**
 * @swagger
 * /api/actuators:
 *   get:
 *     tags:
 *       - Actuators
 *     summary: Devuelve todas las "Actuators".
 *     description: Obtiene todas las entidades de tipo "Actuator" desde el Context Broker.
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
 *         description: Una lista de todas las "Actuators".
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "LedDetection001"
 *                   type:
 *                     type: string
 *                     example: "LedDetection"
 *                   category:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: string
 *                         example: "actuator"
 *                   stateLed:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: string
 *                         example: "OFF"
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
router.get("/actuators", async (req, res) => {
  try {
        
    // Style
    const style = req.query.style || "info";
    if (!styles.includes(style)) {
      return res.status(400).send("Invalid style");
    }
    
    // Fetch to context
    const urlQuery = `?q=category==%22actuator%22${style === "info" ? "&options=keyValues" : ""}`;
    const response = await fetchData(urlQuery);
    
    
    // Response
    const remapFunction = getRemapFunction(style);
    const filteredData = remapFunction(response.data);
    res.json(filteredData);

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
 *     summary: Devuelve una "Actuator" específica.
 *     description: Obtiene una entidad de tipo "Actuator" desde el Context Broker usando su ngsiID.
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
 *         description: Identificador NGSI de la "Actuator".
 *       - in: query
 *         name: style
 *         required: false
 *         schema:
 *           type: string
 *           enum: [info, value, relations, details]
 *         description: Tipo de formato de respuesta (normal por defecto).
 *     responses:
 *       200:
 *         description: Una "Actuator" específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "LedDetection001"
 *                 type:
 *                   type: string
 *                   example: "LedDetection"
 *                 category:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: string
 *                       example: "actuator"
 *                 stateLed:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: string
 *                       example: "OFF"
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
router.get("/actuators/:ngsiID([\\w:-]+)", async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID);
  try {
    // ngsiID
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }

    // Check if is actuator
    const check = controlCheckIfIsActuator(ngsiID); 
    
    if (check == "notActuator") {
      return res.status(404).send("No is a actuator");
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
      const check = controlCheckIfIsActuator(ngsiID); 
      if (check == 'notActuator') {
        return res.status(404).send("No is a actuator");
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