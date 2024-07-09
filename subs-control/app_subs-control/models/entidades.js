const mongoose = require('mongoose');

const { Schema } = mongoose;


const EntitySchema = new Schema({
    _id: Object,
    attrNames: [String],
    attrs: Object,
    creDate: Number,
    modDate: Number,
    lastCorrelator: String
}); 


const Entity = mongoose.model('Entity', EntitySchema, 'entities');


module.exports = Entity;