var express = require('express');
var router = express.Router();

const formatNgsiID = require("../utils/formatNgsiID");

const  {
  checkType,
  controlCheckIfIsSensor,
  controlCheckIfIsActuator,
  controlCheckIfIsCamera,
} = require("../utils/controlCheckIfIsXXX")


const { 
  fetchDataWithId,
  handleAxiosError, 

} = require("../utils/requestUtils");

const EnvConfig = require('../../utils/env.config');
const {mode_container} = EnvConfig();



/**
 * @swagger
 * /continuo/{numid}:
 *   get:
 *     tags:
 *       - Continuo
 *     summary: Renderiza la página con información específica del sensor o camara basada en numid.
 *     description: "Esta ruta recibe un numid como parámetro de ruta y lo utiliza para renderizar una página específica con información relacionada al sensor correspondiente."
 *     parameters:
 *       - name: numid
 *         in: path
 *         description: Identificador numérico del sensor.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición. También se puede añadir en body (apiKey) o en headers (['x-api-key']).
 *     responses:
 *       200:
 *         description: Página renderizada correctamente con la información del sensor.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               description: HTML de la página renderizada.
 *       400:
 *         description: Solicitud incorrecta, posiblemente debido a un formato de numid inválido.
 *       404:
 *         description: Sensor no encontrado con el numid proporcionado.
 */
router.get('/continuo/:ngsiID([\\w:-]+)', async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);

  try {
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }
    let checkSensor = controlCheckIfIsSensor(ngsiID);
    let checkActuator = controlCheckIfIsActuator(ngsiID);
    if (checkSensor == "notSensor" && checkActuator == "notActuator") {
      return res.status(404).send("No is a Sensor or Actuator");
    }
    
    const response = await fetchDataWithId(ngsiID, "");
  
    if (checkSensor == "notRegistred" || checkActuator == "notRegistred") {
      checkType(response.data);
      checkSensor = controlCheckIfIsSensor(ngsiID);
      checkActuator = controlCheckIfIsActuator(ngsiID);
      if (checkSensor == "notSensor" && checkActuator == "notActuator") {
        return res.send(`<html><head><title>Continuo</title></head><body><h1>No es ni Sensor ni Actuador</h1></body></html>`);
      } 
    }
    
    const apiKey = req.query.apiKey;
    const style = 'value'; // Asumiendo que 'style' es un parámetro de consulta opcional
    
    const deviceType = checkSensor == "isSensor" ? "sensors" : checkActuator == "isActuator" ? "actuators" : null;
    
    if (!ngsiID || !style || !apiKey || !deviceType) {
      return res.status(400).send('Missing required parameters');
    }

    res.render('continuo', { ngsiID, style, apiKey, deviceType, mode_container });
    
  } catch (error) {
    res.send(`<html><head><title>Continuo</title></head><body><h1>No es ni Sensor ni Actuador, o dato mal metido</h1></body></html>`);
  }
});


/**
 * @swagger
 * /continuo/camera/{numid}:
 *   get:
 *     tags:
 *       - Continuo
 *     summary: Renderiza la página con información específica del Camera basada en numid.
 *     description: "Esta ruta recibe un numid como parámetro de ruta y lo utiliza para renderizar una página específica con información relacionada al sensor correspondiente."
 *     parameters:
 *       - name: numid
 *         in: path
 *         description: Identificador numérico del Camera.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: apiKey
 *         required: false
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición. También se puede añadir en body (apiKey) o en headers (['x-api-key']).
 *     responses:
 *       200:
 *         description: Página renderizada correctamente con la información del Camera.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               description: HTML de la página renderizada.
 *       400:
 *         description: Solicitud incorrecta, posiblemente debido a un formato de numid inválido.
 *       404:
 *         description: Camera no encontrado con el numid proporcionado.
 */
router.get('/continuo/camera/:ngsiID([\\w:-]+)', async (req, res) => {
  const ngsiID = formatNgsiID(req.params.ngsiID || req.query.ngsiID);

  try {
    if (!ngsiID) {
      return res.status(400).send("Invalid ngsiID format");
    }
    let check = controlCheckIfIsCamera(ngsiID);
    if (check == "notCamera" ) {
      return res.status(404).send("No is a Camera");
    }
    
    const response = await fetchDataWithId(ngsiID, "");
    
    if (check == "notRegistred" ) {
      checkType(response.data);
      let check = controlCheckIfIsCamera(ngsiID);
      if (check == "Camera" ) {
        return res.send(`<html><head><title>Continuo</title></head><body><h1>No es una Camara</h1></body></html>`);
      } 
    }
    
    const apiKey = req.query.apiKey;
    const style = 'value'; // Asumiendo que 'style' es un parámetro de consulta opcional
    
    const deviceType = "cameras";
    
    if (!ngsiID || !style || !apiKey || !deviceType) {
      return res.status(400).send('Missing required parameters');
    }

    res.render('continuoCamera', { ngsiID, style, apiKey, deviceType, mode_container });
    
  } catch (error) {
    res.send(`<html><head><title>Continuo</title></head><body><h1>No es una Camara, o dato mal metido</h1></body></html>`);
  }});

module.exports = router;