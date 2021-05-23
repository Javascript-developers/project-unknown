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
  const user = await User.findById(req.params.id);

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
    console.log(uploadedRes);

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

exports.deleteUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
});
