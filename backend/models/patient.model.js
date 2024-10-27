const mongoose = require('mongoose');
const User = require('./user.model');

const patientSchema = new mongoose.Schema({
  testResults: [{ type: String, default: "Temporary placeholder for test results" }],
  permissionRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  approvedDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

patientSchema.methods.requestPermission = function(doctorId) {
  if (!this.permissionRequests.includes(doctorId) && !this.approvedDoctors.includes(doctorId)) {
    this.permissionRequests.push(doctorId);
  }
};

patientSchema.methods.approvePermission = function(doctorId) {
  this.permissionRequests = this.permissionRequests.filter(id => id.toString() !== doctorId.toString());
  if (!this.approvedDoctors.includes(doctorId)) {
    this.approvedDoctors.push(doctorId);
  }
};

patientSchema.methods.rejectPermission = function(doctorId) {
  this.permissionRequests = this.permissionRequests.filter(id => id.toString() !== doctorId.toString());
};

patientSchema.methods.getTestResults = function() {
  return this.testResults;
};

patientSchema.methods.deleteAccount = async function() {
  // Delete this account's test results logic would go here (not implemented yet)
  await this.model('User').deleteOne({ _id: this._id });
};

// Patient model inherits from User model using discriminator
const Patient = User.discriminator('Patient', patientSchema); 

module.exports = Patient;
