const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//TODO: Move to separate file
//================================================
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
// let path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/images');
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
//   fileFilter: fileFilter,
// });
// upload.single('avatar')
//=================================================

const { createUser, getAllUsers, getUser, getMe, editUser, deleteUser } =
  userController;

const { login, signup, protect } = authController;

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', protect, getMe, getUser);
router.patch('/me', protect, getMe, editUser);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);

// router.use(protect);

module.exports = router;
