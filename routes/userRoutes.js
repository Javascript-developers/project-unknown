const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const {
  createUser,
  getAllUsers,
  getUser,
  editUser,
  deleteUser,
} = userController;

const { login, signup } = authController;

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);

module.exports = router;
