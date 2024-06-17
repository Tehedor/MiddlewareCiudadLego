
function simulateVelocityControl(velocityControl) {
    if (velocityControl < 60) {
        velocityControl += Math.floor(Math.random() * (10 - (-4) + 1)) + (-4);
    } else if (velocityControl > 100) {
        velocityControl += Math.floor(Math.random() * (4 - (-10) + 1)) + (-10);
    } else {
        velocityControl += Math.floor(Math.random() * (6 - (-6) + 1)) + (-6);
    }
    velocityControl = Math.max(0, Math.min(velocityControl, 128));
    return velocityControl;
}

module.exports = {   
    simulateVelocityControl
}
