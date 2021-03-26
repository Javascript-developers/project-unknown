const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    // console.log(Post.find());
    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
  // console.log(req.body);

  res.status(200).json({
    status: 'success',
    data: {},
  });
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = req.params.id;
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
