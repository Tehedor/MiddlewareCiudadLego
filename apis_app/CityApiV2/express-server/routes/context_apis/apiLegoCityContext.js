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
 *                     example: "LegoCity001"
 *                   type:
 *                     type: string
 *                     example: "Building"
 *                   category:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: string
 *                         example: "construction"
 *                   address:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: object
 *                         properties:
 *                           addressLocality:
 *                             type: string
 *                             example: "Madrid - Aravaca"
 *                           postalCode:
 *                             type: string
 *                             example: "28040"
 *                           streetAddress:
 *                             type: string
 *                             example: "Av. Complutense, 30"
 */
router.get("/cities", async (req, res) => {
  try {

    //style
    const style = req.query.style || "info";
    if (!styles.includes(style)) {
      return res.status(400).send("Invalid style");
    }
    
    // Fetch to context
    const urlQuery = `?type=Building${style === "info" ? "&options=keyValues" : ""}`;
    const response = await fetchData(urlQuery);
    
    
    // Response
    const remapFunction = getRemapFunction(style);
    const filteredData = remapFunction(response.data);
    res.json(filteredData);

  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).send("Error fetching cities");
  }
});


/**
 * @swagger
 * /api/cities/{ngsiID}:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Devuelve una "Cities" específica.
 *     description: Obtiene "id" y "ralations" de una "Cities" específica desde el Context Broker usando su ngsiID.
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
 *         description: Identificador NGSI de la "Cities".
 *       - in: query
 *         name: style
 *         required: false
 *         schema:
 *           type: string
 *           enum: [info, relations, details]
 *         description: Tipo de formato de respuesta (normal por defecto).
 *     responses:
 *       200:
 *         description: Una "Cities" específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "LegoCity001"
 *                 type:
 *                   type: string
 *                   example: "Building"
 *                 category:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: string
 *                       example: "construction"
 *                 address:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: object
 *                       properties:
 *                         addressLocality:
 *                           type: string
 *                           example: "Madrid - Aravaca"
 *                         postalCode:
 *                           type: string
 *                           example: "28040"
 *                         streetAddress:
 *                           type: string
 *                           example: "Av. Complutense, 30"
 */
router.get("/cities/:ngsiID([\\w:-]+)", async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID);
  try {

    // ngsiID
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }
    
    // Check if is sensor
    const check = controlCheckIfIsLegoCity(ngsiID); 
    if (check == "notCity") {
      return res.status(404).send("No is a Lego City");
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
      const check = controlCheckIfIsLegoCity(ngsiID); 
      if (check == 'notBuilding') {
        return res.status(404).send("No is a Lego City");
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

/**
 * @swagger
 * /api/cities/{ngsiID}/components:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Devuelve componentes de un "Cities" .
 *     description: Obtiene todos los componentes de una "Cities" desde el Context Broker usando su ngsiID.
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
 *         description: Identificador NGSI de la "Cities".
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
router.get("/cities/:ngsiID([\\w:-]+)/components", async (req, res) => {
  // Reformatear el ngsiID
  const ngsiID = formatNgsiID(req.params.ngsiID);
  try {

    // ngsiID
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }

    // Check if is sensor
    const check = controlCheckIfIsLegoCity(ngsiID); 
    
    if (check == "notCity") {
      return res.status(404).send("No is a Lego City");
    }
    
    // Style
    const style = req.query.style || "info";
    if (!styles.includes(style)) {
      return res.status(400).send("Invalid style");
    }
    // No registred
    if (check == "notRegistred") {
      const responseCheck = await fetchDataWithId(ngsiID, "");
      console.log(responseCheck);
      checkType(responseCheck.data);
      const check = controlCheckIfIsLegoCity(ngsiID); 
      if (check == 'notCity') {
        return res.status(404).send("No is a Lego City");
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
