const mongoose = require("mongoose");
const logger = require("../logger")(__filename);

let DatabaseUri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

const connect = (testName) => {
  if (testName && process.env.NODE_ENV === "test") DatabaseUri += "_" + testName;
  logger.info("Trying to connect to " + DatabaseUri);
  mongoose.connection.on("connected", function() {
    logger.info("MongoDB Connected: " + DatabaseUri);
  });

  mongoose.connection.on("reconnected", function() {
    logger.info("MongoDB reconnected: " + DatabaseUri);
  });

  // If the connection throws an error
  mongoose.connection.on("error", function(err) {
    logger.error("Failed to Connect MongoDB: " + err);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function() {
    logger.warn("MongoDB Disconnected");
  });

  // When the connection is disconnected
  mongoose.connection.on("reconnectFailed", function() {
    logger.error("MongoDB reconnectFailed");
  });

  const closeDBConnection = () => {
    mongoose.connection.close();
    logger.warn("MongoDB connection disconnected through app termination");
  };

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", () => {
    closeDBConnection();
  });
  process.on("exit", closeDBConnection);
  process.on("uncaughtException", closeDBConnection);

  mongoose
    .connect(DatabaseUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: process.env.NODE_ENV !== "production",
      auto_reconnect: true
    })
    .catch((error) => logger.error(error));

  return mongoose;
};

module.exports = connect;
