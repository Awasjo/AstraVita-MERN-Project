const mongoose = require('mongoose');
const User = require('./user.model');

const patientSchema = new mongoose.Schema({
  linkedDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  testResults: [{ type: String, default: "Temporary placeholder for test results" }]
});

patientSchema.methods.addLinkedDoctor = function(doctorId) {
  if (!this.linkedDoctors.includes(doctorId)) {
    this.linkedDoctors.push(doctorId);
  }
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
