const mongoose = require('mongoose');

// ENUMS
const AlleleFunction = Object.freeze({
    INCREASED: 'INCREASED_FUNCTION',
    NORMAL: 'NORMAL_FUNCTION',
    DECREASED: 'DECREASED_FUNCTION',
    NONE: 'NO_FUNCTION'
});
module.exports.AlleleFunction = AlleleFunction;

const AllelePhenotype = Object.freeze({
    ULTRARAPID: 'UM_ULTRARAPID',
    RAPID: 'RM_RAPID',
    NORMAL: 'NM_NORMAL',
    INTERMEDIATE: 'IM_INTERMEDIATE',
    POOR: 'PM_POOR'
});
module.exports.AllelePhenotype = AllelePhenotype;

// SCHEMA
const alleleSchema = new mongoose.Schema({
    alleleName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    numCopies: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 1
    },
    parentGene: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gene',
        required: true
    },
    alleleFunction: {
        type: mongoose.Schema.Types.String,
        enum: [AlleleFunction.INCREASED, AlleleFunction.NORMAL, AlleleFunction.DECREASED, AlleleFunction.NONE],
        required: true
    }
});

alleleSchema.methods.getDisplayName = function() {
    if(this.numCopies > 1) {
        return `${this.alleleName}x${this.numCopies}`;
    }
    return this.alleleName;
};

const Allele = mongoose.model('Allele', alleleSchema);
module.exports.Allele = Allele;
