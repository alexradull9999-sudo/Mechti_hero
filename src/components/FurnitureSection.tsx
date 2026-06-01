import React from 'react';
import { ShieldCheck, Layers, Hammer, Settings, Wrench, FileText } from 'lucide-react';

interface FurnitureSectionProps {
  onScrollToSection?: (id: string) => void;
  onOpenConsultation?: (customMessage?: string, customTitle?: string, customDesc?: string) => void;
}

export default function FurnitureSection({ onScrollToSection, onOpenConsultation }: FurnitureSectionProps) {
  const guarantees = [
    {
      icon: <Layers size={18} className="text-[#8B6F4E]" />,
      title: "Индивидуальная комплектация и премиальные материалы",
      desc: "Индивидуальная расстановка каждой детали созданного проекта — от мебели до чашек, ложек, цветов и предметов искусства. Премиальные материалы: дерево, ткань, кожа, металл, камень. Топовые мировые бренды мебели и предметов интерьера — Minotti, Poltrona Frau, B&B Italia, Cassina, Flexform и другие."
    },
    {
      icon: <Layers size={18} className="text-[#8B6F4E]" />,
      title: "Текстильное оформление окон под ключ",
      desc: "Изготовление и навеска текстиля: шторы день-ночь, тюль, портьеры с эффектом Black Out (100% затемнение для спален), качественные декоративные карнизы по размерам помещений."
    },
    {
      icon: <Hammer size={18} className="text-[#8B6F4E]" />,
      title: "Усиленная жесткость корпусов",
      desc: "Каждая секция собирается методом шкант-стяжка с задними стенками в пазах для максимальной устойчивости шкафов."
    },
    {
      icon: <Wrench size={18} className="text-[#8B6F4E]" />,
      title: "Высококлассная сборка",
      desc: "Сбору ведут штатные мастера завода на скрытые немецкие мебельные стяжки Hettich, сохраняя идеальные зазоры."
    },
    {
      icon: <ShieldCheck size={18} className="text-[#8B6F4E]" />,
      title: "Пожизненная гарантия на фурнитуру",
      desc: "Мы работаем напрямую с лидерами европейского рынка Blum и Hettich. Действует расширенная пожизненная гарантия на все доводчики, петли и выдвижные системы."
    }
  ];

  return (
    <section id="furniture-section" className="bg-[#F5F1EA] text-[#1A1A1A] py-24 md:py-36 border-b border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back navigation button */}
        {onScrollToSection && (
          <button
            onClick={() => onScrollToSection('directions')}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold text-[#8B6F4E] hover:text-[#1A1A1A] transition-colors mb-8 cursor-pointer bg-transparent border-none p-0 inline-flex"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Назад к направлениям
          </button>
        )}
        
        {/* Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual copy & images */}
          <div className="lg:col-span-6 space-y-6">
          <span className="text-sm uppercase font-sans tracking-[0.2em] text-[#8B6F4E] font-bold block">
            НАПРАВЛЕНИЕ КОМПЛЕКТАЦИЯ
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
            Комплектация по эскизам,<br />
            <span className="italic text-[#8B6F4E]">строго в размер стен</span>
          </h2>
          <p className="text-base md:text-lg text-[#322F2A] font-sans font-normal leading-relaxed">
            Главная боль меблировки на заказ — несовпадение зазоров со строительными порталами. Собственное производство в Подмосковье синхронизирует замеры на этапе оштукатуривания. Разрабатываем кухни, гардеробы, комоды и мягкие диваны в едином стилевом ключе куратора проекта. Передача готового объекта, полностью готового для жизни.
          </p>

          {onOpenConsultation && (
            <button
              onClick={() => onOpenConsultation(
                'Заявка на получение презентации мебели и каталога Комплектации.',
                'Получить презентацию комплектации',
                'Заполните форму, чтобы получить полную презентацию премиум-мебели, кухонь и гардеробов от нашего мебельного цеха.'
              )}
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#1A1A1A] hover:bg-[#8B6F4E] text-white hover:text-[#EDE6D8] font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md cursor-pointer rounded-none"
            >
                <FileText size={14} className="animate-pulse" />
                <span>Посмотреть презентацию мебели</span>
              </button>
            )}

            <div className="relative h-[380px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                alt="Mechty Factory Cabinetry Finish"
                className="w-full h-full object-cover shadow-lg"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0F0F0F]/15" />
            </div>
          </div>

          {/* Right Column: 5 Point guarantees list */}
          <div className="lg:col-span-6 space-y-8 bg-[#EDE6D8] p-6 md:p-10 border border-[#B8956A]/30 shadow-md">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1A1A1A]">
                Стандарты нашего производства
              </h3>
              <p className="text-sm text-[#4E473F] uppercase tracking-wider font-sans font-bold block">
                5 уровней качества мебельного цеха
              </p>
            </div>
            
            <div className="space-y-6">
              {guarantees.map((g, i) => (
                <div key={i} className="flex gap-4 items-start border-b border-[#1A1A1A]/10 pb-4 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center shrink-0">
                    {g.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans text-base md:text-lg font-bold text-[#1A1A1A]">
                      {g.title}
                    </h4>
                    <p className="text-sm text-[#3E3A35] font-sans font-normal leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
