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
} = userController;

const { login, signup, protect } = authController;

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', protect, getMe, getUser);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);

// router.use(protect);

module.exports = router;
