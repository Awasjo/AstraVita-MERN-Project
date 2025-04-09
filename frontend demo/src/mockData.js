export const mockDoctors = [
  {
    _id: "doctor1",
    id: "doctor1",
    firstName: "Sarah",
    lastName: "Johnson",
    username: "dr.johnson",
    email: "sarah.johnson@example.com",
    role: "Doctor",
    specialty: "Genetics",
    patients: ["patient1", "patient2"]
  },
  {
    _id: "doctor2",
    id: "doctor2",
    firstName: "Michael",
    lastName: "Chen",
    username: "dr.chen",
    email: "michael.chen@example.com",
    role: "Doctor",
    specialty: "Pharmacology",
    patients: ["patient3"]
  }
];

export const mockPatients = [
  {
    _id: "patient1",
    id: "patient1",
    firstName: "John",
    lastName: "Smith",
    username: "jsmith",
    email: "john.smith@example.com",
    role: "Patient",
    doctors: ["doctor1"]
  },
  {
    _id: "patient2",
    id: "patient2",
    firstName: "Emily",
    lastName: "Davis",
    username: "edavis",
    email: "emily.davis@example.com",
    role: "Patient",
    doctors: ["doctor1"]
  },
  {
    _id: "patient3",
    id: "patient3",
    firstName: "Robert",
    lastName: "Wilson",
    username: "rwilson",
    email: "robert.wilson@example.com",
    role: "Patient",
    doctors: ["doctor2"]
  }
];

export const mockTestResults = [
  {
    _id: "test1",
    patientId: "patient1",
    testedGene: {
      geneName: "CYP2C9",
      geneDescription: "Cytochrome P450 Family 2 Subfamily C Member 9"
    },
    diplotype: "*1/*3",
    phenotype: "Intermediate Metabolizer",
    testDate: "2024-05-20T05:12:09.000Z",
    uploadDate: "2024-05-21T09:30:00.000Z",
    uploadedBy: {
      firstName: "Sarah",
      lastName: "Johnson"
    },
    affectedMedications: [
      {
        associatedDrug: {
          drugName: "Warfarin"
        },
        description: "Patients with this genotype might require lower doses of warfarin. Close monitoring is recommended."
      },
      {
        associatedDrug: {
          drugName: "Phenytoin"
        },
        description: "Increased risk of toxicity. Consider dose reduction and monitoring plasma concentrations."
      }
    ]
  },
  {
    _id: "test2",
    patientId: "patient1",
    testedGene: {
      geneName: "CYP3A5",
      geneDescription: "Cytochrome P450 Family 3 Subfamily A Member 5"
    },
    diplotype: "*1/*1",
    phenotype: "Normal Metabolizer",
    testDate: "2024-04-27T22:03:52.000Z",
    uploadDate: "2024-04-28T11:15:00.000Z",
    uploadedBy: {
      firstName: "Sarah",
      lastName: "Johnson"
    },
    affectedMedications: [
      {
        associatedDrug: {
          drugName: "Tacrolimus"
        },
        description: "Standard dosing is appropriate for this genotype."
      }
    ]
  },
  {
    _id: "test3",
    patientId: "patient2",
    testedGene: {
      geneName: "DPYD",
      geneDescription: "Dihydropyrimidine Dehydrogenase"
    },
    diplotype: "*1/*2A",
    phenotype: "Intermediate Metabolizer",
    testDate: "2024-03-15T14:30:00.000Z",
    uploadDate: "2024-03-16T10:45:00.000Z",
    uploadedBy: {
      firstName: "Sarah",
      lastName: "Johnson"
    },
    affectedMedications: [
      {
        associatedDrug: {
          drugName: "5-Fluorouracil"
        },
        description: "Increased risk of toxicity. Consider 50% dose reduction and monitor closely."
      },
      {
        associatedDrug: {
          drugName: "Capecitabine"
        },
        description: "Consider alternative therapy or 50% dose reduction with careful monitoring."
      }
    ]
  }
];

export const mockMessages = {
  "doctor1_patient1": [
    {
      sender: "doctor1",
      receiver: "patient1",
      content: "Hello John, I've reviewed your recent CYP2C9 test results. We need to discuss adjusting your warfarin dosage.",
      timestamp: "2024-05-22T10:30:00.000Z"
    },
    {
      sender: "patient1",
      receiver: "doctor1",
      content: "Thanks Dr. Johnson. When would be a good time to discuss this?",
      timestamp: "2024-05-22T11:15:00.000Z"
    },
    {
      sender: "doctor1", 
      receiver: "patient1",
      content: "I have availability this Friday at 2pm. Does that work for you?",
      timestamp: "2024-05-22T11:30:00.000Z"
    }
  ],
  "doctor1_patient2": [
    {
      sender: "doctor1",
      receiver: "patient2",
      content: "Emily, your DPYD test shows you're an intermediate metabolizer. We should adjust your chemotherapy regimen.",
      timestamp: "2024-03-17T09:00:00.000Z"
    },
    {
      sender: "patient2",
      receiver: "doctor1",
      content: "I'm concerned about what this means for my treatment. Can we discuss soon?",
      timestamp: "2024-03-17T10:12:00.000Z"
    },
    {
      sender: "doctor1",
      receiver: "patient2",
      content: "Of course. I'll call you this afternoon to go over the implications and our next steps.",
      timestamp: "2024-03-17T10:30:00.000Z"
    }
  ]
};

export const mockNotifications = [
  {
    _id: "notif1",
    type: "test-result",
    sender: "doctor1",
    receiver: "patient1",
    message: "Dr. Sarah Johnson has uploaded a new CYP2C9 test result to your profile.",
    createdDate: "2024-05-21T09:35:00.000Z",
    testResult: "test1"
  },
  {
    _id: "notif2",
    type: "requesting-permission",
    sender: "doctor2",
    receiver: "patient1",
    message: "Dr. Michael Chen is requesting permission to view your genetic test results.",
    createdDate: "2024-05-23T15:10:00.000Z"
  },
  {
    _id: "notif3",
    type: "message",
    sender: "patient2",
    receiver: "doctor1",
    message: "Emily Davis has sent you a new message regarding her treatment plan.",
    createdDate: "2024-03-18T08:20:00.000Z"
  }
];
