import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const ScreeningSelection: React.FC = () => {
  const { language, t } = useLanguage();

  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState('All');
  const [incomeCutoff, setIncomeCutoff] = useState(250000);
  const [pvtgOnly, setPvtgOnly] = useState(false);

  const mockCandidateList = [
    {
      id: 'JV-2026-001247',
      name: 'Aarav Kumar',
      tribe: 'Santhal',
      scheme: 'Post-Matric ST',
      income: 180000,
      cgpa: 8.74,
      aiVerified: true,
      screeningStatus: 'Eligible'
    },
    {
      id: 'JV-2026-000892',
      name: 'Pooja Soren',
      tribe: 'Santhal',
      scheme: 'National Fellowship (Ph.D.)',
      income: 240000,
      cgpa: 9.10,
      aiVerified: true,
      screeningStatus: 'Eligible'
    },
    {
      id: 'JV-2026-002319',
      name: 'Birsa Munda',
      tribe: 'Munda',
      scheme: 'Post-Matric ST',
      income: 140000,
      cgpa: 7.90,
      aiVerified: true,
      screeningStatus: 'Eligible'
    },
    {
      id: 'JV-2026-003410',
      name: 'Savitri Ho',
      tribe: 'Ho (PVTG)',
      scheme: 'Post-Matric ST',
      income: 95000,
      cgpa: 8.40,
      aiVerified: true,
      screeningStatus: 'Needs Review'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#102A39] text-white">
            {language === 'hi' ? 'स्क्रीनिंग एवं चयन' : 'Screening & Selection'}
          </span>
          <span className="text-xs text-[#66737C]">
            Demonstration Data
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
          {t('screeningSelection')}
        </h1>
        <p className="text-xs sm:text-sm text-[#66737C] mt-1">
          {language === 'hi'
            ? 'स्वीकृत नियमों के आधार पर आवेदकों की जाँच करें।'
            : 'Check applicants against the approved scheme rules.'}
        </p>

        {/* Filters */}
        <div className="mt-6 pt-4 border-t border-[#DFE3E4] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-medium text-[#17242D] mb-1">Filter by Scholarship</label>
            <select
              value={selectedSchemeFilter}
              onChange={(e) => setSelectedSchemeFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
            >
              <option value="All">All Scholarships</option>
              <option value="Post-Matric">Post-Matric Scholarship for ST</option>
              <option value="Fellowship">National Fellowship for ST</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-[#17242D] mb-1">Max Income: ₹ {incomeCutoff.toLocaleString('en-IN')}</label>
            <input
              type="range"
              min={100000}
              max={600000}
              step={25000}
              value={incomeCutoff}
              onChange={(e) => setIncomeCutoff(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              id="pvtg"
              checked={pvtgOnly}
              onChange={(e) => setPvtgOnly(e.target.checked)}
              className="rounded text-[#102A39]"
            />
            <label htmlFor="pvtg" className="text-xs font-semibold text-[#102A39]">
              PVTG Tribal Groups Priority
            </label>
          </div>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#DFE3E4] flex items-center justify-between">
          <h2 className="font-serif text-sm font-bold text-[#102A39]">
            Applicants List
          </h2>
          <span className="text-xs text-[#276B58] font-bold">
            {mockCandidateList.length} Students Checked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F5EF] text-[#102A39] font-bold border-b border-[#DFE3E4]">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Student & Tribe</th>
                <th className="py-3 px-4">Income</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">AI Check</th>
                <th className="py-3 px-4">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F7F9]">
              {mockCandidateList.map((c) => (
                <tr key={c.id} className="hover:bg-[#FDFCFB]">
                  <td className="py-3 px-4 font-mono font-bold text-[#102A39]">{c.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-[#102A39]">{c.name}</p>
                    <p className="text-[10px] text-[#66737C]">{c.tribe}</p>
                  </td>
                  <td className="py-3 px-4 font-medium text-[#102A39]">₹ {c.income.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 font-bold text-[#245D78]">{c.cgpa} CGPA</td>
                  <td className="py-3 px-4">
                    <span className="text-[#276B58] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold border ${
                      c.screeningStatus === 'Eligible'
                        ? 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30'
                        : 'bg-[#FBF6EE] text-[#C48A3A] border-[#C48A3A]/40'
                    }`}>
                      {c.screeningStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
