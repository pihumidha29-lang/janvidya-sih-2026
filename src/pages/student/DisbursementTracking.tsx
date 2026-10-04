import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Info
} from 'lucide-react';

export const DisbursementTracking: React.FC = () => {
  const { language, t } = useLanguage();
  const { disbursements } = useApp();

  const primaryRecord = disbursements[0];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                DBT / PFMS
              </span>
              <span className="text-xs text-[#C48A3A] font-semibold bg-[#FBF6EE] px-2 py-0.5 rounded border border-[#C48A3A]/30">
                Prototype / Intended Integration
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
              {language === 'hi' ? 'भुगतान की स्थिति' : 'Payment Status'}
            </h1>
            <p className="text-xs sm:text-sm text-[#66737C] mt-1">
              {language === 'hi'
                ? 'अपनी छात्रवृत्ति के भुगतान की वर्तमान स्थिति देखें।'
                : 'See the current status of your scholarship payment.'}
            </p>
          </div>

          <div className="p-3 bg-[#F7F5EF] rounded border border-[#DFE3E4] text-xs text-right">
            <span className="text-[#66737C] block">Scholarship Amount</span>
            <span className="font-serif text-xl font-bold text-[#276B58]">
              ₹ {primaryRecord ? primaryRecord.amount.toLocaleString('en-IN') : '50,000'}
            </span>
          </div>
        </div>

        {/* How the Payment Process Works */}
        <div className="mt-6 pt-4 border-t border-[#DFE3E4]">
          <p className="text-xs font-bold text-[#102A39] mb-2 uppercase tracking-wide">
            {language === 'hi' ? 'भुगतान प्रक्रिया कैसे काम करती है' : 'How the Payment Process Works'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-2.5 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
              <span className="text-[10px] text-[#66737C] block font-mono">1. APP</span>
              <strong className="text-[#102A39]">JANVIDYA</strong>
              <p className="text-[10px] text-[#276B58]">Approved</p>
            </div>

            <div className="p-2.5 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
              <span className="text-[10px] text-[#66737C] block font-mono">2. ORDER</span>
              <strong className="text-[#102A39]">Sanction</strong>
              <p className="text-[10px] text-[#276B58]">Order Created</p>
            </div>

            <div className="p-2.5 rounded bg-[#102A39] text-white border border-[#20455D]">
              <span className="text-[10px] text-[#C48A3A] block font-mono">3. GATEWAY</span>
              <strong className="text-[#FFFFFF]">DBT / PFMS</strong>
              <p className="text-[10px] text-[#E5B56E]">● Processing</p>
            </div>

            <div className="p-2.5 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
              <span className="text-[10px] text-[#66737C] block font-mono">4. BANK</span>
              <strong className="text-[#102A39]">Your Bank</strong>
              <p className="text-[10px] text-[#66737C]">Aadhaar Seeded</p>
            </div>

            <div className="p-2.5 rounded bg-[#F7F5EF] border border-[#DFE3E4]">
              <span className="text-[10px] text-[#66737C] block font-mono">5. STUDENT</span>
              <strong className="text-[#102A39]">You</strong>
              <p className="text-[10px] text-[#66737C]">Money in Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Progress */}
      {primaryRecord && (
        <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#DFE3E4] gap-2">
            <div>
              <span className="text-xs text-[#66737C]">Sanction Order Number:</span>
              <p className="font-mono text-sm font-bold text-[#102A39]">{primaryRecord.sanctionOrderNo}</p>
            </div>
            <div>
              <span className="text-xs text-[#66737C]">Payment Reference:</span>
              <p className="font-mono text-sm font-bold text-[#245D78]">{primaryRecord.dbtReference}</p>
            </div>
            <div>
              <span className="text-xs text-[#66737C]">Status:</span>
              <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-[#FBF6EE] text-[#C48A3A] border border-[#C48A3A]/30">
                DBT / PFMS Processing
              </span>
            </div>
          </div>

          {/* 5 Step Payment Flow */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#102A39] mb-4">
              {language === 'hi' ? 'भुगतान की प्रगति' : 'Payment Progress'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {/* Step 1 */}
              <div className="p-3 rounded-lg bg-[#EDF5F2] border border-[#276B58]/30 text-xs">
                <div className="flex items-center gap-1.5 text-[#276B58] font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1. Application</span>
                </div>
                <p className="text-[11px] text-[#66737C]">Submitted</p>
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-lg bg-[#EDF5F2] border border-[#276B58]/30 text-xs">
                <div className="flex items-center gap-1.5 text-[#276B58] font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>2. Approved</span>
                </div>
                <p className="text-[11px] text-[#66737C]">By Officer</p>
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-lg bg-[#EDF5F2] border border-[#276B58]/30 text-xs">
                <div className="flex items-center gap-1.5 text-[#276B58] font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3. Payment Started</span>
                </div>
                <p className="text-[11px] text-[#66737C]">Order released</p>
              </div>

              {/* Step 4 */}
              <div className="p-3 rounded-lg bg-[#102A39] text-white border border-[#20455D] text-xs shadow-xs">
                <div className="flex items-center gap-1.5 text-[#E5B56E] font-bold mb-1">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>4. DBT / PFMS</span>
                </div>
                <p className="text-[11px] text-stone-300">Processing now</p>
              </div>

              {/* Step 5 */}
              <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFE3E4] text-xs opacity-60">
                <div className="flex items-center gap-1.5 text-[#66737C] font-semibold mb-1">
                  <span>○</span>
                  <span>5. Credited</span>
                </div>
                <p className="text-[11px] text-[#66737C]">Pending credit</p>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="p-4 rounded bg-[#F7F5EF] border border-[#DFE3E4] text-xs space-y-2">
            <h4 className="font-bold text-[#102A39] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#276B58]" />
              <span>{language === 'hi' ? 'बैंक विवरण' : 'Bank Details'}:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
              <div>
                <span className="text-[#66737C] block">Bank Name:</span>
                <strong className="text-[#102A39]">{primaryRecord.bankName}</strong>
              </div>
              <div>
                <span className="text-[#66737C] block">Account Number:</span>
                <strong className="font-mono text-[#102A39]">{primaryRecord.accountMasked}</strong>
              </div>
              <div>
                <span className="text-[#66737C] block">Aadhaar Link:</span>
                <strong className="text-[#276B58]">Active & Ready for DBT</strong>
              </div>
            </div>
          </div>

          {/* Demonstration Notice */}
          <div className="p-3 bg-[#FBF6EE] rounded border border-[#C48A3A]/30 text-[11px] text-[#66737C] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#C48A3A] shrink-0 mt-0.5" />
            <p>
              <strong>Demonstration: </strong>
              This payment status is demonstration data for SIH 2026. No actual money transfer has taken place.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
