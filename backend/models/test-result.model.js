const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    testedGene: { type: mongoose.Schema.Types.ObjectId, ref: 'Gene', required: true },
    maternalAllele: { type: mongoose.Schema.Types.ObjectId, ref: 'Allele', required: true },
    paternalAllele: { type: mongoose.Schema.Types.ObjectId, ref: 'Allele', required: true },

    // Metadata
    testDate: { type: Date, required: true },
    uploadDate: { type: Date, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

testResultSchema.methods.getDiplotype = function() {
    // TO-DO
}

testResultSchema.methods.getPhenotype = function() {
    // TO-DO
}

const TestResult = mongoose.model('Test Result', testResultSchema);
module.exports = TestResult;
