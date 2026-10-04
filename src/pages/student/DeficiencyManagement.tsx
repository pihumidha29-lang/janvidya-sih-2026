import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  RotateCw
} from 'lucide-react';

export const DeficiencyManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { applications, documents, resolveDeficiency, navigateTo } = useApp();

  const [replacementName, setReplacementName] = useState('Income_Certificate_2026_Valid.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeApp = applications.find(a => a.status === 'Action Required') || applications[0];
  const deficientDoc = documents.find(d => d.type === 'Income Certificate');

  const handleUploadReplacement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(res => setTimeout(res, 800));

    if (activeApp && deficientDoc) {
      resolveDeficiency(activeApp.id, deficientDoc.id, replacementName);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FBF6EE] text-[#C48A3A] border border-[#C48A3A]/40">
            {language === 'hi' ? 'दस्तावेज़ ठीक करें' : 'Fix a Problem'}
          </span>
          <span className="text-xs text-[#66737C]">
            App ID: <span className="font-mono text-[#102A39] font-semibold">{activeApp?.id}</span>
          </span>
        </div>

        <h1 className="font-serif text-2xl font-bold text-[#102A39] mt-2">
          {language === 'hi' ? 'दस्तावेज़ में समस्या का समाधान' : 'Fix a Document Problem'}
        </h1>
        <p className="text-xs sm:text-sm text-[#66737C] mt-1">
          {language === 'hi'
            ? 'यदि आपके किसी दस्तावेज़ में कोई कमी पाई गई है, तो यहाँ नया दस्तावेज़ अपलोड करें।'
            : 'If one of your documents has a problem, upload an updated copy here.'}
        </p>
      </div>

      {!isSuccess ? (
        <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 sm:p-8 shadow-2xs space-y-6">
          
          {/* Simple Problem Box */}
          <div className="p-4 rounded-lg bg-[#FBF6EE] border border-[#C48A3A]/40 text-xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#C48A3A] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C48A3A]">
                  DOCUMENT NEEDS ATTENTION
                </span>
                <p className="font-bold text-[#102A39] text-sm">
                  {language === 'hi'
                    ? 'आपका आय प्रमाण पत्र पुराना हो गया है।'
                    : 'Your Income Certificate has expired.'}
                </p>
                <p className="text-[#17242D]">
                  <strong>{language === 'hi' ? 'समस्या का कारण: ' : 'Why: '}</strong>
                  The income certificate uploaded was issued in March 2024.
                </p>
                <p className="text-[#17242D] pt-1">
                  <strong>{language === 'hi' ? 'आपको क्या करना है: ' : 'What you need to do: '}</strong>
                  {language === 'hi'
                    ? 'कृपया वित्तीय वर्ष 2025-26 का नया आय प्रमाण पत्र अपलोड करें।'
                    : 'Upload a new Income Certificate valid for the current year (FY 2025-26).'}
                </p>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleUploadReplacement} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#17242D] mb-1">
                {language === 'hi' ? 'फ़ाइल का नाम' : 'File Name'}
              </label>
              <input
                type="text"
                required
                value={replacementName}
                onChange={(e) => setReplacementName(e.target.value)}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
              />
            </div>

            <div className="p-6 border-2 border-dashed border-[#DFE3E4] hover:border-[#102A39] rounded-lg text-center bg-[#FDFCFB] transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-[#C48A3A] mx-auto mb-2" />
              <p className="font-bold text-[#102A39]">
                {language === 'hi' ? 'यहाँ नया आय प्रमाण पत्र चुनें' : 'Choose your new Income Certificate'}
              </p>
              <p className="text-[11px] text-[#66737C] mt-1">
                PDF or Photo (Max 5 MB)
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigateTo('/student/dashboard')}
                className="px-4 py-2 rounded text-xs text-[#66737C] hover:bg-[#F4F7F9]"
              >
                {t('back')}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#102A39] hover:bg-[#173447] text-white px-5 py-2.5 rounded text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin text-[#C48A3A]" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 text-[#C48A3A]" />
                    <span>{language === 'hi' ? 'नया दस्तावेज़ अपलोड करें' : 'Upload New Document'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      ) : (
        /* Simple Success State */
        <div className="bg-white border border-[#DFE3E4] rounded-lg p-8 text-center shadow-xs animate-fade-in space-y-4">
          <div className="w-12 h-12 bg-[#EDF5F2] text-[#276B58] rounded-full flex items-center justify-center mx-auto border border-[#276B58]/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
            {language === 'hi' ? 'दस्तावेज़ प्राप्त हुआ' : 'Document uploaded'}
          </span>

          <h2 className="font-serif text-2xl font-bold text-[#102A39]">
            {language === 'hi' ? 'दस्तावेज़ जाँच के लिए भेज दिया गया है' : 'Sent for checking.'}
          </h2>

          <p className="text-xs text-[#66737C] max-w-md mx-auto leading-relaxed">
            Your application status is now updated to <strong className="text-[#102A39]">"Under Review"</strong>.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('/student/applications')}
              className="bg-[#102A39] hover:bg-[#173447] text-white px-4 py-2 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <span>{t('myApplications')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/student/dashboard')}
              className="border border-[#DFE3E4] text-[#102A39] hover:bg-[#F4F7F9] px-4 py-2 rounded text-xs font-semibold"
            >
              {t('dashboard')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
