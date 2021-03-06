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
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    tags: {
      type: [String],
    },
    banner: {
      type: Object,
    },
    description: {
      type: String,
      required: [true, 'A post must contain a description'],
    },
    postBody: {
      type: String,
      required: [true, 'A post must contain a body'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, function (next) {
  // this.populate('likes');
  this.populate({
    path: 'user',
    select: 'name username avatar about followers',
  });
  // this.populate({
  //   path: 'tag',
  //   select: 'name',
  // });
  next();
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
