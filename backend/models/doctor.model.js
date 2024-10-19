const mongoose = require('mongoose');
const User = require('./user.model');

const doctorSchema = new mongoose.Schema({
  jobTitle: String,
  employer: String,
  linkedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

doctorSchema.methods.addLinkedPatient = function(patientId) {
  if (!this.linkedPatients.includes(patientId)) {
    this.linkedPatients.push(patientId);
  }
};

const Doctor = User.discriminator('Doctor', doctorSchema);

module.exports = Doctor;
