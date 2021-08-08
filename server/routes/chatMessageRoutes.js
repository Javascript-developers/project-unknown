const express = require('express');
const authController = require('../controllers/authController');
const chatMessageController = require('../controllers/chatMessageController');

const { addChatMessage, getChatMessages } = chatMessageController;
const { protect } = authController;

const router = express.Router();

router.route('/').post(protect, addChatMessage);
router.route('/:conversationId').get(protect, getChatMessages);

module.exports = router;
