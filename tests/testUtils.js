/* eslint-disable security/detect-object-injection */
const mongoose = require("mongoose");
const logger = require("../src/logger")(__filename);

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
    logger.silly(`"${collectionName}" removed`);
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // we can safely ignore these errors
      if (error.message === "ns not found") return;  
      if (error.message.includes("a background operation is currently running")) return;
      logger.info(error.message);
    }
    logger.silly(`"${collectionName}" collections drop`);
  }
}

module.exports.dropAllCollections = dropAllCollections;
module.exports.removeAllCollections = removeAllCollections;
