import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Brand & Header
  brandTitle: { en: 'JANVIDYA', hi: 'जनविद्या' },
  brandSubtitle: {
    en: 'Scholarship & Fellowship System for Scheduled Tribes',
    hi: 'अनुसूचित जनजाति छात्रवृत्ति एवं अध्येतावृत्ति पोर्टल'
  },
  tagline: {
    en: 'Manage your scholarships and fellowships in one place.',
    hi: 'अपनी सभी छात्रवृत्तियों और अध्येतावृत्तियों को एक ही जगह संभालें।'
  },
  designedForMinistry: {
    en: 'Designed for Ministry of Tribal Affairs • Prototype',
    hi: 'जनजातीय कार्य मंत्रालय हेतु प्रस्तावित • प्रोटोटाइप'
  },
  sihBadge: {
    en: 'Smart India Hackathon 2026 | PS ID: SIH26239 | Team: ManHaters',
    hi: 'स्मार्ट इंडिया हैकाथॉन 2026 | पीएस आईडी: SIH26239 | टीम: ManHaters'
  },
  prototypeLabel: {
    en: 'Prototype / Demonstration Data',
    hi: 'प्रोटोटाइप / डेमो डेटा'
  },
  demoEnvironment: {
    en: 'Demo Account',
    hi: 'डेमो खाता'
  },

  // Auth / Login
  welcomeBack: { en: 'Welcome to JANVIDYA', hi: 'जनविद्या में आपका स्वागत है' },
  accessJourney: {
    en: 'Manage your scholarships and fellowships in one place.',
    hi: 'अपनी छात्रवृत्ति और अध्येतावृत्ति की जानकारी आसानी से देखें।'
  },
  studentTab: { en: 'Student', hi: 'विद्यार्थी' },
  officialTab: { en: 'Official', hi: 'अधिकारी' },
  emailOrId: { en: 'Email or Student ID', hi: 'ईमेल या विद्यार्थी आईडी' },
  officialId: { en: 'Official Email or ID', hi: 'अधिकारी ईमेल या आईडी' },
  password: { en: 'Password', hi: 'पासवर्ड' },
  signIn: { en: 'Sign In', hi: 'लॉग इन करें' },
  signInOfficial: { en: 'Sign In as Officer', hi: 'अधिकारी लॉगिन करें' },
  continueDemoStudent: { en: 'Continue as Demo Student', hi: 'डेमो विद्यार्थी के रूप में लॉगिन करें' },
  continueDemoOfficial: { en: 'Continue as Demo Officer', hi: 'डेमो अधिकारी के रूप में लॉगिन करें' },
  demoCredentialsNote: {
    en: 'Demo: student@demo.in / janvidya | official@demo.in / janvidya',
    hi: 'डेमो खाता: student@demo.in / janvidya | official@demo.in / janvidya'
  },
  applyJourneyPillars: {
    en: 'Apply → Check → Select → Pay',
    hi: 'आवेदन करें → जाँचें → चयन → भुगतान'
  },

  // Navigation Items
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  overview: { en: 'Overview', hi: 'डैशबोर्ड' },
  scholarships: { en: 'Scholarships & Fellowships', hi: 'छात्रवृत्तियाँ' },
  myApplications: { en: 'My Applications', hi: 'मेरे आवेदन' },
  documentVault: { en: 'Document Vault', hi: 'दस्तावेज़' },
  verification: { en: 'AI Document Check', hi: 'एआई दस्तावेज़ जाँच' },
  fixProblem: { en: 'Fix a Problem', hi: 'दस्तावेज़ ठीक करें' },
  messages: { en: 'Messages', hi: 'संदेश' },
  dbtPayment: { en: 'Payment Status', hi: 'भुगतान की स्थिति' },
  educationPath: { en: 'Education Path', hi: 'शिक्षा मार्ग' },
  careerSupport: { en: 'Career & Research', hi: 'करियर एवं शोध' },
  janVidyaSaathi: { en: 'JanVidya Saathi', hi: 'जनविद्या साथी' },
  helpSupport: { en: 'Need Help?', hi: 'सहायता' },
  logout: { en: 'Sign Out', hi: 'लॉग आउट' },

  // Official Navigation
  applicationsToReview: { en: 'Applications to Review', hi: 'समीक्षा हेतु आवेदन' },
  screeningSelection: { en: 'Screening & Selection', hi: 'स्क्रीनिंग एवं चयन' },
  schemeEngine: { en: 'Scheme Settings', hi: 'योजना सेटिंग्स' },
  communicationCenter: { en: 'Messages', hi: 'संदेश' },
  disbursementTracking: { en: 'Payments', hi: 'भुगतान' },
  postSelectionFellowship: { en: 'After Selection', hi: 'चयन के बाद' },
  analyticsReports: { en: 'Reports & Insights', hi: 'रिपोर्ट और आंकड़े' },
  auditLogs: { en: 'Activity Log', hi: 'गतिविधि लॉग' },

  // Common Simple UI Actions
  searchPlaceholder: { en: 'Search scholarships, applications...', hi: 'छात्रवृत्ति या आवेदन खोजें...' },
  filter: { en: 'Filter', hi: 'फ़िल्टर' },
  all: { en: 'All', hi: 'सभी' },
  saveDraft: { en: 'Save Draft', hi: 'ड्राफ्ट सहेजें' },
  submit: { en: 'Submit Application', hi: 'आवेदन जमा करें' },
  review: { en: 'Review', hi: 'समीक्षा करें' },
  replaceDocument: { en: 'Upload New Document', hi: 'नया दस्तावेज़ अपलोड करें' },
  uploadNew: { en: 'Upload Document', hi: 'दस्तावेज़ अपलोड करें' },
  viewDetails: { en: 'View Details', hi: 'विवरण देखें' },
  download: { en: 'Download', hi: 'डाउनलोड' },
  approve: { en: 'Approve', hi: 'स्वीकृत करें' },
  markDeficiency: { en: 'Flag a Problem', hi: 'समस्या चिह्नित करें' },
  requestClarification: { en: 'Ask Question', hi: 'जानकारी मांगें' },
  sendBack: { en: 'Send Back', hi: 'वापस भेजें' },
  back: { en: 'Back', hi: 'पीछे' },
  continue: { en: 'Continue', hi: 'आगे बढ़ें' },
  close: { en: 'Close', hi: 'बंद करें' },
  status: { en: 'Status', hi: 'स्थिति' },
  action: { en: 'Action', hi: 'कार्रवाई' },
  date: { en: 'Date', hi: 'तारीख' },

  // Statuses
  verified: { en: 'Verified', hi: 'सत्यापित' },
  needsAttention: { en: 'Action Needed', hi: 'ध्यान दें' },
  pendingVerification: { en: 'Checking', hi: 'जाँच जारी' },
  underScrutiny: { en: 'Under Review', hi: 'समीक्षाधीन' },
  approved: { en: 'Approved', hi: 'स्वीकृत' },
  sanctionGenerated: { en: 'Payment Started', hi: 'भुगतान प्रक्रियाधीन' },
  paymentInitiated: { en: 'Payment Started', hi: 'भुगतान शुरू' },
  dbtProcessing: { en: 'DBT / PFMS Processing', hi: 'डीबीटी / पीएफएमएस प्रसंस्करण' },
  amountCredited: { en: 'Amount Credited', hi: 'खाते में जमा' },

  // Student Dashboard specific
  goodMorning: { en: 'Good morning', hi: 'सुप्रभात' },
  journeySubtitle: {
    en: 'Here is the current status of your scholarship.',
    hi: 'यहाँ आपकी छात्रवृत्ति की वर्तमान स्थिति दी गई है।'
  },
  actionRequiredHeading: { en: 'Action Needed', hi: 'कार्रवाई आवश्यक' },
  actionRequiredDesc: {
    en: 'Your Income Certificate has expired. Please upload a new certificate.',
    hi: 'आपका आय प्रमाण पत्र पुराना हो गया है। कृपया नया प्रमाण पत्र अपलोड करें।'
  },
  recommendedOpportunities: { en: 'Recommended for You', hi: 'आपके लिए छात्रवृत्तियाँ' },
  findOpportunitiesForMe: { en: 'Find Scholarships for Me', hi: 'मेरे लिए छात्रवृत्ति खोजें' },
  janvidyaMatch: { en: 'JANVIDYA Match', hi: 'जनविद्या अनुकूलता' },

  // AI Document Check
  aiVerificationSupport: { en: 'AI Document Check', hi: 'एआई दस्तावेज़ जाँच' },
  aiAssistsOfficerDecides: {
    en: 'AI helps with checking. Final decision is made by an authorised officer.',
    hi: 'एआई केवल जाँच में सहायता करता है। अंतिम निर्णय अधिकृत अधिकारी लेते हैं।'
  },
  aiVerificationDisclaimer: {
    en: 'AI helps check your documents. An authorised officer always makes the final decision.',
    hi: 'एआई केवल दस्तावेज़ों की प्राथमिक जाँच करता है। अंतिम निर्णय सक्षम अधिकारी द्वारा ही लिया जाता है।'
  },
  crossDocConsistency: { en: 'Name & Details Check', hi: 'नाम और विवरण जाँच' },

  // Scheme Engine & Innovation
  schemeEngineTitle: {
    en: 'Scheme Settings',
    hi: 'योजना सेटिंग्स'
  },
  schemeEngineSubtitle: {
    en: 'One Platform → Many Schemes: Update rules, documents, and dates in seconds.',
    hi: 'एक ही मंच → अनेक योजनाएँ: बिना किसी कोड बदलाव के नियम और दस्तावेज़ सेट करें।'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('janvidya_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('janvidya_lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
