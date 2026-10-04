import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  GraduationCap, 
  Search, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  CreditCard,
  HelpCircle
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, applications, schemes, documents, navigateTo } = useApp();

  const activeApp = applications[0]; // JV-2026-001247
  const deficientDoc = documents.find(d => d.status === 'Needs Attention');

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Welcome Card */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FBF6EE] text-[#C48A3A] border border-[#C48A3A]/30">
                {currentUser?.tribeGroup || 'Scheduled Tribe Student'}
              </span>
              <span className="text-xs text-[#66737C]">
                {currentUser?.institution}
              </span>
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {t('goodMorning')}, {currentUser ? (language === 'hi' ? currentUser.nameHi : currentUser.name) : 'Student'}
            </h1>
            
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {t('journeySubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('/student/scholarships')}
              className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#C48A3A]" />
              <span>{t('scholarships')}</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/student/saathi')}
              className="bg-[#F7F5EF] hover:bg-[#EAE7DC] text-[#102A39] border border-[#DFE3E4] px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#276B58]" />
              <span>{language === 'hi' ? 'साथी से पूछें' : 'Ask Saathi'}</span>
            </button>
          </div>
        </div>

        {/* Your Application: 5 Step Track */}
        <div className="mt-8 pt-6 border-t border-[#DFE3E4]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#102A39] tracking-tight">
              {language === 'hi' ? 'आपका आवेदन: ' : 'Your Application: '}
              <span className="font-mono text-[#245D78] font-semibold">{activeApp?.id}</span>
              {' — '}{activeApp?.schemeName}
            </span>
            <span className="text-[11px] text-[#C48A3A] font-bold bg-[#FBF6EE] px-2.5 py-0.5 rounded border border-[#C48A3A]/40">
              {activeApp?.status === 'Action Required' 
                ? (language === 'hi' ? 'ध्यान दें (कार्रवाई आवश्यक)' : 'Action Needed') 
                : activeApp?.status}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center mt-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#276B58] text-white flex items-center justify-center text-xs font-bold mb-1 shadow-2xs">
                ✓
              </div>
              <span className="text-xs font-semibold text-[#102A39]">
                {language === 'hi' ? 'आवेदन' : 'Application'}
              </span>
              <span className="text-[10px] text-[#276B58] font-medium">Done</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#276B58] text-white flex items-center justify-center text-xs font-bold mb-1 shadow-2xs">
                ✓
              </div>
              <span className="text-xs font-semibold text-[#102A39]">
                {language === 'hi' ? 'दस्तावेज़ जाँच' : 'AI Check'}
              </span>
              <span className="text-[10px] text-[#276B58] font-medium">Done</span>
            </div>

            {/* Step 3: Current */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#102A39] text-[#C48A3A] border-2 border-[#C48A3A] flex items-center justify-center text-xs font-bold mb-1 shadow-xs">
                ●
              </div>
              <span className="text-xs font-bold text-[#102A39]">
                {language === 'hi' ? 'समीक्षा' : 'Review'}
              </span>
              <span className="text-[10px] text-[#C48A3A] font-bold">Now</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#F4F7F9] text-[#66737C] border border-[#DFE3E4] flex items-center justify-center text-xs font-bold mb-1">
                ○
              </div>
              <span className="text-xs font-medium text-[#66737C]">
                {language === 'hi' ? 'चयन' : 'Selection'}
              </span>
              <span className="text-[10px] text-[#66737C]">Next</span>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#F4F7F9] text-[#66737C] border border-[#DFE3E4] flex items-center justify-center text-xs font-bold mb-1">
                ○
              </div>
              <span className="text-xs font-medium text-[#66737C]">
                {language === 'hi' ? 'भुगतान' : 'Payment'}
              </span>
              <span className="text-[10px] text-[#66737C]">DBT</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION NEEDED Banner (Noticeable & Simple) */}
      {deficientDoc && (
        <div className="bg-[#FBF6EE] border-l-4 border-[#C48A3A] border-y border-r border-[#DFE3E4] rounded-r-lg p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[#C48A3A] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C48A3A]">
                  {language === 'hi' ? 'कार्रवाई आवश्यक' : 'ACTION NEEDED'}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#102A39]">
                  {language === 'hi' 
                    ? 'आपका आय प्रमाण पत्र पुराना हो गया है।' 
                    : 'Your Income Certificate has expired.'}
                </h3>
                <p className="text-xs text-[#17242D] mt-0.5">
                  {language === 'hi'
                    ? 'कृपया वित्तीय वर्ष 2025-26 का नया प्रमाण पत्र अपलोड करें ताकि आपकी छात्रवृत्ति आगे बढ़ सके।'
                    : 'Please upload a new certificate to continue your application review.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('/student/deficiency')}
              className="bg-[#102A39] hover:bg-[#173447] text-white px-5 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
            >
              <span>{language === 'hi' ? 'नया दस्तावेज़ अपलोड करें' : 'Review & Replace'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
            </button>
          </div>
        </div>
      )}

      {/* Recommended for You Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#102A39]">
              {language === 'hi' ? 'आपके लिए छात्रवृत्तियाँ' : 'Recommended for You'}
            </h2>
            <p className="text-xs text-[#66737C]">
              {language === 'hi' 
                ? 'आपकी पढ़ाई और अनुसूचित जनजाति प्रोफ़ाइल के अनुसार चुनी गई योजनाएँ।'
                : 'Scholarships matching your course and Scheduled Tribe profile.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/student/scholarships')}
            className="text-xs font-semibold text-[#245D78] hover:text-[#102A39] flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schemes.slice(0, 2).map((scheme) => (
            <div 
              key={scheme.id}
              className="bg-white border border-[#DFE3E4] rounded-lg p-5 hover:border-[#102A39]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                    {scheme.level}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#102A39] bg-[#F7F5EF] px-2 py-0.5 rounded border border-[#DFE3E4]">
                    <Sparkles className="w-3 h-3 text-[#C48A3A]" />
                    {scheme.matchScore}% Match
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#102A39]">
                  {language === 'hi' ? scheme.nameHi : scheme.name}
                </h3>
                
                <p className="text-xs text-[#17242D] mt-2 line-clamp-2 leading-relaxed">
                  {language === 'hi' ? scheme.descriptionHi : scheme.description}
                </p>

                {/* Why You Match - Simple bullets */}
                <div className="mt-3 p-2.5 rounded bg-[#F7F5EF] border border-[#DFE3E4] text-[11px] space-y-1">
                  <p className="font-bold text-[#102A39]">
                    {language === 'hi' ? 'आप क्यों पात्र हैं:' : 'Why you match:'}
                  </p>
                  <p className="text-[#276B58]">✓ Your education level matches</p>
                  <p className="text-[#276B58]">✓ You meet the ST requirement</p>
                  <p className="text-[#276B58]">✓ Your annual family income matches</p>
                </div>

                <div className="mt-3 py-2 border-y border-[#F4F7F9] flex items-center justify-between text-xs">
                  <span className="text-[#66737C]">{language === 'hi' ? 'राशि' : 'Amount'}:</span>
                  <span className="font-bold text-[#276B58]">{scheme.annualGrant}</span>
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#66737C]">
                  {language === 'hi' ? 'अंतिम तिथि: ' : 'Last Date: '} {scheme.deadline}
                </span>

                <button
                  type="button"
                  onClick={() => navigateTo('/student/scholarships')}
                  className="text-xs font-semibold text-[#102A39] hover:text-[#245D78] flex items-center gap-1"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[#66737C] italic">
          * Note: Final eligibility is checked by the authorised officer.
        </p>
      </div>

      {/* Quick Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div 
          onClick={() => navigateTo('/student/documents')}
          className="bg-white border border-[#DFE3E4] rounded-lg p-4 hover:border-[#102A39] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#F4F7F9] flex items-center justify-center text-[#102A39]">
              <FileText className="w-5 h-5 text-[#245D78]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#102A39]">{language === 'hi' ? 'आपके दस्तावेज़' : 'Your Documents'}</h4>
              <p className="text-[11px] text-[#66737C]">6 documents saved</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigateTo('/student/payment')}
          className="bg-white border border-[#DFE3E4] rounded-lg p-4 hover:border-[#102A39] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#F4F7F9] flex items-center justify-center text-[#102A39]">
              <CreditCard className="w-5 h-5 text-[#276B58]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#102A39]">{t('dbtPayment')}</h4>
              <p className="text-[11px] text-[#66737C]">₹50,000 Payment Started</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigateTo('/student/saathi')}
          className="bg-white border border-[#DFE3E4] rounded-lg p-4 hover:border-[#102A39] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#F4F7F9] flex items-center justify-center text-[#102A39]">
              <HelpCircle className="w-5 h-5 text-[#C48A3A]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#102A39]">{language === 'hi' ? 'सहायता चाहिए?' : 'Need Help?'}</h4>
              <p className="text-[11px] text-[#66737C]">Ask JanVidya Saathi</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
