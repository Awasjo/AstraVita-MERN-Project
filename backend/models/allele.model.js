const mongoose = require('mongoose');

// ENUMS
const AlleleFunction = Object.freeze({
    INCREASED: 3,
    NORMAL: 2,
    DECREASED: 1,
    NONE: 0
});
module.exports.AlleleFunction = AlleleFunction;

const AllelePhenotype = Object.freeze({
    ULTRARAPID: 4,
    RAPID: 3,
    NORMAL: 2,
    INTERMEDIATE: 1,
    POOR: 0
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
