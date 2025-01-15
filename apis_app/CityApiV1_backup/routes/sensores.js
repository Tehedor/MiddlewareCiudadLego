var express = require('express');
var router = express.Router();

var sensoresController = require('../controllers/sensoresController.js');

/**
 * @swagger
 * /sensores:
 *   get:
 *     tags:
 *       - Sensores
 *     summary: Devuelve los datos de todos los sensores.
 *     responses:
 *       200:
 *         description: Los datos de todos los sensores.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensores'
 */
router.get('/sensores', sensoresController.getSensoresData);

/**
 * @swagger
 * /sensores/{numid}:
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
router.get('/sensores/:numid(\\d+)', sensoresController.getSensorData);


/**
 * @swagger
 * /sensores/{edificio}:
 *   get:
 *     tags:
 *       - Sensores
 *     summary: Devuelve los datos de los sensores filtrados por edificio.
 *     description: "Ejemplo de uso: /sensores/tiempo que devuelve los datos de los sensores para un edificio específico."
 *     parameters:
 *       - in: path
 *         name: edificio
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre del edificio para filtrar los datos de los sensores.
 *     responses:
 *       200:
 *         description: Los datos de los sensores filtrados por edificio, incluyendo temperatura y humedad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temperatura:
 *                   $ref: '#/components/schemas/Temperatura'
 *                 humedad:
 *                   $ref: '#/components/schemas/Humedad'
 *       400:
 *         description: Solicitud incorrecta, posiblemente debido a un formato de edificio inválido.
 *       404:
 *         description: Edificio no encontrado o sin sensores disponibles.
 */
router.get('/sensores/:edificio', sensoresController.getSensorData);

module.exports = router;