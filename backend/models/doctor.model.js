const mongoose = require('mongoose');
const User = require('./user.model');

const doctorSchema = new mongoose.Schema({
  jobTitle: String,
  employer: String,
  approvedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  permissionRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

doctorSchema.methods.approvePatient = function(patientId) {
  if (!this.approvedPatients.includes(patientId)) {
    this.approvedPatients.push(patientId);
  }
};

doctorSchema.methods.requestPatientPermission = function(patientId) {
  if (!this.permissionRequests.includes(patientId) && !this.approvedPatients.includes(patientId)) {
    this.permissionRequests.push(patientId);
  }
};

doctorSchema.methods.handlePatientResponse = function(patientId, approved) {
  // Remove the patient from requests array
  this.permissionRequests = this.permissionRequests.filter(id => id.toString() !== patientId.toString());
  if (approved && !this.approvedPatients.includes(patientId)) {
    this.approvedPatients.push(patientId);
  }
  // rejection just removes the patient from requests array (no logic implemented)
};

const Doctor = User.discriminator('Doctor', doctorSchema);

module.exports = Doctor;
