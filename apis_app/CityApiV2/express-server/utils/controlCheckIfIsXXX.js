const { 
  checkIfIsSensor, 
  checkIfIsLegoBuilding, 
  checkIfIsActuator, 
  checkIfIsLegoCity, 
  checkIfIsCamera 
} = require("./checkIfIsXXX");

let cities = new Set();
let buildings = new Set();
let actuators = new Set();
let sensors = new Set();
let cameras = new Set();

let blackList = new Set();

let sensorDict = {};
let actuatorDict = {};

const printSets = () => {
  console.log("Cities:", Array.from(cities));
  console.log("Buildings:", Array.from(buildings));
  console.log("Actuators:", Array.from(actuators));
  console.log("Sensors:", Array.from(sensors));
  console.log("Cameras:", Array.from(cameras));
  console.log("BlackList:", Array.from(blackList));
  console.log("Sensor Dictionary:", sensorDict);
  console.log("Actuator Dictionary:", actuatorDict);
};

const checkType = (entity) => {
  if (!entity) return; 
  
  const entityId = entity.id;
  const entityType = entity.type;
  console.log("Checking type of:", entityId);

  if (checkIfIsSensor(entity)) {
    sensors.add(entityId);
    sensorDict[entityId] = entityType;
    return;
  }

  if (checkIfIsActuator(entity)) {
    actuators.add(entityId);
    actuatorDict[entityId] = entityType;
    return;
  }

  if (checkIfIsCamera(entity)) {
    cameras.add(entityId);
    return;
  }

  if (checkIfIsLegoBuilding(entity)) {
    buildings.add(entityId);
    return;
  }

  if (checkIfIsLegoCity(entity)) {
    cities.add(entityId);
    return;
  }

  blackList.add(entityId);
};

const sendToBlackList = (entityId) => {
  blackList.add(entityId);
}

const controlCheckIfIsSensor = (entity) => {
  printSets();

  if (sensors.has(entity)) return "isSensor";
  if (blackList.has(entity) || cities.has(entity) || buildings.has(entity) ||  actuators.has(entity) || cameras.has(entity)) return "notSensor";

  return "notRegistred";
};

const controlCheckIfIsActuator = (entity) => {
  printSets();
  if (actuators.has(entity)) return "isActuator";
  if (blackList.has(entity) || cities.has(entity) || buildings.has(entity) || sensors.has(entity) || cameras.has(entity)) return "notActuator";

  return "notRegistred";
};

const controlCheckIfIsCamera = (entity) => {
  if (cameras.has(entity)) return "isCamera";
  if (blackList.has(entity) || cities.has(entity) || buildings.has(entity) ||  actuators.has(entity) || sensors.has(entity) ) return "notCamera";

  return "notRegistred";
};

const controlCheckIfIsLegoBuilding = (entity) => {
  printSets();
  if (buildings.has(entity)) return "isBuilding";
  if (blackList.has(entity) || cities.has(entity) || actuators.has(entity) || sensors.has(entity) || cameras.has(entity)) return "notBuilding";

  return "notRegistred";
};

const controlCheckIfIsLegoCity = (entity) => {
  printSets();

  if (cities.has(entity)) return "isCity";
  if (blackList.has(entity) || buildings.has(entity) ||  actuators.has(entity) || sensors.has(entity) || cameras.has(entity)) return "notCity";

  return "notRegistred";
};

const controlCheckIfIsEntity = (entity) => {
  if (cities.has(entity) || buildings.has(entity) || actuators.has(entity) || sensors.has(entity) || cameras.has(entity)) {
    return "isEntity";
  }
  if (blackList.has(entity)) {
    return "notEntity";
  }

  return "notRegistred";
};


// Reiniciar la lista negra cada 5 minutos
setInterval(() => {
  blackList.clear();
  console.log("BlackList cleared");
}, 5 * 60 * 1000); // 5 minutos en milisegundos

module.exports = {
  checkType,
  sendToBlackList,
  controlCheckIfIsSensor,
  controlCheckIfIsActuator,
  controlCheckIfIsCamera,
  controlCheckIfIsLegoBuilding,
  controlCheckIfIsLegoCity,
  controlCheckIfIsEntity,
  sensorDict,
  actuatorDict
};