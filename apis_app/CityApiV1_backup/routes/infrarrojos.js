var express = require('express');
var router = express.Router();

var infrarrojosController = require('../controllers/infrarrojosController.js');

/**
 * @swagger
 * /sensores/{numid}/infrarrojos:
 *   get:
 *     tags:
 *       - Raíl
 *     summary: Devuelve los datos registrados del conmutador del raíl.
 *     description: "Ejemplo de uso: /sensores/8/infrarrojos"
 *     parameters:
 *       - in: path
 *         name: numid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador numérico del sensor.
 *     responses:
 *       200:
 *         description: Informa si hay un tren pasando (HIGH) o no (LOW).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Infrarrojos'
 */
router.get('/sensores/:numid(\\d+)/infrarrojos', infrarrojosController.getInfrarrojos);

module.exports = router;