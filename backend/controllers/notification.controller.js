const Notification = require('../models/notification.model');

exports.createNotification = async (receiverId, senderId, type, message) => {
    const notification = new Notification({
      receiver: receiverId,
      sender: senderId,
      type: type,
      message: message
    });
    await notification.save();
  };
  
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.user._id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      if (notification.receiver.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to mark this notification as read' });
      }
      notification.readDate = new Date();
      await notification.save();
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: 'Error marking notification as read', error: error.message });
    }
  };
  
  exports.deleteNotification = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      if (notification.receiver.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this notification' });
      }
      await notification.deleteOne();
      res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting notification', error: error.message });
    }
  };