//models/Sensores.js
const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  numid: String,
  name: String,
  collectionName: String,
  allowed_params: Array,
  exampleQueryDateRange: String,
  visible: String,
}, { collection: 'sensores' });

module.exports = mongoose.model('Sensores', sensorSchema);