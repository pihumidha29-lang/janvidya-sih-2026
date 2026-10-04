// TypeScript Schemas for JANVIDYA SIH 2026 Prototype

export type UserRole = 'student' | 'official' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  nameHi: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentId?: string;
  officialDesignation?: string;
  department?: string;
  tribeGroup?: string;
  state?: string;
  academicLevel?: string;
  institution?: string;
  incomeBand?: string;
}

export type ApplicationStage = 
  | 'applied'
  | 'verified'
  | 'scrutiny'
  | 'selection'
  | 'sanction'
  | 'disbursement';

export type ApplicationStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Under AI Verification'
  | 'Verified'
  | 'Action Required'
  | 'Under Officer Scrutiny'
  | 'Recommended'
  | 'Approved'
  | 'Selected'
  | 'Sanction Generated'
  | 'Disbursed'
  | 'Rejected';

export interface SchemeRule {
  id: string;
  name: string;
  nameHi: string;
  code: string;
  ministry: string;
  level: 'Pre-Matric' | 'Post-Matric' | 'Higher Education' | 'Fellowship' | 'Overseas';
  maxIncome: number; // e.g. 250000 or 600000
  annualGrant: string;
  targetCategory: string;
  deadline: string;
  description: string;
  descriptionHi: string;
  eligibilityCriteria: string[];
  eligibilityCriteriaHi: string[];
  requiredDocuments: string[];
  verificationRules: string[];
  selectionMode: 'Merit-cum-Means' | 'Direct Fellowship Scrutiny' | 'Overseas Board Review';
  active: boolean;
  matchScore?: number; // 0-100
}

export type DocumentStatus = 
  | 'Verified'
  | 'Needs Attention'
  | 'Pending Verification'
  | 'Checking'
  | 'Not Uploaded';

export interface StudentDocument {
  id: string;
  type: 'Aadhaar' | 'ST Certificate' | 'Income Certificate' | 'Domicile' | 'Marksheet' | 'Admission Proof' | 'Bank Details';
  title: string;
  titleHi: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: DocumentStatus;
  aiConfidence?: number;
  extractedData?: {
    name?: string;
    dob?: string;
    issueDate?: string;
    validUntil?: string;
    certificateNumber?: string;
    annualIncome?: string;
    issuingAuthority?: string;
    tribeName?: string;
  };
  deficiencyReason?: string;
  deficiencyReasonHi?: string;
}

export interface ApplicationRecord {
  id: string; // e.g. JV-2026-001247
  schemeId: string;
  schemeName: string;
  schemeNameHi: string;
  studentName: string;
  studentId: string;
  submissionDate: string;
  stage: ApplicationStage;
  status: ApplicationStatus;
  academicYear: string;
  grantAmount: string;
  institution: string;
  course: string;
  annualFamilyIncome: number;
  deficiencyCount: number;
  aiVerificationSummary: {
    passedChecks: number;
    totalChecks: number;
    flags: string[];
    confidence: number;
  };
  officerNotes?: string;
  lastUpdated: string;
}

export interface DBTDisbursementRecord {
  id: string;
  applicationId: string;
  studentName: string;
  schemeName: string;
  sanctionOrderNo: string;
  sanctionDate: string;
  amount: number;
  bankName: string;
  accountMasked: string;
  ifscCode: string;
  dbtReference: string;
  status: 'Sanction Generated' | 'Payment Initiated' | 'DBT/PFMS Processing' | 'Amount Credited';
  timeline: {
    sanctionDate: string;
    paymentInitiatedDate?: string;
    pfmsAcknowledgedDate?: string;
    creditDate?: string;
  };
  isPrototype: true;
}

export interface FellowshipLifecycle {
  id: string;
  applicationId: string;
  fellowName: string;
  researchTopic: string;
  guideName: string;
  institution: string;
  tenureYears: number;
  currentYear: number;
  currentQuarter: number;
  stage: 'Selection' | 'Sanction' | 'Joining' | 'Periodic Progress' | 'Continuation' | 'Disbursement' | 'Completed';
  progressReportSubmitted: boolean;
  progressReportStatus: 'Approved' | 'Pending Review' | 'Revision Required';
  totalTranches: number;
  disbursedTranches: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: 'Student' | 'Official' | 'System AI';
  action: string;
  targetId: string;
  details: string;
  ipAddress?: string;
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  type: 'info' | 'warning' | 'success' | 'action_required';
  read: boolean;
  link?: string;
}
