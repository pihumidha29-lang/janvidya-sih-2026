import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  CheckCircle2, 
  FileText, 
  ShieldCheck
} from 'lucide-react';

export const ApplicationWizard: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, schemes, documents, createApplication, navigateTo } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [schemeId] = useState('scheme-post-matric');
  
  // Step 1: Personal Details
  const [fullName, setFullName] = useState(currentUser?.name || 'Aarav Kumar');
  const [dob, setDob] = useState('2002-05-18');
  const [tribeName, setTribeName] = useState('Santhal (Scheduled Tribe)');
  const [state, setState] = useState(currentUser?.state || 'Jharkhand');
  const [district, setDistrict] = useState('East Singhbhum');
  const [aadhaarMasked] = useState('XXXX-XXXX-4829');

  // Step 2: Education
  const [institution, setInstitution] = useState('National Institute of Technology, Jamshedpur');
  const [course, setCourse] = useState('M.Tech in Artificial Intelligence & Data Science');
  const [rollNo, setRollNo] = useState('2026-MT-AI-042');

  // Step 3: Eligibility
  const [annualIncome, setAnnualIncome] = useState('180000');
  const [fatherOccupation, setFatherOccupation] = useState('Agriculture / Farming');
  const [isHosteller, setIsHosteller] = useState('Hosteller');

  // State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState('');
  const [saveDraftToast, setSaveDraftToast] = useState(false);

  const selectedScheme = schemes.find(s => s.id === schemeId) || schemes[0];

  const handleSaveDraft = () => {
    setSaveDraftToast(true);
    setTimeout(() => setSaveDraftToast(false), 2500);
  };

  const handleSubmitFinal = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = createApplication({
      schemeId: selectedScheme.id,
      schemeName: selectedScheme.name,
      schemeNameHi: selectedScheme.nameHi,
      grantAmount: selectedScheme.annualGrant,
      institution,
      course,
      annualFamilyIncome: Number(annualIncome)
    });
    setGeneratedAppId(newId);
    setIsSubmitted(true);
  };

  const stepsList = [
    { num: 1, title: language === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Details' },
    { num: 2, title: language === 'hi' ? 'शिक्षा' : 'Education' },
    { num: 3, title: language === 'hi' ? 'पात्रता' : 'Eligibility' },
    { num: 4, title: language === 'hi' ? 'दस्तावेज़' : 'Documents' },
    { num: 5, title: language === 'hi' ? 'जाँचें' : 'Review' },
    { num: 6, title: language === 'hi' ? 'जमा करें' : 'Submit' }
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-[#DFE3E4] rounded-lg p-8 text-center shadow-xs animate-fade-in my-8">
        <div className="w-14 h-14 bg-[#EDF5F2] text-[#276B58] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#276B58]/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
          {language === 'hi' ? 'आवेदन जमा हो गया!' : 'Application submitted!'}
        </span>

        <h2 className="font-serif text-2xl font-bold text-[#102A39] mt-3">
          {selectedScheme.name}
        </h2>

        <div className="my-6 p-4 rounded bg-[#F7F5EF] border border-[#DFE3E4] inline-block text-left">
          <p className="text-xs text-[#66737C]">Your Application ID is:</p>
          <p className="font-mono text-xl font-bold text-[#102A39] mt-0.5">{generatedAppId}</p>
          <p className="text-[11px] text-[#276B58] mt-1 font-medium">✓ Sent for AI document check & officer review (Demo Data)</p>
        </div>

        <p className="text-xs text-[#66737C] max-w-md mx-auto leading-relaxed">
          {language === 'hi'
            ? 'आपका आवेदन सफलता पूर्वक दर्ज हो चुका है। आप "मेरे आवेदन" टैब में कभी भी स्थिति देख सकते हैं।'
            : 'You can check the progress of your application anytime in "My Applications".'}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('/student/applications')}
            className="bg-[#102A39] hover:bg-[#173447] text-white px-5 py-2.5 rounded text-xs font-semibold shadow-xs flex items-center gap-2"
          >
            <span>{t('myApplications')}</span>
            <ArrowRight className="w-4 h-4 text-[#C48A3A]" />
          </button>
          <button
            type="button"
            onClick={() => navigateTo('/student/dashboard')}
            className="border border-[#DFE3E4] text-[#102A39] hover:bg-[#F4F7F9] px-4 py-2.5 rounded text-xs font-semibold"
          >
            {t('dashboard')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Wizard Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
              {language === 'hi' ? 'छात्रवृत्ति आवेदन फॉर्म' : 'Scholarship Application Form'}
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#102A39] mt-1">
              {language === 'hi' ? selectedScheme.nameHi : selectedScheme.name}
            </h1>
            <p className="text-xs text-[#66737C]">{selectedScheme.annualGrant}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-3 py-1.5 rounded text-xs font-medium border border-[#DFE3E4] hover:bg-[#F4F7F9] text-[#102A39] flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-[#245D78]" />
              <span>{t('saveDraft')}</span>
            </button>
          </div>
        </div>

        {/* Save Draft Toast */}
        {saveDraftToast && (
          <div className="mt-3 p-2 rounded bg-[#EDF5F2] border border-[#276B58]/30 text-xs text-[#276B58] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Draft saved. You can come back and finish later.</span>
          </div>
        )}

        {/* 6 Simple Step Indicators */}
        <div className="mt-6 pt-4 border-t border-[#DFE3E4]">
          <div className="grid grid-cols-6 gap-1 text-center">
            {stepsList.map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;

              return (
                <div 
                  key={step.num}
                  onClick={() => step.num < currentStep && setCurrentStep(step.num)}
                  className={`cursor-pointer transition-colors ${
                    isCurrent ? 'text-[#102A39]' : isPast ? 'text-[#276B58]' : 'text-[#66737C]'
                  }`}
                >
                  <div className={`h-1.5 rounded-full mb-2 ${
                    isCurrent ? 'bg-[#102A39]' : isPast ? 'bg-[#276B58]' : 'bg-[#DFE3E4]'
                  }`} />
                  <span className="text-[11px] font-semibold block truncate">
                    {step.num}. {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 sm:p-8 shadow-2xs">
        
        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-serif text-lg font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
              1. {language === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Details'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-[#17242D] mb-1">Your Full Name (as on Aadhaar)</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">Scheduled Tribe (ST) Community</label>
                <input
                  type="text"
                  value={tribeName}
                  onChange={(e) => setTribeName(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">Aadhaar Number (Verified)</label>
                <input
                  type="text"
                  readOnly
                  value={aadhaarMasked}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#F4F7F9] text-[#66737C] font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Education */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-serif text-lg font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
              2. {language === 'hi' ? 'शिक्षा की जानकारी' : 'Education Details'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-medium text-[#17242D] mb-1">College or University Name</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">Course Name</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">Roll / Registration Number</label>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Eligibility */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-serif text-lg font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
              3. {language === 'hi' ? 'पात्रता एवं आय' : 'Eligibility & Income'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-[#17242D] mb-1">
                  Annual Family Income (₹) <span className="text-[#C48A3A] font-semibold">(Limit: ₹ {selectedScheme.maxIncome})</span>
                </label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">Parent / Guardian Occupation</label>
                <input
                  type="text"
                  value={fatherOccupation}
                  onChange={(e) => setFatherOccupation(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17242D] mb-1">Hosteller or Day Scholar?</label>
                <select
                  value={isHosteller}
                  onChange={(e) => setIsHosteller(e.target.value)}
                  className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
                >
                  <option value="Hosteller">Hosteller (Living in hostel)</option>
                  <option value="Day Scholar">Day Scholar (Living at home)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-serif text-lg font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
              4. {language === 'hi' ? 'दस्तावेज़' : 'Documents from Your Vault'}
            </h2>

            <p className="text-xs text-[#66737C]">
              These documents from your Document Vault will be attached to this application:
            </p>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded border border-[#DFE3E4] bg-[#FDFCFB] text-xs"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#245D78]" />
                    <div>
                      <p className="font-semibold text-[#102A39]">{doc.title}</p>
                      <p className="text-[11px] text-[#66737C]">{doc.fileName}</p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    doc.status === 'Verified'
                      ? 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30'
                      : doc.status === 'Needs Attention'
                      ? 'bg-[#FBF6EE] text-[#C48A3A] border-[#C48A3A]/30'
                      : 'bg-[#F4F7F9] text-[#66737C] border-[#DFE3E4]'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in text-xs">
            <h2 className="font-serif text-lg font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
              5. {language === 'hi' ? 'जाँचें (रिव्यू)' : 'Review Your Application'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
              <div>
                <span className="text-[#66737C] block">Name:</span>
                <span className="font-bold text-[#102A39]">{fullName}</span>
              </div>
              <div>
                <span className="text-[#66737C] block">ST Community:</span>
                <span className="font-bold text-[#102A39]">{tribeName}</span>
              </div>
              <div>
                <span className="text-[#66737C] block">Scholarship:</span>
                <span className="font-bold text-[#102A39]">{selectedScheme.name}</span>
              </div>
              <div>
                <span className="text-[#66737C] block">College:</span>
                <span className="font-bold text-[#102A39]">{institution}</span>
              </div>
              <div>
                <span className="text-[#66737C] block">Family Income:</span>
                <span className="font-bold text-[#276B58]">₹ {Number(annualIncome).toLocaleString('en-IN')} / year</span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-white border border-[#DFE3E4] rounded">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded text-[#102A39]" id="decl" />
              <label htmlFor="decl" className="text-[11px] text-[#17242D] leading-snug">
                I declare that the details provided are correct and true to the best of my knowledge.
              </label>
            </div>
          </div>
        )}

        {/* Step 6: Submit */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-fade-in text-xs text-center py-4">
            <h2 className="font-serif text-xl font-bold text-[#102A39]">
              6. {language === 'hi' ? 'आवेदन जमा करने के लिए तैयार' : 'Ready to Submit'}
            </h2>
            <p className="text-[#66737C] max-w-md mx-auto">
              Click the button below to submit your application. It will be sent for automated checking and officer review.
            </p>

            <div className="p-4 rounded-lg bg-[#EDF5F2] border border-[#276B58]/30 inline-block text-left text-xs space-y-1">
              <p className="font-bold text-[#276B58] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Next steps after submitting:</span>
              </p>
              <p className="text-[#17242D]">✓ Quick AI document check</p>
              <p className="text-[#17242D]">✓ Review by authorized officer</p>
              <p className="text-[#17242D]">✓ Direct payment to your bank account upon selection</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 pt-4 border-t border-[#DFE3E4] flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className={`px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-[#66737C]'
                : 'text-[#102A39] hover:bg-[#F4F7F9] border border-[#DFE3E4]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('back')}</span>
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
              className="bg-[#102A39] hover:bg-[#173447] text-white px-5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <span>{t('continue')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C48A3A]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitFinal}
              className="bg-[#276B58] hover:bg-[#1f5646] text-white px-6 py-2.5 rounded text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{t('submit')}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
