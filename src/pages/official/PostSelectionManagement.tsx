import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  CreditCard
} from 'lucide-react';

export const PostSelectionManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { fellowships } = useApp();

  const simpleFellowshipStages = [
    { name: '1. Selected', status: 'Done', color: 'text-[#276B58] bg-[#EDF5F2]' },
    { name: '2. Joined University', status: 'Verified', color: 'text-[#276B58] bg-[#EDF5F2]' },
    { name: '3. Progress Check', status: 'Report Approved', color: 'text-[#102A39] bg-[#FBF6EE] font-bold border border-[#C48A3A]/40' },
    { name: '4. Payment', status: '3 Tranches Paid', color: 'text-[#276B58] bg-[#EDF5F2]' },
    { name: '5. Continue Fellowship', status: 'Active (Yr 2)', color: 'text-[#245D78] bg-[#F4F7F9]' },
    { name: '6. Complete Ph.D.', status: 'In Progress', color: 'text-[#66737C] bg-[#F7F5EF]' }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#102A39] text-white">
            {language === 'hi' ? 'चयन के बाद' : 'After Selection'}
          </span>
          <span className="text-xs text-[#66737C]">
            National Fellowship Tracking
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
          {t('postSelectionFellowship')}
        </h1>
        <p className="text-xs sm:text-sm text-[#66737C] mt-1">
          {language === 'hi'
            ? 'चयनित शोध छात्रों के कॉलेज में दाखिले, छह महीने की प्रगति रिपोर्ट और किश्तों का रिकॉर्ड।'
            : 'Track student progress after they are selected for a fellowship.'}
        </p>
      </div>

      {/* Fellowship Lifecycle Stages */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <h2 className="font-serif text-base font-bold text-[#102A39] mb-4">
          Fellowship Progress Steps
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
          {simpleFellowshipStages.map((st, i) => (
            <div key={i} className="p-3 rounded-lg border border-[#DFE3E4] bg-[#FDFCFB] flex flex-col justify-between">
              <div>
                <div className="w-6 h-6 rounded-full bg-[#102A39] text-[#C48A3A] font-bold text-[11px] flex items-center justify-center mx-auto mb-2">
                  {i + 1}
                </div>
                <p className="font-semibold text-[#102A39] leading-snug">{st.name}</p>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] mt-2 ${st.color}`}>
                {st.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Fellow Record */}
      {fellowships.map((f) => (
        <div key={f.id} className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#DFE3E4] gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#245D78]">Doctoral Student</span>
              <h3 className="font-serif text-lg font-bold text-[#102A39]">
                {f.fellowName} — {f.institution}
              </h3>
              <p className="text-[#66737C]">Application: <strong className="font-mono text-[#102A39]">{f.applicationId}</strong></p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#66737C] block">Current Year</span>
              <strong className="text-sm text-[#102A39]">Year {f.currentYear} of {f.tenureYears} (Quarter {f.currentQuarter})</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
            <div>
              <span className="text-[#66737C] block">Research Topic:</span>
              <span className="font-semibold text-[#102A39]">{f.researchTopic}</span>
            </div>
            <div>
              <span className="text-[#66737C] block">Guide / Dean:</span>
              <span className="font-semibold text-[#102A39]">{f.guideName}</span>
            </div>
            <div>
              <span className="text-[#66737C] block">Payments:</span>
              <span className="font-bold text-[#276B58]">{f.disbursedTranches} of {f.totalTranches} Paid (₹ 1,05,000 to date)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#276B58]" />
              <span className="font-semibold text-[#102A39]">
                Latest Progress Report Approved by College Dean
              </span>
            </div>

            <button
              type="button"
              className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#C48A3A]" />
              <span>Release Next Payment (₹ 35,000)</span>
            </button>
          </div>
        </div>
      ))}

    </div>
  );
};
