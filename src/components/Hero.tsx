import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
  onOpenConsultation: () => void;
}

export default function Hero({ onScrollToSection, onOpenConsultation }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen pt-24 flex flex-col justify-between bg-[#0F0F0F] border-b brass-border"
    >
      <div className="flex-grow flex flex-col lg:flex-row w-full h-full">
        {/* Left Content column: 50% on desktop, full on mobile */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 py-12 md:py-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r brass-border">
          <div className="max-w-xl mx-auto lg:mx-0 xl:pl-12">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#B8956A]"></div>
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] accent-text font-semibold flex items-center gap-1.5">
                <Sparkles size={12} className="animate-pulse" />
                Premium · De Luxe · С 2009 года
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-[76px] xl:text-[88px] font-serif leading-[1.0] sm:leading-[0.95] font-light mb-8 text-[#F5F1EA]">
              Всё начинается<br/>
              <span className="italic text-[#B8956A] font-light">с Мечты</span>
            </h1>
            
            <p className="text-base md:text-xl font-light text-[#C4BEB3] max-w-lg leading-relaxed mb-10 font-sans">
              От подбора авторской недвижимости до меблировки. Координация работы 180+ экспертов и подрядчиков в рамках одного договора под единым руководством.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={() => onScrollToSection('calculator')}
                className="bg-brass text-[#0F0F0F] px-8 py-4 text-sm uppercase tracking-[0.2em] font-sans font-bold hover:bg-[#8B6F4E] transition-all transform active:scale-97 cursor-pointer text-center"
              >
                Рассчитать стоимость
              </button>
              <button
                onClick={onOpenConsultation}
                className="border brass-border px-8 py-4 text-sm uppercase tracking-[0.2em] font-sans font-medium hover:bg-white/5 transition-all transform active:scale-97 cursor-pointer text-center"
              >
                Записаться на встречу
              </button>
            </div>
          </div>
        </div>

        {/* Contact Actions or Right Visual block column: 50% on desktop, fallback image height on mobile */}
        <div className="w-full lg:w-1/2 min-h-[350px] lg:min-h-0 relative bg-[#1A1A1A] flex-grow">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent opacity-45" />
          
          {/* Floating Sticker tag overlay */}
          <div className="absolute bottom-8 right-6 left-6 sm:left-auto sm:right-12 sm:max-w-[320px] lg:left-[-80px] lg:bottom-16 bg-[#0F0F0F]/95 p-6 lg:p-8 border brass-border shadow-2xl z-20">
            <p className="text-xs uppercase tracking-[0.2em] accent-text mb-3 font-semibold font-sans">
              Флагманский продукт
            </p>
            <p className="text-lg md:text-xl font-serif italic mb-2 leading-tight text-[#F5F1EA]">
              «Всё включено под тапочки»
            </p>
            <p className="text-xs md:text-sm text-[#C4BEB3] font-sans font-normal leading-normal">
              Дизайн, ремонт и комплектация мебели под ключ с гарантией на условиях договора.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
