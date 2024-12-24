var Temperatura = require('../models/Temperatura.js')

//función para obtener la temperatura de la zona norte
exports.getTemperatura = async function (req, res, next) {
  try {
    const numid = parseInt(req.params.numid); // Asegúrate de usar req.params.numid para extraer el numid

    // Verificar si numid es 8
    if (numid !== 1) {
      return res.status(400).send({ error: 'numid incorrecto, debe ser 1 para temperatura.' });
    }

    // Si numid es 8, procede con la lógica para buscar y responder con los datos de temperatura
    var temperaturas = await Temperatura.find({});
    console.log(temperaturas); 
    res.json(temperaturas); 
  } catch (error) {
    console.error(error); 
    next(error); 
  }
};





