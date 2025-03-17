// PirSensor
function simulatePresenceRadar(presence) {
    let rand_num = Math.floor(Math.random() * 101);

    if (presence === "LOW") {
        if (rand_num < 70) {
            presence = "LOW";
        } else {   
            presence = "HIGH";
        }
    } else {
        if (rand_num < 20) {
            presence = "HIGH";
        } else {
            presence = "LOW";            
        }
    }
    console.log(presence);
    return presence;
}


module.exports = {   
    simulatePresenceRadar,
}
