const EnvConfig = require ('./env.config');
const {db_host, db_user, db_password} = EnvConfig();

const { Sequelize } = require('sequelize');

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

const syncDb = async () => {
    await sequelize.sync({ alter: true });
    console.log("All user keys models were synchronized successfully.");
};

module.exports = sequelize;


