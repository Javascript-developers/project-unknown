const express = require('express');
const authController = require('../controllers/authController');
const conversationController = require('../controllers/conversationController');

const { createConversation, getConversationById, myConversations } =
  conversationController;
const { protect } = authController;

const router = express.Router();

router.route('/').post(protect, createConversation);
router.route('/').get(protect, myConversations);

router.route('/:userId').get(getConversationById);

module.exports = router;
