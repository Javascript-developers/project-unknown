const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment cannot be empty'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a Post'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name role avatar',
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
