import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Send, Youtube, Sparkles, MessageSquare } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onOpenConsultation: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({ onOpenConsultation, onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Направления', id: 'directions' },
    { name: 'Услуги', id: 'services' },
    { name: 'Кейсы', id: 'portfolio' },
    { name: 'Калькулятор', id: 'calculator' },
    { name: 'О нас', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Контакты', id: 'contacts' },
  ];

  const handleNavItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav border-b border-[#B8956A]/30 py-3 md:py-4 shadow-xl'
            : 'bg-[#1A1A1A]/90 backdrop-blur-md border-b border-white/5 py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex lg:grid lg:grid-cols-12 items-center justify-between">
          {/* Logo container: spans 2/12 cols on lg, 3/12 on xl */}
          <div className="flex items-center justify-start lg:col-span-2 xl:col-span-3">
            <div
              onClick={() => handleNavItemClick('hero')}
              className="cursor-pointer group flex items-center shrink-0"
            >
              <Logo 
                className="h-8 md:h-9 xl:h-11 w-auto opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300 text-[#B8956A] hover:text-[#EDE6D8]"
              />
            </div>
          </div>

          {/* Desktop Navigation - Middle 6/12 columns, perfectly centered */}
          <nav className="hidden lg:flex items-center justify-center gap-2.5 xl:gap-5 min-[1380px]:gap-6 lg:col-span-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className="text-[#F5F1EA]/80 hover:text-[#B8956A] text-[9px] xl:text-xs uppercase tracking-wider xl:tracking-widest font-sans transition-colors duration-300 font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#B8956A] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Contact Actions for Desktop - Stacked vertically (button on top, phone number and social links underneath) to prevent any layout collision */}
          <div className="hidden lg:flex flex-col items-end gap-1.5 lg:col-span-4 xl:col-span-3 pl-2 select-none">
            <button
              onClick={onOpenConsultation}
              className="px-3 xl:px-5 py-2 text-[9px] xl:text-[10px] uppercase tracking-widest font-sans font-extrabold text-[#B8956A] hover:text-[#0F0F0F] border border-[#B8956A] hover:bg-[#B8956A] transition-all duration-300 active:scale-95 shadow-md shrink-0 whitespace-nowrap"
            >
              Записаться на встречу
            </button>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+79055164466"
                  className="flex items-center gap-1.5 text-white hover:text-[#B8956A] font-sans text-xs xl:text-sm tracking-wide transition-colors duration-300 font-bold shrink-0 group mr-1"
                >
                  <Phone size={11} className="text-[#B8956A] shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="whitespace-nowrap">+7 (905) 516-44-66</span>
                </a>
                <div className="flex items-center gap-2 shrink-0">
                  <a 
                    href="https://t.me/Vadim_Yastrebov" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-[22px] h-[22px] rounded-full bg-[#1A1A1A]/80 border border-[#B8956A]/30 hover:border-[#B8956A] flex items-center justify-center text-[#B8956A] hover:bg-[#B8956A] hover:text-[#0F0F0F] transition-all" 
                    title="Telegram"
                  >
                    <Send size={10} />
                  </a>
                  <a 
                    href="https://max.ru/u/f9LHodD0cOI3kLephDN2gD-mh2-FWe968N1MDGmz9ix6ZNJJPru11CPCRc0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-[22px] h-[22px] rounded-full bg-[#1A1A1A]/80 border border-[#B8956A]/30 hover:border-[#B8956A] flex items-center justify-center text-[#B8956A] hover:bg-[#B8956A] hover:text-[#0F0F0F] transition-all" 
                    title="Мессенджер Макс"
                  >
                    <MessageSquare size={11} className="p-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile and Tablet Menu button trigger (hidden on desktop >= lg) */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Direct phone dialer icon shown on small mobile only */}
            <a
              href="tel:+79055164466"
              className="p-2 md:hidden text-[#B8956A] hover:bg-[#1A1A1A] transition-colors duration-300 border border-[#B8956A]/20"
              aria-label="Call MECHTY Group"
            >
              <Phone size={16} />
            </a>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#F5F1EA] hover:bg-[#1A1A1A] transition-colors duration-300 border border-[#F5F1EA]/10 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay Menu with strict non-overlap layout and fully solid background */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F0F0F] w-full h-full flex flex-col justify-between px-6 py-10 md:px-12 md:py-16 pt-28 overflow-y-auto animate-fadeIn">
          
          {/* Subtle branding underlay */}
          <div className="text-center font-serif text-3xl tracking-[0.3em] text-[#8B8478]/10 uppercase select-none my-4">
            MECHTY GROUP
          </div>

          {/* Nav List */}
          <nav className="flex flex-col items-center gap-5 my-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className="text-2xl md:text-3xl font-serif text-[#F5F1EA] hover:text-[#B8956A] transition-colors duration-300 py-1 border-b border-[#B8956A]/0 hover:border-[#B8956A]/30 w-full max-w-sm text-center"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Bottom Call to Actions inside menu to prevent layout collision */}
          <div className="mt-8 flex flex-col items-center gap-5 border-t border-[#B8956A]/10 pt-8 w-full max-w-md mx-auto shrink-0">
            <a
              href="tel:+79055164466"
              className="flex items-center gap-2.5 text-white hover:text-[#B8956A] font-sans text-lg md:text-xl tracking-wide transition-colors duration-300 font-bold"
            >
              <Phone size={18} className="text-[#B8956A] shrink-0" />
              <span>+7 (905) 516-44-66</span>
            </a>
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full max-w-xs py-3.5 text-xs sm:text-sm uppercase tracking-widest font-sans font-black text-[#0F0F0F] bg-[#B8956A] hover:bg-[#8B6F4E] transition-all duration-300 text-center shadow-lg hover:shadow-[#B8956A]/10 active:scale-98"
            >
              Записаться на встречу
            </button>

            {/* Social channels on mobile */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[#F2ECE1]/80 font-sans text-[11px]">
              <a href="https://t.me/Vadim_Yastrebov" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8956A] transition-all flex items-center gap-1 py-1 px-2 border border-[#B8956A]/10 bg-[#1A1A1A]">
                <Send size={10} className="text-[#B8956A]" />
                <span>Telegram</span>
              </a>
              <a href="https://max.ru/u/f9LHodD0cOI3kLephDN2gD-mh2-FWe968N1MDGmz9ix6ZNJJPru11CPCRc0" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8956A] transition-all flex items-center gap-1 py-1 px-2 border border-[#B8956A]/10 bg-[#1A1A1A]">
                <MessageSquare size={10} className="text-[#B8956A]" />
                <span>Мессенджер Макс</span>
              </a>
              <a href="https://dzen.ru/mechti_group" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8956A] transition-all flex items-center gap-1 py-1 px-2 border border-[#B8956A]/10 bg-[#1A1A1A]">
                <Sparkles size={10} className="text-[#B8956A]" />
                <span>Дзен</span>
              </a>
              <a href="https://www.youtube.com/@mechti_group" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8956A] transition-all flex items-center gap-1 py-1 px-2 border border-[#B8956A]/10 bg-[#1A1A1A]">
                <Youtube size={11} className="text-[#B8956A]" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
