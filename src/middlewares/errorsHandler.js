const logger = require("../logger")(__filename);

/**
 * middleware for handling Errors.
 */
// eslint-disable-next-line no-unused-vars
function errorsHandler(err, req, res, next) {
  let title = err.name;
  let description = err.message;
  let statusCode = 500;
  switch (err.name) {
    case "NotFoundError":
    case "ValidationError":
      statusCode = 400;
      break;
    case "MongoError":
      if (err.code && err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        statusCode = 409;
        title = "DuplicateError";
        description = `duplicate key: ${key}: ${err.keyValue[key]}`;
      } else logger.error(`Internal db error: ${err.name} ${err.message}`);
      break;
    case "InvalidAPIError":
      statusCode = 404;
      title = `invalid api: ${req.method}:${req.protocol + ": //" + req.get("host") + req.originalUrl}`;
      break;
    default:
      statusCode = 500;
      logger.error(`Internal error: ${err.name} ${err.stack || err.message}`);
      break;
  }
  const result = { error: title, statusCode: statusCode };
  if (process.env.NODE_ENV !== "production") {
    if (err.fileName) result.file = err.fileName;
    result.description = description ? description : "An error occurred while trying to process your request";
  }
  logger.verbose(JSON.stringify(result, null, 2));
  res.statusCode = statusCode;
  res.json(result);
}

module.exports = errorsHandler;
