const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware.isAuthenticated, notificationController.getNotifications);
router.put('/:id/read', authMiddleware.isAuthenticated, notificationController.markAsRead);
router.delete('/:id', authMiddleware.isAuthenticated, notificationController.deleteNotification);

module.exports = router;