// models/MotorDC.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos del motor DC
const motorDCSchema = new Schema({
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
        velocityEngine: {
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
  
module.exports = mongoose.model('MotorDC', motorDCSchema, 'sth_urn_ngsi-ld_EngineDC_001');