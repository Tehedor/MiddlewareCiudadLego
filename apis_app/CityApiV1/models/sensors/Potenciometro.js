//models/Potenciometro.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos del potenciómetro
const potenciometroSchema = new Schema({
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
        velocityControl: {
          type: {
            type: String,
            default: "Property"
          },
          value: Number
        }
      }
  }]
}, {
  versionKey: false
});
  
module.exports = mongoose.model('Potenciometro', potenciometroSchema, 'sth_urn_ngsi-ld_PotentiometerSensor_001');