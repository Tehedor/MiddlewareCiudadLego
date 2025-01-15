var express = require('express');
var router = express.Router();

var humController = require('../../controllers/humController.js');

/**
 * @swagger
 * /sensores/{numid}/humedad:
 *   get:
 *     tags:
 *       - Humedad
 *     summary: Devuelve las humedades registradas.
 *     description: "Ejemplo de uso: /sensores/2/humedad"
 *     parameters:
 *       - in: path
 *         name: numid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador numérico del sensor.
 *     responses:
 *       200:
 *         description: La humedad de la ciudad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Humedad'
 */
router.get('/sensores/:numid(\\d+)/humedad', humController.getHumedad);

module.exports = router;