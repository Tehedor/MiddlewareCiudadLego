var express = require('express');
var router = express.Router();


/**
 * @swagger
 * /continuo/sensores/{numid}:
 *   get:
 *     tags:
 *       - Continuo
 *     summary: Renderiza la página con información específica del sensor basada en numid.
 *     description: "Esta ruta recibe un numid como parámetro de ruta y lo utiliza para renderizar una página específica con información relacionada al sensor correspondiente."
 *     parameters:
 *       - name: numid
 *         in: path
 *         description: Identificador numérico del sensor.
 *         required: true
 *         schema:
 *           type: string
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
router.get('/continuo/sensores/:numid', (req, res) => {
  const numid = req.params.numid;
  // Pasar numid a la plantilla para usarlo en el script del cliente
  res.render('continuo', { numid });
});

module.exports = router;