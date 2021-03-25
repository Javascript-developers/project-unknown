const express = require('express');
const postController = require('../controllers/postController');

// const { getAllPosts, createPost, getPost, editPost } = postController;
const { createPost, getAllPosts } = postController;

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
// router.route('/:id').get(getPost).patch(editPost);

module.exports = router;
