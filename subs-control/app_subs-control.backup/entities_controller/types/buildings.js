// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// ####### ####### ####### ####### Room buildings 
// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######

const number = process.env.ENTITIES_ID || 1;

// const dataLegoCity = () => [
const dataBuildings = () => [
    {
        id: `urn:ngsi-ld:LegoCity:${number}`,
        type: "Building",
        category: {
            type: "Property",
            value: "construction"
        },
        address: {
            type: "Property",
            value: {
                addressLocality: "Madrid - Aravaca",
                postalCode: "28040",
                streetAddress: "Av. Complutense, 30"
            }
        }
    }
];

const dataLegoBuilding = () => [
    {
        id: `urn:ngsi-ld:LegoStreetLight:${number}`,
        type: "LegoBuilding",
        category: {
            type: "Property",
            value: "legoSteetLight"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoCity:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:LegoTrain:${number}`,
        type: "LegoBuilding",
        category: {
            type: "Property",
            value: "legoTrain"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoCity:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:LegoRadar:${number}`,
        type: "LegoBuilding",
        category: {
            type: "Property",
            value: "legoRadar"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoCity:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:LegoRailoadSwitch:${number}`,
        type: "LegoBuilding",
        category: {
            type: "Property",
            value: "legoRailoadSwitch"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoCity:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:LegoToll:${number}`,
        type: "LegoBuilding",
        category: {
            type: "Property",
            value: "legoToll"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoCity:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:LegoCrane:${number}`,
        type: "LegoBuilding",
        category: {
            type: "Property",
            value: "legoCrane"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoCity:${number}`
        }
    },
    {
        id: `urn:ngsi-ld:LegoWheaterStation:${number}`,
        type: "LegoBuilding",
        category: {
            type: "Property",
            value: "legoWheaterStation"
        },
        controlledAsset: {
            type: "Relationship",
            object: `urn:ngsi-ld:LegoCity:${number}`
        }
    }
];



// const dataBuildings = () => [
//     ...dataLegoCity(),
//     ...dataLegoBuilding()
// ];
// console.log(dataBuildings());
// console.log(JSON.stringify(dataBuildings(), null, 2));
// {
//     id: 'urn:ngsi-ld:LegoCity:1',
//     type: 'Building',
//     category: { type: 'Property', value: 'construction' },
//     address: { type: 'Property', value: [Object] }
//   }

module.exports = dataBuildings;