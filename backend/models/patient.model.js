const mongoose = require('mongoose');
const User = require('./user.model');

const patientSchema = new mongoose.Schema({
  testResults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test Result' }],
  permissionRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  approvedDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  doctorRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

patientSchema.methods.requestDoctorPermission = function(doctorId) {
  if (!this.permissionRequests.includes(doctorId) && !this.approvedDoctors.includes(doctorId)) {
    this.permissionRequests.push(doctorId);
  }
};

patientSchema.methods.approveDoctor = function(doctorId) {
  this.permissionRequests = this.permissionRequests.filter(id => id.toString() !== doctorId.toString());
  if (!this.approvedDoctors.includes(doctorId)) {
    this.approvedDoctors.push(doctorId);
  }
};

patientSchema.methods.rejectDoctor = function(doctorId) {
  this.permissionRequests = this.permissionRequests.filter(id => id.toString() !== doctorId.toString());
};

patientSchema.methods.getTestResults = function() {
  return this.testResults;
};

patientSchema.methods.deleteAccount = async function() {
  // Delete this account's test results logic would go here (not implemented yet)
  await this.model('User').deleteOne({ _id: this._id });
};

patientSchema.methods.handleDoctorRequest = function(doctorId, approved) {
  // Remove the doctor from requests array
  this.doctorRequests = this.doctorRequests.filter(id => id.toString() !== doctorId.toString());
  if (approved && !this.approvedDoctors.includes(doctorId)) {
    this.approvedDoctors.push(doctorId);
  }
  // rejection just removes the doctor from requests array (no logic implemented)
};

patientSchema.methods.addDoctorRequest = function(doctorId) {
  if (!this.doctorRequests.includes(doctorId) && !this.approvedDoctors.includes(doctorId)) {
    this.doctorRequests.push(doctorId);
  }
};

// Patient model inherits from User model using discriminator
const Patient = User.discriminator('Patient', patientSchema); 

module.exports = Patient;
