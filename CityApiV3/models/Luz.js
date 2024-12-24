//models/Luz.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de la luz
const luzSchema = new Schema({
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
        stateLight: {
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
  
module.exports = mongoose.model('Luz', luzSchema, 'sth_urn_ngsi-ld_Light_001');