var express = require('express');
var router = express.Router();

var ultrasonidoController = require('../controllers/ultrasonidoController.js');

/**
 * @swagger
 * /sensores/{numid}/ultrasonido:
 *   get:
 *     tags:
 *       - Ultrasonido
 *     summary: Devuelve los datos del ultrasonido.
 *     description: "Ejemplo de uso: /sensores/4/ultrasonido"
 *     parameters:
 *       - in: path
 *         name: numid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador numérico del sensor.
 *     responses:
 *       200:
 *         description: Los datos del ultrasonido, distancia a los objetos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ultrasonido'
 */
router.get('/sensores/:numid(\\d+)/ultrasonido', ultrasonidoController.getUltrasonido);

module.exports = router;