function simulateState(state) {
    let randNum = Math.floor(Math.random() * 101);
    if (randNum < 10) {
        state = state === "ON" ? "OFF" : "ON";
    }
    return state;
}

module.exports = {   
    simulateState
}
