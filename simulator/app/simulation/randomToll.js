// PirSensor
function simulateUIDD(uidd) {

    uidd = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);

    return uidd;
}


module.exports = {   
    simulateUIDD,
}
