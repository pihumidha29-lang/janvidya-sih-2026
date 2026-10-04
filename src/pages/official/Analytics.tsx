import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  CreditCard,
  PieChart,
  Users
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#102A39] text-white">
            Administrative Analytics
          </span>
          <span className="text-xs text-[#C48A3A] font-semibold bg-[#FBF6EE] px-2 py-0.5 rounded border border-[#C48A3A]/30">
            Demonstration Data
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
          {t('analyticsReports')}
        </h1>
        <p className="text-xs sm:text-sm text-[#66737C] mt-1">
          {language === 'hi'
            ? 'अनुसूचित जनजाति छात्रवृत्ति योजनाओं का वास्तविक समय में एआई-सत्यापन एवं संवितरण विश्लेषण।'
            : 'Key operational intelligence metrics across scheme onboarding, deficiency resolution speeds, and DBT flows.'}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-[#DFE3E4] rounded-lg p-5 shadow-2xs">
          <span className="text-[#66737C] block mb-1">Average AI Verification Speed</span>
          <p className="font-serif text-2xl font-bold text-[#276B58]">1.4 Seconds</p>
          <span className="text-[11px] text-[#276B58]">⚡ 94% faster than manual OCR</span>
        </div>

        <div className="bg-white border border-[#DFE3E4] rounded-lg p-5 shadow-2xs">
          <span className="text-[#66737C] block mb-1">First-Time Deficiency Detection Rate</span>
          <p className="font-serif text-2xl font-bold text-[#C48A3A]">18.4%</p>
          <span className="text-[11px] text-[#66737C]">Flagged prior to officer scrutiny</span>
        </div>

        <div className="bg-white border border-[#DFE3E4] rounded-lg p-5 shadow-2xs">
          <span className="text-[#66737C] block mb-1">Deficiency Redressal Turnaround</span>
          <p className="font-serif text-2xl font-bold text-[#102A39]">2.6 Days</p>
          <span className="text-[11px] text-[#276B58]">Average student replacement time</span>
        </div>

        <div className="bg-white border border-[#DFE3E4] rounded-lg p-5 shadow-2xs">
          <span className="text-[#66737C] block mb-1">DBT Sanction Conversion Rate</span>
          <p className="font-serif text-2xl font-bold text-[#245D78]">99.2%</p>
          <span className="text-[11px] text-[#66737C]">Direct Aadhaar Seeding Compliance</span>
        </div>
      </div>

      {/* Performance by Scheme Breakdown */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-4">
        <h2 className="font-serif text-base font-bold text-[#102A39]">
          Operational Volume by Central ST Scheme (Demo Data)
        </h2>

        <div className="space-y-3 text-xs">
          {/* Scheme 1 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-medium">
              <span className="text-[#102A39]">Post-Matric Scholarship for ST Students (PMS-ST)</span>
              <span className="text-[#66737C]">824 Applications (66%)</span>
            </div>
            <div className="w-full bg-[#F4F7F9] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#102A39] h-full" style={{ width: '66%' }} />
            </div>
          </div>

          {/* Scheme 2 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-medium">
              <span className="text-[#102A39]">National Fellowship for Higher Education (NFST)</span>
              <span className="text-[#66737C]">246 Applications (20%)</span>
            </div>
            <div className="w-full bg-[#F4F7F9] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#245D78] h-full" style={{ width: '20%' }} />
            </div>
          </div>

          {/* Scheme 3 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-medium">
              <span className="text-[#102A39]">Pre-Matric Scholarship for ST Students</span>
              <span className="text-[#66737C]">138 Applications (11%)</span>
            </div>
            <div className="w-full bg-[#F4F7F9] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#276B58] h-full" style={{ width: '11%' }} />
            </div>
          </div>

          {/* Scheme 4 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-medium">
              <span className="text-[#102A39]">National Overseas Scholarship for ST Students (NOS)</span>
              <span className="text-[#66737C]">40 Applications (3%)</span>
            </div>
            <div className="w-full bg-[#F4F7F9] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#C48A3A] h-full" style={{ width: '3%' }} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
