import React, { useState, useEffect } from 'react';
import { MapPin, Building, Key } from 'lucide-react';
import { CatalogObject } from '../types';

const initialCatalogObjects: CatalogObject[] = [
  {
    id: "61371781dd3aba13ffd87ddda7c9e377",
    title: "Дизайнерский пентхаус в ЖК Carré Blanc (Карре Бланк)",
    complex: "Carré Blanc",
    city: "Москва",
    area_m2: 538,
    floor: "5",
    price_rub: 3766700000,
    rooms: 5,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/61371781dd3aba13ffd87ddda7c9e377?width=800&height=600"
  },
  {
    id: "80a902b709dfd9c8920763eb046059a3",
    title: "Пентхаус в ЖК Carré Blanc (Карре Бланк)",
    complex: "Carré Blanc",
    city: "Москва",
    area_m2: 286,
    floor: "4",
    price_rub: 1998500000,
    rooms: 4,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/80a902b709dfd9c8920763eb046059a3?width=800&height=600"
  },
  {
    id: "cb07d5615ecd6b9cd932c0249170d23a",
    title: "ЖК «Клубный дом TURGENEV (Тургенев)»",
    complex: "TURGENEV",
    city: "Москва",
    area_m2: 450,
    floor: "3",
    price_rub: 1450000000,
    rooms: 5,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/cb07d5615ecd6b9cd932c0249170d23a?width=800&height=600"
  },
  {
    id: "cde55e9ae6ea308ded14e008b681b464",
    title: "Двухэтажный пентхаус с террасой в ЖК «Cooper house (Купер Хаус)»",
    complex: "Cooper house",
    city: "Москва",
    area_m2: 430,
    floor: "5",
    price_rub: 944000000,
    rooms: 5,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/cde55e9ae6ea308ded14e008b681b464?width=800&height=600"
  },
  {
    id: "ef3c0d804e1fc0d3f60f9a9090a1241d",
    title: "4-комнатная квартира в ЖК \"Садовые кварталы\"",
    complex: "Садовые кварталы",
    city: "Москва",
    area_m2: 170,
    floor: "4",
    price_rub: 600000000,
    rooms: 4,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/ef3c0d804e1fc0d3f60f9a9090a1241d?width=800&height=600"
  },
  {
    id: "05131e7e366e211566d36a4d7859d244",
    title: "5-комнатная квартира в ЖК \"Садовые Кварталы\"",
    complex: "Садовые кварталы",
    city: "Москва",
    area_m2: 213,
    floor: "3",
    price_rub: 600000000,
    rooms: 5,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/05131e7e366e211566d36a4d7859d244?width=800&height=600"
  },
  {
    id: "6728f7f72e397076ef2453247130a25d",
    title: "Видовой двухуровневый пентхаус в ЖК «Садовые Кварталы»",
    complex: "Садовые кварталы",
    city: "Москва",
    area_m2: 238.8,
    floor: "5",
    price_rub: 573000000,
    rooms: 4,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/6728f7f72e397076ef2453247130a25d?width=800&height=600"
  },
  {
    id: "c7f59fb7205e12f5979f1fcf2081cd09",
    title: "ЖК Золотой 162.7 готовый",
    complex: "ЖК Золотой",
    city: "Москва",
    area_m2: 162.7,
    floor: "2",
    price_rub: 495000000,
    rooms: 3,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/c7f59fb7205e12f5979f1fcf2081cd09?width=800&height=600"
  },
  {
    id: "d7f90df5bcda29cff5744a1e231cddb9",
    title: "Евро-4 комнатная в ЖК \"Вишневый сад\"",
    complex: "ЖК Вишневый сад",
    city: "Москва",
    area_m2: 190.7,
    floor: "3",
    price_rub: 450000000,
    rooms: 4,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/d7f90df5bcda29cff5744a1e231cddb9?width=800&height=600"
  },
  {
    id: "01137e329dca2874d7f12b5a644f2741",
    title: "ЖК «Литератор»",
    complex: "ЖК Литератор",
    city: "Москва",
    area_m2: 204,
    floor: "4",
    price_rub: 450000000,
    rooms: 4,
    url: "",
    type: undefined,
    image: "https://api.gk-mechti.ru/api/image/01137e329dca2874d7f12b5a644f2741?width=800&height=600"
  }
];

interface CatalogSectionProps {
  onOpenConsultation: (msg: string) => void;
}

export default function CatalogSection({ onOpenConsultation }: CatalogSectionProps) {
  const [catalogObjects, setCatalogObjects] = useState<CatalogObject[]>(initialCatalogObjects);
  const [activeSegment, setActiveSegment] = useState<string>("all");

  useEffect(() => {
    fetch('/catalog.json')
      .then(res => {
        if (!res.ok) throw new Error('Dynamic catalog could not be fetched');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          // Normalize objects to ensure image fallback is populated if missing
          const normalized = data.map(obj => ({
            ...obj,
            image: obj.image || (obj.id ? `https://api.gk-mechti.ru/api/image/${obj.id}?width=800&height=600` : undefined)
          }));
          setCatalogObjects(normalized);
        }
      })
      .catch(err => {
        console.warn('Could not load dynamic /catalog.json, falling back to static seeds. Details:', err);
      });
  }, []);

  const segments = [
    { id: "all", name: "Все объекты", icon: <Building size={14} /> },
    { id: "apartment", name: "Квартиры", icon: <Building size={14} /> },
    { id: "penthouse", name: "Пентхаусы", icon: <Building size={14} /> },
    { id: "clubhouse", name: "Клубные дома", icon: <Key size={14} /> },
  ];

  const filteredObjects = catalogObjects.filter(obj => {
    const isHouse = obj.type === 'house' || obj.complex?.toLowerCase().includes('клубный') || obj.title?.toLowerCase().includes('клубный');
    const isPenthouse = !isHouse && obj.rooms >= 4;
    const isApartment = !isHouse && !isPenthouse;

    if (activeSegment === "all") return true;
    if (activeSegment === "apartment") return isApartment;
    if (activeSegment === "penthouse") return isPenthouse;
    if (activeSegment === "clubhouse") return isHouse;
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
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#B8956A]/30">
                {/* Для объектов без фото или если фото не загрузилось — на фоне крупная буква комплекса */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-serif text-[120px] font-thin text-[#B8956A]/15 select-none">
                    {obj.complex?.[0] || obj.city?.[0] || 'M'}
                  </span>
                </div>

                <img
                  src={`/catalog/${obj.id}.jpg`}
                  alt={obj.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Если URL не открылся — скрываем img, остаётся градиент с буквой
                    e.currentTarget.style.display = 'none';
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Тонкий тёмный градиент снизу для читаемости тегов */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Тег типа объекта сверху-слева */}
                <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.3em] text-[#B8956A] bg-[#0F0F0F]/60 backdrop-blur-sm px-3 py-1.5 border border-[#B8956A]/30">
                  {obj.type === 'house' ? 'Дом' : (obj.rooms >= 4 ? 'Пентхаус' : 'Квартира')}
                </span>

                {/* Город снизу-справа */}
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/70">
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
                    <span className="text-xs font-sans font-medium text-[#F5F1EA] whitespace-nowrap">
                      {obj.area_m2 ? `${obj.area_m2} м²` : (obj as any).area || ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[9px] uppercase font-sans tracking-wider text-[#A8A196] font-medium shrink-0">Стоимость</span>
                    <span className="text-xs font-mono text-[#B8956A] font-semibold whitespace-nowrap">
                      {obj.price_rub ? `${obj.price_rub.toLocaleString('ru-RU')} ₽` : (obj as any).price || ''}
                    </span>
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
