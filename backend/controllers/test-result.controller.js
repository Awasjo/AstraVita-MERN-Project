const TestResult = require("../models/test-result.model");
const Patient = require("../models/patient.model");
const Doctor = require("../models/doctor.model");
const Gene = require("../models/gene.model");
const Allele = require("../models/allele.model").Allele;
const ClinicalAnnotation = require("../models/clinical-annotation.model");
const Notification = require("../models/notification.model");

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

    const resultsWithPhenotypeAndDiplotype = await Promise.all(results.map(async result => {
      const annotations = await ClinicalAnnotation.find({
        associatedAllele: { $in: [result.maternalAllele._id, result.paternalAllele._id] }
      }).populate("associatedDrug");

      return {
        ...result.toObject(),
        phenotype: result.getPhenotype(),
        diplotype: result.getDiplotype(),
        maternalAlleleDisplayName: result.maternalAllele.getDisplayName(),
        paternalAlleleDisplayName: result.paternalAllele.getDisplayName(),
        affectedMedications: annotations.length > 0 ? annotations : [{ description: "No affected medications." }]
      };
    }));

    res.status(200).json(resultsWithPhenotypeAndDiplotype);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test results",
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await TestResult.findById(req.params.id)
      .populate("testedGene")
      .populate("maternalAllele")
      .populate("paternalAllele")
      .populate("uploadedBy", "firstName lastName");

    if (!result) {
      return res.status(404).json({ message: "Test result not found" });
    }
    // Check authorization
    if (
      req.user.role === "Patient" &&
      req.user._id.toString() !== result.patient.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You can only view your own test results" });
    }
    if (
      req.user.role === "Doctor" &&
      !req.user.approvedPatients.includes(result.patient)
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this test result" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test result",
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
