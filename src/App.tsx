import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import USPComparison from './components/USPComparison';
import ServicesGrid from './components/ServicesGrid';
import LuxuryCalculator from './components/LuxuryCalculator';
import DesignServices from './components/DesignServices';
import RenovationDetails from './components/RenovationDetails';
import FurnitureSection from './components/FurnitureSection';
import RealEstateSection from './components/RealEstateSection';
import Roadmap from './components/Roadmap';
import PortfolioGrid from './components/PortfolioGrid';
import Founders from './components/Founders';
import ErpControl from './components/ErpControl';
import ReviewsSection from './components/ReviewsSection';
import TrendsSection from './components/TrendsSection';
import FAQAccordion from './components/FAQAccordion';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import PrivacyPage from './components/PrivacyPage';
import ConsentPage from './components/ConsentPage';
import { Sparkles, X, Send, CheckCircle, Smartphone } from 'lucide-react';
import { formatPhoneNumber, isValidPhoneNumber } from './utils';

export default function App() {
  // Simple Path routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    
    // Smooth navigation support for links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        const href = anchor.getAttribute('href');
        if (href === '/privacy' || href === '/consent' || href === '/') {
          e.preventDefault();
          window.history.pushState(null, '', href);
          setCurrentPath(href);
          window.scrollTo(0, 0);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Callback Consultation Dialog Modal States
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Записаться на встречу');
  const [modalDesc, setModalDesc] = useState('Заполните данные для прохождения технической регистрации в шоу-руме в Сити.');
  const [calcMessage, setCalcMessage] = useState<string>('');
  
  // Custom interactive lead input state inside callback modal
  const [mName, setMName] = useState('');
  const [mPhone, setMPhone] = useState('');
  const [mChannel, setMChannel] = useState<'telegram' | 'whatsapp' | 'messenger'>('telegram');
  const [modalSubmitLabel, setModalSubmitLabel] = useState('Получить');
  const [modalChannelLabel, setModalChannelLabel] = useState('Где удобнее общаться? *');
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);
  const [modalConsent, setModalConsent] = useState(true);

  // Custom Cursor Mouse tracker
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isCursorSupported, setIsCursorSupported] = useState(false);

  useEffect(() => {
    // Check if device supports fine hover cursor or is mobile
    const checkTouch = () => {
      setIsCursorSupported(false);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (!isCursorSupported) return;

    // Track cursor positioning
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Track active target tags to scale cursor indicator
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Add custom cursor styling modifier to html element
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isCursorSupported]);

  // Smooth Scroll handler
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open consultation modal with customizable states
  const handleOpenConsultation = (
    customMessage?: string, 
    customTitle?: string, 
    customDesc?: string,
    customSubmitLabel?: string,
    customChannelLabel?: string
  ) => {
    let finalTitle = customTitle || 'Записаться на встречу';
    let finalDesc = customDesc || 'Заполните данные для прохождения технической регистрации в шоу-руме в Сити.';
    
    if (customMessage) {
      setCalcMessage(customMessage);
      finalTitle = customTitle || 'Расчёт зафиксирован';
      finalDesc = customDesc || 'Ваша конфигурация сохранена. Заполните форму для фиксации персонального тарифа.';
    } else {
      setCalcMessage('');
    }
    
    setModalTitle(finalTitle);
    setModalDesc(finalDesc);

    // Context-aware labels determination
    let submitLabel = 'Получить';
    let channelLabel = 'Где удобнее получить? *';

    const titleLower = finalTitle.toLowerCase();
    const descLower = finalDesc.toLowerCase();
    const msgLower = (customMessage || '').toLowerCase();

    // Check if context represents "записаться на встречу", consultation, question, or first step
    if (
      titleLower.includes('встреч') || 
      titleLower.includes('визит') ||
      titleLower.includes('вопрос') ||
      titleLower.includes('шаг') ||
      titleLower.includes('консульт') ||
      msgLower.includes('консульт') ||
      msgLower.includes('встреч') ||
      msgLower.includes('вопрос') ||
      (!customMessage && !customTitle) // default blank consultation trigger
    ) {
      submitLabel = 'Записаться';
      channelLabel = 'Где удобнее общаться? *';
    } else {
      // It is a file download, layout project presentation, access setup
      submitLabel = 'Получить';
      if (titleLower.includes('презентац') || descLower.includes('презентац')) {
        channelLabel = 'Где удобнее получить презентацию? *';
      } else if (titleLower.includes('доступ') || descLower.includes('доступ')) {
        channelLabel = 'Где удобнее получить доступ? *';
      } else {
        channelLabel = 'Где удобнее получить? *';
      }
    }

    // Apply explicit parameters if provided
    if (customSubmitLabel) {
      submitLabel = customSubmitLabel;
    }
    if (customChannelLabel) {
      channelLabel = customChannelLabel;
    }

    setModalSubmitLabel(submitLabel);
    setModalChannelLabel(channelLabel);

    setIsModalSubmitted(false);
    setModalConsent(true);
    setIsConsultationOpen(true);
  };

  // Perform dialog form submissions mockup
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalConsent || !mName || !isValidPhoneNumber(mPhone)) return;

    setIsModalSubmitting(true);
    const MAKE_WEBHOOK = 'https://hook.eu1.make.com/puy2n5ltucpawv56c9mnocuyxt6txrdc';

    // Собрать UTM из URL
    const urlParams = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k => {
      const v = urlParams.get(k);
      if (v) utm[k] = v;
    });

    const payload = {
      source: `ConsultationModal: ${modalTitle}`,
      name: mName,
      phone: mPhone,
      email: '',
      area: '',
      budget: '',
      comment: calcMessage ? `${calcMessage} (Канал связи: ${mChannel})` : `Канал связи: ${mChannel}`,
      url: window.location.href,
      utm: Object.keys(utm).length > 0 ? JSON.stringify(utm) : '',
    };

    try {
      await fetch(MAKE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      // Yandex.Metrika reach goal
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(109051239, 'reachGoal', 'send');
      }
    } catch (err) {
      console.error('Webhook error:', err);
      // Не показываем ошибку пользователю
    } finally {
      setIsModalSubmitting(false);
      setIsModalSubmitted(true);
      setCalcMessage('');
      setMName('');
      setMPhone('');
      setModalConsent(true);
    }
  };

  if (currentPath === '/privacy') {
    return <PrivacyPage />;
  }

  if (currentPath === '/consent') {
    return <ConsentPage />;
  }

  return (
    <div className="relative min-h-screen bg-[#F2EDE4] text-[#121212] overflow-clip selection:bg-[#B8956A]/30">
      
      {/* Premium custom mouse companion cursor */}
      {isCursorSupported && (
        <div
          className="fixed pointer-events-none rounded-full z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.1s] ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: isHovered ? '48px' : '16px',
            height: isHovered ? '48px' : '16px',
            backgroundColor: isHovered ? 'rgba(184, 149, 106, 0.4)' : '#B8956A',
            border: isHovered ? '1px solid #B8956A' : 'none',
          }}
        />
      )}

      {/* Header element */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onScrollToSection={handleScrollToSection}
      />

      {/* Core sections track */}
      <main className="relative">
        <Hero
          onScrollToSection={handleScrollToSection}
          onOpenConsultation={() => handleOpenConsultation()}
        />
        
        <StatsCounter onScrollToSection={handleScrollToSection} />
        
        <USPComparison />
        
        <PortfolioGrid onOpenConsultation={handleOpenConsultation} />
        
        <ServicesGrid onScrollToSection={handleScrollToSection} />
        
        <LuxuryCalculator onOpenConsultation={handleOpenConsultation} />
        
        {/*
        <Roadmap 
          onOpenConsultation={handleOpenConsultation}
        />
        */}
        
        <DesignServices 
          onOpenConsultation={handleOpenConsultation} 
          onScrollToSection={handleScrollToSection} 
        />
        
        <RenovationDetails onScrollToSection={handleScrollToSection} />
        
        <FurnitureSection 
          onScrollToSection={handleScrollToSection} 
          onOpenConsultation={handleOpenConsultation}
        />
        
        <RealEstateSection 
          onOpenConsultation={handleOpenConsultation} 
          onScrollToSection={handleScrollToSection} 
        />
        
        <Founders 
          onOpenConsultation={handleOpenConsultation}
        />
        
        <ErpControl 
          onOpenConsultation={handleOpenConsultation}
        />
        
        <ReviewsSection onOpenConsultation={handleOpenConsultation} />
        
        <TrendsSection />
        
        <FAQAccordion />
        
        <ContactForm
          customMessage={calcMessage}
          onClearCustomMessage={() => setCalcMessage('')}
        />
      </main>

      {/* Footer Element */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Dynamic Pop-up Consultation modal dialog */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-[100] bg-[#F2EDE4]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white border-2 border-[#B8956A] overflow-hidden relative shadow-2xl">
            {/* Close cross trigger */}
            <button
              onClick={() => setIsConsultationOpen(false)}
              className="absolute top-4 right-4 text-[#3D3A34] hover:text-[#B8956A] p-2 border border-[#B8956A]/20 bg-white rounded-full hover:bg-black/5 transition-all text-xs"
              aria-label="Close dialog"
            >
              <X size={14} />
            </button>

            <div className="p-8 space-y-6">
              {isModalSubmitted ? (
                /* Success screen in dialog */
                <div className="text-center py-10 space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 bg-[#B8956A]/10 border border-[#B8956A] text-[#B8956A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-serif text-3xl font-light text-[#121212]">
                    Запись подтверждена
                  </h3>
                  <div className="h-[1px] w-12 bg-[#B8956A]/40 mx-auto" />
                  <p className="text-xs text-[#3D3A34] leading-relaxed max-w-sm mx-auto">
                    Спасибо! Юрий Постриганев или ведущий де-люкс архитектор перезвонит вам в течение <strong className="text-[#121212]">15 минут</strong> для предметного подтверждения пропуска в башню «Империя».
                  </p>
                  <button
                    onClick={() => setIsConsultationOpen(false)}
                    className="w-full py-4 bg-[#B8956A] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#8B6F4E] transition-colors"
                  >
                    Вернуться на лендинг
                  </button>
                </div>
              ) : (
                /* Dynamic Form */
                <form onSubmit={handleModalSubmit} className="space-y-5 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#B8956A]/10 pb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8956A] block">
                      Один партнёр — Один результат
                    </span>
                    <h3 className="font-serif text-2xl text-[#121212] font-light">
                      {modalTitle}
                    </h3>
                    <p className="text-xs text-[#3D3A34] font-sans leading-normal">
                      {modalDesc}
                    </p>
                  </div>

                  {calcMessage && (
                    <div className="bg-[#B8956A]/5 border-l border-[#B8956A] p-3 text-[11px] text-[#2E2B2A] font-mono leading-relaxed max-h-24 overflow-y-auto">
                      {calcMessage}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-[#3D3A34] block font-bold">Имя представителя *</label>
                      <input
                        type="text"
                        required
                        value={mName}
                        onChange={(e) => setMName(e.target.value)}
                        placeholder="Александр Владимирович"
                        className="w-full bg-white border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-3 text-xs text-[#121212] font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-[#3D3A34] block font-bold">
                        Контактный телефон *
                        {mPhone && !isValidPhoneNumber(mPhone) && (
                          <span className="text-[#B8956A] text-[8px] normal-case ml-2 font-medium animate-pulse">Неполный номер</span>
                        )}
                      </label>
                      <input
                        type="tel"
                        required
                        value={mPhone}
                        onChange={(e) => setMPhone(formatPhoneNumber(e.target.value))}
                        placeholder="+7 (925) 000-00-00"
                        className="w-full bg-white border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-3 text-xs text-[#121212] font-sans"
                      />
                    </div>

                    {/* Preferred contact channel */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-[9px] uppercase tracking-wider text-[#3D3A34] block font-bold">{modalChannelLabel}</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'telegram', label: 'Telegram' },
                          { id: 'whatsapp', label: 'WhatsApp' },
                          { id: 'messenger', label: 'Мессенджер Макс' }
                        ].map((ch) => (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => setMChannel(ch.id as any)}
                            className={`py-2 text-[10px] font-sans font-bold text-center tracking-wider uppercase transition-all border cursor-pointer ${
                              mChannel === ch.id
                                ? 'bg-[#B8956A] text-white border-[#B8956A]'
                                : 'bg-white text-[#3D3A34] border-[#B8956A]/20 hover:border-[#B8956A]/50'
                            }`}
                          >
                            {ch.label}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Consent checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer group py-1">
                    <input 
                      type="checkbox" 
                      required
                      checked={modalConsent}
                      onChange={(e) => setModalConsent(e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5 accent-[#B8956A] cursor-pointer shrink-0"
                    />
                    <span className="text-[10px] text-[#3D3A34] leading-normal select-none">
                      Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                      <a href="/privacy" target="_blank" className="text-[#B8956A] hover:underline">
                        Политикой конфиденциальности
                      </a>{' '}
                      и{' '}
                      <a href="/consent" target="_blank" className="text-[#B8956A] hover:underline">
                        Согласием на обработку персональных данных
                      </a>.
                    </span>
                  </label>

                  <div className="text-[9px] text-[#3D3A34] leading-normal">
                    Ваш визит координируется в строго конфиденциальном режиме. Все данные инвесторов зашифрованы по стандартам холдинга Mechty.
                  </div>

                  <button
                    type="submit"
                    disabled={isModalSubmitting || !mName || !isValidPhoneNumber(mPhone) || !modalConsent}
                    className="w-full py-4 bg-[#B8956A] hover:bg-[#8B6F4E] disabled:bg-[#E4DDD2] disabled:text-[#3D3A34]/40 text-white uppercase tracking-widest font-sans font-bold text-xs transition-colors duration-300 transform active:scale-98 flex items-center justify-center gap-2 block shadow-lg cursor-pointer"
                  >
                    {isModalSubmitting ? (
                      <span>Шифрование данных...</span>
                    ) : (
                      <>
                        <span>{modalSubmitLabel}</span>
                        <Send size={11} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
