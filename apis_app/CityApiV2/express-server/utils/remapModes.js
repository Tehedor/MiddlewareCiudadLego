// const remapDataModeID = (data) => {
const remapDataModeRelations = (data) => {
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


const sensorValueProperties = {
  'https://uri.fiware.org/ns/data-models#TemperatureSensor': 'https://w3id.org/saref#temperature',
  'https://uri.fiware.org/ns/data-models#HumiditySensor': 'https://w3id.org/saref#Humidity',
  'https://uri.fiware.org/ns/data-models#Servmotor': 'https://uri.fiware.org/ns/data-models#stateMotor',
  'https://uri.etsi.org/ngsi-ld/default-context/UltrasoundSensor': 'https://uri.fiware.org/ns/data-models#distance',
  'https://uri.fiware.org/ns/data-models#PhotoresistorSensor': 'https://uri.etsi.org/ngsi-ld/default-context/light',
  'https://uri.fiware.org/ns/data-models#PirSensor': 'https://w3id.org/saref#Occupancy',
  'https://uri.fiware.org/ns/data-models#PotentiometerSensor': 'https://w3id.org/saref#LevelControlFunction',
  'https://uri.fiware.org/ns/data-models#InfraredSensor': 'https://w3id.org/saref#Occupancy',
  'https://uri.fiware.org/ns/data-models#SwitchSensor': 'https://w3id.org/saref#OnOffState',
  'https://uri.fiware.org/ns/data-models#RfidSensor': 'https://schema.org/leiCode',
  'https://uri.fiware.org/ns/data-models#LedDetection': 'https://uri.fiware.org/ns/data-models#stateLed',
  'https://uri.fiware.org/ns/data-models#Light': 'https://uri.fiware.org/ns/data-models#stateLight',
  'https://uri.fiware.org/ns/data-models#EngineDC': 'https://uri.fiware.org/ns/data-models#velocityEngine',
  'https://uri.fiware.org/ns/data-models#Camera': 'https://uri.fiware.org/ns/data-models#on'
};
const remapDataModeValue = (data) => {
  const extractValueAndUnitCode = (item) => {
    const newItem = {};
    newItem.id = item.id.replace(/urn:ngsi-ld:|:/g, "");
    for (const key in item) {
      if (item[key].type === "Property" && key !== "id" && key !== "type" && key !== "category" && key !== "controlledAsset") {
        newItem.value = item[key].value;
        newItem.unitCode = item[key].unitCode || "None";
      }
    }
    return newItem;
  };

  if (Array.isArray(data)) {
    return data.map((item) => extractValueAndUnitCode(item));
  } else {
    return extractValueAndUnitCode(data);
  }
};

const remapDataModeValueCamera = (data) => {
  const extractValueAndUnitCode = (item) => {
    const newItem = {};
    newItem.id = item.id.replace(/urn:ngsi-ld:|:/g, "");
    console.log(item);
    for (const key in item) {
      if (item[key].type === "Property" && key !== "id" && key !== "type" && key !== "category" && key !== "controlledAsset") {
        // newItem.value = item[key].value;
        // newItem.unitCode = item[key].unitCode || "None";
      }
      if (key === "mediaURL" || key === "startDataTime") {
        newItem[key] = item[key].value;
      }
    }
    return newItem;
  };

  if (Array.isArray(data)) {
    return data.map((item) => extractValueAndUnitCode(item));
  } else {
    return extractValueAndUnitCode(data);
  }
};


module.exports = {
  // remapDataModeID,
  remapDataModeRelations,
  remapDataModeInfo,
  remapDataModeDetails,
  remapDataModeValue,
  remapDataModeValueCamera,
};
