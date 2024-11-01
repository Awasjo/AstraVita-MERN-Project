const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model');

exports.create = async (req, res) => {
  try {
    const { username, password, firstName, lastName, email, role } = req.body;

    let newUser;
    if (role === 'Patient') {
      newUser = new Patient({ username, firstName, lastName, email, role: 'Patient' });
    } else if (role === 'Doctor') {
      newUser = new Doctor({ username, firstName, lastName, email, role: 'Doctor' });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    newUser.setPassword(password);
    await newUser.save();

    res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

exports.getDoctorPatients = async (req, res) => {

  try {
    if (req.user.role !== 'Doctor') {
      return res.status(403).json({ message: 'Access denied. Only doctors can view patients.' });
    }
    
    const doctor = await Doctor.findById(req.user._id).populate('approvedPatients');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    const patients = doctor.approvedPatients.map(patient => ({
      id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      username: patient.username,
      isOnline: patient.isOnline,
      testResults: patient.testResults
    }));
    
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

exports.getPatientDoctors = async (req, res) => {
  try {
    if (req.user.role !== 'Patient') {
      return res.status(403).json({ message: 'Access denied. Only patients can view their doctors.' });
    }

    const patient = await Patient.findById(req.user._id).populate('approvedDoctors', 'firstName lastName isOnline jobTitle');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const doctors = patient.approvedDoctors.map(doctor => ({
      id: doctor._id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      isOnline: doctor.isOnline,
      jobTitle: doctor.jobTitle
    }));

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, 'firstName lastName jobTitle isOnline');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    if (req.user.role !== 'Doctor') {
      return res.status(403).json({ message: 'Access denied. Only doctors can view all patients.' });
    }
    const patients = await Patient.find({ approvedDoctors: req.user._id }, 'firstName lastName isOnline');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

exports.patientRequestDoctorPermission = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const doctorId = req.params.doctorId;
    patient.requestDoctorPermission(doctorId);
    await patient.save();
    res.status(200).json({ message: 'Permission request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting permission', error: error.message });
  }
};

exports.getDoctorPermissionRequests = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const patients = await Patient.find({ permissionRequests: doctor._id }, 'firstName lastName');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching permission requests', error: error.message });
  }
};

exports.handlePermissionRequest = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const { patientId, action } = req.body;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    if (action === 'approve') {
      patient.approveDoctor(doctor._id);
      doctor.approvePatient(patient._id);
    } else if (action === 'reject') {
      patient.rejectDoctor(doctor._id);
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
    await Promise.all([patient.save(), doctor.save()]);
    res.status(200).json({ message: 'Permission request handled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error handling permission request', error: error.message });
  }
};

exports.doctorRequestPatientPermission = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    doctor.requestPatientPermission(patientId);
    patient.addDoctorRequest(doctor._id);
    
    await Promise.all([doctor.save(), patient.save()]);
    res.status(200).json({ message: 'Permission request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting permission', error: error.message });
  }
};

exports.patientHandleDoctorPermission = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const { doctorId, action } = req.body;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const approved = action === 'approve';
    patient.handleDoctorRequest(doctorId, approved);
    doctor.handlePatientResponse(patient._id, approved);

    await Promise.all([patient.save(), doctor.save()]);
    res.status(200).json({ message: 'Permission request handled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error handling permission request', error: error.message });
  }
};

exports.getPatientDoctorRequests = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id)
      .populate('doctorRequests', 'firstName lastName jobTitle');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient.doctorRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor requests', error: error.message });
  }
};

exports.setOnlineStatus = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not properly authenticated' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isOnline = req.body.isOnline;
    await user.save();
    res.status(200).json({ message: 'Online status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating online status', error: error.message });
  }
};

exports.searchPatients = async (req, res) => {
  console.log('Search patients request received:', req.query);
  try {
    const { firstName, lastName } = req.query;
    const patients = await Patient.find({
      firstName: { $regex: firstName, $options: 'i' },
      lastName: { $regex: lastName, $options: 'i' },
    });
    console.log('Search results:', patients);
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error searching for patients:', error);
    res.status(500).json({ message: 'Error searching for patients', error: error.message });
  }
};