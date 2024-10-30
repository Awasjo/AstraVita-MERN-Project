// This is an association class that maps the relationship between Allele and Drug

const mongoose = require('mongoose');

const clinicalAnnotationSchema = new mongoose.Schema({
    associatedAllele: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Allele',
        required: true
    },
    associatedDrug: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drug',
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String
    }
});

const ClinicalAnnotation = mongoose.model('Clinical Annotation', clinicalAnnotationSchema);
module.exports = ClinicalAnnotation;
