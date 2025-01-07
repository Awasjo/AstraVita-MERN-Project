const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/:userId', authMiddleware.isAuthenticated, messageController.Messages);
router.post('/send', authMiddleware.isAuthenticated, messageController.sendMessages);

module.exports = router;