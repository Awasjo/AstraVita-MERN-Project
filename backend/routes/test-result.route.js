const express = require('express');
const router = express.Router();
const testResultController = require('../controllers/test-result.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.isAuthenticated, testResultController.create);
router.get('/patient/:patientId', authMiddleware.isAuthenticated, testResultController.getPatientResults);
router.get('/:id', authMiddleware.isAuthenticated, testResultController.getById);
router.put('/:id', authMiddleware.isAuthenticated, testResultController.update);
router.delete('/:id', authMiddleware.isAuthenticated, testResultController.delete);

module.exports = router; 