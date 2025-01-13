var Ultrasonido = require('../models/sensors/Ultrasonido.js');

exports.getUltrasonido = async function (req, res, next) {
    try {
        // Asumiendo que el numid se pasa como un parámetro de ruta
        const numid = parseInt(req.params.numid); // Obtener numid de los parámetros de ruta
  
        // Verificar si numid es 4
        if (numid !== 4) {
            return res.status(400).send({ error: 'numid incorrecto, debe ser 4 para infrarrojos.' });
        }
  
        // Obtener los datos de infrarrojos
        var ultrasonidos = await Ultrasonido.find({});
        console.log(ultrasonidos); 
        res.json(ultrasonidos); 
    } catch (error) {
        console.error(error); 
        next(error); 
    }
  };


// Función para filtrar por mayor que
exports.getMayorque = async function (mayorque) {
    return ultrasonidoSchema.find({ "ultasonic.value": { $gt: mayorque } });
}

// Función para filtrar por menor que
exports.getMenorque = async function (menorque) {
    return ultrasonidoSchema.find({ "ultasonic.value": { $lt: menorque } });
}

// Función para filtrar por igual que
exports.getIgualque = async function (igualque) {
    return ultrasonidoSchema.find({ "ultasonic.value": igualque });
}