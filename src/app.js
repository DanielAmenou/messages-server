const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger")(__filename);
const messagesRouter = require("./messages/messagesRouter");
const errorsHandler = require("./middlewares/errorsHandler");
const cors = require("cors");
const app = express();

app.use(morgan(":method::url  response: status=:status rt=:response-time ms", { stream: logger.stream }));
app.use(cors());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/messages", messagesRouter);
app.use(errorsHandler);

module.exports = app;
