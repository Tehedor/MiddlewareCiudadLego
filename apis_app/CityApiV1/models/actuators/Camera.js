// {
//     "id": "urn:ngsi-ld:Camera:001",
//     "type": "Camera",
//     "mediaURL": ⊖{
//         "type": "Property",
//         "value": "http://"
//     },
//     "on": ⊖{
//         "type": "Property",
//         "value": false
//     },
//     "startDataTime": ⊖{
//         "type": "Property",
//         "value": "2025-01-12T10:11:01.097Z"
//     }
// }

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Esquema de los datos de la cámara
const cameraSchema = new Schema({
  id: String,
  type: String,
  mediaURL: {
    type: {
      type: String,
      default: "Property"
    },
    value: String
  },
  on: {
    type: {
      type: String,
      default: "Property"
    },
    value: Boolean
  },
  startDataTime: {
    type: {
      type: String,
      default: "Property"
    },
    value: Date
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Camera', cameraSchema, 'sth_urn_ngsi-ld_Camera_001');