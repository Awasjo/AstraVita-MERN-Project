const mongoose = require('mongoose');

// ENUM
const AlleleFunction = Object.freeze({
    Normal: Symbol('NORMAL_FUNCTION'),
    Increased: Symbol('INCREASED_FUNCTION'),
    Decreased: Symbol('DECREASED_FUNCTION'),
    None: Symbol('NO_FUNCTION')
});
module.exports = AlleleFunction;

const alleleSchema = new mongoose.Schema({
    alleleName: { type: mongoose.Schema.Types.String, required: true, unique: true },
    numCopies: { type: mongoose.Schema.Types.Number, required: true, default: 1 },
    parentGene: { type: mongoose.Schema.Types.ObjectId, ref: 'Gene', required: true },
    alleleFunction: { type: mongoose.Schema.Types.String, required: true }
});

alleleSchema.methods.getDisplayName = function() {
    if(this.numCopies > 1) {
        return `${this.alleleName}x${this.numCopies}`;
    }
    return this.alleleName;
};

const Allele = mongoose.model('Allele', alleleSchema);
module.exports = Allele;
