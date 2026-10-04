import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface DemoBannerProps {
  label?: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ label }) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-[#102A39] text-[#F7F5EF] border-b border-[#20455D] text-xs py-1.5 px-4 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 bg-[#C48A3A]/20 text-[#E5B56E] border border-[#C48A3A]/40 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E5B56E]" />
          SIH 2026 | PS ID: SIH26239 | Team: ManHaters
        </span>
        <span className="text-stone-300 hidden md:inline text-[11px]">
          {t('designedForMinistry')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] text-[#A6C0CE] bg-[#173447] px-2 py-0.5 rounded border border-[#245D78]">
          <AlertCircle className="w-3 h-3 text-[#E5B56E]" />
          {label || t('prototypeLabel')}
        </span>
      </div>
    </div>
  );
};
