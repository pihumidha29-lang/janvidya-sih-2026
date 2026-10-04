import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  FolderCheck,
  Send
} from 'lucide-react';

export const OfficialDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, applications, navigateTo } = useApp();

  const simpleMetrics = [
    {
      label: language === 'hi' ? 'कुल आवेदन' : 'Applications',
      val: '1,248',
      icon: FileText,
      trend: '+12% this week',
      color: 'text-[#102A39]',
      bg: 'bg-[#F4F7F9]'
    },
    {
      label: language === 'hi' ? 'जाँच बाकी है' : 'Pending Checks',
      val: '184',
      icon: Clock,
      trend: 'Automated queue',
      color: 'text-[#245D78]',
      bg: 'bg-[#F4F7F9]'
    },
    {
      label: language === 'hi' ? 'समीक्षाधीन' : 'Under Review',
      val: '96',
      icon: Users,
      trend: 'Waiting for officer',
      color: 'text-[#173447]',
      bg: 'bg-[#FBF6EE]'
    },
    {
      label: language === 'hi' ? 'समस्या वाले आवेदन' : 'Applications with Problems',
      val: '73',
      icon: AlertTriangle,
      trend: 'Awaiting student fix',
      color: 'text-[#C48A3A]',
      bg: 'bg-[#FBF6EE]'
    },
    {
      label: language === 'hi' ? 'चयनित छात्र' : 'Selected Students',
      val: '312',
      icon: CheckCircle2,
      trend: 'Ready for payment',
      color: 'text-[#276B58]',
      bg: 'bg-[#EDF5F2]'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Officer Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#102A39] text-white">
                {currentUser?.officialDesignation || 'Officer Portal'}
              </span>
              <span className="text-xs text-[#C48A3A] font-semibold bg-[#FBF6EE] px-2 py-0.5 rounded border border-[#C48A3A]/30">
                Demonstration Data
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {language === 'hi' 
                ? `अधिकारी डैशबोर्ड — ${currentUser?.nameHi || 'डॉ. रामेश्वर मीणा'}` 
                : `Officer Dashboard — ${currentUser?.name || 'Dr. Rameshwar Meena'}`}
            </h1>
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {t('designedForMinistry')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigateTo('/official/scrutiny')}
              className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <span>{language === 'hi' ? 'समीक्षा हेतु आवेदन' : 'Review Applications'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/official/schemes')}
              className="border border-[#DFE3E4] text-[#102A39] hover:bg-[#F4F7F9] px-3.5 py-2 rounded text-xs font-semibold flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#245D78]" />
              <span>{t('schemeEngine')}</span>
            </button>
          </div>
        </div>

        {/* AI & Officer Decision Banner */}
        <div className="mt-4 p-3 bg-[#FBF6EE] rounded border border-[#C48A3A]/30 text-xs text-[#17242D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C48A3A] shrink-0" />
            <span className="font-semibold text-[#102A39]">
              {language === 'hi'
                ? 'एआई केवल जाँच में सहायता करता है। अंतिम निर्णय अधिकृत अधिकारी लेते हैं।'
                : 'AI helps with checking. The authorised officer makes the final decision.'}
            </span>
          </div>
          <span className="text-[10px] text-[#66737C] font-mono">
            Demo Portal
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {simpleMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white border border-[#DFE3E4] rounded-lg p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-[#66737C] font-medium leading-tight">{m.label}</span>
                <div className={`p-1.5 rounded ${m.bg}`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
              </div>
              <p className={`font-serif text-2xl font-bold ${m.color}`}>{m.val}</p>
              <p className="text-[10px] text-[#66737C] mt-1">{m.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Applications to Review Table */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#DFE3E4] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-base font-bold text-[#102A39]">
              {language === 'hi' ? 'समीक्षा हेतु आवेदन' : 'Applications to Review'}
            </h2>
            <p className="text-xs text-[#66737C]">
              Applications waiting for officer check or problem resolution.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('/official/scrutiny')}
            className="text-xs font-semibold text-[#245D78] hover:text-[#102A39] flex items-center gap-1"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F5EF] text-[#102A39] font-bold border-b border-[#DFE3E4]">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Scholarship</th>
                <th className="py-3 px-4">AI Check</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F7F9]">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-[#FDFCFB] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#102A39]">
                    {app.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-[#102A39]">{app.studentName}</p>
                    <p className="text-[10px] text-[#66737C]">ID: {app.studentId}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-[#102A39]">{app.schemeName}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#102A39]">{app.aiVerificationSummary.confidence}% Match</span>
                    <span className="text-[10px] text-[#276B58] block">({app.aiVerificationSummary.passedChecks}/{app.aiVerificationSummary.totalChecks} Checks)</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold border ${
                      app.status === 'Action Required'
                        ? 'bg-[#FBF6EE] text-[#C48A3A] border-[#C48A3A]/40'
                        : app.status === 'Approved'
                        ? 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30'
                        : 'bg-[#F4F7F9] text-[#245D78] border-[#245D78]/30'
                    }`}>
                      {app.status === 'Action Required' ? 'Action Needed' : app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => navigateTo('/official/scrutiny')}
                      className="bg-[#102A39] hover:bg-[#173447] text-white px-3 py-1 rounded text-[11px] font-semibold transition-colors"
                    >
                      {language === 'hi' ? 'समीक्षा करें' : 'Review'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => navigateTo('/official/screening')}
          className="bg-white border border-[#DFE3E4] rounded-lg p-5 hover:border-[#102A39] cursor-pointer transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#F4F7F9] flex items-center justify-center text-[#102A39]">
              <FolderCheck className="w-5 h-5 text-[#276B58]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#102A39]">{t('screeningSelection')}</h4>
              <p className="text-[11px] text-[#66737C]">Check candidate merit & quota</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigateTo('/official/schemes')}
          className="bg-white border border-[#DFE3E4] rounded-lg p-5 hover:border-[#102A39] cursor-pointer transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#F4F7F9] flex items-center justify-center text-[#102A39]">
              <SlidersHorizontal className="w-5 h-5 text-[#C48A3A]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#102A39]">{t('schemeEngine')}</h4>
              <p className="text-[11px] text-[#66737C]">Change rules & documents</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigateTo('/official/communication')}
          className="bg-white border border-[#DFE3E4] rounded-lg p-5 hover:border-[#102A39] cursor-pointer transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#F4F7F9] flex items-center justify-center text-[#102A39]">
              <Send className="w-5 h-5 text-[#245D78]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#102A39]">{t('communicationCenter')}</h4>
              <p className="text-[11px] text-[#66737C]">Send notices to students</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
