const mongoose = require('mongoose');
const { Allele, AlleleFunction, AllelePhenotype } = require('./allele.model');

const testResultSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    testedGene: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gene',
        required: true
    },
    maternalAllele: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Allele',
        required: true
    },
    paternalAllele: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Allele',
        required: true
    },

    // Metadata
    testDate: {
        type: Date,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

testResultSchema.methods.getDiplotype = function() {
    return `${this.maternalAllele.getDisplayName()}/${this.paternalAllele.getDisplayName()}`;
}

// This is a drastic oversimplification of how phenotypes are determined but it'll suffice for demonstration purposes
testResultSchema.methods.getPhenotype = function() {
    const scoreMultipliers = {
        [AlleleFunction.INCREASED]: 3,
        [AlleleFunction.NORMAL]: 2,
        [AlleleFunction.DECREASED]: 1,
        [AlleleFunction.NONE]: 0
    }

    // We calculate an allele's activity score by multiplying the number of allele copies by an integer value corresponding to the allele function
    const maternalActivity = this.maternalAllele.numCopies * (scoreMultipliers[this.maternalAllele.alleleFunction] ?? 0);
    const paternalActivity = this.paternalAllele.numCopies * (scoreMultipliers[this.paternalAllele.alleleFunction] ?? 0);
    const activityScore = maternalActivity + paternalActivity;

    if(activityScore >= 6) {
        return AllelePhenotype.ULTRARAPID;
    } else if (activityScore >= 5) {
        return AllelePhenotype.RAPID;
    } else if (activityScore >= 3) {
        return AllelePhenotype.NORMAL;
    } else if (activityScore >= 2) {
        return AllelePhenotype.INTERMEDIATE;
    } else {
        return AllelePhenotype.POOR;
    }
}

const TestResult = mongoose.model('Test Result', testResultSchema);
module.exports = TestResult;
