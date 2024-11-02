const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');
const authMiddleware = require('../middleware/auth.middleware');

// Authentication routes
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('Session after login:', req.session);
  console.log('req.session.passport.user:', req.session.passport.user);
  res.json({ message: 'Login successful', user: { id: req.user._id, username: req.user.username, role: req.user.role } });
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.json({ message: 'Logout successful' });
  });
});

// Common routes
router.post('/set-online-status', authMiddleware.isAuthenticated, userController.setOnlineStatus);


// Get all doctors and patients, this might be only useful for the admin, 
//currently anyone who is logged in can see all doctors and patients 
router.get('/doctors', authMiddleware.isAuthenticated, userController.getAllDoctors);
router.get('/patients', authMiddleware.isAuthenticated, userController.getAllPatients);

// Patient routes
router.post('/patients/request-doctor-permission/:doctorId', authMiddleware.requireRole('Patient'), userController.patientRequestDoctorPermission);
router.post('/patients/handle-doctor-permission', authMiddleware.requireRole('Patient'), userController.patientHandleDoctorPermission);
router.get('/patients/doctor-requests', authMiddleware.requireRole('Patient'), userController.getPatientDoctorRequests);
router.get('/patients/doctors', authMiddleware.requireRole('Patient'), userController.getPatientDoctors);

// Doctor routes
//Please update front end routes as these URL has been changed since commit f03c1fd1bcf11cb1f862c5d28280df993500a967
router.get('/doctors/patient-permission-requests', authMiddleware.requireRole('Doctor'), userController.getDoctorPermissionRequests);
router.post('/doctors/handle-permission-request', authMiddleware.requireRole('Doctor'), userController.handlePermissionRequest);
router.post('/doctors/request-patient-permission/:patientId', authMiddleware.requireRole('Doctor'), userController.doctorRequestPatientPermission);
router.get('/doctors/patients', authMiddleware.requireRole('Doctor'), userController.getDoctorPatients);
router.get('/doctors/patients/search', authMiddleware.isAuthenticated, userController.searchPatients);

// Get user
router.get('/me', (req, res) => {
  console.log('req.user:', req.user);
  if (req.isAuthenticated()) {
    const { _id, username, role } = req.user;
    res.json({ _id, username, role });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// CRUD operations
router.post('/register', userController.create);
router.get('/', authMiddleware.isAuthenticated, userController.getAll);
router.get('/:id', authMiddleware.isAuthenticated, userController.getById);
router.put('/:id', authMiddleware.isAuthenticated, userController.update);
router.delete('/:id', authMiddleware.isAuthenticated, userController.delete);




module.exports = router;
