import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Send, 
  User
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'saathi';
  text: string;
  timestamp: string;
}

export const JanVidyaSaathi: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'saathi',
      text: language === 'hi' 
        ? 'नमस्ते आरव! मैं जनविद्या साथी हूँ। आपकी छात्रवृत्ति, दस्तावेज़, या भुगतान के बारे में कोई भी सवाल हो, मुझसे पूछें।'
        : 'Hello Aarav! I am JanVidya Saathi. Ask me anything about your scholarship, documents, or payment.',
      timestamp: 'Just now'
    }
  ]);

  const quickQuestions = language === 'hi' ? [
    'मेरे आय प्रमाण पत्र में क्या समस्या है?',
    'राष्ट्रीय अध्येतावृत्ति (NFST) के लिए कौन पात्र है?',
    'मेरी छात्रवृत्ति का भुगतान कहाँ तक पहुँचा?',
    'आवेदन के बाद क्या होता है?'
  ] : [
    'Why is my Income Certificate rejected?',
    'Who can apply for National Fellowship (NFST)?',
    'Where is my scholarship payment?',
    'What happens after I submit?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let reply = '';
    const qLower = q.toLowerCase();

    if (qLower.includes('income') || qLower.includes('आय') || qLower.includes('reject') || qLower.includes('expired') || qLower.includes('समस्या')) {
      reply = language === 'hi'
        ? 'आपका पुराना आय प्रमाण पत्र मार्च 2024 का था, जिसकी वैधता समाप्त हो चुकी है। कृपया वित्तीय वर्ष 2025-26 का नया प्रमाण पत्र "दस्तावेज़ ठीक करें" टैब में अपलोड करें।'
        : 'Your Income Certificate expired because it was issued in March 2024. Please upload a new certificate for FY 2025-26 in the "Fix a Problem" tab.';
    } else if (qLower.includes('fellowship') || qLower.includes('nfst') || qLower.includes('अध्येतावृत्ति') || qLower.includes('phd')) {
      reply = language === 'hi'
        ? 'राष्ट्रीय अध्येतावृत्ति (NFST) पूर्णकालिक एम.फिल और पी.एचडी. शोध कर रहे अनुसूचित जनजाति छात्रों के लिए है। इसमें ₹35,000 प्रति माह शोधवृत्ति मिलती है। पारिवारिक आय सीमा ₹6,00,000 है।'
        : 'National Fellowship (NFST) is for full-time M.Phil and Ph.D. ST students. It gives ₹35,000 per month. The family income limit is ₹6,00,000 per year.';
    } else if (qLower.includes('payment') || qLower.includes('dbt') || qLower.includes('भुगतान') || qLower.includes('पैसा') || qLower.includes('रुपये')) {
      reply = language === 'hi'
        ? 'आपकी ₹50,000 की छात्रवृत्ति स्वीकृत हो चुकी है। यह वर्तमान में डीबीटी/पीएफएमएस प्रसंस्करण चरण में है और जल्द ही आपके आधार-लिंक्ड बैंक खाते में जमा हो जाएगी।'
        : 'Your ₹50,000 scholarship is approved. Payment is currently processing through DBT / PFMS and will be credited to your Aadhaar-linked bank account soon.';
    } else {
      reply = language === 'hi'
        ? 'आवेदन जमा करने के बाद सबसे पहले एआई दस्तावेज़ जाँचता है, फिर अधिकृत अधिकारी उसकी समीक्षा करते हैं। चयन होने पर पैसा सीधे आपके बैंक खाते में भेजा जाता है।'
        : 'After you submit, your documents are checked by AI and then reviewed by an officer. Once approved, the scholarship is sent directly to your bank account via DBT.';
    }

    const saathiMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'saathi',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg, saathiMsg]);
    setInputQuery('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg p-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#102A39] text-[#C48A3A] flex items-center justify-center border border-[#20455D]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#102A39]">
                {t('janVidyaSaathi')}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                Help Assistant
              </span>
            </div>
            <p className="text-xs text-[#66737C]">
              {language === 'hi'
                ? 'सहायता चाहिए? यहाँ पूछें।'
                : 'Need help? Ask me anything about scholarships and documents.'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-[#DFE3E4] rounded-lg shadow-2xs overflow-hidden flex flex-col h-[520px]">
        
        {/* Message scroll area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div 
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                m.sender === 'user' 
                  ? 'bg-[#102A39] text-white' 
                  : 'bg-[#FBF6EE] text-[#C48A3A] border border-[#C48A3A]/40'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-lg p-3.5 rounded-lg text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#102A39] text-white rounded-tr-none'
                  : 'bg-[#F7F5EF] text-[#17242D] border border-[#DFE3E4] rounded-tl-none'
              }`}>
                <p>{m.text}</p>
                <span className={`text-[9px] block mt-1 ${m.sender === 'user' ? 'text-stone-300' : 'text-[#66737C]'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 bg-[#FDFCFB] border-t border-[#DFE3E4] overflow-x-auto flex gap-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] bg-[#F7F5EF] hover:bg-[#EAE7DC] text-[#102A39] border border-[#DFE3E4] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-[#DFE3E4] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={language === 'hi' ? 'यहाँ अपना सवाल लिखें...' : 'Type your question here...'}
            className="flex-1 py-2 px-3 text-xs border border-[#DFE3E4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#102A39] bg-[#FDFCFB]"
          />
          <button
            type="submit"
            className="bg-[#102A39] hover:bg-[#173447] text-white p-2 rounded-md shadow-xs transition-colors"
            aria-label="Send"
          >
            <Send className="w-4 h-4 text-[#C48A3A]" />
          </button>
        </form>

      </div>

    </div>
  );
};
