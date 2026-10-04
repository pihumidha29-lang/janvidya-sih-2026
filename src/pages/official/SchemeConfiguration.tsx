import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  Save
} from 'lucide-react';

export const SchemeConfiguration: React.FC = () => {
  const { language, t } = useLanguage();
  const { schemes, updateScheme } = useApp();

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(schemes[0].id);
  const [saveToast, setSaveToast] = useState(false);

  const activeScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];

  const [incomeLimit, setIncomeLimit] = useState(activeScheme.maxIncome);
  const [annualGrant, setAnnualGrant] = useState(activeScheme.annualGrant);
  const [deadline, setDeadline] = useState(activeScheme.deadline);

  const handleSelectScheme = (id: string) => {
    setSelectedSchemeId(id);
    const target = schemes.find(s => s.id === id);
    if (target) {
      setIncomeLimit(target.maxIncome);
      setAnnualGrant(target.annualGrant);
      setDeadline(target.deadline);
    }
  };

  const handleSaveSchemeRule = (e: React.FormEvent) => {
    e.preventDefault();
    updateScheme(activeScheme.id, {
      maxIncome: Number(incomeLimit),
      annualGrant,
      deadline
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                Core Innovation
              </span>
              <span className="text-xs text-[#102A39] font-bold">
                ONE PLATFORM → MANY SCHEMES
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {language === 'hi' ? 'योजना सेटिंग्स' : 'Scheme Settings'}
            </h1>
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {language === 'hi'
                ? 'एक ही मंच से बिना कोड बदले नई योजनाएँ और उनके नियम आसानी से सेट करें।'
                : 'One platform for all scholarships: Change income limits, documents, and dates in seconds.'}
            </p>
          </div>

          <span className="p-2.5 rounded bg-[#F7F5EF] border border-[#DFE3E4] text-xs font-mono text-[#245D78]">
            {schemes.length} Schemes Active
          </span>
        </div>

        {/* Save feedback toast */}
        {saveToast && (
          <div className="mt-4 p-3 bg-[#EDF5F2] border border-[#276B58]/30 rounded text-xs text-[#276B58] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved! The new rules are now active for all student applications.</span>
          </div>
        )}
      </div>

      {/* Scheme Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {schemes.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => handleSelectScheme(s.id)}
            className={`px-3.5 py-2.5 rounded text-xs font-semibold whitespace-nowrap transition-colors border ${
              activeScheme.id === s.id
                ? 'bg-[#102A39] text-white border-[#102A39] shadow-xs'
                : 'bg-white text-[#66737C] border-[#DFE3E4] hover:bg-[#F4F7F9]'
            }`}
          >
            {s.name} ({s.level})
          </button>
        ))}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form (lg: 7 cols) */}
        <form onSubmit={handleSaveSchemeRule} className="lg:col-span-7 bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-5 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFE3E4]">
            <h2 className="font-serif text-lg font-bold text-[#102A39]">
              {activeScheme.name}
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EDF5F2] text-[#276B58]">
              Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#17242D] mb-1">
                Scheme Code
              </label>
              <input
                type="text"
                readOnly
                value={activeScheme.code}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#F4F7F9] text-[#66737C]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#17242D] mb-1">
                Education Level
              </label>
              <input
                type="text"
                readOnly
                value={activeScheme.level}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#F4F7F9] text-[#66737C]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#17242D] mb-1">
                Income Limit (₹ / year)
              </label>
              <input
                type="number"
                value={incomeLimit}
                onChange={(e) => setIncomeLimit(Number(e.target.value))}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#17242D] mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-[#17242D] mb-1">
                Scholarship Amount
              </label>
              <input
                type="text"
                value={annualGrant}
                onChange={(e) => setAnnualGrant(e.target.value)}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
              />
            </div>
          </div>

          {/* Required Documents */}
          <div className="pt-2">
            <label className="block font-semibold text-[#17242D] mb-2">
              Required Documents for this Scheme:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeScheme.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
                  <FileText className="w-3.5 h-3.5 text-[#245D78]" />
                  <span className="text-[11px] text-[#102A39]">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#DFE3E4] flex items-center justify-between">
            <span className="text-[11px] text-[#66737C]">
              No code deployment needed
            </span>
            <button
              type="submit"
              className="bg-[#102A39] hover:bg-[#173447] text-white px-5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-[#C48A3A]" />
              <span>Save Scheme Settings</span>
            </button>
          </div>
        </form>

        {/* Right Column: AI Rules & Review Steps (lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-5 text-xs">
          
          {/* AI Check Rules */}
          <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#102A39]">
              What the AI Checks Automatically
            </h3>

            <div className="space-y-2">
              {activeScheme.verificationRules.map((r, i) => (
                <div key={i} className="p-2.5 rounded bg-[#EDF5F2] border border-[#276B58]/30 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#276B58] shrink-0 mt-0.5" />
                  <span className="text-[#17242D]">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Steps */}
          <div className="bg-[#102A39] text-white border border-[#20455D] rounded-lg p-6 shadow-2xs space-y-3">
            <h3 className="font-serif text-sm font-bold text-white">
              Review Steps
            </h3>

            <div className="space-y-2 text-[11px] text-stone-300">
              <div className="p-2 rounded bg-[#173447] border border-[#245D78] flex items-center justify-between">
                <span>1. Student applies online</span>
                <span className="text-[#276B58]">Auto</span>
              </div>
              <div className="p-2 rounded bg-[#173447] border border-[#245D78] flex items-center justify-between">
                <span>2. AI checks document</span>
                <span className="text-[#E5B56E]">Instant</span>
              </div>
              <div className="p-2 rounded bg-[#173447] border border-[#245D78] flex items-center justify-between">
                <span>3. Officer reviews</span>
                <span className="text-[#4FA3D1]">Officer</span>
              </div>
              <div className="p-2 rounded bg-[#173447] border border-[#245D78] flex items-center justify-between">
                <span>4. Payment via DBT</span>
                <span className="text-white">Bank</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
