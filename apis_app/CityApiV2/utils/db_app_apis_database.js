const EnvConfig = require ('./env.config');
const {db_host, db_user, db_password} = EnvConfig();

const { Sequelize } = require('sequelize');
const { execSync } = require('child_process');

const sequelize = new Sequelize('app_apis_database', db_user, db_password  , {
    host: db_host,
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        max: 1000 // Número máximo de intentos de reconexión
    },
    logging: false
});

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

syncDb();

module.exports = sequelize;

