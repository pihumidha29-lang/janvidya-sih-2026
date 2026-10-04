import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  GraduationCap, 
  Building2, 
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar, isMobileSidebarOpen }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, logout, notifications, markNotificationAsRead, navigateTo } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-[#FFFFFF] border-b border-[#DFE3E4] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                type="button"
                onClick={onToggleMobileSidebar}
                className="md:hidden p-2 rounded text-[#17242D] hover:bg-[#F4F7F9] focus:outline-none focus:ring-2 focus:ring-[#102A39]"
                aria-label="Toggle navigation menu"
              >
                {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <div 
              onClick={() => navigateTo(currentUser?.role === 'official' ? '/official/dashboard' : currentUser ? '/student/dashboard' : '/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-sm bg-[#102A39] flex items-center justify-center text-[#F7F5EF] border border-[#20455D] shadow-xs">
                {currentUser?.role === 'official' ? (
                  <Building2 className="w-5 h-5 text-[#C48A3A]" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-[#C48A3A]" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl font-bold tracking-tight text-[#102A39]">
                    {language === 'hi' ? 'जनविद्या' : 'JANVIDYA'}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#EDF5F2] text-[#276B58] border border-[#276B58]/30">
                    {currentUser?.role === 'official' 
                      ? (language === 'hi' ? 'अधिकारी पोर्टल' : 'Official Portal') 
                      : (language === 'hi' ? 'विद्यार्थी पोर्टल' : 'Student Portal')}
                  </span>
                </div>
                <p className="text-[11px] text-[#66737C] tracking-tight hidden lg:block leading-tight">
                  {t('designedForMinistry')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Switcher - Clear and Active */}
            <div className="relative inline-flex items-center bg-[#F7F5EF] border border-[#DFE3E4] rounded-md p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'en'
                    ? 'bg-[#102A39] text-[#FFFFFF] shadow-2xs font-semibold'
                    : 'text-[#66737C] hover:text-[#17242D]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'hi'
                    ? 'bg-[#102A39] text-[#FFFFFF] shadow-2xs font-semibold'
                    : 'text-[#66737C] hover:text-[#17242D]'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Notifications Dropdown */}
            {currentUser && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className="relative p-2 rounded-md text-[#17242D] hover:bg-[#F4F7F9] transition-colors focus:ring-2 focus:ring-[#102A39]"
                  aria-label="View notifications"
                >
                  <Bell className="w-5 h-5 text-[#173447]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#C48A3A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-[#DFE3E4] p-3 z-50 animate-fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-[#DFE3E4]">
                      <h4 className="font-semibold text-xs text-[#102A39]">
                        {language === 'hi' ? 'संदेश एवं सूचनाएँ' : 'Messages & Alerts'}
                      </h4>
                      <span className="text-[11px] text-[#66737C]">
                        {unreadCount} {language === 'hi' ? 'नए' : 'new'}
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-[#F4F7F9] mt-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-[#66737C] text-center py-4">
                          {language === 'hi' ? 'कोई नया संदेश नहीं है।' : 'No new messages.'}
                        </p>
                      ) : (
                        notifications.map((item) => (
                          <div 
                            key={item.id} 
                            onClick={() => {
                              markNotificationAsRead(item.id);
                              if (item.link) {
                                navigateTo(item.link);
                                setShowNotifications(false);
                              }
                            }}
                            className={`p-2.5 text-xs hover:bg-[#F7F5EF] cursor-pointer rounded transition-colors ${
                              !item.read ? 'bg-[#FBF6EE]/60 font-medium' : 'text-[#66737C]'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {item.type === 'action_required' ? (
                                <AlertTriangle className="w-4 h-4 text-[#C48A3A] shrink-0 mt-0.5" />
                              ) : item.type === 'success' ? (
                                <CheckCircle2 className="w-4 h-4 text-[#276B58] shrink-0 mt-0.5" />
                              ) : (
                                <Info className="w-4 h-4 text-[#245D78] shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p className="text-[#102A39] font-medium leading-snug">
                                  {language === 'hi' ? item.titleHi : item.title}
                                </p>
                                <p className="text-[11px] text-[#66737C] mt-0.5 leading-relaxed">
                                  {language === 'hi' ? item.messageHi : item.message}
                                </p>
                                <span className="text-[10px] text-[#A6C0CE] block mt-1">
                                  {item.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile / Logout */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md hover:bg-[#F4F7F9] border border-transparent hover:border-[#DFE3E4] transition-colors"
                >
                  <div className="w-7 h-7 rounded bg-[#173447] text-[#FFFFFF] flex items-center justify-center text-xs font-semibold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-[#102A39] leading-tight">
                      {language === 'hi' ? currentUser.nameHi : currentUser.name}
                    </p>
                    <p className="text-[10px] text-[#66737C] leading-none">
                      {currentUser.role === 'official' ? 'Authorised Officer' : 'Student'}
                    </p>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-[#DFE3E4] py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#DFE3E4]">
                      <p className="text-xs font-semibold text-[#102A39]">{currentUser.name}</p>
                      <p className="text-[11px] text-[#66737C] truncate">{currentUser.email}</p>
                      {currentUser.studentId && (
                        <p className="text-[10px] text-[#276B58] font-mono mt-0.5">ID: {currentUser.studentId}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-xs font-semibold text-[#276B58] bg-[#EDF5F2] px-2.5 py-1 rounded border border-[#276B58]/30">
                {t('demoEnvironment')}
              </span>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
