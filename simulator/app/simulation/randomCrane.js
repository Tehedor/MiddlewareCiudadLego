function simulateDistance(distance) {
    let rand_num = Math.floor(Math.random() * 101);
    if (rand_num >= 50 && rand_num < 85) {
        if (distance > 150) {
            distance += Math.floor(Math.random() * 3) + 1;
        } else {
            distance += Math.floor(Math.random() * 10) + 1;
        }
    } else if (rand_num >= 85) {
        if (distance < 50) {
            distance -= Math.floor(Math.random() * 3) + 1;
        } else {
            distance -= Math.floor(Math.random() * 10) + 1;
        }
    }

    // Ensure distance is within the range 0-200
    distance = Math.max(0, Math.min(distance, 200));

    return distance;
}


module.exports = {   
    simulateDistance,
}
