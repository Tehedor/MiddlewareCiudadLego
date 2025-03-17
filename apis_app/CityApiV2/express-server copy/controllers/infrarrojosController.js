var Infrarrojos = require('../models/sensors/Infrarrojos.js');

//función para obtener todos los datos de los trenes
exports.getInfrarrojos = async function (req, res, next) {
  try {
      // Asumiendo que el numid se pasa como un parámetro de ruta
      const numid = parseInt(req.params.numid); // Obtener numid de los parámetros de ruta

      // Verificar si numid es 8
      if (numid !== 8) {
          return res.status(400).send({ error: 'numid incorrecto, debe ser 8 para infrarrojos.' });
      }

      // Obtener los datos de infrarrojos
      var infrarrojos = await Infrarrojos.find({});
      console.log(infrarrojos); 
      res.json(infrarrojos); 
  } catch (error) {
      console.error(error); 
      next(error); 
  }
};

