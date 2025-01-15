var express = require('express');
var router = express.Router();

var temperaturaController = require('../controllers/tempController.js');
// var temperaturaController = require('../../controllers/tempController.js');

/**
 * @swagger
 * /sensores/{numid}/temperatura:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve las temperaturas registradas.
 *     description: "Ejemplo de uso: /sensores/1/temperatura"
 *     parameters:
 *       - in: path
 *         name: numid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador numérico del sensor.
 *     responses:
 *       200:
 *         description: La temperatura de la ciudad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temperatura'
 */
router.get('/sensores/:numid(\\d+)/temperatura', temperaturaController.getTemperatura);

module.exports = router;