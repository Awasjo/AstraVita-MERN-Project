const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  isVerified: { type: Boolean, default: false },
  hash: String,
  salt: String,
  isOnline: { type: Boolean, default: false }
});

userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.deleteAccount = function() {
  return this.model('User').deleteOne({ _id: this._id });
};

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
