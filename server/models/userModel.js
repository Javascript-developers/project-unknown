const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please insert your name'],
    },
    username: {
      type: String,
      trim: true,
      minLength: [4, '@username must be 4 or more characters long'],
      maxLength: [16, '@username must not be more than 16 characters long'],
      unique: true,
      lowercase: true,
      required: [true, 'Please add username id'],
      validate: [
        validator.isAlphanumeric,
        'Username can contain only letters and numbers',
      ],
    },
    email: {
      type: String,
      required: [true, 'Please insert your email'],
      unique: true,
      lowercase: true, //transform into lowercase / not validator
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    avatar: {
      type: Object,
    },
    joinDate: {
      type: Date,
      default: Date.now(),
    },
    about: {
      type: String,
      trim: true,
    },
    followTags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    bookmarkedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    twitter: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    showEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual populate

userSchema.pre('save', async function (next) {
  // this.followTags = _.unique(this.followTags); //Breaks the registration call

  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  //delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  //if not changed at all
  return false;
};

userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user',
  localField: '_id',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
