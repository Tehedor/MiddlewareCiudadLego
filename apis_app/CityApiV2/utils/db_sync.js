const sequelize = require('./db_app_apis_database');
const { execSync } = require('child_process');

// const syncDb = async () => {
//     await sequelize.sync({ alter: true });
//     console.log("All user keys models were synchronized successfully.");
// };

const runMigrations = async () => {
    try {
        console.log('Running migrations...');
        execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
        console.log('Migrations completed successfully.');
    } catch (error) {
        console.error('Error running migrations:', error);
    }
};

const runSeeders = async () => {
    try {
        console.log('Running seeders...');
        execSync('npx sequelize-cli db:seed:all', { stdio: 'inherit' });
        console.log('Seeders completed successfully.');
    }
    catch (error) {
        console.error('Error running seeders:', error);
    }
};

const syncDb = async () => {
    await runMigrations(); 
    await runSeeders();
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
};

module.exports = syncDb;