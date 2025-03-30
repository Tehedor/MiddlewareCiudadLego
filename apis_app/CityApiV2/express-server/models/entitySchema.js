const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  id: String,
  type: String,
  subscriptionId: String,
  notifiedAt: Date,
  data: [{
    id: String,
    type: String,
    startDataTime: {
      type: String,
      value: String
    },
    on: {
      type: String,
      value: Boolean
    },
    mediaURL: {
      type: String,
      value: String
    },
    velocityEngine: {
      type: String,
      value: Number
    },
    humidity: {
      type: String,
      value: Number,
      unitCode: String
    },
    presence: {
      type: String,
      value: String
    },
    stateLed: {
      type: String,
      value: String
    },
    stateLight: {
      type: String,
      value: String
    },
    light: {
      type: String,
      value: Number
    },
    velocityControl: {
      type: String,
      value: Number
    },
    uiddcode: {
      type: String,
      value: String
    },
    temperature: {
      type: String,
      value: Number,
      unitCode: String
    },
    distance: {
      type: String,
      value: Number,
      unitCode: String
    }
  }]
});

module.exports = mongoose.model('Notification', notificationSchema);