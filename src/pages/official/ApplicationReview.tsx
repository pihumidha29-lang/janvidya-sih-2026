import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowLeft, 
  Send, 
  X, 
  Sparkles, 
  Check
} from 'lucide-react';

export const ApplicationReview: React.FC = () => {
  const { language, t } = useLanguage();
  const { applications, documents, updateApplicationStatus, sendOfficialMessage, navigateTo } = useApp();

  const [selectedAppId, setSelectedAppId] = useState<string>('JV-2026-001247');
  const [officerNoteInput, setOfficerNoteInput] = useState<string>('');
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  const activeApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const handleOfficerDecision = (actionType: 'approve' | 'deficiency' | 'clarify') => {
    if (!activeApp) return;

    if (actionType === 'approve') {
      updateApplicationStatus(
        activeApp.id, 
        'Approved', 
        officerNoteInput || 'Approved by officer. Forwarded for selection.'
      );
      sendOfficialMessage(
        activeApp.studentId,
        'Application Approved',
        `Your application ${activeApp.id} has cleared officer review and is approved for selection.`,
        'success'
      );
      setDecisionFeedback('Application approved by officer.');
    } else if (actionType === 'deficiency') {
      updateApplicationStatus(
        activeApp.id, 
        'Action Required', 
        officerNoteInput || 'Income certificate is expired. Please upload a new one.'
      );
      sendOfficialMessage(
        activeApp.studentId,
        'Document Needs Attention: Income Certificate',
        'Your Income Certificate has expired. Please upload a new certificate for FY 2025-26.',
        'action_required'
      );
      setDecisionFeedback('Problem notice sent to student. Status set to Action Needed.');
    } else if (actionType === 'clarify') {
      sendOfficialMessage(
        activeApp.studentId,
        'Question about your application',
        officerNoteInput || 'Please verify your college roll number.',
        'warning'
      );
      setDecisionFeedback('Question sent to student.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#102A39] text-white">
                {language === 'hi' ? 'आवेदन समीक्षा' : 'Officer Review'}
              </span>
              <span className="text-xs text-[#66737C]">
                ID: <strong className="font-mono text-[#102A39]">{activeApp?.id}</strong>
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {language === 'hi' ? 'आवेदन समीक्षा' : 'Application Review'}
            </h1>
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {language === 'hi'
                ? 'छात्र की जानकारी और दस्तावेज़ों की समीक्षा करें।'
                : "Check the student's details and documents."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/official/dashboard')}
            className="border border-[#DFE3E4] hover:bg-[#F4F7F9] text-[#102A39] px-3.5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}</span>
          </button>
        </div>

        {/* Notice */}
        <div className="mt-4 p-3 bg-[#102A39] text-white rounded border border-[#20455D] text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C48A3A]" />
            <strong className="text-[#E5B56E]">
              {language === 'hi'
                ? 'एआई केवल जाँच में सहायता करता है। अंतिम निर्णय अधिकृत अधिकारी लेते हैं।'
                : 'AI helps with checking. The authorised officer makes the final decision.'}
            </strong>
          </div>
        </div>
      </div>

      {/* Decision Toast */}
      {decisionFeedback && (
        <div className="p-4 rounded-lg bg-[#EDF5F2] border border-[#276B58]/40 text-xs text-[#276B58] flex items-center justify-between shadow-xs animate-fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>{decisionFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setDecisionFeedback(null)}
            className="text-[#66737C] hover:text-[#17242D]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Application Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {applications.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => {
              setSelectedAppId(app.id);
              setDecisionFeedback(null);
            }}
            className={`px-3 py-2 rounded text-xs font-semibold whitespace-nowrap transition-colors border ${
              activeApp?.id === app.id
                ? 'bg-[#102A39] text-white border-[#102A39] shadow-xs'
                : 'bg-white text-[#66737C] border-[#DFE3E4] hover:bg-[#F4F7F9]'
            }`}
          >
            {app.id} — {app.studentName}
          </button>
        ))}
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Student Details & Documents (lg: 7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Student Details Card */}
          <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE3E4]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#102A39]">
                  {activeApp?.studentName}
                </h3>
                <p className="text-[11px] text-[#66737C]">
                  Student ID: {activeApp?.studentId} • Santhal Tribe
                </p>
              </div>

              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                activeApp?.status === 'Approved'
                  ? 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30'
                  : activeApp?.status === 'Action Required'
                  ? 'bg-[#FBF6EE] text-[#C48A3A] border-[#C48A3A]/40'
                  : 'bg-[#F4F7F9] text-[#245D78] border-[#245D78]/30'
              }`}>
                {activeApp?.status === 'Action Required' ? 'Action Needed' : activeApp?.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#66737C] block">Scholarship:</span>
                <span className="font-bold text-[#102A39]">{activeApp?.schemeName}</span>
              </div>
              <div>
                <span className="text-[#66737C] block">College:</span>
                <span className="font-medium text-[#102A39]">{activeApp?.institution}</span>
              </div>
              <div>
                <span className="text-[#66737C] block">Course:</span>
                <span className="font-medium text-[#102A39]">{activeApp?.course}</span>
              </div>
              <div>
                <span className="text-[#66737C] block">Family Income:</span>
                <span className="font-bold text-[#276B58]">₹ {activeApp?.annualFamilyIncome.toLocaleString('en-IN')} / year</span>
              </div>
            </div>
          </div>

          {/* Attached Documents */}
          <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-3">
            <h3 className="font-serif text-base font-bold text-[#102A39]">
              {language === 'hi' ? 'संलग्न दस्तावेज़' : 'Attached Documents'}
            </h3>

            <div className="space-y-2 text-xs">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-3 rounded border border-[#DFE3E4] flex items-center justify-between hover:bg-[#FDFCFB]"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#245D78]" />
                    <div>
                      <p className="font-semibold text-[#102A39]">{doc.title}</p>
                      <p className="text-[10px] text-[#66737C] font-mono">{doc.fileName}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    doc.status === 'Verified'
                      ? 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30'
                      : doc.status === 'Needs Attention'
                      ? 'bg-[#FBF6EE] text-[#C48A3A] border-[#C48A3A]/40'
                      : 'bg-[#F4F7F9] text-[#66737C] border-[#DFE3E4]'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Check & Officer Decision (lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* AI Check Findings */}
          <div className="bg-[#102A39] text-white border border-[#20455D] rounded-lg p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#20455D]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C48A3A]" />
                <h3 className="font-serif text-sm font-bold text-white">
                  {language === 'hi' ? 'एआई दस्तावेज़ जाँच' : 'AI Document Check'}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#E5B56E] bg-[#173447] px-2 py-0.5 rounded border border-[#245D78]">
                {activeApp?.aiVerificationSummary.confidence}% Match
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-stone-300">
                <span>Name check:</span>
                <span className="text-[#276B58] font-bold">✓ Matches Aarav Kumar</span>
              </div>
              <div className="flex items-center justify-between text-stone-300">
                <span>ST Certificate:</span>
                <span className="text-[#276B58] font-bold">✓ Valid certificate</span>
              </div>
              <div className="flex items-center justify-between text-stone-300">
                <span>Income Certificate:</span>
                {activeApp?.aiVerificationSummary.flags.length ? (
                  <span className="text-[#C48A3A] font-bold">⚠ Flagged: Date Expired</span>
                ) : (
                  <span className="text-[#276B58] font-bold">✓ Current Year Valid</span>
                )}
              </div>
            </div>

            {activeApp?.aiVerificationSummary.flags.length ? (
              <div className="p-3 rounded bg-[#173447] border border-[#C48A3A]/40 text-[#E5B56E] text-[11px]">
                <p className="font-semibold">Problem Found for Officer to Review:</p>
                <p className="mt-0.5">{activeApp.aiVerificationSummary.flags[0]}</p>
              </div>
            ) : (
              <div className="p-3 rounded bg-[#173447] border border-[#276B58]/40 text-[#A6E3D0] text-[11px]">
                <p className="font-semibold">All documents look good:</p>
                <p className="mt-0.5">No problems found during automated check.</p>
              </div>
            )}
          </div>

          {/* Officer Decision Box */}
          <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
              {language === 'hi' ? 'अधिकारी का निर्णय' : 'Officer Decision'}
            </h3>

            <div>
              <label className="block font-semibold text-[#17242D] mb-1">
                Officer Notes
              </label>
              <textarea
                rows={3}
                value={officerNoteInput}
                onChange={(e) => setOfficerNoteInput(e.target.value)}
                placeholder="Enter notes or explanation for student..."
                className="w-full p-2.5 text-xs border border-[#DFE3E4] rounded bg-[#FDFCFB] focus:outline-none focus:ring-2 focus:ring-[#102A39]"
              />
            </div>

            <div className="space-y-2 pt-2">
              {/* Approve */}
              <button
                type="button"
                onClick={() => handleOfficerDecision('approve')}
                className="w-full bg-[#276B58] hover:bg-[#1f5646] text-white py-2 px-3 rounded font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>{language === 'hi' ? 'अनुमोदित करें' : 'Approve Application'}</span>
              </button>

              {/* Flag a Problem */}
              <button
                type="button"
                onClick={() => handleOfficerDecision('deficiency')}
                className="w-full bg-[#C48A3A] hover:bg-[#a9752d] text-white py-2 px-3 rounded font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{language === 'hi' ? 'समस्या चिह्नित करें (छात्र को बताएँ)' : 'Flag a Problem & Notify Student'}</span>
              </button>

              {/* Ask Question */}
              <button
                type="button"
                onClick={() => handleOfficerDecision('clarify')}
                className="w-full border border-[#DFE3E4] text-[#102A39] hover:bg-[#F4F7F9] py-2 px-3 rounded font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#245D78]" />
                <span>{language === 'hi' ? 'जानकारी मांगें' : 'Ask Question to Student'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
