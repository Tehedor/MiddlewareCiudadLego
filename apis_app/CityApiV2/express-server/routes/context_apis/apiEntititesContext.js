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
  controlCheckIfIsLegoCity,
  controlCheckIfIsEntity
} = require("../../utils/controlCheckIfIsXXX")

// Styles actuators
const styles = ["info", "relations", "details"];

/**
 * @swagger
 * /api/entities/{ngsiID}:
 *   get:
 *     tags:
 *       - Entities
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
router.get("/entities/:ngsiID([\\w:-]+)", async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID);
  try {
    // Reformatear el ngsiID


    // console.log("Reformatted ngsiID:", ngsiID);

    // const style = req.query.style || "normal";
    // let urlQuery = "";
    // let remapFunction;

    // switch (style) {
    //   case "relations":
    //     remapFunction = remapDataModeRelations;
    //     break;
    //   case "details":
    //     remapFunction = remapDataModeDetails;
    //     break;
    //   default:
    //     urlQuery += "?options=keyValues";
    //     remapFunction = remapDataModeInfo;
    //     break;
    // }
    
    // const response = await axios.get(`${url}/${ngsiID}${urlQuery}`, { headers });

    // const filteredData = remapFunction(response.data);

    // res.json(filteredData);
    // Style
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }

    // Check if is actuator
    const check = controlCheckIfIsEntity(ngsiID); 
    
    if (check == "notEntity") {
      return res.status(404).send("No is a entity");
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
      const check = controlCheckIfIsEntity(ngsiID); 
      if (check == 'notEntity') {
        return res.status(404).send("No is a entity");
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
 * /api/entities/{ngsiID}/components:
 *   get:
 *     tags:
 *       - Entities
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
 *         description: Una lista de "Entities" específicas.
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
router.get("/entities/:ngsiID([\\w:-]+)/components", async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID);
  try {
    // ngsiID
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }
    console.log("aaaaa");
    // Check if is sensor
    const check = controlCheckIfIsEntity(ngsiID); 
    
    console.log("bbbb");
    if (check == "notEntity") {
      return res.status(404).send("No is a entity");
    }
    
    console.log("cccc");
    // Style
    const style = req.query.style || "info";
    if (!styles.includes(style)) {
      return res.status(400).send("Invalid style");
    }
    
    console.log("dddd");
    // No registred
    if (check == "notRegistred") {
      const responseCheck = await fetchDataWithId(ngsiID, "");
      console.log(responseCheck);
      checkType(responseCheck.data);
      const check = controlCheckIfIsEntity(ngsiID); 
      if (check == 'notEntity') {
        return res.status(404).send("No is a entity");
      }    
    }
    
    
    console.log("eeee1");
    // Fetch to context
    const urlQuery = `?q=controlledAsset==%22${ngsiID}%22${style === "info" ? "&options=keyValues" : ""}`;
    console.log("eeeee2");
    const response = await fetchDataComponents(urlQuery);
    
    console.log("fffff");
    // Response
    const remapFunction = getRemapFunction(style);
    const filteredData = remapFunction(response.data);
    res.json(filteredData);

  } catch (error) {
    handleAxiosError(error, ngsiID, res);
  }
});

module.exports = router;
