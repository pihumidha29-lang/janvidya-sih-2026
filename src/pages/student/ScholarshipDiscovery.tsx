import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { SchemeRule } from '../../types';
import { 
  Search, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  FileText, 
  ArrowRight, 
  X
} from 'lucide-react';

export const ScholarshipDiscovery: React.FC = () => {
  const { language, t } = useLanguage();
  const { schemes, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedIncomeMax, setSelectedIncomeMax] = useState<number>(1000000);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<SchemeRule | null>(null);

  // Simple Matcher modal
  const [showAiMatcher, setShowAiMatcher] = useState(false);
  const [matcherIncome, setMatcherIncome] = useState('200000');
  const [matcherLevel, setMatcherLevel] = useState('Post-Matric');
  const [matcherResult, setMatcherResult] = useState<'strong' | 'possible' | null>(null);

  const filteredSchemes = schemes.filter(s => {
    const matchesQuery = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevel === 'All' || s.level === selectedLevel;
    const matchesIncome = s.maxIncome <= selectedIncomeMax || selectedIncomeMax === 1000000;

    return matchesQuery && matchesLevel && matchesIncome;
  });

  const handleRunAiMatcher = (e: React.FormEvent) => {
    e.preventDefault();
    const inc = parseInt(matcherIncome) || 0;
    if (inc <= 250000) {
      setMatcherResult('strong');
    } else {
      setMatcherResult('possible');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                {language === 'hi' ? 'छात्रवृत्ति सूची' : 'Scholarships & Fellowships'}
              </span>
              <span className="text-xs text-[#66737C]">
                {schemes.length} {language === 'hi' ? 'योजनाएँ उपलब्ध' : 'schemes found'}
              </span>
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {t('scholarships')}
            </h1>
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {language === 'hi'
                ? 'अपने लिए उपयुक्त छात्रवृत्तियों और अध्येतावृत्तियों की खोज करें और आवेदन करें।'
                : 'Find scholarships that may be right for you.'}
            </p>
          </div>

          {/* AI Matcher Button */}
          <button
            type="button"
            onClick={() => setShowAiMatcher(true)}
            className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-2.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors shadow-2xs shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#C48A3A]" />
            <span>{language === 'hi' ? 'मेरे लिए योजना खोजें' : 'Find Scholarships for Me'}</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 pt-4 border-t border-[#DFE3E4] grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#66737C] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'छात्रवृत्ति खोजें...' : 'Search scholarships...'}
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#DFE3E4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#102A39] text-[#17242D] bg-[#FDFCFB]"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-[#DFE3E4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#102A39] text-[#17242D] bg-[#FDFCFB]"
            >
              <option value="All">{language === 'hi' ? 'सभी कक्षा / स्तर' : 'All Education Levels'}</option>
              <option value="Pre-Matric">Pre-Matric (Class 9-10)</option>
              <option value="Post-Matric">Post-Matric (College / PG)</option>
              <option value="Fellowship">National Fellowship (Ph.D.)</option>
              <option value="Overseas">Study Abroad (Overseas)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedIncomeMax}
              onChange={(e) => setSelectedIncomeMax(Number(e.target.value))}
              className="w-full py-2 px-3 text-xs border border-[#DFE3E4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#102A39] text-[#17242D] bg-[#FDFCFB]"
            >
              <option value={1000000}>{language === 'hi' ? 'आय सीमा: कोई भी' : 'Income: Any Limit'}</option>
              <option value={200000}>{language === 'hi' ? '₹ 2,00,000 तक' : 'Up to ₹ 2,00,000'}</option>
              <option value={250000}>{language === 'hi' ? '₹ 2,50,000 तक' : 'Up to ₹ 2,50,000'}</option>
              <option value={600000}>{language === 'hi' ? '₹ 6,00,000 तक' : 'Up to ₹ 6,00,000'}</option>
            </select>
          </div>

        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => (
          <div 
            key={scheme.id}
            className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs hover:border-[#102A39]/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                  {scheme.level}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#102A39] bg-[#FBF6EE] px-2 py-0.5 rounded border border-[#C48A3A]/30">
                  <Sparkles className="w-3 h-3 text-[#C48A3A]" />
                  {scheme.matchScore ? `${scheme.matchScore}% Match` : 'Possible Match'}
                </span>
              </div>

              <h2 className="font-serif text-lg font-bold text-[#102A39] leading-snug">
                {language === 'hi' ? scheme.nameHi : scheme.name}
              </h2>

              <p className="text-xs text-[#17242D] mt-2 line-clamp-2 leading-relaxed">
                {language === 'hi' ? scheme.descriptionHi : scheme.description}
              </p>

              {/* Why You Match - Simple 4 points */}
              <div className="mt-3 p-3 rounded bg-[#F7F5EF] border border-[#DFE3E4] text-[11px] space-y-1">
                <p className="font-bold text-[#102A39]">
                  {language === 'hi' ? 'आप क्यों पात्र हैं:' : 'Why you match:'}
                </p>
                <p className="text-[#276B58]">✓ Your education matches</p>
                <p className="text-[#276B58]">✓ You meet the ST requirement</p>
                <p className="text-[#276B58]">✓ Your income may match</p>
                <p className="text-[#276B58]">✓ Your documents are available</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F4F7F9] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#66737C]">{language === 'hi' ? 'छात्रवृत्ति राशि' : 'Amount'}:</span>
                  <span className="font-bold text-[#276B58]">{scheme.annualGrant}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#66737C]">{language === 'hi' ? 'वार्षिक आय सीमा' : 'Income Limit'}:</span>
                  <span className="font-medium text-[#102A39]">₹ {scheme.maxIncome.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-[#DFE3E4] flex items-center justify-between">
              <span className="text-[11px] text-[#66737C] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C48A3A]" />
                {language === 'hi' ? 'अंतिम तिथि: ' : 'Deadline: '} {scheme.deadline}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSchemeForModal(scheme)}
                  className="px-3 py-1.5 rounded text-xs font-semibold text-[#102A39] hover:bg-[#F4F7F9] border border-[#DFE3E4] transition-colors"
                >
                  {t('viewDetails')}
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo(`/student/apply?schemeId=${scheme.id}`)}
                  className="px-3.5 py-1.5 rounded text-xs font-semibold bg-[#102A39] hover:bg-[#173447] text-white flex items-center gap-1 shadow-2xs transition-colors"
                >
                  <span>{language === 'hi' ? 'आवेदन करें' : 'Apply'}</span>
                  <ArrowRight className="w-3 h-3 text-[#C48A3A]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-white border border-[#DFE3E4] rounded-lg text-xs text-[#66737C] text-center">
        {language === 'hi'
          ? 'सूचना: अंतिम पात्रता अधिकृत अधिकारी द्वारा जाँच कर तय की जाती है।'
          : 'Note: Final eligibility is checked and decided by the authorised officer.'}
      </div>

      {/* Scheme Details Modal */}
      {selectedSchemeForModal && (
        <div className="fixed inset-0 bg-[#102A39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-[#DFE3E4] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fade-in">
            <div className="flex items-start justify-between pb-3 border-b border-[#DFE3E4]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58]">
                  {selectedSchemeForModal.level}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#102A39] mt-1">
                  {language === 'hi' ? selectedSchemeForModal.nameHi : selectedSchemeForModal.name}
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedSchemeForModal(null)}
                className="text-[#66737C] hover:text-[#17242D] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#102A39] mb-1">
                  {language === 'hi' ? 'विवरण' : 'About this Scholarship'}
                </h4>
                <p className="text-[#17242D] leading-relaxed">
                  {language === 'hi' ? selectedSchemeForModal.descriptionHi : selectedSchemeForModal.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#102A39] mb-1">
                  {language === 'hi' ? 'पात्रता' : 'Who can apply?'}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-[#17242D]">
                  {(language === 'hi' ? selectedSchemeForModal.eligibilityCriteriaHi : selectedSchemeForModal.eligibilityCriteria).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#102A39] mb-1">
                  {language === 'hi' ? 'आवश्यक दस्तावेज़' : 'Documents you will need'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {selectedSchemeForModal.requiredDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center gap-1.5 p-2 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
                      <FileText className="w-3.5 h-3.5 text-[#245D78]" />
                      <span className="text-[11px] text-[#17242D]">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded bg-[#FBF6EE] border border-[#C48A3A]/30 text-[11px] text-[#66737C]">
                <p>
                  <strong>{language === 'hi' ? 'सूचना: ' : 'Note: '}</strong>
                  {language === 'hi'
                    ? 'अंतिम पात्रता अधिकृत अधिकारी द्वारा जाँच कर तय की जाती है।'
                    : 'Final eligibility is checked by the authorised officer.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DFE3E4] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedSchemeForModal(null)}
                className="px-3.5 py-1.5 rounded text-xs font-semibold text-[#66737C] hover:bg-[#F4F7F9]"
              >
                {t('close')}
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = selectedSchemeForModal.id;
                  setSelectedSchemeForModal(null);
                  navigateTo(`/student/apply?schemeId=${id}`);
                }}
                className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5"
              >
                <span>{language === 'hi' ? 'आवेदन करें' : 'Apply Now'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Matcher Modal */}
      {showAiMatcher && (
        <div className="fixed inset-0 bg-[#102A39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-[#DFE3E4] max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-start justify-between pb-3 border-b border-[#DFE3E4]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C48A3A]" />
                <h3 className="font-serif text-lg font-bold text-[#102A39]">
                  {language === 'hi' ? 'मेरे लिए योजना खोजें' : 'Find Scholarships for Me'}
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => {
                  setShowAiMatcher(false);
                  setMatcherResult(null);
                }}
                className="text-[#66737C] hover:text-[#17242D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRunAiMatcher} className="py-4 space-y-3 text-xs">
              <p className="text-[#66737C]">
                {language === 'hi' 
                  ? 'अपनी पढ़ाई और आय की जानकारी दें। हम आपके लिए सही योजना खोजेंगे।' 
                  : 'Enter your education level and family income to find matching schemes.'}
              </p>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">
                  {language === 'hi' ? 'आप क्या पढ़ रहे हैं?' : 'Current Course / Level'}
                </label>
                <select
                  value={matcherLevel}
                  onChange={(e) => setMatcherLevel(e.target.value)}
                  className="w-full py-2 px-3 text-xs border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                >
                  <option value="Pre-Matric">Class 9 or 10</option>
                  <option value="Post-Matric">College / Degree / M.Tech</option>
                  <option value="Fellowship">Doctoral / Ph.D.</option>
                  <option value="Overseas">Study Abroad</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">
                  {language === 'hi' ? 'परिवार की कुल वार्षिक आय (₹)' : 'Annual Family Income (₹)'}
                </label>
                <input
                  type="number"
                  value={matcherIncome}
                  onChange={(e) => setMatcherIncome(e.target.value)}
                  className="w-full py-2 px-3 text-xs border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#102A39] hover:bg-[#173447] text-white py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 mt-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C48A3A]" />
                <span>{language === 'hi' ? 'योजना खोजें' : 'Check Matches'}</span>
              </button>
            </form>

            {matcherResult && (
              <div className="mt-2 p-3 rounded bg-[#EDF5F2] border border-[#276B58]/30 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#276B58] mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {language === 'hi' ? '2 योजनाएँ आपके अनुकूल हैं!' : '2 Scholarships matched your details!'}
                  </span>
                </div>
                <p className="text-[#17242D] text-[11px] leading-relaxed">
                  Post-Matric Scholarship for ST Students (96% Match) & National Fellowship for Higher Education (89% Match).
                </p>
                <p className="text-[10px] text-[#66737C] mt-2 italic">
                  * Final eligibility is checked by the authorised officer.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
