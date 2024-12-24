//models/Infrarrojos.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos del infrarrojo
const infrarrojoSchema = new Schema({
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
        presence: {
          type: {
            type: String,
            default: "Property"
          },
          value: String
        }
      }
  }]
}, {
  versionKey: false
});
  
module.exports = mongoose.model('Infrarrojos', infrarrojoSchema, 'sth_urn_ngsi-ld_InfraredSensor_001');