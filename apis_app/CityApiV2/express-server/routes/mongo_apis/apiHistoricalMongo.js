var express = require('express');
var router = express.Router();

const {getSensorData} = require('../../controllers/sensoresController');
const {getActuatorData} = require('../../controllers/actuatorsController');
const {getCameraData} = require('../../controllers/cameraController');


/**
 * @swagger
 * /api/sensors/data/{ngsiID}:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Devuelve todos los datos históricos de un "Sensor" específico.
 *     description: |
 *       Obtiene una entidad de tipo "Sensor" desde la base de datos de MongoDb a partir de su ngsiID.
 *       ### Parámetros compatibles por tipo de sensor:
 *       | Tipo de Sensor            | Parámetros compatibles                     |
 *       |---------------------------|--------------------------------------------|
 *       | **PirSensor**             | orden, cantidad, desde, hasta, estado      |
 *       | **InfraredSensor**        | orden, cantidad, desde, hasta, estado      |
 *       | **SwitchSensor**          | orden, cantidad, desde, hasta, estado      |
 *       | **PhotoresistorSensor**   | orden, cantidad, desde, hasta, min, max    |
 *       | **PotentiometerSensor**   | orden, cantidad, desde, hasta, min, max    |
 *       | **UltrasoundSensor**      | orden, cantidad, desde, hasta, min, max    |
 *       | **TemperatureSensor**     | orden, cantidad, desde, hasta, min, max    |
 *       | **HumiditySensor**        | orden, cantidad, desde, hasta, min, max    |
 *       | **RfidSensor**            | orden, cantidad, desde, hasta, id          |
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición. También se puede añadir en body (apiKey) o en headers (['x-api-key']).
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           Identificador NGSI del "Sensor". Debe ser un string alfanumérico con guiones o dos puntos.
 *       - in: query
 *         name: orden
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ascendente, descendente]
 *           default: descendente
 *         description: |
 *           Orden de los datos históricos.
 *           `ascendente` ordena por fecha de forma ascendente, `descendente` de forma descendente.
 *       - in: query
 *         name: cantidad
 *         required: false
 *         schema:
 *           type: number
 *         description: Máxima cantidad de datos históricos a mostrar, por defecto es 300.
 *       - in: query
 *         name: hasta
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: |
 *           Fecha de fin en formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).
 *           Ejemplo: 2025-03-30T01:24:32.726Z.
 *           Si no se especifica, se ajusta a la fecha actual.
 *       - in: query
 *         name: desde
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: |
 *           Fecha de inicio en formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).
 *           Ejemplo: 2025-03-30T01:24:32.726Z.
 *       - in: query
 *         name: max
 *         required: false
 *         schema:
 *           type: number
 *         description: Valor máximo para filtrar los datos.
 *       - in: query
 *         name: min
 *         required: false
 *         schema:
 *           type: number
 *         description: Valor mínimo para filtrar los datos.
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: Identificador único del "Sensor".
 *       - in: query
 *         name: estado
 *         required: false
 *         schema:
 *           type: string
 *         description: Estado actual del "Sensor".
 *     responses:
 *       200:
 *         description: Datos históricos del "Sensor" específico.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "Sensor001"
 *                 type:
 *                   type: string
 *                   example: "TemperatureSensor"
 *                 readings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-04T12:00:00Z"
 *                       value:
 *                         type: number
 *                         example: 23.5
 */
router.get('/sensors/data/:ngsiID([\\w:-]+)', async (req, res) => {
        getSensorData(req, res);
}); 

/**
 * @swagger
 * /api/actuators/data/{ngsiID}:
 *   get:
 *     tags:
 *       - Actuators
 *     summary: Devuelve todos los datos históricos de un "Actuador" específico.
 *     description: |
 *       Obtiene una entidad de tipo "Actuador" desde la base de datos de MongoDb a partir de su ngsiID.
 *       ### Parámetros compatibles por tipo de actuador:
 *       | Tipo de Actuador          | Parámetros compatibles                     |
 *       |---------------------------|--------------------------------------------|
 *       | **LedDetection**          | orden, cantidad, desde, hasta, estado      |
 *       | **Light**                 | orden, cantidad, desde, hasta, estado      |
 *       | **Servmotor**             | orden, cantidad, desde, hasta, estado      |
 *       | **EngineDC**              | orden, cantidad, desde, hasta, min, max    |
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición. También se puede añadir en body (apiKey) o en headers (['x-api-key']).
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           Identificador NGSI del "Actuador". Debe ser un string alfanumérico con guiones o dos puntos.
 *       - in: query
 *         name: orden
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ascendente, descendente]
 *           default: descendente
 *         description: |
 *           Orden de los datos históricos.
 *           `ascendente` ordena por fecha de forma ascendente, `descendente` de forma descendente.
 *       - in: query
 *         name: cantidad
 *         required: false
 *         schema:
 *           type: number
 *         description: Máxima cantidad de datos históricos a mostrar, por defecto es 300.
 *       - in: query
 *         name: hasta
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: |
 *           Fecha de fin en formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).
 *           Ejemplo: 2025-03-30T01:24:32.726Z.
 *           Si no se especifica, se ajusta a la fecha actual.
 *       - in: query
 *         name: desde
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: |
 *           Fecha de inicio en formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).
 *           Ejemplo: 2025-03-30T01:24:32.726Z.
 *       - in: query
 *         name: max
 *         required: false
 *         schema:
 *           type: number
 *         description: Valor máximo para filtrar los datos.
 *       - in: query
 *         name: min
 *         required: false
 *         schema:
 *           type: number
 *         description: Valor mínimo para filtrar los datos.
 *       - in: query
 *         name: estado
 *         required: false
 *         schema:
 *           type: string
 *         description: Estado actual del "Actuador".
 *     responses:
 *       200:
 *         description: Datos históricos del "Actuador" específico.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "Actuator001"
 *                 type:
 *                   type: string
 *                   example: "LedDetection"
 *                 readings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-04T12:00:00Z"
 *                       value:
 *                         type: number
 *                         example: 1
 */
router.get('/actuators/data/:ngsiID([\\w:-]+)', async (req, res) => {
  getActuatorData(req, res);
}); 

/**
 * @swagger
 * /api/cameras/data/{ngsiID}:
 *   get:
 *     tags:
 *       - Cameras
 *     summary: Devuelve todos los datos históricos de una "Cámara" específica.
 *     description: |
 *       Obtiene una entidad de tipo "Cámara" desde la base de datos de MongoDb a partir de su ngsiID.
 *       ### Parámetros compatibles:
 *       | Tipo de Cámara            | Parámetros compatibles                     |
 *       |---------------------------|--------------------------------------------|
 *       | **Camera**                | orden, cantidad, desde, hasta, estado      |
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         description: API Key para autenticar la petición. También se puede añadir en body (apiKey) o en headers (['x-api-key']).
 *       - in: path
 *         name: ngsiID
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           Identificador NGSI de la "Cámara". Debe ser un string alfanumérico con guiones o dos puntos.
 *       - in: query
 *         name: orden
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ascendente, descendente]
 *           default: descendente
 *         description: |
 *           Orden de los datos históricos.
 *           `ascendente` ordena por fecha de forma ascendente, `descendente` de forma descendente.
 *       - in: query
 *         name: cantidad
 *         required: false
 *         schema:
 *           type: number
 *         description: Máxima cantidad de datos históricos a mostrar, por defecto es 300.
 *       - in: query
 *         name: hasta
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: |
 *           Fecha de fin en formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).
 *           Ejemplo: 2025-03-30T01:24:32.726Z.
 *           Si no se especifica, se ajusta a la fecha actual.
 *       - in: query
 *         name: desde
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: |
 *           Fecha de inicio en formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).
 *           Ejemplo: 2025-03-30T01:24:32.726Z.
 *       - in: query
 *         name: estado
 *         required: false
 *         schema:
 *           type: string
 *         description: Estado actual de la "Cámara".
 *     responses:
 *       200:
 *         description: Datos históricos de la "Cámara" específica.
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
 *                 readings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-04T12:00:00Z"
 *                       value:
 *                         type: boolean
 *                         example: true
 */
router.get('/cameras/data/:ngsiID([\\w:-]+)', async (req, res) => {
  getCameraData(req, res);
}); 

module.exports = router;