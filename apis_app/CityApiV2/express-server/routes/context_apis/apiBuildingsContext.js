var express = require('express');
var router = express.Router();

const formatNgsiID = require("../../utils/formatNgsiID");

const { 
  getRemapFunction, 
  handleAxiosError, 
  fetchData,
  fetchDataComponents,
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
const styles = ["info", "relations", "details"];

/**
 * @swagger
 * /api/buildings:
 *   get:
 *     tags:
 *       - Buildings
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
 *                     example: "LegoStreetLight001"
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
 *                         example: "LegoCity001"
 */
router.get("/buildings", async (req, res) => {
  try {

    //style
    const style = req.query.style || "info";
    if (!styles.includes(style)) {
      return res.status(400).send("Invalid style");
    }
    
    // Fetch to context
    const urlQuery = `?type=fiware:LegoBuilding${style === "info" ? "&options=keyValues" : ""}`;
    const response = await fetchData(urlQuery);
    
    
    // Response
    const remapFunction = getRemapFunction(style);
    const filteredData = remapFunction(response.data);
    res.json(filteredData);
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
 *     summary: Devuelve una "Building" específica.
 *     description: Obtiene "id" y "ralations" de una "Building" específica desde el Context Broker usando su ngsiID.
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
 *         description: Una "Building" específica.
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
router.get("/buildings/:ngsiID([\\w:-]+)", async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID);
  try {
    // ngsiID
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }
    
    // Check if is sensor
    const check = controlCheckIfIsLegoBuilding(ngsiID); 
    if (check == "notBuilding") {
      return res.status(404).send("No is a building");
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
      const check = controlCheckIfIsLegoBuilding(ngsiID); 
      if (check == 'notBuilding') {
        return res.status(404).send("No is a building");
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


const stylesComponents = ["info", "relations", "details","value"];
/**
 * @swagger
 * /api/buildings/{ngsiID}/components:
 *   get:
 *     tags:
 *       - Buildings
 *     summary: Devuelve componentes de un "Building" .
 *     description: Obtiene todos los componentes de una "Building" desde el Context Broker usando su ngsiID.
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
 *           enum: [info, relations, details, value]
 *         description: Tipo de formato de respuesta (normal por defecto).
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
router.get("/buildings/:ngsiID([\\w:-]+)/components", async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID);
  try {

    // ngsiID
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }

    // Check if is sensor
    const check = controlCheckIfIsLegoBuilding(ngsiID); 
    
    if (check == "notBuilding") {
      return res.status(404).send("No is a building");
    }
    
    // Style
    const style = req.query.style || "info";
    if (!stylesComponents.includes(style)) {
      return res.status(400).send("Invalid style");
    }
    
    // No registred
    if (check == "notRegistred") {
      const responseCheck = await fetchDataWithId(ngsiID, "");

      checkType(responseCheck.data);
      const check = controlCheckIfIsLegoBuilding(ngsiID); 
      if (check == 'notBuilding') {
        return res.status(404).send("No is a building");
      }    
    }
    

    // Fetch to context
    const urlQuery = `?q=controlledAsset==%22${ngsiID}%22${style === "info" ? "&options=keyValues" : ""}`;
    const response = await fetchDataComponents(urlQuery);
    
    // Response
    const remapFunction = getRemapFunction(style);
    const filteredData = remapFunction(response.data);
    res.json(filteredData);

  } catch (error) {
    handleAxiosError(error, ngsiID, res);
  }
});

module.exports = router;
