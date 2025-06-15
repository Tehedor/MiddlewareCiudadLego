// express-server/server.js
const express = require("express");
const next = require("next");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const sequelize = require("../utils/db_app_apis_database");
const syncDb = require("../utils/db_sync");
const connectDB = require("./db.js");

const { server_port } = require("../utils/env.config")();

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

const server = express();

(async () => {
  try {
    console.log("Starting server setup...");

    await connectDB(); // Conectar MongoDB
    console.log("MongoDB connected");

    await sequelize.sync(); // Sincroniza MySQL
    console.log("MySQL database synchronized");
    
    await app.prepare(); // Prepara Next.js
    await syncDb(); // Sincronización o migración inicial

    // Middlewares comunes
    server.use(logger("dev"));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(express.static(path.join(__dirname, "public")));

    // Configuración vistas
    server.set("views", path.join(__dirname, "views"));
    server.set("view engine", "ejs");

    // Swagger API docs
    const { swaggerUi, specs } = require("./swagger.js");
    server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    // Middleware API key para /api
    const apiKeyMiddleware = require("./middleware/apiKeyMiddelware.js");
    server.use("/api", apiKeyMiddleware);

    // Rutas
    server.use("/", require("./routes/index"));
    server.use("/", require("./routes/continuo"));

    // Nuevas rutas API Context
    server.use("/api", require("./routes/context_apis/apiLegoCityContext"));
    server.use("/api", require("./routes/context_apis/apiBuildingsContext"));
    server.use("/api", require("./routes/context_apis/apiActuatorsContext"));
    server.use("/api", require("./routes/context_apis/apiSensoresContext"));
    server.use("/api", require("./routes/context_apis/apiEntititesContext"));
    server.use("/api", require("./routes/context_apis/apiCameraContext"));

    // Rutas Mongo API
    server.use("/api", require("./routes/mongo_apis/apiHistoricalMongo"));

    // Next.js handler para resto de peticiones (frontend)
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    // Arrancar servidor
    server.listen(server_port || 3000, () => {
      console.log(`Express server listening on port ${server_port || 3000}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
})();
