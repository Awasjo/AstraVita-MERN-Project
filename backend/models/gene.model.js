const mongoose = require('mongoose');

const geneSchema = new mongoose.Schema({
    geneName: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    // Alternate names for gene; used when querying test results by gene name
    altNames: [{
        type: mongoose.Schema.Types.String
    }],
    description: {
        type: mongoose.Schema.Types.String
    },
    namedAlleles: [{
        type: mongoose.Schema.Types.String,
        ref: 'Allele'
    }]
});

const Gene = mongoose.model('Gene', geneSchema);
module.exports = Gene;
