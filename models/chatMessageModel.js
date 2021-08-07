const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Conversation',
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;
