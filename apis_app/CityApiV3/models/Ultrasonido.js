//models/Ultrasonido.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos del ultrasonido
const ultrasonidoSchema = new Schema({
  id: String,
  type: String,
  subscriptionId: String,
  notifiedAt: Date,
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
        distance: {
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
  
module.exports = mongoose.model('Ultrasonido', ultrasonidoSchema, 'sth_urn_ngsi-ld_UltrasoundSensor_001');