const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to an user'],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
