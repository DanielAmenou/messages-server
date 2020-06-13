const path = require("path");

class BaseError extends Error {
  constructor(message, name, fileName) {
    super(message);
    this.name = name;
    this.fileName = fileName && path.basename(fileName).replace(/\.[^/.]+$/, "");
  }
}

class ValidationError extends BaseError {
  constructor(message, fileName) {
    super(message, "ValidationError", fileName);
  }
}

class NotFoundError extends BaseError {
  constructor(message, fileName) {
    super(message, "NotFoundError", fileName);
  }
}

class InvalidAPIError extends BaseError {
  constructor(message, fileName, apiName) {
    super(message, "InvalidAPIError", fileName);
    this.apiName = apiName;
  }
}

exports.NotFoundError = NotFoundError;
exports.ValidationError = ValidationError;
exports.InvalidAPIError = InvalidAPIError;
