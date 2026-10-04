import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  CheckCircle2
} from 'lucide-react';

export const CommunicationCentre: React.FC = () => {
  const { language, t } = useLanguage();
  const { sendOfficialMessage, notifications } = useApp();

  const [targetStudentId, setTargetStudentId] = useState('ST-JH-2024-0982');
  const [noticeType, setNoticeType] = useState<'action_required' | 'info' | 'warning' | 'success'>('action_required');
  const [noticeTitle, setNoticeTitle] = useState('Please upload a new Income Certificate');
  const [noticeMessage, setNoticeMessage] = useState(
    'Your Income Certificate has expired. Please upload a valid certificate for FY 2025-26 in the "Fix a Problem" tab.'
  );
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  const handleSendNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeMessage.trim()) return;

    sendOfficialMessage(targetStudentId, noticeTitle, noticeMessage, noticeType);
    setDispatchedSuccess(true);
    setTimeout(() => setDispatchedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#102A39] text-white">
            {language === 'hi' ? 'संदेश' : 'Messages'}
          </span>
          <span className="text-xs text-[#66737C]">
            Direct Student Communication
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A39] mt-2">
          {t('communicationCenter')}
        </h1>
        <p className="text-xs sm:text-sm text-[#66737C] mt-1">
          {language === 'hi'
            ? 'छात्रों को सीधे सूचनाएँ और दस्तावेज़ संबंधी संदेश भेजें।'
            : 'Send updates, document requests, and notices directly to students.'}
        </p>
      </div>

      {dispatchedSuccess && (
        <div className="p-4 bg-[#EDF5F2] border border-[#276B58]/30 rounded-lg text-xs text-[#276B58] flex items-center gap-2 shadow-xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Message sent successfully to the student portal!</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form (lg: 7 cols) */}
        <form onSubmit={handleSendNotice} className="lg:col-span-7 bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-4 text-xs">
          <h2 className="font-serif text-base font-bold text-[#102A39] border-b border-[#F4F7F9] pb-2">
            Send a Message to a Student
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#17242D] mb-1">
                Student
              </label>
              <select
                value={targetStudentId}
                onChange={(e) => setTargetStudentId(e.target.value)}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
              >
                <option value="ST-JH-2024-0982">Aarav Kumar (JV-2026-001247)</option>
                <option value="ST-OD-2025-1104">Pooja Soren (JV-2026-000892)</option>
                <option value="ST-JH-2026-3021">Birsa Munda (JV-2026-002319)</option>
                <option value="ALL_APPLICANTS">All Active Students</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#17242D] mb-1">
                Message Type
              </label>
              <select
                value={noticeType}
                onChange={(e) => setNoticeType(e.target.value as any)}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
              >
                <option value="action_required">Document Request (Action Needed)</option>
                <option value="info">Application Update</option>
                <option value="warning">Question / Clarification</option>
                <option value="success">Selection / Sanction Notice</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-[#17242D] mb-1">
                Title / Heading
              </label>
              <input
                type="text"
                required
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                className="w-full py-2 px-3 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-[#17242D] mb-1">
                Message Text
              </label>
              <textarea
                rows={4}
                required
                value={noticeMessage}
                onChange={(e) => setNoticeMessage(e.target.value)}
                className="w-full p-2.5 border border-[#DFE3E4] rounded bg-[#FDFCFB]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#DFE3E4] flex items-center justify-between">
            <span className="text-[11px] text-[#66737C]">
              Delivered instantly to student portal
            </span>
            <button
              type="submit"
              className="bg-[#102A39] hover:bg-[#173447] text-white px-5 py-2.5 rounded font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#C48A3A]" />
              <span>Send Message</span>
            </button>
          </div>
        </form>

        {/* Right Feed (lg: 5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#DFE3E4]">
            <h3 className="font-serif text-sm font-bold text-[#102A39]">
              Recent Sent Messages
            </h3>
            <span className="text-[10px] text-[#66737C]">Live Feed</span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-3 rounded border border-[#DFE3E4] bg-[#FDFCFB] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#102A39]">{n.title}</span>
                  <span className="text-[10px] text-[#66737C]">{n.timestamp}</span>
                </div>
                <p className="text-[#66737C] text-[11px] leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
