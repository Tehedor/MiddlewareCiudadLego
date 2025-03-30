const mongoose = require('mongoose');
const createError = require('http-errors');

const filterByOrden = async function (numidMongo, orden) {
    let order = orden === 'ascendente' ? 1 : -1;
    let result;
    let field = "notifiedAt";

    try {
        // Crear el modelo dinámicamente utilizando la variable numidMongo
        const Sensores = mongoose.models[numidMongo] || mongoose.model(numidMongo, new mongoose.Schema({}, { strict: false }), numidMongo);

        // Realizar la agregación para ordenar los datos
        result = await Sensores.aggregate([
            { $unwind: "$data" },
            { $sort: { [`data.${field}.value`]: order } }
        ]);

        if (result.length === 0) {
            throw createError(404, `No se encontraron datos en la colección ${numidMongo}`);
        }
    } catch (err) {
        throw createError(500, `Error al obtener datos de la colección ${numidMongo}: ${err.message}`);
    }

    return result;
};

module.exports = {
    filterByOrden
};