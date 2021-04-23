const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

const {
  getAllComments,
  createComment,
  setPostUserIds,
  deleteComment,
} = commentController;
const { protect } = authController;

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllComments)
  .post(protect, setPostUserIds, createComment);

router.route('/:commentId').delete(protect, deleteComment);

//I don't really want to acces a route to update/delete a comment
// router.route('/:id').patch(updateComment).delete(deleteComment)

module.exports = router;
