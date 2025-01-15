const remapDataModeID = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      return {
        id: item.id.replace(/urn:ngsi-ld:|:/g, ''),
        Relationship: item.controlledAsset && item.controlledAsset.object
          ? item.controlledAsset.object.replace(/urn:ngsi-ld:|:/g, '')
          : null
      };
    });
  } else {
    return {
      id: data.id.replace(/urn:ngsi-ld:|:/g, ''),
      Relationship: data.controlledAsset && data.controlledAsset.object
        ? data.controlledAsset.object.replace(/urn:ngsi-ld:|:/g, '')
        : null
    };
  }
};
// {
//     "id": "LegoStreetLight001",
//     "Relationship": "LegoCity001"
//   }

const remapDataModeInfo = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const { "@context": _, ...rest } = item; // Excluir @context
      const newItem = {... rest};
      newItem.id = newItem.id.replace(/urn:ngsi-ld:|:/g, "");
      if (item.controlledAsset) {
          newItem.controlledAsset = item.controlledAsset.replace(/urn:ngsi-ld:|:/g, '');
        }
        return newItem;
    });
} else {
    const { "@context": _, ...rest } = data; // Excluir @context
    const newItem = {...rest};
    newItem.id = newItem.id.replace(/urn:ngsi-ld:|:/g, "");
    if (data.controlledAsset) {
      newItem.controlledAsset = data.controlledAsset.replace(/urn:ngsi-ld:|:/g, '');
    }
    return newItem;
  }
};
// [
//   {
//     "id": "PirSensor001",
//     "type": "PirSensor",
//     "category": "sensor",
//     "presence": "HIGH",
//     "controlledAsset": "LegoStreetLight001"
//   },
//   {
//     "id": "PhotoresistorSensor001",
//     "type": "PhotoresistorSensor",
//     "category": "sensor",
//     "light": 90,
//     "controlledAsset": "LegoStreetLight001"
//   },


const remapDataModeDetails = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const { "@context": _, ...rest } = item; // Excluir @context
      const newItem = { ...rest };
      newItem.id = newItem.id.replace(/urn:ngsi-ld:|:/g, "");
      if (newItem.controlledAsset && newItem.controlledAsset.object) {
        newItem.controlledAsset.object = newItem.controlledAsset.object.replace(
          /urn:ngsi-ld:|:/g,
          ""
        );
      }
      return newItem;
    });
  } else {
    const { "@context": _, ...rest } = data; // Excluir @context
    const newItem = { ...rest };
    newItem.id = newItem.id.replace(/urn:ngsi-ld:|:/g, "");
    if (newItem.controlledAsset && newItem.controlledAsset.object) {
      newItem.controlledAsset.object = newItem.controlledAsset.object.replace(
        /urn:ngsi-ld:|:/g,
        ""
      );
    }
    return newItem;
  }
};
// [
//     {
//       "id": "PirSensor001",
//       "type": "PirSensor",
//       "category": {
//         "type": "Property",
//         "value": "sensor"
//       },
//       "presence": {
//         "type": "Property",
//         "value": "HIGH"
//       },
//       "controlledAsset": {
//         "type": "Relationship",
//         "object": "LegoStreetLight001"
//       }
//     },


module.exports = {
  remapDataModeID,
  remapDataModeInfo,
  remapDataModeDetails,
};
