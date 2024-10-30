const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    drugName: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    // Alternate names for drug; used when querying test results by drug name
    altNames: [{
        type: mongoose.Schema.Types.String,
    }],
    description: {
        type: mongoose.Schema.Types.String
    }
});

const Drug = mongoose.model('Drug', drugSchema);
module.exports = Drug;
