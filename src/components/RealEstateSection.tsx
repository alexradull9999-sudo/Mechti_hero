import React, { useState } from 'react';
import { premiumProperties } from '../data';
import { MapPin, ArrowRight, Building, Key, Home, Sparkles } from 'lucide-react';

interface RealEstateSectionProps {
  onOpenConsultation: (msg?: string) => void;
  onScrollToSection?: (id: string) => void;
}

export default function RealEstateSection({ onOpenConsultation, onScrollToSection }: RealEstateSectionProps) {
  const [activeSegment, setActiveSegment] = useState<string>("all");

  const segments = [
    { id: "all", name: "Все сегменты", icon: <Building size={14} /> },
    { id: "novostroy", name: "Новостройки", icon: <Building size={14} /> },
    { id: "vtorichka", name: "Вторичка эксклюзив", icon: <Key size={14} /> },
    { id: "zagorod", name: "Частные дома", icon: <Home size={14} /> },
  ];

  const filteredProperties = premiumProperties.filter(p => {
    if (activeSegment === "all") return true;
    if (activeSegment === "novostroy") return p.badge.includes("Новостройка");
    if (activeSegment === "vtorichka") return p.badge.includes("Вторичка");
    if (activeSegment === "zagorod") return p.badge.includes("Резиденция") || p.title.includes("Усадьба");
    return true;
  });

  const partners = [
    "VESPER", "CAPITAL GROUP", "SMINEX-ИНТЕКО", "HUTTON DEVELOPMENT", 
    "COLDY", "BARKLI", "MR GROUP", "STONE HEDGE", "ЖК ЭРА", "БАДАЕВСКИЙ", 
    "КЛУБНЫЙ ДОМ FORUM", "LUCE (ЛЮЧЕ)", "CLOS 17 (КЛОС 17)", "ДОМ ЛАВРУШИНСКИЙ", 
    "BRUSOV (БРЮСОВ)", "ОСТРОВ", "СОБЫТИЕ", "NICOLE (НИКОЛЬ)", "VESPER КУТУЗОВСКИЙ", 
    "И ДРУГИЕ"
  ];

  return (
    <section id="real-estate" className="bg-[#0F0F0F] text-[#F5F1EA] py-24 md:py-36 border-b brass-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back navigation button */}
        {onScrollToSection && (
          <button
            onClick={() => onScrollToSection('directions')}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold text-[#B8956A] hover:text-[#F5F1EA] transition-colors mb-8 cursor-pointer bg-transparent border-none p-0 inline-flex"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Назад к направлениям
          </button>
        )}
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-sm uppercase font-sans tracking-[0.2em] text-[#B8956A] font-semibold block">
              АВТОРСКИЙ ПОДБОР ЭЛИТНОГО ЖИЛЬЯ
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light">
              Авторская недвижимость <br />
              <span className="italic text-[#B8956A] font-light">в лучших локациях Москвы</span>
            </h2>
            <p className="text-base md:text-lg text-[#C4BEB3] font-sans font-light leading-relaxed max-w-2xl">
              Сотрудничаем напрямую с застройщиками Vesper, Capital Group, Sminex и собственниками квартир. 80% наших сделок — закрытые продажи вне каталогов по персональному запросу.
            </p>
          </div>
          
          <div className="lg:col-span-4 lg:text-right">
            <span className="font-serif text-4xl text-[#B8956A] font-light italic block">
              80% сделок
            </span>
            <span className="text-xs md:text-sm uppercase tracking-widest text-[#C4BEB3] font-semibold block">
              проходят в закрытом формате UHNW
            </span>
          </div>
        </div>

        {/* Categories Tab Pill bar */}
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b brass-border">
          {segments.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSegment(s.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-sans transition-all duration-300 border ${
                activeSegment === s.id
                  ? 'border-[#B8956A] bg-[#B8956A] text-[#0F0F0F] font-semibold'
                  : 'border-[#F5F1EA]/10 text-[#F5F1EA]/80 hover:border-[#B8956A]/30'
              }`}
            >
              {s.icon}
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        {/* Properties Catalog Showcase cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => onOpenConsultation(`Здравствуйте, интересует подбор по объекту: "${prop.title}".`)}
              className="group cursor-pointer bg-[#1A1A1A] border brass-border relative overflow-hidden flex flex-col justify-between"
            >
              {/* Photo section */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Visual badge top */}
                <div className="absolute top-3 left-3 bg-[#0F0F0F]/90 border border-[#B8956A]/40 text-[#B8956A] text-xs uppercase tracking-widest px-2.5 py-1 font-sans font-semibold">
                  {prop.badge}
                </div>
              </div>

              {/* Data section */}
              <div className="p-5 space-y-3 relative z-10 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl text-[#F5F1EA] group-hover:text-[#B8956A] transition-colors leading-tight font-light">
                    {prop.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-[#C4BEB3] font-sans font-medium">
                    <MapPin size={12} className="text-[#B8956A] shrink-0" />
                    <span className="truncate">{prop.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#B8956A]/10 space-y-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[10px] uppercase font-sans tracking-wider text-[#A8A196] font-medium shrink-0">Площадь</span>
                    <span className="text-sm font-sans font-medium text-[#F5F1EA] whitespace-nowrap">{prop.area}</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[10px] uppercase font-sans tracking-wider text-[#A8A196] font-medium shrink-0">Стоимость</span>
                    <span className="text-sm font-mono text-[#B8956A] font-semibold whitespace-nowrap">{prop.price}</span>
                  </div>
                </div>
              </div>

              {/* Cover overlay button on hover */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B8956A] scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

        {/* Partner Developers Ticker Bar */}
        <div className="mb-16 border-t border-b border-[#B8956A]/15 py-8">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#8B8478] font-bold block mb-4 text-center">
            ПАРТНЕРЫ-ЗАСТРОЙЩИКИ И СОБСТВЕННИКИ ЭЛИТНЫХ ОБЪЕКТОВ:
          </span>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-serif tracking-[0.15em] text-[#C4BEB3] opacity-75">
            {partners.map((partner, i) => (
              <span key={i} className="hover:text-[#B8956A] transition-colors duration-300 font-light">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Global callout */}
        <div className="border brass-border bg-[#1A1A1A]/80 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#B8956A]/10 border border-[#B8956A]/20 text-[#B8956A] rounded-full hidden sm:block shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-lg font-serif text-[#F5F1EA] italic leading-tight">
                Индивидуальный закрытый консьерж-подбор
              </h4>
              <p className="text-xs md:text-sm text-[#C4BEB3] leading-relaxed max-w-xl mt-1.5 font-normal">
                Ищете конкретный метраж в Хамовниках или закрытый лофт на Остоженке? Задайте параметры. Наш брокер сформирует внерыночный пул квартир по личным каналам.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onOpenConsultation("Здравствуйте, хочу записаться на встречу на объекте для обсуждения подбора элитной недвижимости.")}
            className="px-6 py-3.5 bg-[#B8956A] hover:bg-[#8B6F4E] text-[#0F0F0F] text-sm uppercase tracking-widest font-sans font-bold flex items-center gap-2 text-center transition-all duration-300 transform active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>Записаться на встречу на объекте</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
