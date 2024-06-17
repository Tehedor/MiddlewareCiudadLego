const Entity = require('../models/entidades');

// {
//     "_id": {
//       "id": "urn:ngsi-ld:Camera:002",
//       "type": "https://uri.fiware.org/ns/data-models#Camera",
//       "servicePath": "/"
//     },
//     "attrNames": [
//       "https://uri.fiware.org/ns/data-models#mediaURL",
//       "https://uri.fiware.org/ns/data-models#on",
//       "https://uri.etsi.org/ngsi-ld/default-context/startDataTime",
//       "https://uri.fiware.org/ns/data-models#controlledAsset"
//     ],
//     "attrs": {
//       "https://uri=fiware=org/ns/data-models#mediaURL": {
//         "type": "Property",
//         "creDate": 1718486265.894161,
//         "modDate": 1718486265.894161,
//         "value": "http://",
//         "mdNames": []
//       },
//       "https://uri=fiware=org/ns/data-models#on": {
//         "type": "Property",
//         "creDate": 1718486265.894161,
//         "modDate": 1718486265.894161,
//         "value": "false",
//         "mdNames": []
//       },
//       "https://uri=etsi=org/ngsi-ld/default-context/startDataTime": {
//         "type": "Property",
//         "creDate": 1718486265.894161,
//         "modDate": 1718486265.894161,
//         "value": "2021-06-01T00:00:00Z",
//         "mdNames": []
//       },
//       "https://uri=fiware=org/ns/data-models#controlledAsset": {
//         "type": "Relationship",
//         "creDate": 1718486265.894161,
//         "modDate": 1718486265.894161,
//         "value": "urn:ngsi-ld:LegoRadar:002",
//         "mdNames": []
//       }
//     },
//     "creDate": 1718486265.894161,
//     "modDate": 1718486265.894161,
//     "lastCorrelator": ""
//   }

async function getCamera() {
    try {
        const entities = await Entity.find({ '_id.id' : `urn:ngsi-ld:Camera:${process.env.DEVICE_NUMBER || '002'}` }, '_id.id _id.type attrs creDate modDate');
        // console.log(entities);
        return entities.map(entity => {
            const id = entity._id.id;
            const type = entity._id.type;

            // const type = rawType.split('#')[1];
            const attrKeys = Object.keys(entity.attrs);
            // const value = entity.attrs[attrKeys[1]].value;
            
            const mediaURL = entity.attrs[attrKeys[0]].value;
            const on = entity.attrs[attrKeys[1]].value;
            const startDataTime =  new Date(entity.attrs[attrKeys[2]].value * 1000);
            const creDate = new Date(entity.creDate * 1000);
            const modDate = new Date(entity.modDate * 1000);

            return { id, type, mediaURL, on , startDataTime , creDate, modDate };
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCamera,
};