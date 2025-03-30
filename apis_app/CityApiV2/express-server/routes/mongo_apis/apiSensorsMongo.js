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

var sensoresController = require('../controllers/sensoresController.js');


/**
 * @swagger
 * /sensors/data/{numid}:
 *   get:
 *     tags:
 *       - Sensores
 *     summary: Obtiene datos del sensor según los parámetros proporcionados.
 *     description: >
 *       Este endpoint tiene varios usos principales:
 *       1. Si se hace una solicitud GET sin proporcionar ningún parámetro de consulta, se obtendrá la información del sensor con el numid especificado.
 *       2. Si se hace una solicitud GET proporcionando los parámetros de consulta 'desde' y 'hasta', se obtendrán los datos de temperatura del sensor dentro del rango de fechas especificado.
 *       3. Si se hace una solicitud GET proporcionando el parámetro de consulta 'orden', se obtendrán los datos de temperatura del sensor ordenados según el criterio especificado.
 *       4. Si se hace una solicitud GET proporcionando los parámetros de consulta 'min' y 'max', se obtendrán los datos de temperatura del sensor dentro del rango especificado.
 *       5. Si se hace una solicitud GET proporcionando el parámetro de consulta 'estado', se obtendrán los datos del sensor de infrarrojos con el estado especificado.
 *     parameters:
 *       - in: path
 *         name: numid
 *         required: true
 *         schema:
 *           type: integer
 *         description: El numid del sensor.
 *       - in: query
 *         name: desde
 *         schema:
 *           type: string
 *           format: date-time
 *         description: La fecha de inicio para filtrar los datos de temperatura del sensor.
 *       - in: query
 *         name: hasta
 *         schema:
 *           type: string
 *           format: date-time
 *         description: La fecha de fin para filtrar los datos de temperatura del sensor.
 *       - in: query
 *         name: orden
 *         schema:
 *           type: string
 *         description: El criterio de ordenación de los datos de temperatura del sensor. Puede ser 'ascendente' o 'descendente'.
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         description: El valor mínimo para filtrar los datos de temperatura del sensor.
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         description: El valor máximo para filtrar los datos de temperatura del sensor.
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: El estado para filtrar los datos del sensor de infrarrojos.
 *     responses:
 *       200:
 *         description: Los datos del sensor.
 *         content:
 *           application/json:
 *             oneOf:
 *               - $ref: '#/components/schemas/Sensores'
 *               - $ref: '#/components/schemas/Temperatura'
 *               - $ref: '#/components/schemas/Infrarrojos'
 *       400:
 *         description: Parámetros de consulta no válidos.
 *       404:
 *         description: Sensor no encontrado.
 */
router.get('/sensores/:ngsiID([\\w:-]+)', async (req, res) => {
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
    // sensoresController.getSensorData
    
});

    


module.exports = router;