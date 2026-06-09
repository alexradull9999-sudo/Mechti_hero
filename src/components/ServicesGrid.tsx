import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ServicesGridProps {
  onScrollToSection: (id: string) => void;
}

export default function ServicesGrid({ onScrollToSection }: ServicesGridProps) {
  const directions = [
    {
      id: "ds-real-estate",
      num: "01",
      title: "Подбор и строительство объекта",
      description: "Персональный подбор премиального жилья в Москве (новостройки, элитная вторичка, усадьбы). Доступ к закрытым сделкам вне открытого рынка.",
      image: "/site-images/photo-1600607687939-ce8a6c25118c.jpg",
      targetId: "real-estate"
    },
    {
      id: "ds-design",
      num: "02",
      title: "Дизайн",
      description: "Авторские дизайн-проекты от концептуального 3D-моделирования до полной рабочей документации, инженерных схем и ведомостей комплектации.",
      image: "/site-images/photo-1618219908412-a29a1bb7b86e.jpg",
      targetId: "design-section"
    },
    {
      id: "ds-renovations",
      num: "03",
      title: "Ремонт",
      description: "Премиальная строительная реализация. Фиксированная смета, еженедельный фотоотчет в ERP, авторский и технический надзор.",
      image: "/site-images/photo-1613490493576-7fde63acd811.jpg",
      targetId: "renovation-section"
    },
    {
      id: "ds-furniture",
      num: "04",
      title: "Комплектация",
      description: "Полная комплектация по мебели, работа с премиальными брендами. Индивидуальный подбор кухонь, премиальных гардеробов и декорирование.",
      image: "/site-images/photo-1538688525198-9b88f6f53126.jpg",
      targetId: "furniture-section"
    }
  ];

  return (
    <section id="directions" className="bg-[#0F0F0F] pt-12 pb-24 md:pt-16 md:pb-36 relative border-b border-[#B8956A]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-[#B8956A] block">
              МЫ ОБЪЕДИНЯЕМ ВСЕ СТАДИИ
            </span>
            <h2 className="font-serif text-4xl md:text-7xl font-light text-[#F5F1EA]">
              Четыре направления <br />
              <span className="italic font-light text-[#B8956A]">экосистемы</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm md:text-base text-[#8B8478] font-sans font-light leading-relaxed">
              Вы взаимодействуете с одной компанией и личным менеджером на каждом этапе. От подбора/строительства объекта до дизайна, ремонта, комплектации и передачи ключей.
            </p>
          </div>
        </div>
      </div>

      {/* Grid container with 2x2 cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {directions.map((dir) => (
            <div
              key={dir.id}
              onClick={() => onScrollToSection(dir.targetId)}
              className="relative h-[450px] overflow-hidden group cursor-pointer border border-[#B8956A]/10 bg-[#1A1A1A]"
            >
              {/* Image with zoom element */}
              <div className="absolute inset-0">
                <img
                  src={dir.image}
                  alt={dir.title}
                  className="w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-[0.8s] ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Visual shade grad */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-[#0F0F0F]/40" />
              </div>

              {/* Card Label and Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                {/* ID number */}
                <span className="font-serif text-4xl md:text-5xl text-[#B8956A]/60 group-hover:text-[#B8956A] transition-colors duration-500 font-light">
                  {dir.num}
                </span>

                {/* Text and Actions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-between">
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-[#F5F1EA]">
                      {dir.title}
                    </h3>
                    <div className="w-10 h-10 border border-[#B8956A]/30 rounded-full flex items-center justify-center text-[#B8956A] group-hover:bg-[#B8956A] group-hover:text-[#0F0F0F] transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-[#8B8478] font-sans font-light leading-relaxed max-w-sm">
                    {dir.description}
                  </p>
                </div>
              </div>

              {/* Bottom Gold Indicator bar */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B8956A] transition-all duration-700 ease-out group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
