import { 
  UserProfile, 
  SchemeRule, 
  StudentDocument, 
  ApplicationRecord, 
  DBTDisbursementRecord, 
  FellowshipLifecycle, 
  AuditLogEntry, 
  NotificationItem 
} from '../types';

export const mockStudentUser: UserProfile = {
  id: 'STU-2026-8819',
  name: 'Aarav Kumar',
  nameHi: 'आरव कुमार',
  email: 'student@demo.in',
  role: 'student',
  studentId: 'ST-JH-2024-0982',
  tribeGroup: 'Santhal (Scheduled Tribe)',
  state: 'Jharkhand',
  academicLevel: 'Post Graduate (M.Tech - AI & Data Science)',
  institution: 'National Institute of Technology, Jamshedpur',
  incomeBand: '₹ 1,80,000 / annum'
};

export const mockOfficialUser: UserProfile = {
  id: 'OFF-2026-0412',
  name: 'Dr. Rameshwar Meena',
  nameHi: 'डॉ. रामेश्वर मीणा',
  email: 'official@demo.in',
  role: 'official',
  officialDesignation: 'Director of Scrutiny & Sanctions',
  department: 'Scholarship Division, Ministry of Tribal Affairs (Demo)',
  state: 'New Delhi'
};

export const initialSchemes: SchemeRule[] = [
  {
    id: 'scheme-post-matric',
    name: 'Post-Matric Scholarship for ST Students',
    nameHi: 'अनुसूचित जनजाति के विद्यार्थियों हेतु मैट्रिकोत्तर छात्रवृत्ति योजना',
    code: 'PMS-ST-2026',
    ministry: 'Ministry of Tribal Affairs',
    level: 'Post-Matric',
    maxIncome: 250000,
    annualGrant: '₹ 45,000 - ₹ 85,000 / year',
    targetCategory: 'Scheduled Tribes (Class XI to Post-Graduate)',
    deadline: '2026-11-30',
    description: 'Centrally sponsored financial assistance enabling ST students to pursue higher education at recognized post-secondary institutions across India.',
    descriptionHi: 'अनुसूचित जनजाति के छात्रों को मान्यता प्राप्त संस्थानों में उच्च शिक्षा जारी रखने हेतु केंद्रीय सहायता योजना।',
    eligibilityCriteria: [
      'Belong to Scheduled Tribe community with valid state certificate',
      'Total annual family income must not exceed ₹2,50,000',
      'Enrolled in recognized Post-Matric / Post-Secondary courses',
      'Maintaining minimum satisfactory academic attendance'
    ],
    eligibilityCriteriaHi: [
      'सक्षम प्राधिकारी द्वारा जारी वैध अनुसूचित जनजाति प्रमाण पत्र',
      'परिवार की कुल वार्षिक आय ₹2,50,000 से अधिक न हो',
      'मान्यता प्राप्त उच्च शिक्षण संस्थान में नियमित प्रवेश',
      'संतोषजनक शैक्षणिक उपस्थिति एवं प्रगति'
    ],
    requiredDocuments: [
      'Aadhaar / Identity Proof',
      'ST Caste Certificate',
      'Current Financial Year Income Certificate',
      'Previous Class Marksheet',
      'Fee Receipt / Admission Proof',
      'Aadhaar-seeded Bank Passbook'
    ],
    verificationRules: [
      'Automated Name Match vs Aadhaar',
      'Caste Certificate validity & issuing authority verification',
      'Income Certificate issued within past 12 months',
      'Cross-document name and DOB alignment check'
    ],
    selectionMode: 'Merit-cum-Means',
    active: true,
    matchScore: 96
  },
  {
    id: 'scheme-national-fellowship',
    name: 'National Fellowship for Higher Education of ST Students',
    nameHi: 'अनुसूचित जनजाति के छात्रों हेतु राष्ट्रीय उच्च शिक्षा अध्येतावृत्ति योजना',
    code: 'NFST-2026',
    ministry: 'Ministry of Tribal Affairs',
    level: 'Fellowship',
    maxIncome: 600000,
    annualGrant: '₹ 35,000/month + Contingency ₹ 20,500/year',
    targetCategory: 'Scheduled Tribes (M.Phil / Ph.D. Scholars)',
    deadline: '2026-12-15',
    description: 'Prestige research fellowship for ST scholars pursuing full-time M.Phil and Ph.D. degrees in Science, Humanities, Engineering, and Social Sciences.',
    descriptionHi: 'मान्यता प्राप्त विश्वविद्यालयों में एम.फिल एवं पी.एचडी. शोधरत अनुसूचित जनजाति अध्येताओं हेतु प्रतिष्ठित शोधवृत्ति।',
    eligibilityCriteria: [
      'ST candidate admitted into full-time M.Phil / Ph.D. program',
      'Postgraduate degree with minimum 55% marks',
      'Family income limit up to ₹6,00,000 per annum',
      'UGC / CSIR / ICMR / University recognized registration'
    ],
    eligibilityCriteriaHi: [
      'पूर्णकालिक एम.फिल / पी.एचडी. शोध में नियमित पंजीकृत छात्र',
      'स्नातकोत्तर में न्यूनतम 55% प्राप्तांक',
      'पारिवारिक वार्षिक आय सीमा ₹6,00,000 तक',
      'यूजीसी/सीएसआईआर/विश्वविद्यालय मान्यता प्राप्त गाइड'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Caste Certificate',
      'M.Phil / Ph.D. Admission / Registration Letter',
      'Guide Forwarding Recommendation',
      'PG Consolidated Marksheet',
      'Income Certificate'
    ],
    verificationRules: [
      'University registration number verification',
      'Research proposal synopsis alignment',
      'Cross-check prior UGC-NET / fellowship duplication'
    ],
    selectionMode: 'Direct Fellowship Scrutiny',
    active: true,
    matchScore: 89
  },
  {
    id: 'scheme-pre-matric',
    name: 'Pre-Matric Scholarship for ST Students',
    nameHi: 'अनुसूचित जनजाति विद्यार्थियों हेतु मैट्रिक-पूर्व छात्रवृत्ति योजना',
    code: 'PRE-ST-2026',
    ministry: 'Ministry of Tribal Affairs',
    level: 'Pre-Matric',
    maxIncome: 200000,
    annualGrant: '₹ 12,000 - ₹ 20,000 / year',
    targetCategory: 'Scheduled Tribes (Classes IX & X)',
    deadline: '2026-10-31',
    description: 'Supports ST children studying in Class IX and X to minimize dropout rates and prepare them for higher secondary studies.',
    descriptionHi: 'कक्षा 9वीं एवं 10वीं के अनुसूचित जनजाति के छात्रों के विद्यालयी ठहराव एवं प्रोत्साहन हेतु सहायता।',
    eligibilityCriteria: [
      'ST student studying in recognized Class IX or X',
      'Annual parental income not exceeding ₹2,00,000',
      'Day scholar or Hosteller in government/aided school'
    ],
    eligibilityCriteriaHi: [
      'मान्यता प्राप्त विद्यालय में कक्षा 9वीं या 10वीं में अध्ययनरत',
      'माता-पिता की कुल वार्षिक आय ₹2,00,000 से कम',
      'शासकीय या सहायता प्राप्त विद्यालय में नियमित छात्र'
    ],
    requiredDocuments: ['Aadhaar', 'Caste Certificate', 'Income Certificate', 'School Bonafide Certificate'],
    verificationRules: ['School UDISE code check', 'Income certificate validity'],
    selectionMode: 'Merit-cum-Means',
    active: true,
    matchScore: 42
  },
  {
    id: 'scheme-national-overseas',
    name: 'National Overseas Scholarship for ST Students',
    nameHi: 'अनुसूचित जनजाति विद्यार्थियों हेतु राष्ट्रीय विदेशी छात्रवृत्ति योजना',
    code: 'NOS-ST-2026',
    ministry: 'Ministry of Tribal Affairs',
    level: 'Overseas',
    maxIncome: 600000,
    annualGrant: 'Full Tuition + £ 9,900 / $ 15,400 Living Allowance',
    targetCategory: 'ST Students pursuing Masters & Ph.D. Abroad in Top 500 Universities',
    deadline: '2026-12-31',
    description: 'Provides financial support to meritorious ST scholars for studying Masters and Doctoral degrees in top global institutions abroad.',
    descriptionHi: 'शीर्ष विदेशी विश्वविद्यालयों में स्नातकोत्तर एवं डॉक्टरेट अध्ययन हेतु पूर्ण वित्तीय संबल।',
    eligibilityCriteria: [
      'ST candidate with unconditional offer letter from QS Top 500 university',
      'Minimum 60% marks in qualifying degree',
      'Family income below ₹6,00,000 per annum',
      'Age below 35 years as on application date'
    ],
    eligibilityCriteriaHi: [
      'क्यूएस टॉप 500 विदेशी विश्वविद्यालय से अप्रतिबंधित प्रवेश प्रस्ताव',
      'पूर्व डिग्री में न्यूनतम 60% अंक',
      'वार्षिक पारिवारिक आय ₹6 लाख से कम',
      'अधिकतम आयु सीमा 35 वर्ष'
    ],
    requiredDocuments: ['Valid Passport', 'Offer Letter', 'ST Certificate', 'GRE/IELTS Scores', 'Income Certificate'],
    verificationRules: ['Passport validity check', 'University QS rank check', 'Embassy attestation readiness'],
    selectionMode: 'Overseas Board Review',
    active: true,
    matchScore: 78
  }
];

export const initialDocuments: StudentDocument[] = [
  {
    id: 'doc-aadhaar',
    type: 'Aadhaar',
    title: 'Aadhaar Card (Identity & Address)',
    titleHi: 'आधार कार्ड (पहचान एवं पता)',
    fileName: 'Aarav_Kumar_Aadhaar_UIDAI.pdf',
    fileSize: '412 KB',
    uploadDate: '2026-08-14',
    status: 'Verified',
    aiConfidence: 99.4,
    extractedData: {
      name: 'Aarav Kumar',
      dob: '2002-05-18',
      certificateNumber: 'XXXXXXXX4829',
      issuingAuthority: 'UIDAI'
    }
  },
  {
    id: 'doc-caste',
    type: 'ST Certificate',
    title: 'ST Caste Certificate',
    titleHi: 'अनुसूचित जनजाति प्रमाण पत्र',
    fileName: 'Jharkhand_ST_Cert_Santhal.pdf',
    fileSize: '650 KB',
    uploadDate: '2026-08-14',
    status: 'Verified',
    aiConfidence: 97.8,
    extractedData: {
      name: 'Aarav Kumar',
      tribeName: 'Santhal (Scheduled Tribe)',
      certificateNumber: 'JH/ST/2021/87219',
      issuingAuthority: 'Sub-Divisional Officer, Ranchi'
    }
  },
  {
    id: 'doc-income',
    type: 'Income Certificate',
    title: 'Annual Income Certificate',
    titleHi: 'वार्षिक आय प्रमाण पत्र',
    fileName: 'Income_Certificate_2024.pdf',
    fileSize: '520 KB',
    uploadDate: '2026-08-14',
    status: 'Needs Attention',
    aiConfidence: 84.2,
    extractedData: {
      name: 'Aarav Kumar',
      annualIncome: '₹ 1,80,000',
      issueDate: '2024-03-20',
      validUntil: '2025-03-31',
      certificateNumber: 'JH/INC/2024/0912'
    },
    deficiencyReason: 'Document appears to be expired. Income Certificate must be valid for the current financial year (FY 2025-26).',
    deficiencyReasonHi: 'दस्तावेज़ की वैधता समाप्त प्रतीत होती है। आय प्रमाण पत्र चालू वित्तीय वर्ष (2025-26) के लिए वैध होना आवश्यक है।'
  },
  {
    id: 'doc-marksheet',
    type: 'Marksheet',
    title: 'B.Tech Consolidated Marksheet & Degree',
    titleHi: 'बी.टेक संचित अंकतालिका एवं डिग्री',
    fileName: 'BTech_Consolidated_Marksheet.pdf',
    fileSize: '1.2 MB',
    uploadDate: '2026-08-15',
    status: 'Verified',
    aiConfidence: 98.6,
    extractedData: {
      name: 'Aarav Kumar',
      issuingAuthority: 'National Institute of Technology',
      annualIncome: 'CGPA 8.74 / 10'
    }
  },
  {
    id: 'doc-admission',
    type: 'Admission Proof',
    title: 'M.Tech Admission Letter & Fee Receipt',
    titleHi: 'एम.टेक प्रवेश पत्र एवं शुल्क रसीद',
    fileName: 'NIT_Jamshedpur_Admission_2026.pdf',
    fileSize: '780 KB',
    uploadDate: '2026-08-15',
    status: 'Verified',
    aiConfidence: 96.1,
    extractedData: {
      name: 'Aarav Kumar',
      issuingAuthority: 'NIT Jamshedpur Academic Office',
      certificateNumber: 'ADM-2026-AI-042'
    }
  },
  {
    id: 'doc-bank',
    type: 'Bank Details',
    title: 'Bank Passbook (Aadhaar Seeded)',
    titleHi: 'बैंक पासबुक (आधार लिंक्ड)',
    fileName: 'SBI_Passbook_AadhaarSeeded.pdf',
    fileSize: '390 KB',
    uploadDate: '2026-08-15',
    status: 'Verified',
    aiConfidence: 99.0,
    extractedData: {
      name: 'Aarav Kumar',
      certificateNumber: 'SBI Acc: 3849XXXX1290',
      issuingAuthority: 'State Bank of India, Main Branch'
    }
  }
];

export const initialApplications: ApplicationRecord[] = [
  {
    id: 'JV-2026-001247',
    schemeId: 'scheme-post-matric',
    schemeName: 'Post-Matric Scholarship for ST Students',
    schemeNameHi: 'अनुसूचित जनजाति मैट्रिकोत्तर छात्रवृत्ति',
    studentName: 'Aarav Kumar',
    studentId: 'ST-JH-2024-0982',
    submissionDate: '2026-08-15',
    stage: 'scrutiny',
    status: 'Action Required',
    academicYear: '2026-27',
    grantAmount: '₹ 65,000 / year',
    institution: 'NIT Jamshedpur',
    course: 'M.Tech in Artificial Intelligence & Data Science',
    annualFamilyIncome: 180000,
    deficiencyCount: 1,
    aiVerificationSummary: {
      passedChecks: 5,
      totalChecks: 6,
      flags: ['Income Certificate date expired (March 2024 instead of FY 2025-26)'],
      confidence: 91.5
    },
    officerNotes: 'Identity and caste credentials verified through cross-document checks. Requires updated FY 2025-26 Income Certificate before proceeding to selection board sanction.',
    lastUpdated: '2026-09-28 11:30 AM'
  },
  {
    id: 'JV-2026-000892',
    schemeId: 'scheme-national-fellowship',
    schemeName: 'National Fellowship for Higher Education of ST Students',
    schemeNameHi: 'राष्ट्रीय उच्च शिक्षा अध्येतावृत्ति',
    studentName: 'Pooja Soren',
    studentId: 'ST-OD-2025-1104',
    submissionDate: '2026-07-20',
    stage: 'selection',
    status: 'Approved',
    academicYear: '2026-27',
    grantAmount: '₹ 4,20,000 / year',
    institution: 'IIT Bhubaneswar',
    course: 'Ph.D. in Renewable Energy & Microgrids',
    annualFamilyIncome: 240000,
    deficiencyCount: 0,
    aiVerificationSummary: {
      passedChecks: 7,
      totalChecks: 7,
      flags: [],
      confidence: 98.4
    },
    officerNotes: 'Scrutiny complete. Recommended for final selection committee approval and sanction order generation.',
    lastUpdated: '2026-10-01 04:15 PM'
  },
  {
    id: 'JV-2026-002319',
    schemeId: 'scheme-post-matric',
    schemeName: 'Post-Matric Scholarship for ST Students',
    schemeNameHi: 'अनुसूचित जनजाति मैट्रिकोत्तर छात्रवृत्ति',
    studentName: 'Birsa Munda',
    studentId: 'ST-JH-2026-3021',
    submissionDate: '2026-09-10',
    stage: 'disbursement',
    status: 'Sanction Generated',
    academicYear: '2026-27',
    grantAmount: '₹ 50,000 / year',
    institution: 'St. Xavier College, Ranchi',
    course: 'B.Sc. Computer Science',
    annualFamilyIncome: 140000,
    deficiencyCount: 0,
    aiVerificationSummary: {
      passedChecks: 6,
      totalChecks: 6,
      flags: [],
      confidence: 97.2
    },
    officerNotes: 'Sanction letter generated under order MOTA/ST/2026/894. Forwarded to DBT/PFMS gateway demo.',
    lastUpdated: '2026-10-02 09:20 AM'
  }
];

export const initialDisbursements: DBTDisbursementRecord[] = [
  {
    id: 'DBT-2026-001',
    applicationId: 'JV-2026-001247',
    studentName: 'Aarav Kumar',
    schemeName: 'Post-Matric Scholarship for ST Students',
    sanctionOrderNo: 'MOTA/ST/2026/SANCT-01247',
    sanctionDate: '2026-09-20',
    amount: 50000,
    bankName: 'State Bank of India',
    accountMasked: 'XXXX-XXXX-1290',
    ifscCode: 'SBIN0001842',
    dbtReference: 'DEMO-DBT-2026-001',
    status: 'DBT/PFMS Processing',
    timeline: {
      sanctionDate: '2026-09-20',
      paymentInitiatedDate: '2026-09-24',
      pfmsAcknowledgedDate: '2026-09-27'
    },
    isPrototype: true
  },
  {
    id: 'DBT-2026-002',
    applicationId: 'JV-2026-002319',
    studentName: 'Birsa Munda',
    schemeName: 'Post-Matric Scholarship for ST Students',
    sanctionOrderNo: 'MOTA/ST/2026/SANCT-02319',
    sanctionDate: '2026-09-18',
    amount: 50000,
    bankName: 'Punjab National Bank',
    accountMasked: 'XXXX-XXXX-9904',
    ifscCode: 'PUNB0182700',
    dbtReference: 'DEMO-DBT-2026-002',
    status: 'Payment Initiated',
    timeline: {
      sanctionDate: '2026-09-18',
      paymentInitiatedDate: '2026-09-22'
    },
    isPrototype: true
  }
];

export const initialFellowships: FellowshipLifecycle[] = [
  {
    id: 'FEL-2026-08',
    applicationId: 'JV-2026-000892',
    fellowName: 'Pooja Soren',
    researchTopic: 'AI-Guided Microgrid Resiliency for Remote Tribal Hamlets in Eastern Ghats',
    guideName: 'Prof. Subhasish Ray, Dept of Electrical Engg',
    institution: 'IIT Bhubaneswar',
    tenureYears: 5,
    currentYear: 2,
    currentQuarter: 3,
    stage: 'Periodic Progress',
    progressReportSubmitted: true,
    progressReportStatus: 'Approved',
    totalTranches: 10,
    disbursedTranches: 3
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'LOG-101',
    timestamp: '2026-10-02 10:17:42',
    actor: 'Dr. Rameshwar Meena',
    role: 'Official',
    action: 'Document Sent for Re-verification',
    targetId: 'JV-2026-001247',
    details: 'Triggered cross-document OCR validation on replacement Income Certificate.'
  },
  {
    id: 'LOG-100',
    timestamp: '2026-10-02 10:04:19',
    actor: 'Aarav Kumar',
    role: 'Student',
    action: 'Uploaded Replacement Document',
    targetId: 'JV-2026-001247',
    details: 'Uploaded updated FY 2025-26 Income Certificate issued by Tehsildar.'
  },
  {
    id: 'LOG-099',
    timestamp: '2026-10-01 09:51:04',
    actor: 'Dr. Rameshwar Meena',
    role: 'Official',
    action: 'Marked Deficiency',
    targetId: 'JV-2026-001247',
    details: 'Income certificate flagged: Certificate validity expired on 31 March 2025.'
  },
  {
    id: 'LOG-098',
    timestamp: '2026-10-01 09:42:30',
    actor: 'Dr. Rameshwar Meena',
    role: 'Official',
    action: 'Application Reviewed',
    targetId: 'JV-2026-001247',
    details: 'Opened application file for scrutiny verification.'
  },
  {
    id: 'LOG-097',
    timestamp: '2026-08-15 14:10:00',
    actor: 'JANVIDYA AI Subsystem',
    role: 'System AI',
    action: 'Automated OCR & Cross-Doc Check',
    targetId: 'JV-2026-001247',
    details: 'Completed verification pipeline: 5/6 checks passed. 1 discrepancy flag generated.'
  },
  {
    id: 'LOG-096',
    timestamp: '2026-08-15 14:02:18',
    actor: 'Aarav Kumar',
    role: 'Student',
    action: 'Application Submitted',
    targetId: 'JV-2026-001247',
    details: 'Successfully submitted Post-Matric Scholarship application for AY 2026-27.'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    timestamp: '15 mins ago',
    title: 'Income Certificate Requires Attention',
    titleHi: 'आय प्रमाण पत्र पर ध्यान देने की आवश्यकता है',
    message: 'Your Income Certificate for JV-2026-001247 has expired. Please upload an updated FY 2025-26 certificate.',
    messageHi: 'आवेदन JV-2026-001247 के लिए आपका आय प्रमाण पत्र पुराना है। कृपया वित्तीय वर्ष 2025-26 का अद्यतन प्रमाण पत्र अपलोड करें।',
    type: 'action_required',
    read: false,
    link: '/student/deficiency'
  },
  {
    id: 'notif-2',
    timestamp: '2 days ago',
    title: 'AI Verification Completed',
    titleHi: 'एआई सत्यापन पूर्ण हुआ',
    message: '5 out of 6 documents verified successfully. 1 document flagged for officer review.',
    messageHi: '6 में से 5 दस्तावेज़ सफलतापूर्वक सत्यापित हुए। 1 दस्तावेज़ संवीक्षा हेतु चिह्नित किया गया।',
    type: 'warning',
    read: true,
    link: '/student/verification'
  },
  {
    id: 'notif-3',
    timestamp: '3 days ago',
    title: 'DBT Sanction Order Generated',
    titleHi: 'डीबीटी स्वीकृति आदेश जारी',
    message: 'Sanction order MOTA/ST/2026/SANCT-01247 created for ₹50,000 grant (Demonstration).',
    messageHi: '₹50,000 अनुदान हेतु स्वीकृति आदेश संख्या MOTA/ST/2026/SANCT-01247 तैयार (डेमो)।',
    type: 'success',
    read: true,
    link: '/student/payment'
  }
];
