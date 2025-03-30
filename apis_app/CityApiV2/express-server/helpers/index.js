const tempController = require('../controllers/tempController');
const humController = require('../controllers/humController');

exports.getCollection = async function(collectionName, sensor_id, queryParams) {
    let result;
    switch (collectionName) {
        case 'sth_urn_ngsi-ld_TemperatureSensor_001':
                result = await tempController.getMinAndMaxTemp(sensor_id, parseFloat(queryParams.min), parseFloat(queryParams.max));
                break;
            
        case 'sth_urn_ngsi-ld_HumiditySensor_001':
                result = await humController.getMinAndMaxHum(sensor_id, parseFloat(queryParams.min), parseFloat(queryParams.max));
            break;
        default:
            throw new Error('Nombre de colección desconocido');
    }
    return result;
}
