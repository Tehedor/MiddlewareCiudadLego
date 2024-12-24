var Humedad = require('../models/Humedad');

//función para obtener la temperatura de la zona norte
exports.getHumedad = async function (req, res, next) {
    try {
        const numid = parseInt(req.params.numid); // Asumiendo que numid se pasa como parámetro de ruta

        // Verificar si numid es 2
        if (numid !== 2) {
            return res.status(400).send({ error: 'numid incorrecto, debe ser 2 para humedad.' });
        }

        var humedad = await Humedad.find({});
        console.log(humedad);
        res.json(humedad);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
