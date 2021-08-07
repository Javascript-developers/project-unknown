const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');

//new conv
exports.createConversation = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.receiverId);
  const newConversation = await Conversation.create({
    members: [req.user._id, user._id],
  });

  res.status(201).json({
    status: 'success',
    data: {
      conversation: newConversation,
    },
  });
});

//get conv of a user by Id from params
//api/v1/conversation/6087ecc737275b486cd1300a

exports.getConversationById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  const conversation = await Conversation.find({
    members: { $in: [user._id] },
  });

  res.status(200).json({
    status: 'success',
    data: {
      conversation,
    },
  });
});

//get my conversations
exports.myConversations = catchAsync(async (req, res, next) => {
  const conversation = await Conversation.find({
    members: { $in: [req.user._id] },
  });

  res.status(200).json({
    status: 'success',
    data: {
      conversation,
    },
  });
});
