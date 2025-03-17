// express-server/server.js
const express = require("express");
const next = require("next");

const sequelize = require("../utils/db_app_apis_database"); // Importamos la conexión de Sequelize
const apiRoutes = require("./routes/apiRoutes");
const redisClient = require("../utils/redis_config")

const EnvConfig = require("../utils/env.config");
const { server_port, next_port } = EnvConfig();



const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

redisClient;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Marta TFG
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { swaggerUi, specs } = require('./swagger.js');
var connectDB = require('./db.js');

// Rutas
var indexRouter = require('./routes/index');
// var sensoresRouter = require('./routes/sensores');
// var tempRouter = require('./routes/temp');
// var humRouter = require('./routes/humedad');
// var InfrarrojosRouter = require('./routes/infrarrojos.js');
// var ultrasonidoRouter = require('./routes/ultrasonido');
// var tiempoRealRouter = require('./routes/tiempoReal');
var continuoRouter = require('./routes/continuo');

// RutasNuevas
const apiLegoCityContext = require('./routes/context_apis/apiLegoCityContext')
const apiBuildingsContext = require('./routes/context_apis/apiBuildingsContext')
const apuActuatorsContext = require('./routes/context_apis/apiActuatorsContext')
const apiSensorsContext = require('./routes/context_apis/apiSensoresContext')
const apiEntitiesContext = require('./routes/context_apis/apiEntititesContext.js')
const apiCameraContext = require('./routes/context_apis/apiCameraContext')

// const apiActuatorsMongo = require('./routes/mongo_apis/apiActuatorsMongo')
// const apiSensorsMongo = require('./routes/mongo_apis/apiSensorsMongo.js')

const apiKeyMiddleware = require('./middleware/apiKeyMiddelware.js')
// router.use('/api', apiKeyMiddleware);



console.log("Server port: ", server_port);
sequelize.sync().then(() => {
    console.log("Database Mysql synchronized");
    connectDB().then(() => {
        console.log("Database MongoDB connected");

        // Aplicar rate limiter a las rutas de la API
        // server.use('/api', apiRoutes);

        

        server.set('views', path.join(__dirname, 'views'));
        server.set('view engine', 'ejs');
        server.set('port', server_port || 3000);
    
        server.use(logger('dev'));
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        server.use(cookieParser());
        server.use(express.static(path.join(__dirname, 'public')));
    
        // app.listen(3000, function () {
        //   console.log('Express server listening on port ' + app.get('port'));
        // });
        server.listen(server.get('port'), function () {
            console.log('Express server listening on port ' + server.get('port'));
        });
    
        server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
        server.use('/', indexRouter);
        server.use('/', continuoRouter);
        // server.use('/', sensoresRouter);
        // server.use('/', tempRouter);
        // server.use('/', humRouter);
        // server.use('/', InfrarrojosRouter);
        // server.use('/', ultrasonidoRouter);
        // server.use('/', tiempoRealRouter);
        
        // // // // // // // // // // // // // // // // // // // // // // // 
        // // Nuevas rutas
        // // // // // // // // // // // // // // // // // // // // // // // 
        // Context Api routes
        server.use('/api', apiKeyMiddleware);

        server.use('/api',apiLegoCityContext);
        server.use('/api',apiBuildingsContext);
        server.use('/api',apuActuatorsContext);
        server.use('/api',apiSensorsContext);
        server.use('/api',apiEntitiesContext);
        server.use('/api',apiCameraContext);
    
    // Mongo Api routes
        // server.use('/api',apiActuatorsMongo);
        // server.use('/api',apiSensorsMongo);
    
        
        // // // // // // // // // // // // // // // // // // // // // // // 
    
    



    });
    
}).catch(err => {
    console.error('Unable to synchronize the database:', err);
});





// sequelize.sync().then(() => {
//     console.log("Database synchronized");

//     // Aplicar rate limiter a las rutas de la API
//     server.use('/api', apiRoutes);

    
//     server.listen(server_port, (err) => {
//         if (err) throw err;
//         console.log(`Server ready on http://localhost:${server_port}`);
//     });

    
// }).catch(err => {
//     console.error('Unable to synchronize the database:', err);
// });
