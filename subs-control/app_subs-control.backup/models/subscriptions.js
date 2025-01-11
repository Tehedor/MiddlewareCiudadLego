const mongoose = require('mongoose');

const { Schema } = mongoose;


const EntitySubsSchema = new Schema({
    _id: String,
    description: String,
    entities: Object,
    conditions: [String],
    createdAt: Number,
    modifiedAt: Number,
    throttling: Number,
    expression: {
        geometry: String,
        coords: String,
        georel: String,
        geoproperty: String,
        q: String,
        mq: String
    },
    attrs: [String],
    format: String,
    reference: String,
    mimeType: String,
    headers: {
        'fiware-service': String
    },
    status: String,
    custom: Boolean,
    servicePath: String,
    blacklist: Boolean,
    ldContext: String,
    count: Number,
    lastFailure: Number,
    lastNotification: Number,
    timesFailed: Number
});
// const EntitySubsSchema = new Schema({
//     _id: String,
//     description: String,
//     entities: [{
//         id: String,
//         type: String,
//         isPattern: String,
//         isTypePattern: Boolean
//     }],
//     conditions: [String],
//     createdAt: Number,
//     modifiedAt: Number,
//     throttling: Number,
//     expression: {
//         geometry: String,
//         coords: String,
//         georel: String,
//         geoproperty: String,
//         q: String,
//         mq: String
//     },
//     attrs: [String],
//     format: String,
//     reference: String,
//     mimeType: String,
//     headers: {
//         'fiware-service': String
//     },
//     status: String,
//     custom: Boolean,
//     servicePath: String,
//     blacklist: Boolean,
//     ldContext: String,
//     count: Number,
//     lastFailure: Number,
//     lastNotification: Number,
//     timesFailed: Number
// });


const EntitySubs = mongoose.model('EntitySubs', EntitySubsSchema, 'csubs');


module.exports = EntitySubs;