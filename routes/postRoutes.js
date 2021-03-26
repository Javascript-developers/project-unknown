const express = require('express');
const postController = require('../controllers/postController');

const {
  getAllPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
} = postController;

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).patch(editPost).delete(deletePost);

module.exports = router;
