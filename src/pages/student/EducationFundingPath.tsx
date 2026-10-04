import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export const EducationFundingPath: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigateTo } = useApp();

  const simplePath = [
    {
      step: '1. School (Class 9 & 10)',
      stepHi: '१. स्कूल (कक्षा ९ और १०)',
      scheme: 'Pre-Matric Scholarship for ST Students',
      grant: '₹ 12,000 - ₹ 20,000 / year',
      status: 'Completed',
      desc: 'Helps students complete school without financial worry.'
    },
    {
      step: '2. College / B.Tech / Degree',
      stepHi: '२. कॉलेज / स्नातक (बी.टेक / बीए / बीएससी)',
      scheme: 'Post-Matric Scholarship for ST Students',
      grant: '₹ 45,000 - ₹ 85,000 / year',
      status: 'Completed',
      desc: 'Tuition and living support for college students.'
    },
    {
      step: '3. Master Degree (M.Tech / PG)',
      stepHi: '३. स्नातकोत्तर (एम.टेक / एम.एससी)',
      scheme: 'Post-Matric PG Scholarship',
      grant: 'Tuition Fee + Living Support',
      status: 'Current Course',
      desc: 'Higher studies at top institutes like NITs and IITs.'
    },
    {
      step: '4. Ph.D. Research (Doctorate)',
      stepHi: '४. डॉक्टरेट शोध (पी.एचडी.)',
      scheme: 'National Fellowship for Higher Education of ST Students',
      grant: '₹ 35,000 / month',
      status: 'Recommended Next',
      desc: 'Government fellowship for full-time Ph.D. research.'
    },
    {
      step: '5. Study Abroad (Overseas)',
      stepHi: '५. विदेश में उच्च शिक्षा',
      scheme: 'National Overseas Scholarship for ST Candidates',
      grant: 'Full Tuition + Foreign Living Allowance',
      status: 'Future Option',
      desc: 'Financial support to study Masters or Ph.D. in top universities abroad.'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
            {language === 'hi' ? 'शिक्षा मार्ग' : 'Education Path'}
          </span>
          <span className="text-xs text-[#66737C]">
            ST Student Pathway
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
          {language === 'hi' ? 'आपका शिक्षा मार्ग' : 'Your Education Path'}
        </h1>
        <p className="text-xs sm:text-sm text-[#66737C] mt-1">
          {language === 'hi'
            ? 'देखें कि कैसे भारत सरकार की छात्रवृत्तियाँ स्कूल से लेकर शोध तक आपका साथ देती हैं।'
            : 'See how scholarships support your studies from school all the way to research.'}
        </p>
      </div>

      {/* Pathway */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="relative pl-6 sm:pl-8 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-1 before:bg-[#DFE3E4]">
          {simplePath.map((item, index) => (
            <div key={index} className="relative pb-6 last:pb-0">
              <div className="absolute -left-6 sm:-left-8 top-1 w-7 h-7 rounded-full bg-[#102A39] text-[#C48A3A] border-2 border-white flex items-center justify-center text-xs font-bold shadow-xs">
                {index + 1}
              </div>

              <div className="bg-[#FDFCFB] border border-[#DFE3E4] rounded-lg p-4 hover:border-[#102A39]/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="font-serif text-base font-bold text-[#102A39]">
                    {language === 'hi' ? item.stepHi : item.step}
                  </h3>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                    item.status === 'Current Course'
                      ? 'bg-[#102A39] text-white'
                      : item.status === 'Recommended Next'
                      ? 'bg-[#FBF6EE] text-[#C48A3A] border border-[#C48A3A]/40'
                      : 'bg-[#EDF5F2] text-[#276B58]'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="p-2 bg-[#F7F5EF] rounded border border-[#DFE3E4] mb-2 text-xs flex items-center justify-between">
                  <span className="font-semibold text-[#245D78]">{item.scheme}</span>
                  <span className="font-bold text-[#276B58]">{item.grant}</span>
                </div>

                <p className="text-xs text-[#66737C]">
                  {item.desc}
                </p>

                {index === 3 && (
                  <div className="mt-3 pt-2 border-t border-[#DFE3E4] flex items-center justify-between">
                    <span className="text-[11px] text-[#C48A3A] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      You may be eligible after your M.Tech!
                    </span>
                    <button
                      type="button"
                      onClick={() => navigateTo('/student/scholarships')}
                      className="text-xs font-semibold text-[#102A39] hover:text-[#245D78] flex items-center gap-1"
                    >
                      <span>Check Fellowship</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
