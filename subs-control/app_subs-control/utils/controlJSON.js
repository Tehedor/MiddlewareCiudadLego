const fs = require('fs');
const path = require('path');
const controlJSONPath = path.join(__dirname, 'control.json');


// Simulation
const changeInicialState = (state) => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);
    if (controlJSON.initial_state !== state) {
        controlJSON.initial_state = state;
        fs.writeFileSync(controlJSONPath, JSON.stringify(controlJSON, null, 2), 'utf8');
        return true; 
    } else {
        return false; 
    }
};

const showState = () => {
    const fileContent = fs.readFileSync(controlJSONPath, 'utf8').trim();
    const controlJSON = JSON.parse(fileContent);
    return controlJSON.initial_state;
};

module.exports = {
    changeInicialState, showState, 
};

