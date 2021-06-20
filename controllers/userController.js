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
    .populate('following', '_id name')
    .populate('followers', '_id name');

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.editUser = catchAsync(async (req, res) => {
  const { name, about, avatar } = req.body;
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
  if (about) profileFileds.about = about;
  // if (req.file) profileFileds.avatar = req.file.filename;
  // console.log('profile-fields', profileFileds);
  console.log(profileFileds);

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
    .populate('following', '_id name')
    .populate('followers', '_id name');

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
    .populate('following', '_id name')
    .populate('followers', '_id name');

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

exports.deleteUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
});

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
