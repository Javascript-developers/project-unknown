const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    replyComment: {
      type: String,
      required: [true, 'Reply comment cannot be empty'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
  },
  {
    timestamps: true,
  }
);

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
    // createdAt: Number,
    // updatedAt: Number,
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
    replies: [replySchema],
  },
  {
    // timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// replySchema.pre('save', function (next) {
//   this.populate({
//     path: 'user',
//     select: 'name role avatar',
//   });
//   next();
// });

// commentSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: 'name role avatar',
//   });
//   next();
// });

// commentSchema.pre(/^find/, function (next) {
//   this.populate([
//     'user',
//     {
//       path: 'replies',
//       populate: 'user',
//       select: 'name role avatar',
//     },
//   ]);
//   next();
// });

commentSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'user',
      select: 'name role avatar',
    },
    {
      path: 'replies',
      populate: {
        path: 'user',
        select: 'name role avatar',
      },
    },
  ]);
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
