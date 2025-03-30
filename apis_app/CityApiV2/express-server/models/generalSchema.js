const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({
  type: { type: String, default: 'Property' },
  value: Schema.Types.Mixed,
  unitCode: { type: String, required: false } // Opcional, para unidades como Cº, etc.
}, { _id: false });

const entitySchema = new Schema({
  id: String,
  type: String,
  properties: { type: Map, of: propertySchema } // Mapa de propiedades
}, { _id: false });

const notificationSchema = new Schema({
  id: String,
  type: String,
  subscriptionId: String,
  notifiedAt: String,
  data: [Schema.Types.Mixed] // Array de entidades con estructura flexible
});

module.exports = notificationSchema;  // Exporta solo el esquema