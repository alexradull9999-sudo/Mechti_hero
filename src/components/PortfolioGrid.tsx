import React, { useState, useEffect } from 'react';
import { portfolioCases } from '../data';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioGridProps {
  onOpenConsultation: (message?: string) => void;
}

export default function PortfolioGrid({ onOpenConsultation }: PortfolioGridProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const activeCaseInfo = selectedCaseId ? portfolioCases.find(c => c.id === selectedCaseId) : null;
  const modalImages = activeCaseInfo ? [...activeCaseInfo.gallery, activeCaseInfo.plan] : [];

  // Reset active image index when a case is selected
  const handleOpenCase = (id: string) => {
    setSelectedCaseId(id);
    setActiveImageIndex(0);
  };

  const handlePrevImage = () => {
    if (modalImages.length === 0) return;
    setActiveImageIndex(prev => (prev === 0 ? modalImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (modalImages.length === 0) return;
    setActiveImageIndex(next => (next === modalImages.length - 1 ? 0 : next + 1));
  };

  // Close modal with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCaseId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="portfolio" className="bg-[#0F0F0F] text-[#F5F1EA] py-32 md:py-44 border-b border-[#B8956A]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20 md:mb-28">
          <span className="uppercase text-[10px] tracking-[0.4em] text-[#B8956A] block font-semibold">
            Реализованные проекты
          </span>
          <h2 className="font-serif text-[64px] md:text-[88px] font-light leading-none text-[#F5F1EA]">
            Портфолио
          </h2>
          <div className="h-[1px] w-24 bg-[#B8956A]/40 mx-auto" />
          <p className="text-[15px] text-[#8B8478] leading-relaxed font-light max-w-2xl mx-auto">
            От квартир в премиум-ЖК до загородных резиденций. Каждый проект — полный цикл от планировки до расстановки декора.
          </p>
        </div>

        {/* Сетка карточек с асимметрией */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioCases.map((cs) => {
            const isLarge = cs.id === 'case-1';
            return (
              <article 
                key={cs.id}
                className={`${isLarge ? 'lg:col-span-2' : 'lg:col-span-1'} group cursor-pointer overflow-hidden`}
                onClick={() => handleOpenCase(cs.id)}
              >
                {/* Фото с пропорциями 4:5 для стандартных, 16:10 для Усадьбы на десктопе */}
                <div className={`relative ${isLarge ? 'aspect-[4/5] lg:aspect-[16/10]' : 'aspect-[4/5]'} overflow-hidden`}>
                  <img 
                    src={cs.cover} 
                    alt={cs.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Тонкая тёмная тень снизу */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Лейбл стиля сверху-слева */}
                  <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.3em] text-[#B8956A] bg-[#0F0F0F]/40 backdrop-blur-sm px-3 py-1.5 border border-[#B8956A]/30 font-semibold font-mono">
                    {cs.style}
                  </span>
                </div>
                
                {/* Текст под фото */}
                <div className="pt-5 space-y-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl md:text-[28px] font-light text-[#F5F1EA] leading-tight transition-colors duration-300 group-hover:text-[#B8956A]">
                      {cs.title}
                    </h3>
                    <span className="text-xs font-mono text-[#B8956A] whitespace-nowrap">
                      {cs.area}
                    </span>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#8B8478] font-sans">
                    {cs.location}
                  </p>
                  {/* Тонкая линия как hover-индикатор */}
                  <div className="h-[1px] w-12 bg-[#B8956A]/40 group-hover:w-24 transition-all duration-500" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Кнопка под сеткой */}
        <div className="text-center mt-20 md:mt-28 space-y-6">
          <div className="h-[1px] w-32 bg-[#B8956A]/40 mx-auto" />
          <h4 className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#8B8478] font-sans">
            Это 5 из 1500+ реализованных проектов
          </h4>
          <button
            onClick={() => onOpenConsultation('Запрос на полное портфолио объектов Mechty Group')}
            className="border border-[#B8956A] text-[#B8956A] px-10 py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#B8956A] hover:text-[#0F0F0F] transition-all duration-300 font-semibold"
          >
            Запросить полное портфолио
          </button>
        </div>

      </div>

      {/* Модальное окно по клику на карточку */}
      {selectedCaseId && activeCaseInfo && (
        <div className="fixed inset-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          {/* Клик по фону закрывает */}
          <div className="absolute inset-0 cursor-default" onClick={() => setSelectedCaseId(null)} />
          
          <div className="relative w-full max-w-6xl bg-[#0F0F0F] border border-[#B8956A]/30 p-6 md:p-10 z-10 shadow-2xl max-h-[95vh] lg:max-h-[90vh] overflow-y-auto lg:overflow-visible">
            
            {/* Кнопка закрыть */}
            <button
              onClick={() => setSelectedCaseId(null)}
              className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-[#8B8478] hover:text-[#B8956A] font-mono uppercase tracking-widest bg-transparent border-0 cursor-pointer z-30 transition-colors"
            >
              <X size={16} />
              <span>закрыть</span>
            </button>

            {/* Сетка модалки */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-4">
              
              {/* Левая колонка (~65% ширины) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#161616] border border-[#B8956A]/10">
                  <img
                    src={modalImages[activeImageIndex]}
                    alt={activeCaseInfo.title}
                    className="w-full h-full object-cover select-none"
                  />
                  
                  {/* Стрелки переключения */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#B8956A]/80 text-[#FFF] hover:text-[#0F0F0F] flex items-center justify-center transition-all border border-[#B8956A]/20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#B8956A]/80 text-[#FFF] hover:text-[#0F0F0F] flex items-center justify-center transition-all border border-[#B8956A]/20"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                {/* Dynamic thumbnails + plan */}
                <div className="grid grid-flow-col auto-cols-fr gap-2 md:gap-4">
                  {modalImages.map((imgSrc, index) => {
                    const isPlan = index === modalImages.length - 1;
                    const isActive = activeImageIndex === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative aspect-[16/10] overflow-hidden border bg-black transition-all duration-300 ${
                          isActive ? 'border-[#B8956A] scale-[0.98]' : 'border-[#B8956A]/10 hover:border-[#B8956A]/50'
                        }`}
                      >
                        <img
                          src={imgSrc}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                        />
                        {isPlan && (
                          <div className="absolute inset-0 bg-[#0F0F0F]/80 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-[#B8956A] font-bold">
                              План
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Правая колонка (~35% ширины) */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between h-full lg:min-h-[400px]">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8956A] block font-mono font-bold">
                      {activeCaseInfo.style}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#F5F1EA] font-light tracking-tight mt-1 leading-tight">
                      {activeCaseInfo.title}
                    </h3>
                    <div className="h-[1px] w-20 bg-[#B8956A]/40 mt-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B8478] block font-sans font-bold">
                        Локация
                      </span>
                      <span className="text-sm text-[#F5F1EA] font-light mt-0.5 block">
                        {activeCaseInfo.location}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B8478] block font-sans font-bold">
                        Площадь
                      </span>
                      <span className="text-sm font-mono text-[#F5F1EA] font-light mt-0.5 block">
                        {activeCaseInfo.area}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-[#C4BEB3] text-sm leading-relaxed font-light font-sans pt-3 border-t border-[#B8956A]/10 whitespace-pre-line">
                    {activeCaseInfo.description}
                  </p>
                </div>
                
                {/* CTA кнопки */}
                <div className="pt-8 lg:pt-12 space-y-3">
                  <button
                    onClick={() => {
                      setSelectedCaseId(null);
                      onOpenConsultation(`Запрос на скачивание презентации проекта — ${activeCaseInfo.title}, ${activeCaseInfo.area}`);
                    }}
                    className="w-full py-4 bg-[#B8956A] text-[#0F0F0F] hover:bg-[#A38157] text-xs uppercase tracking-[0.25em] font-sans font-extrabold transition-all duration-300 flex items-center justify-center gap-2 animate-fadeIn"
                  >
                    <span>Скачать презентацию</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCaseId(null);
                      onOpenConsultation(`Интересует похожий проект — ${activeCaseInfo.title}, ${activeCaseInfo.area}`);
                    }}
                    className="w-full py-4 border border-[#B8956A]/40 text-[#B8956A] hover:bg-[#B8956A]/10 text-xs uppercase tracking-[0.25em] font-sans font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Запросить похожий проект</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      <div className="absolute bottom-6 right-6 text-[#F5F1EA] opacity-20 text-[10px] sm:text-xs tracking-[0.25em] font-sans font-extrabold uppercase select-none pointer-events-none">
        НАЧИНАЕТСЯ С…
      </div>

    </section>
  );
}
