const logger = require("../logger")(__filename);
const MessageModel = require("./MessageModel");

class MessagesService {
  async getMessagesOf(userId) {
    const docs = await MessageModel.find({ $or: [{ receiver: userId }, { sender: userId }] }).exec();
    const result = {};
    result.received = docs.filter((m) => m.receiver === userId).map((doc) => doc.toObject());
    result.sent = docs.filter((m) => m.sender === userId).map((doc) => doc.toObject());
    return result;
  }

  async saveMessage(messageData) {
    const newMessage = new MessageModel(messageData);
    const result = (await newMessage.save()).toObject();
    logger.info(`message ${result.id} successfully saved`);
    return result;
  }

  async delete(messageId) {
    await MessageModel.deleteOne({ _id: messageId }).exec();
    logger.info(`${messageId} removed successfully`);
  }
}

module.exports = new MessagesService();
