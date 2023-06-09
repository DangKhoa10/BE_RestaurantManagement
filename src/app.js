require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { default: helmet } = require("helmet");
const cors = require("cors");
const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(cors());

//init db
require("./dbs/init.mongodb");
// const { checkOverload } = require("./helpers/check.connect")
// checkOverload()


const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');



const options = {
  definition:{
    openapi: '3.0.0',
    info: {
      title: 'My App',
      version: '1.0.0',
      description: 'API documentation for My App',
    },
    servers: [
      {
        url: 'http://localhost:5500',
      },
    ],
  },
  apis: ["./routes/*.js"],

};


const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



//init routes
app.use("", require("./routes"));

module.exports = app;
