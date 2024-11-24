const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');
const authMiddleware = require('../middleware/auth.middleware');

// Authentication routes
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('Session after login:', req.session);
  console.log('req.session.passport.user:', req.session.passport.user);

  res.json({
    message: 'Login successful',
    user: {
      id: req.user._id,
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role
    }
  });
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
router.get('/patients/doctors', authMiddleware.requireRole('Patient'), userController.getPatientDoctors);

// Doctor routes
router.get('/doctors/patients', authMiddleware.requireRole('Doctor'), userController.getDoctorPatients);
router.get('/doctors/patients/search', authMiddleware.isAuthenticated, userController.searchPatients);


//permission routes
router.post('/request-permission/:targetId', authMiddleware.isAuthenticated, userController.requestPermission); //not implemented in frontend yet
router.post('/handle-permission-request', authMiddleware.isAuthenticated, userController.handlePermissionRequest); //implemented in frontend
router.get('/permission-requests', authMiddleware.isAuthenticated, userController.getPendingRequests); //not implemented in frontend yet

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
