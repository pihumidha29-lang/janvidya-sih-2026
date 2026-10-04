import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  ApplicationRecord, 
  StudentDocument, 
  SchemeRule, 
  DBTDisbursementRecord, 
  FellowshipLifecycle, 
  AuditLogEntry, 
  NotificationItem, 
  ApplicationStatus,
  DocumentStatus
} from '../types';
import { 
  mockStudentUser, 
  mockOfficialUser, 
  initialSchemes, 
  initialDocuments, 
  initialApplications, 
  initialDisbursements, 
  initialFellowships, 
  initialAuditLogs, 
  initialNotifications 
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile | null;
  currentRoute: string;
  navigateTo: (route: string) => void;
  loginAsStudent: () => void;
  loginAsOfficial: () => void;
  logout: () => void;

  schemes: SchemeRule[];
  documents: StudentDocument[];
  applications: ApplicationRecord[];
  disbursements: DBTDisbursementRecord[];
  fellowships: FellowshipLifecycle[];
  auditLogs: AuditLogEntry[];
  notifications: NotificationItem[];

  // Interactive actions
  runAiVerification: (docId: string, onProgress?: (step: number, stepText: string) => void) => Promise<boolean>;
  replaceDocument: (docId: string, fileTitle: string) => void;
  resolveDeficiency: (applicationId: string, docId: string, replacementFileName: string) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, notes?: string) => void;
  createApplication: (data: Partial<ApplicationRecord>) => string;
  sendOfficialMessage: (targetStudentId: string, title: string, message: string, type: 'action_required' | 'info' | 'warning' | 'success') => void;
  addNewScheme: (scheme: SchemeRule) => void;
  updateScheme: (schemeId: string, updated: Partial<SchemeRule>) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start at '/' (Login page) on first launch
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('janvidya_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    // If not logged in, enforce route '/'
    const savedUser = localStorage.getItem('janvidya_user');
    if (!savedUser) return '/';
    return window.location.pathname !== '/' ? window.location.pathname : '/student/dashboard';
  });

  const [schemes, setSchemes] = useState<SchemeRule[]>(() => {
    const saved = localStorage.getItem('janvidya_schemes');
    return saved ? JSON.parse(saved) : initialSchemes;
  });

  const [documents, setDocuments] = useState<StudentDocument[]>(() => {
    const saved = localStorage.getItem('janvidya_docs');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    const saved = localStorage.getItem('janvidya_apps');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [disbursements, setDisbursements] = useState<DBTDisbursementRecord[]>(() => {
    const saved = localStorage.getItem('janvidya_disbursements');
    return saved ? JSON.parse(saved) : initialDisbursements;
  });

  const [fellowships] = useState<FellowshipLifecycle[]>(initialFellowships);
  
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('janvidya_audit');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('janvidya_notifs');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('janvidya_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('janvidya_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('janvidya_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('janvidya_apps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('janvidya_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('janvidya_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('janvidya_schemes', JSON.stringify(schemes));
  }, [schemes]);

  // Handle URL change
  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const addAuditLog = (action: string, targetId: string, details: string, role: 'Student' | 'Official' | 'System AI', actorName: string) => {
    const newEntry: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: actorName,
      role,
      action,
      targetId,
      details
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const loginAsStudent = () => {
    setCurrentUser(mockStudentUser);
    addAuditLog('Student Login', mockStudentUser.id, 'User authenticated via Demo Student credentials.', 'Student', mockStudentUser.name);
    navigateTo('/student/dashboard');
  };

  const loginAsOfficial = () => {
    setCurrentUser(mockOfficialUser);
    addAuditLog('Official Login', mockOfficialUser.id, 'Officer authenticated via Official Portal Demo.', 'Official', mockOfficialUser.name);
    navigateTo('/official/dashboard');
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog('User Logout', currentUser.id, `${currentUser.role} signed out.`, currentUser.role === 'official' ? 'Official' : 'Student', currentUser.name);
    }
    setCurrentUser(null);
    navigateTo('/');
  };

  // AI Verification sequential simulation
  const runAiVerification = async (
    docId: string, 
    onProgress?: (step: number, stepText: string) => void
  ): Promise<boolean> => {
    const steps = [
      'Reading document structure and OCR text...',
      'Checking mandatory security fields and watermark...',
      'Comparing extracted entities against application records...',
      'Cross-checking validity dates and issuing authority...',
      'Synthesizing verification findings...'
    ];

    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: 'Checking' as DocumentStatus } : d));

    for (let i = 0; i < steps.length; i++) {
      if (onProgress) onProgress(i + 1, steps[i]);
      await new Promise(res => setTimeout(res, 450));
    }

    const doc = documents.find(d => d.id === docId);
    const hasDeficiency = doc?.type === 'Income Certificate';

    const finalStatus: DocumentStatus = hasDeficiency ? 'Needs Attention' : 'Verified';

    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          status: finalStatus,
          aiConfidence: hasDeficiency ? 84.2 : 98.9
        };
      }
      return d;
    }));

    addAuditLog(
      'AI Document Verification',
      docId,
      `AI automated validation completed with status: ${finalStatus}.`,
      'System AI',
      'JANVIDYA AI Engine'
    );

    return !hasDeficiency;
  };

  // Replace Document
  const replaceDocument = (docId: string, fileTitle: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          fileName: fileTitle,
          status: 'Pending Verification',
          uploadDate: new Date().toISOString().slice(0, 10),
          deficiencyReason: undefined
        };
      }
      return d;
    }));

    addAuditLog('Uploaded Replacement Document', docId, `Replacement file ${fileTitle} uploaded.`, 'Student', currentUser?.name || 'Aarav Kumar');
  };

  // Resolve deficiency workflow
  const resolveDeficiency = (applicationId: string, docId: string, replacementFileName: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          fileName: replacementFileName,
          status: 'Pending Verification' as DocumentStatus,
          uploadDate: new Date().toISOString().slice(0, 10),
          deficiencyReason: undefined,
          deficiencyReasonHi: undefined,
          extractedData: {
            ...d.extractedData,
            issueDate: '2026-04-12',
            validUntil: '2027-03-31',
            certificateNumber: 'JH/INC/2026/VALID-881'
          }
        };
      }
      return d;
    }));

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: 'Under Officer Scrutiny',
          deficiencyCount: 0,
          aiVerificationSummary: {
            passedChecks: 6,
            totalChecks: 6,
            flags: [],
            confidence: 97.4
          },
          lastUpdated: 'Just now'
        };
      }
      return app;
    }));

    // Update student notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Replacement Document Received',
        titleHi: 'प्रतिस्थापन दस्तावेज़ प्राप्त हुआ',
        message: `Updated ${replacementFileName} successfully forwarded for re-verification.`,
        messageHi: `अद्यतन ${replacementFileName} पुनः सत्यापन हेतु अग्रेषित किया गया।`,
        type: 'success',
        read: false,
        link: '/student/applications'
      },
      ...prev
    ]);

    addAuditLog(
      'Deficiency Resolved & Re-submitted',
      applicationId,
      `Applicant uploaded replacement certificate ${replacementFileName}. Status transitioned to Under Scrutiny.`,
      'Student',
      currentUser?.name || 'Aarav Kumar'
    );
  };

  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus, notes?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        let nextStage = app.stage;
        if (status === 'Approved' || status === 'Recommended') nextStage = 'selection';
        if (status === 'Sanction Generated') nextStage = 'sanction';
        if (status === 'Disbursed') nextStage = 'disbursement';
        if (status === 'Action Required') nextStage = 'scrutiny';

        return {
          ...app,
          status,
          stage: nextStage,
          officerNotes: notes || app.officerNotes,
          lastUpdated: 'Just now'
        };
      }
      return app;
    }));

    addAuditLog(
      `Application Status: ${status}`,
      applicationId,
      notes || `Officer updated application status to ${status}.`,
      'Official',
      currentUser?.name || 'Dr. Rameshwar Meena'
    );
  };

  const createApplication = (data: Partial<ApplicationRecord>): string => {
    const newId = `JV-2026-00${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: ApplicationRecord = {
      id: newId,
      schemeId: data.schemeId || 'scheme-post-matric',
      schemeName: data.schemeName || 'Post-Matric Scholarship for ST Students',
      schemeNameHi: data.schemeNameHi || 'अनुसूचित जनजाति मैट्रिकोत्तर छात्रवृत्ति',
      studentName: currentUser?.name || 'Aarav Kumar',
      studentId: currentUser?.studentId || 'ST-JH-2024-0982',
      submissionDate: new Date().toISOString().slice(0, 10),
      stage: 'applied',
      status: 'Submitted',
      academicYear: '2026-27',
      grantAmount: data.grantAmount || '₹ 65,000 / year',
      institution: data.institution || 'NIT Jamshedpur',
      course: data.course || 'M.Tech AI & Data Science',
      annualFamilyIncome: data.annualFamilyIncome || 180000,
      deficiencyCount: 0,
      aiVerificationSummary: {
        passedChecks: 6,
        totalChecks: 6,
        flags: [],
        confidence: 96.0
      },
      lastUpdated: 'Just now'
    };

    setApplications(prev => [newRecord, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Application Submitted Successfully',
        titleHi: 'आवेदन सफलतापूर्वक जमा हुआ',
        message: `Your application ${newId} has been queued for automated AI pre-check.`,
        messageHi: `आपका आवेदन ${newId} एआई प्रारंभिक सत्यापन कतार में प्रविष्ट हो गया है।`,
        type: 'success',
        read: false,
        link: '/student/applications'
      },
      ...prev
    ]);

    addAuditLog(
      'Application Submitted',
      newId,
      `New application submitted for ${newRecord.schemeName}.`,
      'Student',
      currentUser?.name || 'Aarav Kumar'
    );

    return newId;
  };

  const sendOfficialMessage = (
    targetStudentId: string, 
    title: string, 
    message: string, 
    type: 'action_required' | 'info' | 'warning' | 'success'
  ) => {
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        title,
        titleHi: title,
        message,
        messageHi: message,
        type,
        read: false,
        link: type === 'action_required' ? '/student/deficiency' : '/student/messages'
      },
      ...prev
    ]);

    addAuditLog(
      'Official Communication Sent',
      targetStudentId,
      `Official issued notice: ${title}`,
      'Official',
      currentUser?.name || 'Dr. Rameshwar Meena'
    );
  };

  const addNewScheme = (scheme: SchemeRule) => {
    setSchemes(prev => [scheme, ...prev]);
    addAuditLog(
      'Scheme Created/Updated',
      scheme.code,
      `New scheme rule configured: ${scheme.name}`,
      'Official',
      currentUser?.name || 'Dr. Rameshwar Meena'
    );
  };

  const updateScheme = (schemeId: string, updated: Partial<SchemeRule>) => {
    setSchemes(prev => prev.map(s => s.id === schemeId ? { ...s, ...updated } : s));
    addAuditLog(
      'Scheme Modified',
      schemeId,
      `Configured scheme rules modified in engine.`,
      'Official',
      currentUser?.name || 'Dr. Rameshwar Meena'
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      currentRoute,
      navigateTo,
      loginAsStudent,
      loginAsOfficial,
      logout,
      schemes,
      documents,
      applications,
      disbursements,
      fellowships,
      auditLogs,
      notifications,
      runAiVerification,
      replaceDocument,
      resolveDeficiency,
      updateApplicationStatus,
      createApplication,
      sendOfficialMessage,
      addNewScheme,
      updateScheme,
      markNotificationAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
