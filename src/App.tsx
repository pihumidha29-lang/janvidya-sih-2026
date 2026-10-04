import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';

// Common
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/layout/Sidebar';

// Auth
import { LoginPage } from './pages/auth/LoginPage';

// Student Portal Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { ScholarshipDiscovery } from './pages/student/ScholarshipDiscovery';
import { ApplicationWizard } from './pages/student/ApplicationWizard';
import { DocumentVault } from './pages/student/DocumentVault';
import { VerificationDemo } from './pages/student/VerificationDemo';
import { DeficiencyManagement } from './pages/student/DeficiencyManagement';
import { MyApplications } from './pages/student/MyApplications';
import { DisbursementTracking } from './pages/student/DisbursementTracking';
import { EducationFundingPath } from './pages/student/EducationFundingPath';
import { CareerSupport } from './pages/student/CareerSupport';
import { JanVidyaSaathi } from './pages/student/JanVidyaSaathi';

// Official Portal Pages
import { OfficialDashboard } from './pages/official/OfficialDashboard';
import { ApplicationReview } from './pages/official/ApplicationReview';
import { ScreeningSelection } from './pages/official/ScreeningSelection';
import { SchemeConfiguration } from './pages/official/SchemeConfiguration';
import { CommunicationCentre } from './pages/official/CommunicationCentre';
import { PostSelectionManagement } from './pages/official/PostSelectionManagement';
import { Analytics } from './pages/official/Analytics';
import { AuditLogs } from './pages/official/AuditLogs';

// Mobile Bottom Nav Icons
import { LayoutDashboard, Search, FileText, FolderLock, Bot } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, currentRoute, navigateTo } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // 1. MANDATORY: LOGIN PAGE ALWAYS APPEARS FIRST IF NOT LOGGED IN OR ON ROUTE '/'
  if (!currentUser || currentRoute === '/') {
    return <LoginPage />;
  }

  // Routing Switcher
  const renderCurrentView = () => {
    // Student Routes
    if (currentUser.role === 'student') {
      switch (currentRoute) {
        case '/student/dashboard':
          return <StudentDashboard />;
        case '/student/scholarships':
          return <ScholarshipDiscovery />;
        case '/student/apply':
          return <ApplicationWizard />;
        case '/student/documents':
          return <DocumentVault />;
        case '/student/verification':
          return <VerificationDemo />;
        case '/student/deficiency':
          return <DeficiencyManagement />;
        case '/student/applications':
          return <MyApplications />;
        case '/student/payment':
          return <DisbursementTracking />;
        case '/student/education-path':
          return <EducationFundingPath />;
        case '/student/career':
          return <CareerSupport />;
        case '/student/saathi':
          return <JanVidyaSaathi />;
        default:
          return <StudentDashboard />;
      }
    }

    // Official Routes
    if (currentUser.role === 'official') {
      switch (currentRoute) {
        case '/official/dashboard':
          return <OfficialDashboard />;
        case '/official/applications':
        case '/official/scrutiny':
          return <ApplicationReview />;
        case '/official/screening':
          return <ScreeningSelection />;
        case '/official/schemes':
          return <SchemeConfiguration />;
        case '/official/communication':
          return <CommunicationCentre />;
        case '/official/disbursement':
          return <DisbursementTracking />;
        case '/official/post-selection':
          return <PostSelectionManagement />;
        case '/official/analytics':
          return <Analytics />;
        case '/official/audit':
          return <AuditLogs />;
        default:
          return <OfficialDashboard />;
      }
    }

    return <LoginPage />;
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col selection:bg-[#C48A3A]/20">
      
      {/* Top SIH 2026 Disclaimer Banner */}
      <DemoBanner />

      {/* Main Sticky Navbar */}
      <Navbar 
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Center Layout: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar 
          isOpen={isMobileSidebarOpen} 
          onClose={() => setIsMobileSidebarOpen(false)} 
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {renderCurrentView()}
        </main>
      </div>

      {/* Student Floating Assistant Chip (When not on Saathi page) */}
      {currentUser.role === 'student' && currentRoute !== '/student/saathi' && (
        <button
          type="button"
          onClick={() => navigateTo('/student/saathi')}
          className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 bg-[#102A39] hover:bg-[#173447] text-white px-3.5 py-2.5 rounded-full shadow-lg border border-[#20455D] flex items-center gap-2 text-xs font-semibold z-30 transition-all hover:scale-105"
          aria-label="Open JanVidya Saathi Assistant"
        >
          <Bot className="w-4 h-4 text-[#C48A3A]" />
          <span className="hidden sm:inline">JanVidya Saathi</span>
          <span className="w-2 h-2 rounded-full bg-[#276B58] animate-ping" />
        </button>
      )}

      {/* Mobile Bottom Navigation (Student only) */}
      {currentUser.role === 'student' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#DFE3E4] z-30 flex items-center justify-around py-2 px-1">
          <button
            type="button"
            onClick={() => navigateTo('/student/dashboard')}
            className={`flex flex-col items-center text-[10px] ${
              currentRoute === '/student/dashboard' ? 'text-[#102A39] font-bold' : 'text-[#66737C]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span>{t('overview')}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/student/scholarships')}
            className={`flex flex-col items-center text-[10px] ${
              currentRoute === '/student/scholarships' ? 'text-[#102A39] font-bold' : 'text-[#66737C]'
            }`}
          >
            <Search className="w-4 h-4 mb-0.5" />
            <span>{language === 'hi' ? 'योजनाएँ' : 'Schemes'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/student/applications')}
            className={`flex flex-col items-center text-[10px] ${
              currentRoute === '/student/applications' ? 'text-[#102A39] font-bold' : 'text-[#66737C]'
            }`}
          >
            <FileText className="w-4 h-4 mb-0.5" />
            <span>{language === 'hi' ? 'आवेदन' : 'Apps'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/student/documents')}
            className={`flex flex-col items-center text-[10px] ${
              currentRoute === '/student/documents' ? 'text-[#102A39] font-bold' : 'text-[#66737C]'
            }`}
          >
            <FolderLock className="w-4 h-4 mb-0.5" />
            <span>{language === 'hi' ? 'दस्तावेज़' : 'Vault'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/student/saathi')}
            className={`flex flex-col items-center text-[10px] ${
              currentRoute === '/student/saathi' ? 'text-[#102A39] font-bold' : 'text-[#66737C]'
            }`}
          >
            <Bot className="w-4 h-4 mb-0.5 text-[#C48A3A]" />
            <span>Saathi</span>
          </button>
        </nav>
      )}

      {/* Global Footer */}
      <footer className="w-full bg-[#FFFFFF] border-t border-[#DFE3E4] py-4 px-4 sm:px-8 text-center text-xs text-[#66737C]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            JANVIDYA — Smart India Hackathon 2026 | PS ID: SIH26239 | Team: ManHaters
          </p>
          <p className="text-[11px] text-[#A6C0CE]">
            Prototype Demonstration Environment • Scheduled Tribe Scholarship & Fellowship Lifecycle
          </p>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </LanguageProvider>
  );
}
