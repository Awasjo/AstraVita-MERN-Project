const express = require('express');
const router = express.Router();
const testResultController = require('../controllers/test-result.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.isAuthenticated, testResultController.create);
router.get('/patient/:patientId', authMiddleware.isAuthenticated, testResultController.getPatientResults);
router.get('/gene/name/:geneName', authMiddleware.isAuthenticated, testResultController.getResultsByGeneName);
router.get('/drug/name/:drugName', authMiddleware.isAuthenticated, testResultController.getResultsByDrugName);
router.get('/gene/:geneId', authMiddleware.isAuthenticated, testResultController.getResultsByGeneId);
router.get('/drug/:drugId', authMiddleware.isAuthenticated, testResultController.getResultsByDrugId);
router.get('/:id', authMiddleware.isAuthenticated, testResultController.getById);
router.put('/:id', authMiddleware.isAuthenticated, testResultController.update);
router.delete('/:id', authMiddleware.isAuthenticated, testResultController.delete);
router.delete('/patient/:patientId', authMiddleware.isAuthenticated, testResultController.deleteAllFromPatient);

module.exports = router; 