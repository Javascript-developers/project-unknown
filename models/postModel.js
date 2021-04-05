const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
  },
  author: {
    type: String,
    required: [true, 'A post must have a title'],
  },
  likes: {
    type: Number,
    default: 10,
  },
  comments: {
    type: [String],
  },
  image: {
    type: String,
  },
  postBody: {
    type: String,
    required: [true, 'A post must contain a body'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
