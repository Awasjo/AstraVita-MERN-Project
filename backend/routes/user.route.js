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
router.post('/patients/request-permission/:doctorId', authMiddleware.requireRole('Patient'), userController.requestPermission);
router.get('/patients/doctors', authMiddleware.requireRole('Patient'), userController.getPatientDoctors);

// Doctor routes
router.get('/doctors/permission-requests', authMiddleware.requireRole('Doctor'), userController.getPermissionRequests);
router.post('/doctors/handle-permission-request', authMiddleware.requireRole('Doctor'), userController.handlePermissionRequest);
router.get('/doctors/patients', authMiddleware.requireRole('Doctor'), (req, res) => {
  console.log('User authenticated:', req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log('User role:', req.user.role);
  }
  userController.getDoctorPatients(req, res);
});


// CRUD operations
router.post('/register', userController.create);
router.get('/', authMiddleware.isAuthenticated, userController.getAll);
router.get('/:id', authMiddleware.isAuthenticated, userController.getById);
router.put('/:id', authMiddleware.isAuthenticated, userController.update);
router.delete('/:id', authMiddleware.isAuthenticated, userController.delete);

module.exports = router;
