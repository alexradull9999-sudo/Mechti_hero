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
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);

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
  const handleOpenConsultation = (customMessage?: string) => {
    if (customMessage) {
      setCalcMessage(customMessage);
      setModalTitle('Расчёт зафиксирован');
      setModalDesc('Ваша конфигурация сохранена. Заполните форму для фиксации персонального тарифа.');
    } else {
      setCalcMessage('');
      setModalTitle('Записаться на встречу');
      setModalDesc('Заполните данные для прохождения технической регистрации в шоу-руме в Сити.');
    }
    setIsModalSubmitted(false);
    setIsConsultationOpen(true);
  };

  // Perform dialog form submissions mockup
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName || !mPhone) return;

    setIsModalSubmitting(true);
    setTimeout(() => {
      setIsModalSubmitting(false);
      setIsModalSubmitted(true);
      setCalcMessage('');
      
      // Clear inputs
      setMName('');
      setMPhone('');
    }, 1000);
  };

  if (currentPath === '/privacy') {
    return <PrivacyPage />;
  }

  if (currentPath === '/consent') {
    return <ConsentPage />;
  }

  return (
    <div className="relative min-h-screen bg-[#0F0F0F] text-[#F5F1EA] overflow-hidden selection:bg-[#B8956A]/30">
      
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
        
        <StatsCounter />
        
        <USPComparison />
        
        <ServicesGrid onScrollToSection={handleScrollToSection} />
        
        <LuxuryCalculator onOpenConsultation={handleOpenConsultation} />
        
        <DesignServices 
          onOpenConsultation={handleOpenConsultation} 
          onScrollToSection={handleScrollToSection} 
        />
        
        <RenovationDetails onScrollToSection={handleScrollToSection} />
        
        <FurnitureSection onScrollToSection={handleScrollToSection} />
        
        <RealEstateSection 
          onOpenConsultation={handleOpenConsultation} 
          onScrollToSection={handleScrollToSection} 
        />
        
        <Roadmap />
        
        <PortfolioGrid onOpenConsultation={handleOpenConsultation} />
        
        <Founders />
        
        <ErpControl />
        
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
        <div className="fixed inset-0 z-[100] bg-[#0F0F0F]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#1A1A1A] border-2 border-[#B8956A] overflow-hidden relative shadow-2xl">
            {/* Close cross trigger */}
            <button
              onClick={() => setIsConsultationOpen(false)}
              className="absolute top-4 right-4 text-[#8B8478] hover:text-[#B8956A] p-2 border border-[#B8956A]/10 bg-[#0F0F0F] rounded-full hover:bg-white/5 transition-all text-xs"
              aria-label="Close dialog"
            >
              <X size={14} />
            </button>

            <div className="p-8 space-y-6">
              {isModalSubmitted ? (
                /* Success screen in dialog */
                <div className="text-center py-10 space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 bg-[#B8956A]/20 border border-[#B8956A] text-[#B8956A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-serif text-3xl font-light text-[#F5F1EA]">
                    Запись подтверждена
                  </h3>
                  <div className="h-[1px] w-12 bg-[#B8956A]/40 mx-auto" />
                  <p className="text-xs text-[#8B8478] leading-relaxed max-w-sm mx-auto">
                    Спасибо! Юрий Постриганев или ведущий де-люкс архитектор перезвонит вам в течение <strong className="text-[#F5F1EA]">15 минут</strong> для предметного подтверждения пропуска в башню «Империя».
                  </p>
                  <button
                    onClick={() => setIsConsultationOpen(false)}
                    className="w-full py-4 bg-[#B8956A] text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#8B6F4E] transition-colors"
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
                    <h3 className="font-serif text-2xl text-[#F5F1EA] font-light">
                      {modalTitle}
                    </h3>
                    <p className="text-xs text-[#8B8478] font-sans leading-normal">
                      {modalDesc}
                    </p>
                  </div>

                  {calcMessage && (
                    <div className="bg-[#B8956A]/10 border-l border-[#B8956A] p-3 text-[11px] text-[#EDE6D8] font-mono leading-relaxed max-h-24 overflow-y-auto">
                      {calcMessage}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-[#8B8478] block">Имя представителя *</label>
                      <input
                        type="text"
                        required
                        value={mName}
                        onChange={(e) => setMName(e.target.value)}
                        placeholder="Александр Владимирович"
                        className="w-full bg-[#0F0F0F] border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-3 text-xs text-[#F5F1EA] font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-[#8B8478] block">Контактный телефон *</label>
                      <input
                        type="tel"
                        required
                        value={mPhone}
                        onChange={(e) => setMPhone(e.target.value)}
                        placeholder="+7 (925) 000-00-00"
                        className="w-full bg-[#0F0F0F] border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-3 text-xs text-[#F5F1EA] font-sans"
                      />
                    </div>

                  </div>

                  <div className="text-[9px] text-[#8B8478] leading-normal pt-2">
                    Ваш визит координируется в строго конфиденциальном режиме. Все данные инвесторов зашифрованы по стандартам холдинга Mechty.
                  </div>

                  <button
                    type="submit"
                    disabled={isModalSubmitting || !mName || !mPhone}
                    className="w-full py-4 bg-[#B8956A] hover:bg-[#8B6F4E] disabled:bg-[#8B8478]/15 disabled:text-[#8B8478] text-[#0F0F0F] uppercase tracking-widest font-sans font-bold text-xs transition-colors duration-300 transform active:scale-98 flex items-center justify-center gap-2 block shadow-lg"
                  >
                    {isModalSubmitting ? (
                      <span>Шифрование данных...</span>
                    ) : (
                      <>
                        <span>Забронировать визит в Сити</span>
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
