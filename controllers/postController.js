const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find().populate('comments');

  return res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

exports.createPost = catchAsync(async (req, res) => {
  const newPost = await Post.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

exports.getPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('comments');

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.getMyPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: { $eq: req.user.id } }).populate(
    'comments'
  );

  if (!posts) {
    return next(new AppError('No posts found for the current user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

exports.editPost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

//only user that created the original post can delete it/ must be logged in
//TODO: implement restrict middleware so admin can delete any post he wants
exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post.user.id === req.user.id) {
    await Post.findByIdAndDelete(req.params.id);
  } else {
    return next(
      new AppError("You don't have access deleting another user's post", 401)
    );
  }

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  );

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.unlikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  );

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.params.userId }).populate(
    'comments'
  );
  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});
