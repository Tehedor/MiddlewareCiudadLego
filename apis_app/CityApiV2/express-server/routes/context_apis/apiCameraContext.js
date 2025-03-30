var express = require('express');
var router = express.Router();

const formatNgsiID = require("../../utils/formatNgsiID");

const { 
  getRemapFunctionCamera, 
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
 * /api/cameras:
 *   get:
 *     tags:
 *       - Cameras
 *     summary: Devuelve todas las "Cameras".
 *     description: Obtiene todas las entidades de tipo "Camera" desde el Context Broker.
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
 *         description: Una lista de todas las "Cameras".
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "Camera001"
 *                   type:
 *                     type: string
 *                     example: "Camera"
 *                   mediaURL:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: string
 *                         example: "http://"
 *                   on:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: boolean
 *                         example: false
 *                   startDataTime:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Property"
 *                       value:
 *                         type: string
 *                         example: "2025-03-09T04:10:49.653Z"
 *                   controlledAsset:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Relationship"
 *                       object:
 *                         type: string
 *                         example: "LegoRadar001"
 */
router.get("/cameras", async (req, res) => {
  try {

    // Style
      const style = req.query.style || "info";
      if (!styles.includes(style)) {
        return res.status(400).send("Invalid style");
      }
      
      // Fetch to context
      const urlQuery = `?type=Camera${style === "info" ? "&options=keyValues" : ""}`;
      const response = await fetchData(urlQuery);
      
      
      // Response
      const remapFunction = getRemapFunctionCamera(style);
      const filteredData = remapFunction(response.data);
      res.json(filteredData);

  } catch (error) {
    console.error("Error fetching cameras:", error);
    res.status(500).send("Error fetching cameras");
  }
});

/**
 * @swagger
 * /api/cameras/{ngsiID}:
 *   get:
 *     tags:
 *       - Cameras
 *     summary: Devuelve una "Camera" específica.
 *     description: Obtiene una entidad de tipo "Camera" desde el Context Broker usando su ngsiID.
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
 *         description: Identificador NGSI de la "Camera".
 *       - in: query
 *         name: style
 *         required: false
 *         schema:
 *           type: string
 *           enum: [info, relations, details, value]
 *         description: Tipo de formato de respuesta (normal por defecto).
 *     responses:
 *       200:
 *         description: Una "Camera" específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "Camera001"
 *                 type:
 *                   type: string
 *                   example: "Camera"
 *                 mediaURL:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: string
 *                       example: "http://"
 *                 on:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: boolean
 *                       example: false
 *                 startDataTime:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Property"
 *                     value:
 *                       type: string
 *                       example: "2025-03-09T04:10:49.653Z"
 *                 controlledAsset:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Relationship"
 *                     object:
 *                       type: string
 *                       example: "LegoRadar001"
 */
router.get("/cameras/:ngsiID([\\w:-]+)", async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);
  try {
    
    // ngsiID
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }

    // Check if is actuator
    const check = controlCheckIfIsCamera(ngsiID); 
    
    if (check == "notCamera") {
      return res.status(404).send("No is a camera");
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
      const check = controlCheckIfIsCamera(ngsiID); 
      if (check == 'notCamera') {
        return res.status(404).send("No is a camera");
      }    
    }

    // Response
    const remapFunction = getRemapFunctionCamera(style);
    const filteredData = remapFunction(response.data);
    res.json(filteredData);

  } catch (error) {
    handleAxiosError(error, ngsiID, res);
  }
});

module.exports = router;