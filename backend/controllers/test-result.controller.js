const TestResult = require("../models/test-result.model");
const Patient = require("../models/patient.model");
const Doctor = require("../models/doctor.model");
const Gene = require("../models/gene.model");
const Allele = require("../models/allele.model").Allele;
const ClinicalAnnotation = require("../models/clinical-annotation.model");
const Notification = require("../models/notification.model");
const Drug = require("../models/drug.model");

// Helper function to check authorization
const checkAuthorization = (req, result) => {
  if (req.user.role === "Patient" && req.user._id.toString() !== result.patient.toString()) {
    return { authorized: false, message: "You can only view your own test results" };
  }
  if (req.user.role === "Doctor" && !req.user.approvedPatients.includes(result.patient.toString())) {
    return { authorized: false, message: "Not authorized to view this test result" };
  }
  return { authorized: true };
};

// Helper function to fetch annotations and add detailed information
const addDetailsToResults = async (results) => {
  return await Promise.all(results.map(async result => {
    const annotations = await ClinicalAnnotation.find({
      associatedAllele: { $in: [result.maternalAllele._id, result.paternalAllele._id] }
    }).populate("associatedDrug");

    const affectedMedications = annotations.map(annotation => ({
      _id: annotation._id,
      associatedAllele: annotation.associatedAllele._id,
      associatedDrug: annotation.associatedDrug,
      description: annotation.description
    }));

    return {
      ...result.toObject(),
      phenotype: result.getPhenotype(),
      diplotype: result.getDiplotype(),
      maternalAlleleDisplayName: result.maternalAllele.getDisplayName(),
      paternalAlleleDisplayName: result.paternalAllele.getDisplayName(),
      affectedMedications
    };
  }));
};


exports.create = async (req, res) => {
  try {
    const { patientId, testedGene, maternalAllele, paternalAllele, testDate } =
      req.body;
    // Verify the user has permission to create this test result
    if (req.user.role === "Patient" && req.user._id.toString() !== patientId) {
      return res.status(403).json({
        message: "Patients can only add test results to their own profile",
      });
    }
    if (
      req.user.role === "Doctor" &&
      !req.user.approvedPatients.includes(patientId)
    ) {
      return res.status(403).json({
        message: "You are not authorized to add test results for this patient",
      });
    }

    const testResult = new TestResult({
      patient: patientId,
      testedGene,
      maternalAllele,
      paternalAllele,
      testDate,
      uploadDate: new Date(),
      uploadedBy: req.user._id,
    });
    await testResult.save();
    // Update patient's test results
    await Patient.findByIdAndUpdate(patientId, {
      $push: { testResults: testResult._id },
    });
    // Create notifications
    const patient = await Patient.findById(patientId);
    const doctor = req.user.role === "Doctor" ? req.user : null;

    if (doctor) {
      // Notification for doctor
      const doctorNotification = new Notification({
        receiver: doctor._id,
        sender: patient._id,
        type: 'test-result',
        message: `You uploaded a test result for your patient ${patient.getFullName()}.`
      });
      await doctorNotification.save();

      // Notification for patient
      const patientNotification = new Notification({
        receiver: patient._id,
        sender: doctor._id,
        type: 'test-result',
        message: `A new test result was uploaded by your doctor ${doctor.getFullName()}.`

      });
      await patientNotification.save();
    } else {
      // Notification for patient
      const patientNotification = new Notification({
        receiver: patient._id,
        sender: patient._id,
        type: 'test-result',
        message: `You uploaded a test result.`
      });
      await patientNotification.save();

      // Notifications for all approved doctors
      const approvedDoctors = await Doctor.find({ approvedPatients: patient._id });
      for (const doc of approvedDoctors) {
        const doctorNotification = new Notification({
          receiver: doc._id,
          sender: patient._id,
          type: 'test-result',
          message: `A new test result was uploaded by your patient ${patient.getFullName()}.`
        });
        await doctorNotification.save();
      }
    }
    res.status(200).json({
      message: "Test result created successfully",
      testResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating test result",
      error: error.message,
    });
  }
};

exports.getPatientResults = async (req, res) => {
  try {
    const { patientId } = req.params;
    // Check if the requesting user has permission to view these results
    if (req.user.role === "Patient" && req.user._id.toString() !== patientId) {
      return res.status(403).json({
        message: "You can only view your own test results",
      });
    }
    if (
      req.user.role === "Doctor" &&
      !req.user.approvedPatients.includes(patientId)
    ) {
      return res.status(403).json({
        message: "You are not authorized to view this patient's results",
      });
    }
    const results = await TestResult.find({ patient: patientId })
      .populate("testedGene")
      .populate("maternalAllele")
      .populate("paternalAllele")
      .populate("uploadedBy", "firstName lastName");

      const resultsWithDetails = await addDetailsToResults(results);
      res.status(200).json(resultsWithDetails);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test results",
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TestResult.findById(id)
      .populate("testedGene")
      .populate("maternalAllele")
      .populate("paternalAllele")
      .populate("uploadedBy", "firstName lastName");

    if (!result) {
      return res.status(404).json({ message: "Test result not found" });
    }
    // Check authorization
    const { authorized, message } = checkAuthorization(req, result);
    if (!authorized) {
      return res.status(403).json({ message });
    }

    const annotations = await ClinicalAnnotation.find({
      associatedAllele: { $in: [result.maternalAllele._id, result.paternalAllele._id] }
    }).populate("associatedDrug");

    const resultsWithDetails = await addDetailsToResults([result]);
    res.status(200).json(resultsWithDetails[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test result",
      error: error.message,
    });
  }
};

exports.getResultsByGeneId = async (req, res) => {
  try {
    const { geneId } = req.params;
    const results = await TestResult.find({ testedGene: geneId })
      .populate("testedGene")
      .populate("maternalAllele")
      .populate("paternalAllele")
      .populate("uploadedBy", "firstName lastName");

      if (!results) {
        return res.status(404).json({ message: "Test result not found" });
      }

      const authorizedResults = results.filter(result => {
        const { authorized } = checkAuthorization(req, result);
        return authorized;
      });
  
    const resultsWithDetails = await addDetailsToResults(authorizedResults);
    res.status(200).json(resultsWithDetails);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test results by gene",
      error: error.message,
    });
  }
};

exports.getResultsByGeneName = async (req, res) => {
  try {
    const { geneName } = req.params;

    // Find the gene by name or alternate names
    const gene = await Gene.findOne({
      $or: [
        { geneName: geneName },
        { altNames: geneName }
      ]
    });

    if (!gene) {
      return res.status(404).json({ message: "Gene not found" });
    }

    const results = await TestResult.find({ testedGene: gene._id })
      .populate("testedGene")
      .populate("maternalAllele")
      .populate("paternalAllele")
      .populate("uploadedBy", "firstName lastName");

    if (!results) {
      return res.status(404).json({ message: "Test results not found" });
    }

    const authorizedResults = results.filter(result => {
      const { authorized } = checkAuthorization(req, result);
      return authorized;
    });

    const resultsWithDetails = await addDetailsToResults(authorizedResults);
    res.status(200).json(resultsWithDetails);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test results by gene",
      error: error.message,
    });
  }
};

exports.getResultsByDrugId = async (req, res) => {
  try {
    const { drugId } = req.params;
    
    // Find all clinical annotations associated with the drug
    const annotations = await ClinicalAnnotation.find({ associatedDrug: drugId }).populate("associatedAllele");
    const alleleIds = annotations.map(annotation => annotation.associatedAllele._id);

    const results = await TestResult.find({
      $or: [
        { maternalAllele: { $in: alleleIds } },
        { paternalAllele: { $in: alleleIds } }
      ]
    })
      .populate("testedGene")
      .populate("maternalAllele")
      .populate("paternalAllele")
      .populate("uploadedBy", "firstName lastName");

      if (!results) {
        return res.status(404).json({ message: "Test results not found" });
      }
    // Filter results based on user authorization
    const authorizedResults = results.filter(result => {
      const { authorized } = checkAuthorization(req, result);
      return authorized;
    });

    const resultsWithDetails = await addDetailsToResults(authorizedResults);
    res.status(200).json(resultsWithDetails);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test results by drug",
      error: error.message,
    });
  }
};

exports.getResultsByDrugName = async (req, res) => {
  try {
    const { drugName } = req.params;

    // Find the drug by name or alternate names
    const drug = await Drug.findOne({
      $or: [
        { drugName: drugName },
        { altNames: drugName }
      ]
    });

    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    // Find all clinical annotations associated with the drug
    const annotations = await ClinicalAnnotation.find({ associatedDrug: drug._id }).populate("associatedAllele");
    const alleleIds = annotations.map(annotation => annotation.associatedAllele._id);

    const results = await TestResult.find({
      $or: [
        { maternalAllele: { $in: alleleIds } },
        { paternalAllele: { $in: alleleIds } }
      ]
    })
      .populate("testedGene")
      .populate("maternalAllele")
      .populate("paternalAllele")
      .populate("uploadedBy", "firstName lastName");

    if (!results) {
      return res.status(404).json({ message: "Test results not found" });
    }

    // Filter results based on user authorization
    const authorizedResults = results.filter(result => {
      const { authorized } = checkAuthorization(req, result);
      return authorized;
    });

    const resultsWithDetails = await addDetailsToResults(authorizedResults);
    res.status(200).json(resultsWithDetails);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test results by drug",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await TestResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Test result not found" });
    }
    // Verify permissions
    if (
      req.user.role === "Patient" &&
      result.patient.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only update your own test results",
      });
    }
    if (
      req.user.role === "Doctor" &&
      !req.user.approvedPatients.includes(result.patient)
    ) {
      return res.status(403).json({
        message: "You are not authorized to update this test result",
      });
    }
    const updatedResult = await TestResult.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        uploadDate: new Date(),
        uploadedBy: req.user._id,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Test result updated successfully",
      testResult: updatedResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating test result",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await TestResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Test result not found" });
    }
    // Verify permissions
    if (
      req.user.role === "Patient" &&
      result.patient.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only delete your own test results",
      });
    }
    if (
      req.user.role === "Doctor" &&
      !req.user.approvedPatients.includes(result.patient)
    ) {
      return res.status(403).json({
        message: "You are not authorized to delete this test result",
      });
    }
    // Remove test result reference from patient
    await Patient.findByIdAndUpdate(result.patient, {
      $pull: { testResults: result._id },
    });
    await TestResult.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Test result deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting test result",
      error: error.message,
    });
  }
};
