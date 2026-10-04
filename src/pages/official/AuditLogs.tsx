import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  History, 
  Search, 
  ShieldCheck, 
  Filter, 
  FileText, 
  User, 
  Sparkles,
  Clock
} from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { language, t } = useLanguage();
  const { auditLogs } = useApp();

  const [roleFilter, setRoleFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesRole = roleFilter === 'All' || log.role === roleFilter;
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#102A39] text-white">
            Statutory Accountability
          </span>
          <span className="text-xs text-[#276B58] font-semibold bg-[#EDF5F2] px-2 py-0.5 rounded border border-[#276B58]/30">
            Immutable Audit Trail
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
          {t('auditLogs')}
        </h1>
        <p className="text-xs sm:text-sm text-[#66737C] mt-1">
          {language === 'hi'
            ? 'सिस्टम में छात्र, अधिकृत संवीक्षा अधिकारी अथवा एआई द्वारा की गई प्रत्येक कार्रवाई का समयबद्ध एवं अपरिवर्तनीय रिकॉर्ड।'
            : 'Traceable chronological ledger of all applicant submissions, AI verification flags, and officer scrutiny rulings.'}
        </p>

        {/* Filter controls */}
        <div className="mt-6 pt-4 border-t border-[#DFE3E4] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-[#66737C] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by action, applicant ID, actor..."
              className="w-full pl-9 pr-3 py-2 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
            />
          </div>

          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
            >
              <option value="All">All Actors (Student, Official, AI Engine)</option>
              <option value="Official">Official Actions Only</option>
              <option value="Student">Student Submissions Only</option>
              <option value="System AI">System AI Verification Events</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F5EF] text-[#102A39] font-bold border-b border-[#DFE3E4]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action Taken</th>
                <th className="py-3 px-4">Target Dossier</th>
                <th className="py-3 px-4">Details & Event Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F7F9]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FDFCFB] transition-colors">
                  <td className="py-3 px-4 font-mono text-[#66737C] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#102A39]">
                    {log.actor}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                      log.role === 'Official'
                        ? 'bg-[#102A39] text-white border-[#102A39]'
                        : log.role === 'System AI'
                        ? 'bg-[#FBF6EE] text-[#C48A3A] border-[#C48A3A]/40'
                        : 'bg-[#EDF5F2] text-[#276B58] border-[#276B58]/30'
                    }`}>
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#102A39]">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#245D78]">
                    {log.targetId}
                  </td>
                  <td className="py-3 px-4 text-[#17242D] max-w-xs sm:max-w-md">
                    {log.details}
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
