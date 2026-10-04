import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Sparkles,
  Upload
} from 'lucide-react';

export const VerificationDemo: React.FC = () => {
  const { language, t } = useLanguage();
  const { documents, runAiVerification, navigateTo } = useApp();

  const [selectedDocId, setSelectedDocId] = useState<string>('doc-income');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentStepText, setCurrentStepText] = useState<string>('');
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleTriggerVerification = async () => {
    setIsRunning(true);
    setHasCompleted(false);
    setCurrentStep(1);

    await runAiVerification(selectedDocId, (step, text) => {
      setCurrentStep(step);
      setCurrentStepText(text);
    });

    setIsRunning(false);
    setHasCompleted(true);
  };

  const isIncomeDoc = selectedDoc.type === 'Income Certificate';

  const simpleStages = [
    { num: 1, text: 'Reading your document...' },
    { num: 2, text: 'Checking the details...' },
    { num: 3, text: 'Comparing with your application...' },
    { num: 4, text: 'Checking validity dates...' },
    { num: 5, text: 'Check complete.' }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                {language === 'hi' ? 'दस्तावेज़ जाँच' : 'AI Document Check'}
              </span>
              <span className="text-xs text-[#66737C]">
                Helpful Tool
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {t('verification')}
            </h1>
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {language === 'hi'
                ? 'यह टूल आपके दस्तावेज़ को पढ़ता है और जाँचता है कि सभी जानकारी सही है या नहीं।'
                : 'See how JANVIDYA checks your document readability, names, and validity dates.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#102A39] bg-[#FBF6EE] px-3 py-1.5 rounded-md border border-[#C48A3A]/40 font-semibold">
              <Sparkles className="w-4 h-4 text-[#C48A3A]" />
              {t('aiAssistsOfficerDecides')}
            </span>
          </div>
        </div>

        {/* Notice */}
        <div className="mt-4 p-3 bg-[#F7F5EF] rounded border border-[#DFE3E4] text-xs text-[#66737C]">
          {language === 'hi'
            ? 'एआई केवल जाँच में सहायता करता है। अंतिम निर्णय अधिकृत अधिकारी लेते हैं।'
            : 'AI only helps with checking. An authorised officer makes the final decision.'}
        </div>
      </div>

      {/* Main Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Selector (lg: 5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-4">
          <h2 className="font-serif text-base font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
            {language === 'hi' ? '१. जाँचने के लिए दस्तावेज़ चुनें' : '1. Choose a document to test'}
          </h2>

          <div className="space-y-2 text-xs">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => {
                  if (!isRunning) {
                    setSelectedDocId(doc.id);
                    setHasCompleted(false);
                    setCurrentStep(0);
                  }
                }}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  selectedDocId === doc.id
                    ? 'border-[#102A39] bg-[#F4F7F9] font-semibold text-[#102A39]'
                    : 'border-[#DFE3E4] hover:bg-[#FDFCFB] text-[#17242D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className={`w-4 h-4 ${selectedDocId === doc.id ? 'text-[#C48A3A]' : 'text-[#66737C]'}`} />
                  <div>
                    <p className="leading-snug">{doc.title}</p>
                    <p className="text-[10px] text-[#66737C] font-mono">{doc.fileName}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
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

          <div className="pt-4 border-t border-[#DFE3E4]">
            <button
              type="button"
              disabled={isRunning}
              onClick={handleTriggerVerification}
              className={`w-full py-2.5 px-4 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                isRunning
                  ? 'bg-[#173447] text-white opacity-70 cursor-not-allowed'
                  : 'bg-[#102A39] hover:bg-[#173447] text-white shadow-xs'
              }`}
            >
              <RotateCw className={`w-4 h-4 text-[#C48A3A] ${isRunning ? 'animate-spin' : ''}`} />
              <span>
                {isRunning
                  ? (language === 'hi' ? 'जाँच चल रही है...' : 'Checking Document...')
                  : (language === 'hi' ? 'दस्तावेज़ जाँचें' : 'Start Document Check')}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Steps & Results (lg: 7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-5">
          <h2 className="font-serif text-base font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
            {language === 'hi' ? '२. जाँच के चरण' : '2. What happens during check'}
          </h2>

          {/* Simple step list */}
          <div className="space-y-3">
            {simpleStages.map((st) => {
              const isPast = currentStep > st.num;
              const isCurrent = currentStep === st.num;

              return (
                <div 
                  key={st.num}
                  className={`p-3 rounded-md border text-xs flex items-center justify-between transition-all ${
                    isCurrent 
                      ? 'bg-[#102A39] text-white border-[#102A39] shadow-xs'
                      : isPast
                      ? 'bg-[#EDF5F2] text-[#17242D] border-[#276B58]/30 font-medium'
                      : 'bg-[#F7F5EF]/60 text-[#66737C] border-[#DFE3E4]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-[#C48A3A] text-white'
                        : isPast
                        ? 'bg-[#276B58] text-white'
                        : 'bg-[#DFE3E4] text-[#66737C]'
                    }`}>
                      {isPast ? '✓' : st.num}
                    </div>
                    <span>{st.text}</span>
                  </div>

                  {isCurrent && (
                    <span className="text-[10px] font-bold text-[#C48A3A] animate-pulse">
                      Checking...
                    </span>
                  )}
                  {isPast && (
                    <span className="text-[10px] font-semibold text-[#276B58]">
                      Done
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Result */}
          {hasCompleted && (
            <div className="mt-6 pt-4 border-t border-[#DFE3E4] animate-fade-in">
              <h3 className="font-serif text-sm font-bold text-[#102A39] mb-3">
                {language === 'hi' ? 'जाँच का परिणाम' : 'Check Results'}
              </h3>

              {!isIncomeDoc ? (
                <div className="p-4 rounded-lg bg-[#EDF5F2] border border-[#276B58]/30 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#276B58]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>✓ Check complete. Everything looks good!</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-[#17242D]">
                    <p>✓ Document is readable</p>
                    <p>✓ Name matches your application</p>
                    <p>✓ Required details found</p>
                    <p>✓ No clear problem found</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-[#FBF6EE] border border-[#C48A3A]/40 text-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-[#C48A3A]">
                    <AlertTriangle className="w-5 h-5" />
                    <span>⚠ We found a possible problem.</span>
                  </div>

                  <p className="text-[#17242D] text-xs">
                    <strong>Problem: </strong>
                    Your Income Certificate may have expired. It was issued in March 2024. The scheme requires a valid certificate for the current year.
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigateTo('/student/deficiency')}
                      className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#C48A3A]" />
                      <span>{language === 'hi' ? 'दस्तावेज़ ठीक करें' : 'Fix this document'}</span>
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-[#66737C] mt-3 italic">
                * AI only helps with checking. An authorised officer makes the final decision.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
