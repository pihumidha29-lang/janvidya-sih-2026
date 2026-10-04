import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  FileCheck2, 
  ShieldCheck, 
  Award, 
  CreditCard,
  Lock,
  Mail,
  UserCheck,
  Info
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { loginAsStudent, loginAsOfficial } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'official'>('student');
  const [email, setEmail] = useState('student@demo.in');
  const [password, setPassword] = useState('janvidya');

  const handleTabChange = (tab: 'student' | 'official') => {
    setActiveTab(tab);
    if (tab === 'student') {
      setEmail('student@demo.in');
      setPassword('janvidya');
    } else {
      setEmail('official@demo.in');
      setPassword('janvidya');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'student') {
      loginAsStudent();
    } else {
      loginAsOfficial();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-between selection:bg-[#C48A3A]/20">
      
      {/* Top Bar with Language Switch and SIH Badge */}
      <header className="w-full bg-[#102A39] border-b border-[#20455D] py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-[#C48A3A] uppercase bg-[#C48A3A]/15 px-2 py-0.5 rounded border border-[#C48A3A]/30">
              SIH 2026 | PS ID: SIH26239
            </span>
            <span className="text-xs text-stone-300 hidden md:inline">
              Team: ManHaters | Theme: Smart Education
            </span>
          </div>

          {/* Active Language Switch */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400 hidden sm:inline">Language:</span>
            <div className="inline-flex items-center bg-[#173447] border border-[#245D78] rounded-md p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded transition-colors ${
                  language === 'en'
                    ? 'bg-[#C48A3A] text-white font-semibold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded transition-colors ${
                  language === 'hi'
                    ? 'bg-[#C48A3A] text-white font-semibold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl bg-white border border-[#DFE3E4] rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-fade-in">
          
          {/* Left Side: National Branding & Storytelling (lg: 7 cols) */}
          <div className="lg:col-span-7 bg-[#102A39] text-[#F7F5EF] p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#20455D]">
            <div>
              {/* Emblem / Title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded bg-[#173447] border border-[#C48A3A]/40 flex items-center justify-center shadow-xs">
                  <GraduationCap className="w-7 h-7 text-[#C48A3A]" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF]">
                    {language === 'hi' ? 'जनविद्या' : 'JANVIDYA'}
                  </h1>
                  <p className="text-xs uppercase tracking-widest text-[#E5B56E] font-medium">
                    {t('designedForMinistry')}
                  </p>
                </div>
              </div>

              {/* Subtitle */}
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-100 leading-snug mb-3">
                {language === 'hi' 
                  ? 'अनुसूचित जनजाति छात्रों के लिए छात्रवृत्ति एवं अध्येतावृत्ति पोर्टल'
                  : 'Scholarship & Fellowship System for Scheduled Tribes'}
              </h2>

              <p className="text-sm text-stone-300 font-light leading-relaxed mb-8">
                {t('tagline')}
              </p>

              {/* 4 Simple Lifecycle Steps: Apply -> Check -> Select -> Pay */}
              <div className="bg-[#173447]/90 border border-[#245D78] rounded-lg p-4 mb-6">
                <p className="text-xs font-semibold text-[#E5B56E] uppercase tracking-wider mb-3">
                  {language === 'hi' ? '४ आसान चरण' : '4 Simple Steps'}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 rounded bg-[#102A39] border border-[#20455D]">
                    <FileCheck2 className="w-5 h-5 text-[#C48A3A] mx-auto mb-1" />
                    <span className="text-xs font-medium text-white block">
                      {language === 'hi' ? '१. आवेदन' : '1. Apply'}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {language === 'hi' ? 'ऑनलाइन फॉर्म' : 'Easy Form'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-[#102A39] border border-[#20455D]">
                    <ShieldCheck className="w-5 h-5 text-[#276B58] mx-auto mb-1" />
                    <span className="text-xs font-medium text-white block">
                      {language === 'hi' ? '२. जाँच' : '2. Check'}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {language === 'hi' ? 'एआई सहायता' : 'AI Help'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-[#102A39] border border-[#20455D]">
                    <Award className="w-5 h-5 text-[#E5B56E] mx-auto mb-1" />
                    <span className="text-xs font-medium text-white block">
                      {language === 'hi' ? '३. चयन' : '3. Select'}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {language === 'hi' ? 'अधिकारी द्वारा' : 'Officer Review'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-[#102A39] border border-[#20455D]">
                    <CreditCard className="w-5 h-5 text-[#4FA3D1] mx-auto mb-1" />
                    <span className="text-xs font-medium text-white block">
                      {language === 'hi' ? '४. भुगतान' : '4. Payment'}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {language === 'hi' ? 'सीधे खाते में' : 'Direct to Bank'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Core Feature Callout */}
              <div className="flex items-start gap-2.5 text-xs text-stone-300">
                <Info className="w-4 h-4 text-[#C48A3A] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-medium">
                    {language === 'hi' ? 'मुख्य विशेषता: ' : 'One Platform: '}
                  </strong>
                  {language === 'hi'
                    ? 'स्कूल से लेकर कॉलेज, उच्च शिक्षा एवं पीएचडी शोध तक की सभी योजनाएँ एक ही जगह उपलब्ध हैं।'
                    : 'School, college, PG, and doctoral research scholarships all in one single window.'}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#20455D] flex items-center justify-between text-[11px] text-stone-400">
              <span>{t('prototypeLabel')}</span>
              <span className="text-[#C48A3A] font-medium">PS ID: SIH26239</span>
            </div>
          </div>

          {/* Right Side: Login Panel (lg: 5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                  {t('demoEnvironment')}
                </span>
                <span className="text-[11px] text-[#66737C]">
                  {language === 'hi' ? 'सुरक्षित प्रवेश' : 'Secure Login'}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#102A39]">
                {t('welcomeBack')}
              </h3>
              <p className="text-xs text-[#66737C] mt-1 leading-relaxed">
                {t('accessJourney')}
              </p>

              {/* Role Selector Tabs (STUDENT | OFFICIAL) */}
              <div className="flex border-b border-[#DFE3E4] mt-6 mb-6">
                <button
                  type="button"
                  onClick={() => handleTabChange('student')}
                  className={`flex-1 pb-2.5 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === 'student'
                      ? 'border-[#102A39] text-[#102A39]'
                      : 'border-transparent text-[#66737C] hover:text-[#17242D]'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#C48A3A]" />
                  {t('studentTab')}
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange('official')}
                  className={`flex-1 pb-2.5 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === 'official'
                      ? 'border-[#102A39] text-[#102A39]'
                      : 'border-transparent text-[#66737C] hover:text-[#17242D]'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#245D78]" />
                  {t('officialTab')}
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#17242D] mb-1">
                    {activeTab === 'student' ? t('emailOrId') : t('officialId')}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#66737C] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={activeTab === 'student' ? 'student@demo.in' : 'official@demo.in'}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-[#DFE3E4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#102A39] text-[#17242D] bg-[#FDFCFB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#17242D] mb-1">
                    {t('password')}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#66737C] absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-[#DFE3E4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#102A39] text-[#17242D] bg-[#FDFCFB]"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#102A39] hover:bg-[#173447] text-white py-2.5 px-4 rounded-md text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>
                    {activeTab === 'student' ? t('signIn') : t('signInOfficial')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C48A3A]" />
                </button>
              </form>

              {/* Instant Demo Quick Login */}
              <div className="mt-4 pt-4 border-t border-[#DFE3E4]">
                <button
                  type="button"
                  onClick={activeTab === 'student' ? loginAsStudent : loginAsOfficial}
                  className="w-full bg-[#F7F5EF] hover:bg-[#EAE7DC] text-[#102A39] border border-[#DFE3E4] py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-[#276B58]" />
                  <span>
                    {activeTab === 'student' 
                      ? t('continueDemoStudent') 
                      : t('continueDemoOfficial')}
                  </span>
                </button>

                {/* Demo Credentials Box */}
                <div className="mt-4 bg-[#FBF6EE] border border-[#C48A3A]/30 rounded-md p-2.5 text-[11px] text-[#66737C]">
                  <p className="font-semibold text-[#102A39]">
                    {language === 'hi' ? 'डेमो क्रेडेंशियल:' : 'Demo Credentials:'}
                  </p>
                  <div className="mt-1 font-mono text-[10px] space-y-0.5">
                    <p>• {t('studentTab')}: <span className="text-[#102A39] font-bold">student@demo.in</span> / <span className="text-[#102A39] font-bold">janvidya</span></p>
                    <p>• {t('officialTab')}: <span className="text-[#102A39] font-bold">official@demo.in</span> / <span className="text-[#102A39] font-bold">janvidya</span></p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Disclaimer */}
            <div className="mt-6 text-[10px] text-[#66737C] text-center leading-relaxed">
              {t('prototypeLabel')} — Smart India Hackathon 2026
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#FFFFFF] border-t border-[#DFE3E4] py-3 px-4 text-center text-xs text-[#66737C]">
        <p>
          JANVIDYA © 2026 — Team ManHaters | Smart India Hackathon 2026 PS ID: SIH26239
        </p>
      </footer>

    </div>
  );
};
