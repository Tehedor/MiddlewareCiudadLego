const mongoose = require('mongoose');
const process = require('process');


const dbname = "sth_openiot";
let dbURI = 'mongodb://localhost:27017/' + dbname;

if (process.env.NODE_ENV == 'container') {
  dbURI = 'mongodb://mongo-db-draco:27017/' + dbname;
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error('Error de conexión:', err);
  }
};

module.exports = connectDB;

