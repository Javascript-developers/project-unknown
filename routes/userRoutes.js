const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const {
  createUser,
  getAllUsers,
  getUser,
  getMe,
  editUser,
  deleteUser,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  followTag,
  unfollowTag,
  bookmarkPost,
  unBookmarkPost,
} = userController;

const { login, signup, protect } = authController;

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', protect, getMe, getUser);
router.patch('/me', protect, getMe, editUser);

// router.route('/unfollowTag').patch(protect, unfollowTag);
// router.route('/followTag').patch(protect, followTag);
router.patch('/followTag', protect, followTag);
router.patch('/unfollowTag', protect, unfollowTag);

router.route('/bookmark').patch(protect, bookmarkPost);
router.route('/unBookmark').patch(protect, unBookmarkPost);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);
router.route('/:id/follow').patch(protect, addFollowing, addFollower);
router.route('/:id/unfollow').patch(protect, removeFollowing, removeFollower);

// router.use(protect);

module.exports = router;
