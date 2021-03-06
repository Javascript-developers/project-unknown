const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { cloudinary } = require('../utils/cloudinary');

exports.getFeed = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  let query = await Post.find()
    .populate('comments')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  if (req.query.page) {
    const numTours = await Post.countDocuments();
    if (skip >= numTours)
      return next(new AppError('This page does not exist', 404));
  }

  return res.status(200).json({
    status: 'success',
    length: query.length,
    data: {
      query,
    },
  });
});

exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find().populate('comments');

  return res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  // const newPost = await Post.create(
  //   {
  //     ...req.body,
  //     user: req.user.id,
  //   },
  // function (err, text) {
  //   if (err) {
  //     return next(new AppError(`Big ERROR - ${err}`, 404));
  //   }
  //   const newTags = req.body.tags.filter(
  //     (tag) => tag._id === undefined && tag.name
  //   );

  //   console.log('NEW TAGS - ', newTags);
  //   Tag.init().then(() => {
  //     Tag.create(
  //       newTags.map((tag) => tag.name),
  //       (err, text) => {
  //         tags.forEach((tag) => {
  //           text.tags.push(tag);
  //         });
  //         text.save();
  //       }
  //     );
  //   });
  //   res.send(text);
  // }
  // );

  // if (!newPost) {
  //   return next(new AppError(`Problem creating post`, 404));
  // }

  // const { title, postBody, description, tags } = req.body;
  // await Tag.create(tags);

  // const queryTags = await Tag.find({ name: { $in: tags } });
  // console.log(queryTags);

  // let createdTags;

  // if (!queryTags) {
  //   createdTags = await Tag.create(tags);
  //   console.log('No query tags');
  // }

  const { banner } = req.body;

  const postFields = { ...req.body };

  if (banner) {
    const uploadedRes = await cloudinary.uploader.upload(banner, {
      upload_preset: 'banner',
    });

    console.log(uploadedRes);

    if (!uploadedRes) {
      return next(new AppError('Banner could not been uploaded', 404));
    }

    postFields.banner = uploadedRes.public_id;
  }

  const newPost = await Post.create({
    ...postFields,
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
    req.params.id,
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

exports.getPostsByTag = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ tags: { $in: req.params.tagId } }).populate(
    'comments'
  );

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

//--------------------------------------------------------------------------------

exports.getMyBookmarks = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ _id: { $in: req.body.posts } });

  if (!posts) {
    return next(new AppError('No bookmarks could be found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { posts },
  });
});

//--------------------------------------------------------------------------------

exports.searchPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({
    title: { $regex: req.query.q, $options: 'i' },
  }).populate('comments');

  if (!posts) {
    return next(new AppError('No posts could be found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { posts },
  });
});
