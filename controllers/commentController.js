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

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(new AppError('No comment found with that Id', 404));
  }

  if (comment.user.id === req.user.id) {
    await Comment.findByIdAndDelete(req.params.commentId);
  } else {
    return next(
      new AppError("You don't have access deleting another's user comment")
    );
  }

  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});

// exports.updateComment = catchAsync(async (req, res, next) => {

// });

//--------------------------------------------------------------------

exports.createReply = catchAsync(async (req, res, next) => {
  const reply = await Comment.findByIdAndUpdate(
    req.body.commentId,
    {
      $push: {
        replies: {
          replyComment: req.body.replyComment,
          user: req.user.id,
        },
      },
    },
    { new: true }
  );

  if (!reply) {
    return next(new AppError('Reply could not be posted', 404));
  }

  res.status(201).json({
    status: 'success',
    data: { reply },
  });
});

exports.deleteReply = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.body.commentId, {
    replies: { $elemMatch: { _id: req.body.replyId } },
  });

  if (!comment) {
    return next(new AppError('No comment found with that Id', 404));
  }

  // console.log('reply id - ', comment.replies[0].user._id);
  // console.log('user id - ', req.user._id);

  if (comment.replies[0].user._id.toString() === req.user._id.toString()) {
    const reply = await Comment.findByIdAndUpdate(req.body.commentId, {
      $pull: { replies: { _id: req.body.replyId } },
    });

    if (!reply) {
      return next(new AppError("Reply couldn't be deleted", 404));
    }
  } else {
    return next(
      new AppError("You don't have access deleting another's user comment", 404)
    );
  }

  res.status(204).json({
    status: 'success',
    // reply,
  });
});

//--------------------------------------------------------------------
