import React from 'react';
import { Instagram, Sparkles, Building, Phone } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const socialHandles = [
    { name: "@mechti_group", label: "Канал недвижимости" },
    { name: "@doma_mechti.rf", label: "Строительство вилл" },
    { name: "@mebel_mechty_", label: "Каталог мебели" },
    { name: "@mechty.moscow", label: "Дизайн-студия" }
  ];

  return (
    <footer className="bg-[#0F0F0F] text-[#F5F1EA]/80 py-16 border-t border-[#B8956A]/10 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#B8956A]/10 pb-12 mb-12">
          
          {/* Column 1: Company stamp & handles */}
          <div className="space-y-4">
            <div
              onClick={() => onScrollToSection('hero')}
              className="cursor-pointer flex items-center group"
            >
              <img 
                src="/logo.svg" 
                alt="MECHTY GROUP" 
                className="h-9 md:h-11 w-auto opacity-95 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <p className="text-[#8B8478] leading-relaxed max-w-xs text-[11px]">
              Проектируем, строим и полностью меблируем премиум-интерьеры в Москве с 2009 года. Полная ответственность за ведомости и зазоры в одном договоре.
            </p>

            <div className="flex gap-3">
              {socialHandles.slice(0, 2).map((soc, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] bg-[#1A1A1A] p-2 border border-[#B8956A]/10 hover:border-[#B8956A]/30 text-[#EDE6D8] transition-colors leading-none cursor-pointer">
                  <Instagram size={11} className="text-[#B8956A]" />
                  <span>{soc.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 -mt-2">
              {socialHandles.slice(2, 4).map((soc, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] bg-[#1A1A1A] p-2 border border-[#B8956A]/10 hover:border-[#B8956A]/30 text-[#EDE6D8] transition-colors leading-none cursor-pointer">
                  <Instagram size={11} className="text-[#B8956A]" />
                  <span>{soc.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Directions links (anchors) */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#B8956A] font-semibold">
              Направления холдинга
            </h4>
            <div className="flex flex-col gap-3">
              <button onClick={() => onScrollToSection('real-estate')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Авторская недвижимость
              </button>
              <button onClick={() => onScrollToSection('design-section')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Дизайн интерьеров
              </button>
              <button onClick={() => onScrollToSection('renovation-section')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Ремонт под ключ
              </button>
              <button onClick={() => onScrollToSection('furniture-section')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Производство мебели
              </button>
            </div>
          </div>

          {/* Column 3: Corporate links (anchors) */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#B8956A] font-semibold">
              Компания в Мск
            </h4>
            <div className="flex flex-col gap-3">
              <button onClick={() => onScrollToSection('about')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Юрий и Диана Постриганевы
              </button>
              <button onClick={() => onScrollToSection('usp')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Единый договор УТП
              </button>
              <button onClick={() => onScrollToSection('portfolio')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Кейсы портфолио в ЖК
              </button>
              <button onClick={() => onScrollToSection('faq')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Детали гарантий & Смета
              </button>
            </div>
          </div>

          {/* Column 4: Contact details summary */}
          <div className="space-y-4 bg-[#1A1A1A] p-5 border border-[#B8956A]/15">
            <div className="flex items-center gap-1.5 text-xs text-[#B8956A] font-semibold font-serif">
              <Sparkles size={12} />
              <span>СТАТУС: ШОУ-РУМ ОТКРЫТ</span>
            </div>
            
            <p className="text-[11px] text-[#8B8478] leading-relaxed">
              Пресненская наб., 6, стр. 2, башня «Империя», Москва. Пл. 180 кв. м. Запись на встречи строго за 2 часа до приезда.
            </p>

            <a
              href="mailto:hello@mechtygroup.ru"
              className="font-mono text-[11px] text-[#EDE6D8] block hover:text-[#B8956A] transition-colors"
            >
              hello@mechtygroup.ru
            </a>
          </div>

        </div>

        {/* Footer Base Legal details row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[#8B8478] text-[10px] text-center sm:text-left">
          <span>© 2009–2026 ГК «Все начинается с Мечты». Все права защищены законом РФ.</span>
          <div className="flex gap-4">
            <a href="#contacts" className="hover:text-[#B8956A] transition-colors">Политика конфиденциальности</a>
            <a href="#contacts" className="hover:text-[#B8956A] transition-colors">Согласие на обработку ПД</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
