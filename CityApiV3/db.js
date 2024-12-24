const mongoose = require('mongoose');

const dbname = "sth_openiot";
const dbURI = 'mongodb://localhost:27017/' + dbname;

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

