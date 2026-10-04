import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  FolderLock, 
  ShieldCheck, 
  CreditCard, 
  GitFork, 
  Briefcase, 
  Bot, 
  HelpCircle,
  ClipboardList,
  SlidersHorizontal,
  Send,
  GraduationCap,
  BarChart3,
  History,
  AlertCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const { currentUser, currentRoute, navigateTo } = useApp();

  if (!currentUser) return null;

  const isOfficial = currentUser.role === 'official';

  const studentNavItems = [
    { id: 'dash', label: t('overview'), icon: LayoutDashboard, route: '/student/dashboard' },
    { id: 'sch', label: t('scholarships'), icon: Search, route: '/student/scholarships' },
    { id: 'app', label: t('myApplications'), icon: FileText, route: '/student/applications' },
    { id: 'doc', label: t('documentVault'), icon: FolderLock, route: '/student/documents' },
    { id: 'ver', label: t('verification'), icon: ShieldCheck, route: '/student/verification' },
    { id: 'def', label: t('fixProblem'), icon: AlertCircle, route: '/student/deficiency' },
    { id: 'dbt', label: t('dbtPayment'), icon: CreditCard, route: '/student/payment' },
    { id: 'edu', label: t('educationPath'), icon: GitFork, route: '/student/education-path' },
    { id: 'car', label: t('careerSupport'), icon: Briefcase, route: '/student/career' },
    { id: 'saa', label: t('janVidyaSaathi'), icon: Bot, route: '/student/saathi' },
  ];

  const officialNavItems = [
    { id: 'o-dash', label: t('dashboard'), icon: LayoutDashboard, route: '/official/dashboard' },
    { id: 'o-scr', label: t('applicationsToReview'), icon: ClipboardList, route: '/official/scrutiny' },
    { id: 'o-sel', label: t('screeningSelection'), icon: ShieldCheck, route: '/official/screening' },
    { id: 'o-sch', label: t('schemeEngine'), icon: SlidersHorizontal, route: '/official/schemes' },
    { id: 'o-com', label: t('communicationCenter'), icon: Send, route: '/official/communication' },
    { id: 'o-dbt', label: t('disbursementTracking'), icon: CreditCard, route: '/official/disbursement' },
    { id: 'o-fel', label: t('postSelectionFellowship'), icon: GraduationCap, route: '/official/post-selection' },
    { id: 'o-ana', label: t('analyticsReports'), icon: BarChart3, route: '/official/analytics' },
    { id: 'o-aud', label: t('auditLogs'), icon: History, route: '/official/audit' },
  ];

  const navItems = isOfficial ? officialNavItems : studentNavItems;

  const handleNavClick = (route: string) => {
    navigateTo(route);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-[#102A39]/60 backdrop-blur-xs z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#FFFFFF] border-r border-[#DFE3E4] z-40 flex flex-col justify-between transition-transform duration-200 ease-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-4 overflow-y-auto px-3 space-y-1">
          <div className="px-3 pb-2 mb-2 border-b border-[#F4F7F9]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#66737C]">
              {isOfficial 
                ? (language === 'hi' ? 'अधिकारी कार्यक्षेत्र' : 'Officer Menu') 
                : (language === 'hi' ? 'विद्यार्थी सेवाएँ' : 'Student Menu')}
            </span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.route)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-[#102A39] text-[#FFFFFF] font-semibold shadow-2xs'
                    : 'text-[#17242D] hover:bg-[#F4F7F9] hover:text-[#102A39]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C48A3A]' : 'text-[#66737C]'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Help / Saathi link */}
        <div className="p-3 border-t border-[#DFE3E4] bg-[#F7F5EF]/60">
          <button
            type="button"
            onClick={() => handleNavClick(isOfficial ? '/official/schemes' : '/student/saathi')}
            className="w-full flex items-center gap-2 p-2 rounded text-xs text-[#245D78] hover:bg-[#FFFFFF] border border-[#DFE3E4] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#C48A3A] shrink-0" />
            <div className="text-left">
              <p className="font-semibold leading-tight">
                {isOfficial 
                  ? (language === 'hi' ? 'योजना सेटिंग्स' : 'Scheme Settings')
                  : (language === 'hi' ? 'जनविद्या साथी' : 'Need Help? Ask Saathi')}
              </p>
              <p className="text-[10px] text-[#66737C] leading-none mt-0.5">
                {language === 'hi' ? 'मदद के लिए यहाँ पूछें' : 'Instant ST assistance'}
              </p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
