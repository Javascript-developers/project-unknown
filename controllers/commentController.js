const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/commentModel');

exports.setPostUserIds = (req, res, next) => {
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllComments = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.postId) filter = { post: req.params.postId };
  const comments = await Comment.find(filter);

  if (!comments) {
    return next(new AppError('No comments found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments,
    },
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

// exports.deleteComment = catchAsync(async (req, res, next) => {

// });

// exports.updateComment = catchAsync(async (req, res, next) => {

// });
