const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const {
  getAllPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
} = postController;

const { protect } = authController;

const router = express.Router();

router.route('/').get(getAllPosts).post(protect, createPost);
router.route('/:id').get(getPost).patch(protect, editPost).delete(deletePost);

module.exports = router;
