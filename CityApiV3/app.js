var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { swaggerUi, specs } = require('./swagger');
var connectDB = require('./db.js');

// Rutas
var indexRouter = require('./routes/index');
var sensoresRouter = require('./routes/sensores');
var tempRouter = require('./routes/temp');
var humRouter = require('./routes/humedad');
var InfrarrojosRouter = require('./routes/infrarrojos.js');
var ultrasonidoRouter = require('./routes/ultrasonido');
var tiempoRealRouter = require('./routes/tiempoReal');
var continuoRouter = require('./routes/continuo');

var app = express();

connectDB().then(() => {

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.set('port', process.env.PORT || 3000);

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
  app.use('/', indexRouter);
  app.use('/', sensoresRouter);
  app.use('/', tempRouter);
  app.use('/', humRouter);
  app.use('/', InfrarrojosRouter);
  app.use('/', ultrasonidoRouter);
  app.use('/', tiempoRealRouter);
  app.use('/', continuoRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message || 'An error occurred', error: err });
  });

});

module.exports = app;
