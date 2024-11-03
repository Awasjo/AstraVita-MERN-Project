const mongoose = require('mongoose');
const User = require('./user.model');

const patientSchema = new mongoose.Schema({
  testResults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test Result' }],
  approvedDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  doctorRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

patientSchema.methods.getTestResults = function() {
  return this.testResults;
};

patientSchema.methods.deleteAccount = async function() {
  // Delete this account's test results logic would go here (not implemented yet)
  await this.model('User').deleteOne({ _id: this._id });
};

const Patient = User.discriminator('Patient', patientSchema);

module.exports = Patient;
