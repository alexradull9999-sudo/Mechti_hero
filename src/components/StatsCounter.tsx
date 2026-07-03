import React from 'react';
import { ArrowRight, Image, Calculator, Home } from 'lucide-react';

interface StatsCounterProps {
  onScrollToSection: (id: string) => void;
}

export default function StatsCounter({ onScrollToSection }: StatsCounterProps) {
  const items = [
    {
      id: "stats-btn-portfolio",
      num: "I",
      title: "Портфолио",
      desc: "Реализованные интерьеры бизнес, премиум и de luxe класса с детальной комплектацией",
      section: "portfolio",
      icon: Image,
    },
    {
      id: "stats-btn-calculator",
      num: "II",
      title: "Калькулятор",
      desc: "Интерактивный расчет стоимости дизайна, ремонта и мебели индивидуально под ваш метраж",
      section: "calculator",
      icon: Calculator,
    },
    {
      id: "stats-btn-realestate",
      num: "III",
      title: "Квартиры в продаже",
      desc: "Каталог готовой элитной недвижимости в знаковых жилых комплексах Москвы",
      section: "real-estate",
      icon: Home,
    }
  ];

  return (
    <section
      id="action-promos"
      className="relative bg-[#E4DDD2] border-y brass-border py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10 md:divide-[#B8956A]/20">
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                id={item.id}
                onClick={() => onScrollToSection(item.section)}
                className="group flex flex-col items-start text-left p-6 sm:p-8 lg:p-10 hover:bg-black/[0.01] active:bg-black/[0.02] transition-all duration-300 relative cursor-pointer w-full border-none focus:outline-none"
              >
                {/* Top indicator bar & item roman numeral */}
                <div className="flex justify-between items-center w-full mb-6 text-[#3D3A34]">
                  <span className="font-serif text-xl italic tracking-wider group-hover:text-[#B8956A] transition-colors">
                    {item.num}
                  </span>
                  <IconComponent size={20} className="text-[#3D3A34]/50 group-hover:text-[#B8956A] transition-colors duration-300" />
                </div>

                {/* Button Title */}
                <h3 className="font-serif text-2xl lg:text-3xl text-[#121212] font-light mb-4 tracking-wide group-hover:text-[#B8956A] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Button Description */}
                <p className="text-base lg:text-sm text-[#3D3A34] font-sans font-semibold leading-relaxed mb-6 flex-grow max-w-sm">
                  {item.desc}
                </p>

                {/* Call-to-action bar */}
                <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300 text-sm md:text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B8956A]">
                  <span>Перейти</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
