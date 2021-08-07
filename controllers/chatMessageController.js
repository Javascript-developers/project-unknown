const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ChatMessage = require('../models/chatMessageModel');

//add
exports.addChatMessage = catchAsync(async (req, res, next) => {
  //TODO: FIXME: sender parameter can come from req.user._id (protect route) and not from body
  const newMessage = await ChatMessage.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newMessage,
    },
  });
});

// get conversation messages
exports.getChatMessages = catchAsync(async (req, res, next) => {
  const messages = await ChatMessage.find({
    conversationId: req.params.conversationId,
  });

  res.status(200).json({
    status: 'success',
    data: {
      messages,
    },
  });
});
