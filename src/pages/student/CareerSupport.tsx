import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight
} from 'lucide-react';

export const CareerSupport: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigateTo } = useApp();

  const opps = [
    {
      title: 'CSIR Science & Tech Internship',
      titleHi: 'सीएसआईआर विज्ञान एवं प्रौद्योगिकी इंटर्नशिप',
      org: 'CSIR Labs',
      type: 'Paid Internship',
      stipend: '₹ 25,000 / month',
      domain: 'AI, Clean Energy, Ecology'
    },
    {
      title: 'DST Special Tribal Research Grant',
      titleHi: 'डीएसटी जनजातीय विशेष अनुसंधान अनुदान',
      org: 'Department of Science & Technology',
      type: 'Research Project',
      stipend: 'Funded Research',
      domain: 'Clean Technology & Engineering'
    },
    {
      title: 'Tribal Research Institute Fellowship',
      titleHi: 'जनजातीय अनुसंधान संस्थान शोधवृत्ति',
      org: 'Ministry of Tribal Affairs / State TRI',
      type: 'Fellowship',
      stipend: '₹ 30,000 / month',
      domain: 'Tribal Culture, Language & Development'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
            {language === 'hi' ? 'करियर एवं शोध' : 'Career & Research'}
          </span>
          <span className="text-xs text-[#66737C]">
            Connected to ST Scholarships
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
          {t('careerSupport')}
        </h1>
        <p className="text-xs sm:text-sm text-[#66737C] mt-1">
          {language === 'hi'
            ? 'अपनी छात्रवृत्ति के बाद शोध, इंटर्नशिप और उच्च शिक्षा के अवसर खोजें।'
            : 'Find funded research, internships, and mentoring connected to your scholarship.'}
        </p>
      </div>

      {/* Grid of opportunities */}
      <div className="space-y-4">
        <h2 className="font-serif text-base font-bold text-[#102A39]">
          {language === 'hi' ? 'उपलब्ध अवसर' : 'Opportunities for ST Students'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opps.map((opp, i) => (
            <div key={i} className="bg-white border border-[#DFE3E4] rounded-lg p-5 shadow-2xs flex flex-col justify-between hover:border-[#102A39]/40 transition-colors">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#F4F7F9] text-[#245D78]">
                  {opp.type}
                </span>

                <h3 className="font-serif text-sm font-bold text-[#102A39] mt-2">
                  {language === 'hi' ? opp.titleHi : opp.title}
                </h3>
                <p className="text-[11px] text-[#66737C] mt-0.5">{opp.org}</p>

                <div className="mt-3 p-2.5 rounded bg-[#F7F5EF] border border-[#DFE3E4] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#66737C]">Stipend:</span>
                    <strong className="text-[#276B58]">{opp.stipend}</strong>
                  </div>
                  <div className="text-[10px] text-[#245D78] font-medium">
                    Topic: {opp.domain}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DFE3E4] flex items-center justify-between">
                <span className="text-[10px] text-[#276B58] font-medium">ST Priority</span>
                <button
                  type="button"
                  onClick={() => navigateTo('/student/saathi')}
                  className="text-xs font-semibold text-[#102A39] hover:text-[#245D78] flex items-center gap-1"
                >
                  <span>Ask Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
