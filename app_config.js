/**
 * It is looking for ENV variable, if it presend then get appropriat .env file
 * otherwise fail back to current folder .env
 */
const filePath = process.env.ENV
  ? `./config/${process.env.ENV.toLowerCase()}/.env`
  : ".env";
require("dotenv").config({ path: filePath });
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
var cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const liveCheckController = require("./src/controllers/livecheck_controller");
const recordsController = require("./src/controllers/records_controller");
const swaggerDefinition = require("./src/doc/swagger_defination");

/**
 * Swagger doc configuration
 */
const options = {
  swaggerDefinition,
  apis: ["./src/controllers/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
/**
 * enable cors, json body and url encoding
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
/**
 * Set swagger path
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * Set Routers/Controllers
 */
app.use("/", liveCheckController);
app.use("/", recordsController);

module.exports = app;
