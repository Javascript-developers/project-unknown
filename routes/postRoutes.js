const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentsRouter = require('../routes/commentRoutes');

const {
  getAllPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
} = postController;

const { protect } = authController;

const router = express.Router();

router.use('/:postId/comments', commentsRouter);

router.route('/').get(getAllPosts).post(protect, createPost);
router.route('/:id').get(getPost).patch(protect, editPost).delete(deletePost);

module.exports = router;
