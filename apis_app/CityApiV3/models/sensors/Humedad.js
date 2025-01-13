//models/Humedad.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de la humedad
const humedadSchema = new Schema({
  id: String,
  type: String,
  subscriptionId: String,
  notifiedAt: String,
  data: [{
      Object: {
        id: String,
        type: String,
        category: {
          type: {
            type: String,
            default: "Property"
          },
          value: String
        },
        controlledAsset: {
          type: {
            type: String,
            default: "Relationship"
          },
          object: String
        },
        humidity: {
          type: {
            type: String,
            default: "Property"
          },
          value: Number,
          unitCode: String 
        }
      }
  }]
}, {
  versionKey: false
});
  
module.exports = mongoose.model('Humedad', humedadSchema, 'sth_urn_ngsi-ld_HumiditySensor_001');