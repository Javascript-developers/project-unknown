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
  likePost,
  unlikePost,
  getMyPosts,
} = postController;

const { protect } = authController;

const router = express.Router();

router.use('/:postId/comments', commentsRouter);

router.route('/myPosts').get(protect, getMyPosts);

router.route('/').get(getAllPosts).post(protect, createPost);
router
  .route('/:id')
  .get(getPost)
  .patch(protect, editPost)
  .delete(protect, deletePost);

router.route('/:id/like').patch(protect, likePost);
router.route('/:id/unlike').patch(protect, unlikePost);

module.exports = router;
