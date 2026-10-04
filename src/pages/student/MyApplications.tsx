import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { ApplicationRecord } from '../../types';
import { 
  X, 
  CreditCard, 
  ArrowRight
} from 'lucide-react';

export const MyApplications: React.FC = () => {
  const { language, t } = useLanguage();
  const { applications, navigateTo } = useApp();

  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);

  const getSimpleStatus = (status: string) => {
    switch (status) {
      case 'Action Required':
        return { label: 'Action Needed', badge: 'bg-[#FBF6EE] text-[#C48A3A] border-[#C48A3A]/40 font-bold' };
      case 'Under Officer Scrutiny':
      case 'Under AI Verification':
      case 'Submitted':
        return { label: 'Under Review', badge: 'bg-[#F4F7F9] text-[#245D78] border-[#245D78]/30 font-medium' };
      case 'Approved':
      case 'Selected':
        return { label: 'Approved', badge: 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30 font-bold' };
      case 'Sanction Generated':
      case 'Disbursed':
        return { label: 'Payment Started', badge: 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30 font-bold' };
      default:
        return { label: status, badge: 'bg-[#F7F5EF] text-[#66737C] border-[#DFE3E4]' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                {language === 'hi' ? 'आवेदन' : 'My Applications'}
              </span>
              <span className="text-xs text-[#66737C]">
                {applications.length} {language === 'hi' ? 'आवेदन दर्ज' : 'Applications'}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {t('myApplications')}
            </h1>
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {language === 'hi'
                ? 'यहाँ देखें कि आपका आवेदन किस चरण में है।'
                : 'See where your applications are.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/student/scholarships')}
            className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
          >
            <span>{language === 'hi' ? 'नई छात्रवृत्ति देखें' : 'Apply for Scholarship'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg shadow-2xs overflow-hidden">
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F5EF] text-[#102A39] font-bold border-b border-[#DFE3E4]">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Scholarship</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F7F9]">
              {applications.map((app) => {
                const s = getSimpleStatus(app.status);
                return (
                  <tr key={app.id} className="hover:bg-[#FDFCFB] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#102A39]">
                      {app.id}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#102A39]">{language === 'hi' ? app.schemeNameHi : app.schemeName}</p>
                      <p className="text-[11px] text-[#66737C]">{app.grantAmount}</p>
                    </td>
                    <td className="py-3 px-4 text-[#66737C]">
                      {app.submissionDate}
                    </td>
                    <td className="py-3 px-4 capitalize text-[#245D78] font-medium">
                      {app.stage === 'scrutiny' ? 'Review' : app.stage}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] border ${s.badge}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {app.status === 'Action Required' && (
                        <button
                          type="button"
                          onClick={() => navigateTo('/student/deficiency')}
                          className="bg-[#C48A3A] hover:bg-[#a9752d] text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-colors"
                        >
                          {language === 'hi' ? 'ठीक करें' : 'Fix Problem'}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="border border-[#DFE3E4] hover:bg-[#F4F7F9] text-[#102A39] px-2.5 py-1 rounded text-[11px] font-medium transition-colors"
                      >
                        {t('viewDetails')}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-[#DFE3E4]">
          {applications.map((app) => {
            const s = getSimpleStatus(app.status);
            return (
              <div key={app.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#102A39]">{app.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] border ${s.badge}`}>
                    {s.label}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#102A39]">
                  {language === 'hi' ? app.schemeNameHi : app.schemeName}
                </h4>
                <p className="text-xs text-[#66737C]">{app.grantAmount}</p>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[#66737C]">Stage: <strong className="text-[#245D78] capitalize">{app.stage}</strong></span>
                  <div className="flex gap-2">
                    {app.status === 'Action Required' && (
                      <button
                        type="button"
                        onClick={() => navigateTo('/student/deficiency')}
                        className="bg-[#C48A3A] text-white px-2.5 py-1 rounded text-[11px] font-semibold"
                      >
                        Fix Problem
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedApp(app)}
                      className="border border-[#DFE3E4] text-[#102A39] px-2.5 py-1 rounded text-[11px]"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-[#102A39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-[#DFE3E4] max-w-xl w-full p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#DFE3E4]">
              <div>
                <span className="text-[10px] font-mono text-[#66737C]">ID: {selectedApp.id}</span>
                <h3 className="font-serif text-lg font-bold text-[#102A39] mt-0.5">
                  {selectedApp.schemeName}
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedApp(null)}
                className="text-[#66737C] hover:text-[#17242D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-5 text-xs">
              
              <div>
                <h4 className="font-bold text-[#102A39] mb-3">
                  {language === 'hi' ? 'प्रगति के चरण' : 'Application Progress'}
                </h4>

                <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DFE3E4]">
                  
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#276B58] text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <p className="font-bold text-[#102A39]">1. Applied</p>
                    <p className="text-[11px] text-[#66737C]">{selectedApp.submissionDate} • Form submitted</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#276B58] text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <p className="font-bold text-[#102A39]">2. AI Document Check</p>
                    <p className="text-[11px] text-[#66737C]">Checked by system</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#102A39] text-[#C48A3A] border-2 border-[#C48A3A] flex items-center justify-center text-[10px] font-bold">
                      ●
                    </div>
                    <p className="font-bold text-[#102A39]">3. Officer Review (Current)</p>
                    <p className="text-[11px] text-[#66737C]">{selectedApp.officerNotes || 'Under officer examination'}</p>
                  </div>

                  <div className="relative opacity-60">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#F4F7F9] text-[#66737C] border border-[#DFE3E4] flex items-center justify-center text-[10px] font-bold">
                      ○
                    </div>
                    <p className="font-medium text-[#66737C]">4. Selection</p>
                  </div>

                  <div className="relative opacity-60">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#F4F7F9] text-[#66737C] border border-[#DFE3E4] flex items-center justify-center text-[10px] font-bold">
                      ○
                    </div>
                    <p className="font-medium text-[#66737C]">5. Bank Payment (DBT)</p>
                  </div>

                </div>
              </div>

              <div className="p-3.5 rounded bg-[#F7F5EF] border border-[#DFE3E4] space-y-1">
                <p><strong>Student:</strong> {selectedApp.studentName}</p>
                <p><strong>College:</strong> {selectedApp.institution}</p>
                <p><strong>Grant Amount:</strong> <span className="text-[#276B58] font-bold">{selectedApp.grantAmount}</span></p>
              </div>

            </div>

            <div className="pt-3 border-t border-[#DFE3E4] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setSelectedApp(null);
                  navigateTo('/student/payment');
                }}
                className="text-xs font-semibold text-[#245D78] hover:text-[#102A39] flex items-center gap-1"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#C48A3A]" />
                <span>See Payment Status</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded text-xs font-semibold text-[#102A39] hover:bg-[#F4F7F9]"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
