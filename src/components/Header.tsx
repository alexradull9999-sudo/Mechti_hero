import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavItemClick('hero')}
            className="cursor-pointer group flex items-center shrink-0"
          >
            <img 
              src="/logo.svg" 
              alt="MECHTY GROUP" 
              className="h-9 md:h-11 w-auto opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Desktop Navigation - Optimized gaps and text sizes to prevent overlap */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 min-[1380px]:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className="text-[#F5F1EA]/80 hover:text-[#B8956A] text-[10px] xl:text-xs uppercase tracking-wider xl:tracking-widest font-sans transition-colors duration-300 font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#B8956A] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Contact Actions for Desktop (>= 1024px) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a
              href="tel:+79250999333"
              className="flex items-center gap-1.5 text-[#F5F1EA] hover:text-[#B8956A] font-mono text-xs xl:text-sm tracking-widest transition-colors duration-300 font-bold shrink-0"
            >
              <Phone size={13} className="text-[#B8956A]" />
              <span>+7 (925) 0999-333</span>
            </a>
            <button
              onClick={onOpenConsultation}
              className="px-3.5 xl:px-5 py-2.5 text-[10px] xl:text-xs uppercase tracking-widest font-sans font-extrabold text-[#B8956A] hover:text-[#0F0F0F] border border-[#B8956A] hover:bg-[#B8956A] transition-all duration-300 active:scale-95 shadow-md shrink-0"
            >
              Записаться на встречу
            </button>
          </div>

          {/* Mobile and Tablet Menu button trigger (hidden on desktop >= lg) */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Direct phone dialer icon shown on small mobile only */}
            <a
              href="tel:+79250999333"
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
          <div className="mt-8 flex flex-col items-center gap-6 border-t border-[#B8956A]/10 pt-8 w-full max-w-md mx-auto shrink-0">
            <a
              href="tel:+79250999333"
              className="flex items-center gap-2.5 text-[#F5F1EA] hover:text-[#B8956A] font-mono text-base md:text-lg tracking-wider transition-colors duration-300 font-semibold"
            >
              <Phone size={16} className="text-[#B8956A]" />
              <span>+7 (925) 0999-333</span>
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
          </div>

        </div>
      )}
    </>
  );
}
