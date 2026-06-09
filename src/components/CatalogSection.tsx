import React, { useState } from 'react';
import { MapPin, Building, Key } from 'lucide-react';

interface CatalogItem {
  id: string; // Hash used for image file naming and API fallback URL
  title: string;
  complex: string;
  city: string;
  area: string;
  price: string;
  badge: string;
}

const catalogObjects: CatalogItem[] = [
  {
    id: "61371781dd3aba13ffd87ddda7c9e377",
    title: "Дизайнерский пентхаус в ЖК Carré Blanc (Карре Бланк)",
    complex: "Carré Blanc",
    city: "Москва",
    area: "538 м²",
    price: "3 766 700 000 ₽",
    badge: "Пентхаус"
  },
  {
    id: "80a902b709dfd9c8920763eb046059a3",
    title: "Пентхаус в ЖК Carré Blanc (Карре Бланк)",
    complex: "Carré Blanc",
    city: "Москва",
    area: "286 м²",
    price: "1 998 500 000 ₽",
    badge: "Пентхаус"
  },
  {
    id: "cb07d5615ecd6b9cd932c0249170d23a",
    title: "ЖК «Клубный дом TURGENEV (Тургенев)»",
    complex: "TURGENEV",
    city: "Москва",
    area: "450 м²",
    price: "1 450 000 000 ₽",
    badge: "Клубный дом"
  },
  {
    id: "cde55e9ae6ea308ded14e008b681b464",
    title: "Двухэтажный пентхаус с террасой в ЖК «Cooper house (Купер Хаус)»",
    complex: "Cooper house",
    city: "Москва",
    area: "430 м²",
    price: "944 000 000 ₽",
    badge: "Пентхаус"
  },
  {
    id: "ef3c0d804e1fc0d3f60f9a9090a1241d",
    title: "4-комнатная квартира в ЖК \"Садовые кварталы\"",
    complex: "Садовые кварталы",
    city: "Москва",
    area: "170 м²",
    price: "600 000 000 ₽",
    badge: "Квартира"
  },
  {
    id: "05131e7e366e211566d36a4d7859d244",
    title: "5-комнатная квартира в ЖК \"Садовые Кварталы\"",
    complex: "Садовые кварталы",
    city: "Москва",
    area: "213 м²",
    price: "600 000 000 ₽",
    badge: "Квартира"
  },
  {
    id: "6728f7f72e397076ef2453247130a25d",
    title: "Видовой двухуровневый пентхаус в ЖК «Садовые Кварталы»",
    complex: "Садовые кварталы",
    city: "Москва",
    area: "238.8 м²",
    price: "573 000 000 ₽",
    badge: "Пентхаус"
  },
  {
    id: "c7f59fb7205e12f5979f1fcf2081cd09",
    title: "ЖК Золотой 162.7 готовый",
    complex: "ЖК Золотой",
    city: "Москва",
    area: "162.7 м²",
    price: "495 000 000 ₽",
    badge: "Клубный дом"
  },
  {
    id: "d7f90df5bcda29cff5744a1e231cddb9",
    title: "Евро-4 комнатная в ЖК \"Вишневый сад\"",
    complex: "ЖК Вишневый сад",
    city: "Москва",
    area: "190.7 м²",
    price: "450 000 000 ₽",
    badge: "Квартира"
  },
  {
    id: "01137e329dca2874d7f12b5a644f2741",
    title: "ЖК «Литератор»",
    complex: "ЖК Литератор",
    city: "Москва",
    area: "204 м²",
    price: "450 000 000 ₽",
    badge: "Клубный дом"
  }
];

interface CatalogSectionProps {
  onOpenConsultation: (msg: string) => void;
}

export default function CatalogSection({ onOpenConsultation }: CatalogSectionProps) {
  const [activeSegment, setActiveSegment] = useState<string>("all");

  const segments = [
    { id: "all", name: "Все объекты", icon: <Building size={14} /> },
    { id: "apartment", name: "Квартиры", icon: <Building size={14} /> },
    { id: "penthouse", name: "Пентхаусы", icon: <Building size={14} /> },
    { id: "clubhouse", name: "Клубные дома", icon: <Key size={14} /> },
  ];

  const filteredObjects = catalogObjects.filter(obj => {
    if (activeSegment === "all") return true;
    if (activeSegment === "apartment") return obj.badge === "Квартира";
    if (activeSegment === "penthouse") return obj.badge === "Пентхаус";
    if (activeSegment === "clubhouse") return obj.badge === "Клубный дом";
    return true;
  });

  return (
    <section id="catalog-showcase" className="bg-[#0F0F0F] text-[#F5F1EA] py-24 md:py-32 border-b border-[#B8956A]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-sm uppercase font-sans tracking-[0.2em] text-[#B8956A] font-semibold block mb-2">
            КАТАЛОГ ОБЪЕКТОВ С САЙТА
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light">
            Каталог предложений <span className="italic text-[#B8956A]">с официального сайта</span>
          </h2>
        </div>

        {/* Categories Tab Pill bar */}
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-[#B8956A]/15">
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredObjects.map((obj) => (
            <div
              key={obj.id}
              onClick={() => onOpenConsultation(`Здравствуйте! Меня интересует объект из каталога: "${obj.title}". Хочу получить презентацию.`)}
              className="group cursor-pointer bg-[#1A1A1A] border border-[#B8956A]/15 relative overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Photo section */}
              <div 
                className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#B8956A]/20"
              >
                <img
                  src={`/catalog/${obj.id}.jpg`}
                  alt={obj.title}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    // Если локальное фото не загрузилось — пробуем с API старого сайта
                    if (!img.dataset.fallbackState) {
                      img.dataset.fallbackState = 'api';
                      img.src = `https://api.gk-mechti.ru/api/image/${obj.id}`;
                    } else if (img.dataset.fallbackState === 'api') {
                      // Если и API не загрузился — пробуем с placeholder
                      img.dataset.fallbackState = 'placeholder';
                      img.src = '/catalog/placeholder.jpg';
                    } else {
                      // Если и placeholder не загрузился — скрываем картинку, оставляем градиент
                      img.style.display = 'none';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Лейбл-комплекс остаётся видимым даже без фото */}
                <span className="absolute top-3 left-3 bg-[#0F0F0F]/95 border border-[#B8956A]/45 text-[#B8956A] text-[10px] uppercase tracking-widest px-2.5 py-1.5 font-sans font-medium">
                  {obj.complex || obj.city}
                </span>
                
                {/* Город в правом нижнем углу */}
                <span className="absolute bottom-3 right-3 bg-[#0F0F0F]/85 text-[#C4BEB3] text-[9px] uppercase tracking-widest px-2 py-1 font-sans">
                  {obj.city}
                </span>
              </div>

              {/* Data section */}
              <div className="p-5 space-y-4 relative z-10 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-base text-[#F5F1EA] group-hover:text-[#B8956A] transition-colors leading-snug font-light line-clamp-2">
                    {obj.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#C4BEB3] font-sans">
                    <MapPin size={11} className="text-[#B8956A] shrink-0" />
                    <span className="truncate">{obj.complex}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#B8956A]/10 space-y-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[9px] uppercase font-sans tracking-wider text-[#A8A196] font-medium shrink-0">Площадь</span>
                    <span className="text-xs font-sans font-medium text-[#F5F1EA] whitespace-nowrap">{obj.area}</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[9px] uppercase font-sans tracking-wider text-[#A8A196] font-medium shrink-0">Стоимость</span>
                    <span className="text-xs font-mono text-[#B8956A] font-semibold whitespace-nowrap">{obj.price}</span>
                  </div>
                </div>
              </div>

              {/* Hover highlight bar */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B8956A] scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
