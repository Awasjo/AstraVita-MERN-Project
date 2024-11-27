const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['requesting-permission', 'test-result', 'info'], required: true },
  message: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  readDate: { type: Date },
  testResult: { type: mongoose.Schema.Types.ObjectId, ref: 'Test Result', default: null } // Only required if `type` is 'test-result'
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;