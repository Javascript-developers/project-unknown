const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
  try {
    // const posts = Post.find();
    console.log(Post.find());
    res.status(200).json({
      status: 'success',
      data: {
        posts: 'lol',
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
  console.log(req.body);

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
