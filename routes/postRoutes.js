const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentsRouter = require('../routes/commentRoutes');
const { route } = require('../routes/commentRoutes');

const {
  getAllPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
  likePost,
  unlikePost,
  getMyPosts,
  getUserPosts,
  getPostsByTag,
  getMyBookmarks,
  getFeed,
  searchPosts,
} = postController;

const { protect } = authController;

const router = express.Router();

router.use('/:postId/comments', commentsRouter);

router.route('/t/:tagId').get(getPostsByTag);

router.route('/:userId/getUserPosts').get(getUserPosts);

router.route('/myPosts').get(protect, getMyPosts);
router.route('/myBookmarks').get(protect, getMyBookmarks);

router.route('/').get(getAllPosts).post(protect, createPost);
router.route('/feed').get(getFeed);
router.route('/search').get(searchPosts);

router
  .route('/:id')
  .get(getPost)
  .patch(protect, editPost)
  .delete(protect, deletePost);

router.route('/:id/like').patch(protect, likePost);
router.route('/:id/unlike').patch(protect, unlikePost);

module.exports = router;
