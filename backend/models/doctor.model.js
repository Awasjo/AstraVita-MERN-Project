const mongoose = require('mongoose');
const User = require('./user.model');

const doctorSchema = new mongoose.Schema({
  jobTitle: String,
  employer: String,
  approvedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

doctorSchema.methods.approvePatient = function(patientId) {
  if (!this.approvedPatients.includes(patientId)) {
    this.approvedPatients.push(patientId);
  }
};

const Doctor = User.discriminator('Doctor', doctorSchema);

module.exports = Doctor;
