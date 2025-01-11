const fs = require('fs');
const path = require('path');
const controlJSONPath = path.join(__dirname, 'control.json');

let relationSubs = process.env.INI_STATE || "real" //real;


const content = {
    initial_state: relationSubs,
};

const type1 = {
    "initial_state": "real",
};

const type2 = {
    "initial_state": "simulator",
};

const checkIfJSONWellFormed = () => {
    if (!checkIfJSONExists()) {
        console.log('control.json file does not exist');
        return false;
    }
    console.log('control.json file exists');
    const data = fs.readFileSync(controlJSONPath, 'utf8');
    const jsonData = JSON.parse(data);
    if (JSON.stringify(jsonData) === JSON.stringify(type1) || JSON.stringify(jsonData) === JSON.stringify(type2)) {
        console.log('control.json file is well-formed');
        return true;
    } else {
        console.log('control.json file is not well-formed');
        createJSON();
        return false;
    }
};

const checkIfJSONExists = () => {
    if (!fs.existsSync(controlJSONPath) || fs.readFileSync(controlJSONPath, 'utf8').trim() === '') {
        return false;
    } else {
        return true;
    }
}

const createJSON = () => {
    fs.writeFileSync(controlJSONPath, JSON.stringify(content, null, 2), 'utf8');
    console.log('control.json file created');
}

module.exports = {createJSON, checkIfJSONExists, checkIfJSONWellFormed};