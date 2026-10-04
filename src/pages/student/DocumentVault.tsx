import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { StudentDocument } from '../../types';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  RotateCw, 
  X,
  FileCheck,
  Sparkles,
  GitCompare
} from 'lucide-react';

export const DocumentVault: React.FC = () => {
  const { language, t } = useLanguage();
  const { documents, runAiVerification, replaceDocument, navigateTo } = useApp();

  const [activePreviewDoc, setActivePreviewDoc] = useState<StudentDocument | null>(null);
  const [replacingDocId, setReplacingDocId] = useState<string | null>(null);
  const [replacementFileName, setReplacementFileName] = useState('');
  
  // Verification simulation state
  const [verifyingDocId, setVerifyingDocId] = useState<string | null>(null);
  const [verificationStep, setVerificationStep] = useState<number>(0);
  const [verificationStepText, setVerificationStepText] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<{ id: string; success: boolean } | null>(null);

  const handleStartVerification = async (docId: string) => {
    setVerifyingDocId(docId);
    setVerificationStep(1);
    setVerificationResult(null);

    const success = await runAiVerification(docId, (step, text) => {
      setVerificationStep(step);
      setVerificationStepText(text);
    });

    setVerifyingDocId(null);
    setVerificationResult({ id: docId, success });
  };

  const handleExecuteReplace = (e: React.FormEvent) => {
    e.preventDefault();
    if (replacingDocId && replacementFileName) {
      replaceDocument(replacingDocId, replacementFileName);
      setReplacingDocId(null);
      setReplacementFileName('');
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
                {language === 'hi' ? 'दस्तावेज़' : 'Document Vault'}
              </span>
              <span className="text-xs text-[#66737C]">
                {documents.length} {language === 'hi' ? 'दस्तावेज़ सहेजे गए' : 'Documents Saved'}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {t('documentVault')}
            </h1>
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {language === 'hi'
                ? 'अपने सभी ज़रूरी दस्तावेज़ एक ही सुरक्षित जगह पर रखें।'
                : 'Keep your important documents in one place.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigateTo('/student/verification')}
              className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C48A3A]" />
              <span>{t('verification')}</span>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-3 rounded bg-[#FBF6EE] border border-[#C48A3A]/30 text-xs text-[#66737C]">
          {t('aiVerificationDisclaimer')}
        </div>
      </div>

      {/* Name & Details Check */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE3E4]">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-[#245D78]" />
            <h3 className="font-serif text-base font-bold text-[#102A39]">
              {t('crossDocConsistency')}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#276B58] bg-[#EDF5F2] px-2 py-0.5 rounded border border-[#276B58]/30">
            {language === 'hi' ? 'नाम सही मिला' : 'Name Matches'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
            <p className="text-[10px] uppercase font-bold text-[#66737C]">Application</p>
            <p className="font-bold text-[#102A39] mt-0.5">Aarav Kumar</p>
            <span className="text-[10px] text-[#276B58] font-medium">✓ Base Name</span>
          </div>

          <div className="p-3 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
            <p className="text-[10px] uppercase font-bold text-[#66737C]">Identity (Aadhaar)</p>
            <p className="font-bold text-[#102A39] mt-0.5">Aarav Kumar</p>
            <span className="text-[10px] text-[#276B58] font-medium">✓ Match</span>
          </div>

          <div className="p-3 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
            <p className="text-[10px] uppercase font-bold text-[#66737C]">ST Certificate</p>
            <p className="font-bold text-[#102A39] mt-0.5">Aarav Kumar</p>
            <span className="text-[10px] text-[#276B58] font-medium">✓ Match (Santhal)</span>
          </div>

          <div className="p-3 rounded bg-[#FBF6EE] border border-[#C48A3A]/40">
            <p className="text-[10px] uppercase font-bold text-[#C48A3A]">Income Certificate</p>
            <p className="font-bold text-[#102A39] mt-0.5">Aarav Kumar</p>
            <span className="text-[10px] text-[#C48A3A] font-medium">⚠ Date Expired</span>
          </div>
        </div>
      </div>

      {/* Verification in Progress */}
      {verifyingDocId && (
        <div className="bg-[#102A39] text-white rounded-lg p-5 shadow-md animate-fade-in border border-[#20455D]">
          <div className="flex items-center gap-3 mb-2">
            <RotateCw className="w-5 h-5 text-[#C48A3A] animate-spin shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">
                {language === 'hi' ? 'जाँच जारी है...' : 'AI Document Check in Progress...'}
              </h4>
              <p className="text-xs text-stone-300 mt-0.5">
                Step {verificationStep} of 5: {verificationStepText}
              </p>
            </div>
          </div>

          <div className="w-full bg-[#173447] h-2 rounded-full overflow-hidden mt-3">
            <div 
              className="bg-[#C48A3A] h-full transition-all duration-300"
              style={{ width: `${(verificationStep / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Verification Result Toast */}
      {verificationResult && (
        <div className={`p-4 rounded-lg border text-xs flex items-start justify-between gap-4 animate-fade-in ${
          verificationResult.success
            ? 'bg-[#EDF5F2] border-[#276B58]/40 text-[#17242D]'
            : 'bg-[#FBF6EE] border-[#C48A3A]/40 text-[#17242D]'
        }`}>
          <div className="flex items-start gap-2.5">
            {verificationResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-[#276B58] shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-[#C48A3A] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-[#102A39]">
                {verificationResult.success
                  ? (language === 'hi' ? 'दस्तावेज़ सही है!' : 'Check complete: Document looks good!')
                  : (language === 'hi' ? 'एक समस्या मिली' : 'Possible problem found')}
              </p>
              <p className="mt-0.5 text-[#66737C]">
                {verificationResult.success
                  ? 'All details match your application.'
                  : 'Your Income Certificate appears to have expired.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVerificationResult(null)}
            className="text-[#66737C] hover:text-[#17242D]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => {
          const isNeedsAttention = doc.status === 'Needs Attention';
          const isVerified = doc.status === 'Verified';

          return (
            <div 
              key={doc.id}
              className={`bg-white border rounded-lg p-5 shadow-2xs flex flex-col justify-between transition-colors ${
                isNeedsAttention 
                  ? 'border-[#C48A3A] bg-[#FDFCF9]' 
                  : 'border-[#DFE3E4] hover:border-[#102A39]/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4F7F9] text-[#245D78]">
                    {doc.type}
                  </span>

                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    isVerified
                      ? 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30'
                      : isNeedsAttention
                      ? 'bg-[#FBF6EE] text-[#C48A3A] border-[#C48A3A]/40'
                      : 'bg-[#F4F7F9] text-[#66737C] border-[#DFE3E4]'
                  }`}>
                    {isVerified && <CheckCircle2 className="w-3 h-3" />}
                    {isNeedsAttention && <AlertTriangle className="w-3 h-3" />}
                    {doc.status === 'Needs Attention' ? 'Needs Attention' : doc.status}
                  </span>
                </div>

                <h3 className="font-serif text-sm font-bold text-[#102A39]">
                  {language === 'hi' ? doc.titleHi : doc.title}
                </h3>
                
                <p className="text-[11px] text-[#66737C] font-mono mt-0.5 truncate">
                  {doc.fileName} • {doc.fileSize}
                </p>

                {/* Problem Notice if applicable */}
                {doc.deficiencyReason && (
                  <div className="mt-3 p-2.5 rounded bg-[#FBF6EE] border border-[#C48A3A]/30 text-[11px] text-[#C48A3A]">
                    <p className="font-semibold">{language === 'hi' ? 'समस्या: ' : 'Problem: '}</p>
                    <p className="mt-0.5 leading-snug">
                      {language === 'hi' ? doc.deficiencyReasonHi : doc.deficiencyReason}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#DFE3E4] flex items-center justify-between gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActivePreviewDoc(doc)}
                  className="p-1.5 rounded hover:bg-[#F4F7F9] text-[#102A39] font-medium flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-[#245D78]" />
                  <span>Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStartVerification(doc.id)}
                  disabled={verifyingDocId === doc.id}
                  className="p-1.5 rounded hover:bg-[#F4F7F9] text-[#276B58] font-medium flex items-center gap-1"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${verifyingDocId === doc.id ? 'animate-spin' : ''}`} />
                  <span>Check</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReplacingDocId(doc.id);
                    setReplacementFileName(`${doc.type}_Updated_2026.pdf`);
                  }}
                  className="p-1.5 rounded hover:bg-[#F4F7F9] text-[#C48A3A] font-medium flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 bg-[#102A39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-[#DFE3E4] max-w-lg w-full p-6 animate-fade-in">
            <div className="flex items-start justify-between pb-3 border-b border-[#DFE3E4]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4F7F9] text-[#245D78]">
                  {activePreviewDoc.type}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#102A39] mt-1">
                  {activePreviewDoc.title}
                </h3>
                <p className="text-xs text-[#66737C] font-mono">{activePreviewDoc.fileName}</p>
              </div>
              <button 
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="text-[#66737C] hover:text-[#17242D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 p-6 rounded bg-[#F7F5EF] border border-[#DFE3E4] text-center space-y-3">
              <FileCheck className="w-12 h-12 text-[#245D78] mx-auto opacity-70" />
              <div>
                <p className="text-xs font-bold text-[#102A39]">Document Saved in Vault</p>
                <p className="text-[11px] text-[#66737C]">Safe and digitally indexed</p>
              </div>

              {activePreviewDoc.extractedData && (
                <div className="text-left bg-white p-3 rounded border border-[#DFE3E4] text-xs space-y-1">
                  <p className="text-[10px] font-bold uppercase text-[#66737C]">Details found:</p>
                  <p><strong>Name:</strong> {activePreviewDoc.extractedData.name || 'Aarav Kumar'}</p>
                  {activePreviewDoc.extractedData.tribeName && <p><strong>Tribe:</strong> {activePreviewDoc.extractedData.tribeName}</p>}
                  {activePreviewDoc.extractedData.certificateNumber && <p><strong>Certificate No:</strong> {activePreviewDoc.extractedData.certificateNumber}</p>}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DFE3E4]">
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="px-4 py-2 rounded text-xs font-semibold text-[#102A39] hover:bg-[#F4F7F9]"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replace Document Modal */}
      {replacingDocId && (
        <div className="fixed inset-0 bg-[#102A39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-[#DFE3E4] max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-start justify-between pb-3 border-b border-[#DFE3E4]">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#C48A3A]" />
                <h3 className="font-serif text-lg font-bold text-[#102A39]">
                  {language === 'hi' ? 'नया दस्तावेज़ अपलोड करें' : 'Upload New Document'}
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setReplacingDocId(null)}
                className="text-[#66737C] hover:text-[#17242D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteReplace} className="py-4 space-y-3 text-xs">
              <p className="text-[#66737C]">
                Enter a file name or select your updated certificate:
              </p>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">File Name</label>
                <input
                  type="text"
                  required
                  value={replacementFileName}
                  onChange={(e) => setReplacementFileName(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-[#DFE3E4] rounded-lg text-center bg-[#F7F5EF]">
                <Upload className="w-6 h-6 text-[#66737C] mx-auto mb-1" />
                <span className="text-xs font-medium text-[#102A39] block">Choose PDF or Photo</span>
                <span className="text-[10px] text-[#66737C]">Max 5 MB</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setReplacingDocId(null)}
                  className="px-3 py-1.5 rounded text-xs text-[#66737C] hover:bg-[#F4F7F9]"
                >
                  {t('close')}
                </button>
                <button
                  type="submit"
                  className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-1.5 rounded text-xs font-semibold"
                >
                  {language === 'hi' ? 'अपलोड करें' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
