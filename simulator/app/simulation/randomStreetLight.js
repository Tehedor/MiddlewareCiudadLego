// PirSensor
function simulatePresence(presence) {
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
    return presence;
}

// PhotoresistorSensor
function simulateIntensity(intensity) {
    let rand_num = Math.floor(Math.random() * 101);
    if (rand_num < 10) {
        intensity = intensity > 50 ? Math.floor(Math.random() * 11) : Math.floor(Math.random() * 21) + 80;
    }
    return intensity;
}

function simulateStreetLight(presence, intensity) {
    // simulatePresence(presence);
    // console.log("Presence: ", simulatePresence(presence));
    // simulateIntensity(intensity);
    // console.log("Intensity: ", simulateIntensity(intensity));

    return {
        presence: simulatePresence(presence),
        intensity: simulateIntensity(intensity)
    }
}

module.exports = {   
    simulateStreetLight,
    simulatePresence,
    simulateIntensity
}
