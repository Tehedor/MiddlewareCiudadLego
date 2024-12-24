//models/LED.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos del LED
const ledSchema = new Schema({
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
        stateLed: {
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
  
module.exports = mongoose.model('LED', ledSchema, 'sth_urn_ngsi-ld_LedDetection_001');