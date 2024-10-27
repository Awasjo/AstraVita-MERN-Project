const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');
const authMiddleware = require('../middleware/auth.middleware');

// Authentication routes
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: { id: req.user._id, username: req.user.username, role: req.user.role } });
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.json({ message: 'Logout successful' });
  });
});

// CRUD operations
router.post('/', userController.create);
router.get('/', authMiddleware.isAuthenticated, userController.getAll);
router.get('/:id', authMiddleware.isAuthenticated, userController.getById);
router.put('/:id', authMiddleware.isAuthenticated, userController.update);
router.delete('/:id', authMiddleware.isAuthenticated, userController.delete);

// Doctor-specific routes
router.get('/doctor/patients', authMiddleware.requireRole('Doctor'), userController.getDoctorPatients);

// Patient-specific routes
router.get('/patient/doctors', authMiddleware.requireRole('Patient'), userController.getPatientDoctors);

module.exports = router;
