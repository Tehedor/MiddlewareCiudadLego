const mongoose = require('mongoose');
const process = require('process');
require('dotenv').config();

// const dbname = "sth_openiot";


const EnvConfig = require('../utils/env.config');
const { mongodb_host, mongodb_port, mongodb_name } = EnvConfig();

// let dbURI = 'mongodb://localhost:27017/' + dbname;
// if (mode_container) {
//   dbURI = 'mongodb://mongo-db-draco:27017/' + dbname;
// }

dbURI = `mongodb://${mongodb_host}:${mongodb_port}/${mongodb_name}`;


const connectDB = async () => {
  while (true) {
    try {
      await mongoose.connect(dbURI)
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));
      break; // Salir del bucle si la conexión es exitosa
    } catch (err) {
      console.error('Error de conexión:', err);
      console.log('Reintentando conexión en 5 segundos...');
      await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos antes de reintentar
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('Conexión a MongoDB perdida. Reintentando...');
  connectDB(); // Intentar reconectar cuando la conexión se pierde
});

module.exports = connectDB;

