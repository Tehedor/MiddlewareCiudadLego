
const checkIfIsSensor = (value) => {
  if (Array.isArray(value)) {
    return false;
  }
  if (typeof value.category === 'string') {
    return value.category === 'sensor';
  } else if (typeof value.category === 'object') {
    return value.category.type === 'Property' && value.category.value === 'sensor';
  }
  return false;
};

const checkIfIsLegoBuilding = (value) => {
  if (Array.isArray(value)) {
    return false;
  }
  if (typeof value.type === 'string' && value.type === 'LegoBuilding') {
    return true;
  }
  return false;
};

const checkIfIsActuator = (value) => {
  if (Array.isArray(value)) {
    return false;
  }
  if (typeof value.category === 'string') {
    return value.category === 'actuator';
  } else if (typeof value.category === 'object') {
    return value.category.type === 'Property' && value.category.value === 'actuator';
  }
  return false;
};

const checkIfIsLegoCity = (value) => {

  if (Array.isArray(value)) {
    return false;
  }
  if (typeof value.type === 'string' && value.type === 'Building') {
    return true;
  }
  return false;
};

const checkIfIsCamera = (value) => {
  if (Array.isArray(value)) {
    return false;
  }
  if (typeof value.type === 'string' && value.type === 'Camera') {
    return true;
  }
  return false;
}

module.exports = {
  checkIfIsSensor,
  checkIfIsLegoBuilding,
  checkIfIsActuator,
  checkIfIsLegoCity,
  checkIfIsCamera
};
