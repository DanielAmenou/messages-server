const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stringType = { type: String, trim: true, required: true };

const MessageSchema = new Schema(
  {
    sender: stringType,
    receiver: stringType,
    subject: stringType,
    message: stringType
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

MessageSchema.set("toObject", {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Message = mongoose.model("Messages", MessageSchema);

module.exports = Message;
