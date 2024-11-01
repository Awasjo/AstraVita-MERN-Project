const express = require('express');
const router = express.Router();
const testResultController = require('../controllers/test-result.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Create new test result (both doctors and patients)
router.post('/', authMiddleware.isAuthenticated, testResultController.create);

// Get all test results for a patient
router.get('/patient/:patientId', authMiddleware.isAuthenticated, testResultController.getPatientResults);

// Get specific test result
router.get('/:id', authMiddleware.isAuthenticated, testResultController.getById);

// Update test result (both doctors and patients)
router.put('/:id', authMiddleware.isAuthenticated, testResultController.update);

// Delete test result (both doctors and patients)
router.delete('/:id', authMiddleware.isAuthenticated, testResultController.delete);

module.exports = router; 