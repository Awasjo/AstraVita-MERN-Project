const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model');
const Notification = require('../models/notification.model');
const { createNotification } = require('../controllers/notification.controller');

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
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove user from approved lists of doctors and patients
    if (user.role === 'Patient') {
      await Doctor.updateMany(
        { approvedPatients: user._id },
        { $pull: { approvedPatients: user._id } }
      );
    } else if (user.role === 'Doctor') {
      await Patient.updateMany(
        { approvedDoctors: user._id },
        { $pull: { approvedDoctors: user._id } }
      );
    }
    await User.findByIdAndDelete(req.params.id);

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

exports.requestPermission = async (req, res) => {
  try {
    const requesterId = req.user._id;
    const targetId = req.params.targetId;
    
    const requester = await User.findById(requesterId);
    const target = await User.findById(targetId);

    if (!requester || !target) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate that one is a doctor and one is a patient
    const isValidRequest = (requester.role === 'Doctor' && target.role === 'Patient') || (requester.role === 'Patient' && target.role === 'Doctor');
    
    if (!isValidRequest) {
      return res.status(400).json({ message: 'Invalid permission request combination' });
    }

    // Determine who is who
    const doctor = requester.role === 'Doctor' ? requester : target;
    const patient = requester.role === 'Patient' ? requester : target;

    // Add to appropriate pending lists
    if (requester.role === 'Patient') {
      if (!patient.doctorRequests.includes(doctor._id)) {
        patient.doctorRequests.push(doctor._id);
      }
      await patient.save();

      // Create notification for doctor
      await createNotification(doctor._id, patient._id, 'requesting-permission', `${patient.getFullName()} has requested to add you as their doctor.`);

      // Create info notification for patient
      await createNotification(patient._id, patient._id, 'info', 'Request sent successfully.');
    } else if (requester.role === 'Doctor') {
      if (!doctor.approvedPatients.includes(patient._id)) {
        doctor.approvedPatients.push(patient._id);
      }
      await doctor.save();

      // Create notification for patient
      await createNotification(patient._id, doctor._id, 'requesting-permission', `${doctor.getFullName()} has requested to add you as their patient.`);

      // Create info notification for doctor
      await createNotification(doctor._id, doctor._id, 'info', 'Request sent successfully.');
    }
    res.status(200).json({ message: 'Permission request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting permission', error: error.message });
  }
};

exports.handlePermissionRequest = async (req, res) => {
  try {
    const responderId = req.user._id;
    const { requesterId, action } = req.body;

    const responder = await User.findById(responderId);
    const requester = await User.findById(requesterId);

    if (!responder || !requester) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine who is who
    const doctor = responder.role === 'Doctor' ? responder : requester;
    const patient = responder.role === 'Patient' ? responder : requester;

    if (action === 'approve') {
      // Add to approved lists
      if (!patient.approvedDoctors.includes(doctor._id)) {
        patient.approvedDoctors.push(doctor._id);
      }
      if (!doctor.approvedPatients.includes(patient._id)) {
        doctor.approvedPatients.push(patient._id);
      }

      // Create info notifications
      await createNotification(doctor._id, patient._id, 'info', `${patient.getFullName()} is now your patient.`);
      await createNotification(patient._id, doctor._id, 'info', `${doctor.getFullName()} is now your doctor.`);
    } else if (action === 'decline') {
      // Create decline notification only for the requester
      await createNotification(requester._id, responder._id, 'info', `${responder.getFullName()} has declined your request to be their ${responder.role === 'Doctor' ? 'patient' : 'doctor'}.`);
    }

    // Remove from pending requests
    patient.doctorRequests = patient.doctorRequests.filter(
      id => id.toString() !== doctor._id.toString()
    );

    await Promise.all([patient.save(), doctor.save()]);
    res.status(200).json({ message: 'Permission request handled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error handling permission request', error: error.message });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // for patients: doctors who have requested access
    // for doctors: patients who they have requested access to
    let requests;
    if (user.role === 'Patient') {
      requests = await User.find(
        { _id: { $in: user.doctorRequests }},
        'firstName lastName jobTitle'
      );
    } else {
      requests = await User.find(
        { doctorRequests: user._id },
        'firstName lastName'
      );
    }

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
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