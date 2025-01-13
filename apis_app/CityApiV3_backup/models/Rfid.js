//models/Rfid.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos del rfid
const rfidSchema = new Schema({
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
        uiddcode: {
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
  
module.exports = mongoose.model('Rfid', rfidSchema, 'sth_urn_ngsi-ld_RfidSensor_001');