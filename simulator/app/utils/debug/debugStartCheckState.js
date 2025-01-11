const startCheckState = require('../checkSimulationStatus');

const main = async () => {
    await startCheckState(false);
    console.log('Finished executing startCheckState');
};

main().catch(error => {
    console.error('Error executing startCheckState:', error);
});