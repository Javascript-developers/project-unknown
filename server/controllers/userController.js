// const { findByIdAndUpdate } = require('../models/userModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { cloudinary } = require('../utils/cloudinary');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defiend',
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate('following', '_id name username')
    .populate('followers', '_id name username');

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getUserByUsername = catchAsync(async (req, res, next) => {
  const user = await User.find({ username: req.params.id })
    .populate('following', '_id name username')
    .populate('followers', '_id name username');

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.editUser = catchAsync(async (req, res) => {
  const {
    name,
    username,
    about,
    avatar,
    website,
    twitter,
    instagram,
    github,
    location,
    showEmail,
  } = req.body;
  const profileFileds = {};

  if (avatar) {
    const uploadedRes = await cloudinary.uploader.upload(avatar, {
      upload_preset: 'dexld2c6',
    });

    if (!uploadedRes) {
      return next(new AppError('Avatar could not been uploaded', 404));
    }
    profileFileds.avatar = uploadedRes.public_id;
  }

  if (name) profileFileds.name = name;
  if (username) profileFileds.username = username;
  if (about) profileFileds.about = about;
  if (website) profileFileds.website = website;
  if (twitter) profileFileds.twitter = twitter;
  if (instagram) profileFileds.instagram = instagram;
  if (github) profileFileds.github = github;
  if (location) profileFileds.location = location;
  if (showEmail !== null) profileFileds.showEmail = showEmail;

  // if (req.file) profileFileds.avatar = req.file.filename;
  // console.log('profile-fields', profileFileds);
  // console.log(profileFileds);

  const user = await User.findByIdAndUpdate(req.params.id, profileFileds, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new AppError('You cannot edit this user / no user to be found', 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

//---------------------------------------------------------------------------

exports.addFollowing = catchAsync(async (req, res, next) => {
  const result = await User.findByIdAndUpdate(req.user.id, {
    $push: { following: req.params.id },
  });

  if (!result) {
    return next(new AppError('Could not find any user with that Id', 404));
  }

  next();
});

exports.addFollower = catchAsync(async (req, res, next) => {
  const result = await User.findByIdAndUpdate(
    req.params.id,
    { $push: { followers: req.user.id } },
    { new: true }
  )
    .populate('following', '_id name username')
    .populate('followers', '_id name username');

  if (!result) {
    return next(new AppError('Could not find any user with that Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});

exports.removeFollowing = catchAsync(async (req, res, next) => {
  const result = await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: req.params.id },
  });

  if (!result) {
    return next(new AppError('Could not find any user with that Id', 404));
  }

  next();
});

exports.removeFollower = catchAsync(async (req, res, next) => {
  const result = await User.findByIdAndUpdate(
    req.params.id,
    { $pull: { followers: req.user.id } },
    { new: true }
  )
    .populate('following', '_id name username')
    .populate('followers', '_id name username');

  if (!result) {
    return next(new AppError('Could not find any user with that Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});

//---------------------------------------------------------------------------

exports.deleteUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
});

//---------------------------------------------------------------------------

exports.followTag = catchAsync(async (req, res, next) => {
  const tag = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { followTags: req.body.tag },
    },
    { new: true }
  );

  if (!tag) {
    return next(new AppError('Could not add tag to following', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { tag },
  });
});

exports.unfollowTag = catchAsync(async (req, res, next) => {
  const tag = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { followTags: req.body.tag },
    },
    { new: true }
  );

  if (!tag) {
    return next(new AppError('Could not delete tag to following', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { tag },
  });
});

//---------------------------------------------------------------------------

exports.bookmarkPost = catchAsync(async (req, res, next) => {
  const post = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { bookmarkedPosts: req.body.postId },
    },
    { new: true }
  );

  if (!post) {
    return next(new AppError('Could not bookmark this post', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { post },
  });
});

exports.unBookmarkPost = catchAsync(async (req, res, next) => {
  const post = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { bookmarkedPosts: req.body.postId },
    },
    { new: true }
  );

  if (!post) {
    return next(new AppError('Could not unbookmark this post', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { post },
  });
});

//---------------------------------------------------------------------------

exports.getFollowers = catchAsync(async (req, res, next) => {
  const followers = await User.find({ _id: { $in: req.user.followers } });

  if (!followers) {
    return next(new AppError('No followers could be found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { followers },
  });
});

exports.getFollowing = catchAsync(async (req, res, next) => {
  const following = await User.find({ _id: { $in: req.user.following } });

  if (!following) {
    return next(new AppError('No following users could be found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { following },
  });
});

//--------------------------------------------------------------------------

exports.searchUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({
    $or: [
      { name: { $regex: req.query.q, $options: 'i' } },
      { username: { $regex: req.query.q, $options: 'i' } },
    ],
  });
  if (!users) {
    return next(new AppError('No user could be found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { users },
  });
});
