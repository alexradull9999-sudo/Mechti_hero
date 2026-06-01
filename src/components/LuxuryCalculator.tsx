import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Check, Info, Calendar, Shield, Sparkles, Building, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LuxuryCalculatorProps {
  onOpenConsultation: (customMessage?: string) => void;
}

type FormatService = 'podTapochki' | 'poChastyam';

export type CategoryKey = 
  | 'design' 
  // Section II: Construction Works
  | 'const_demolition'
  | 'const_walls'
  | 'const_noise'
  | 'const_screed'
  | 'const_plaster'
  | 'const_painting'
  | 'const_cladding'
  | 'const_flooring'
  | 'const_electric_rough'
  | 'const_electric_fine'
  | 'const_plumbing_rough'
  | 'const_plumbing_fine'
  | 'const_climate'
  | 'const_doors_fine'
  | 'const_furniture_assembly'
  | 'const_cleaning'
  // Sections III - VI
  | 'finishMaterials' | 'decorElements' | 'doorsWindows'
  | 'climate' | 'electricLighting' | 'plumbing'
  | 'kitchen' | 'cabinet' | 'softFurniture'
  | 'appliances' | 'textile' | 'delivery' | 'waste_cleaning'
  // House categories
  | 'house_arch'
  | 'house_foundation'
  | 'house_walls'
  | 'house_facade'
  | 'house_fence'
  | 'house_boil'
  | 'house_sept'
  | 'house_electric'
  | 'house_climate'
  | 'house_landscape'
  | 'house_paving'
  | 'house_irrigation'
  | 'house_windows'
  | 'house_interior'
  | 'house_kitchen';

interface Section {
  id: string;
  num: string;
  title: string;
  displayName: string;
  tooltip: string;
  subtitle?: string;
  categories: {
    key: CategoryKey;
    title: string;
    description: string;
    rate: number;
  }[];
}

const SECTIONS_APARTMENT: Section[] = [
  {
    id: 'sec-design',
    num: 'I',
    title: 'ДИЗАЙН',
    displayName: 'Дизайн',
    tooltip: 'Эксклюзивный дизайн-проект под руководством ведущего архитектора, авторский надзор и полное сопровождение.',
    subtitle: 'Акция: при заказе последующего ремонта предоставляется скидка на ремонт в размере 100% стоимости проекта!',
    categories: [
      {
        key: 'design',
        title: 'Дизайн-проект «Всё включено»',
        description: 'Эскизный и рабочий проект интерьера: планировка, 3D-визуализация, рабочая документация, авторский надзор. На основе эскизного проекта инженеры разрабатывают рабочую документацию по вентиляции, сантехнике и электрике — это включено в стоимость авторского дизайн-проекта „Всё включено". На этапе разработки вносится до 5 итераций изменений. Точное техническое задание снимаем на старте, поэтому в концепцию попадаем со 2-й итерации — это следствие нашей системы этапности, а не везения.',
        rate: 7500,
      }
    ]
  },
  {
    id: 'sec-construction',
    num: 'II',
    title: 'СТРОИТЕЛЬНЫЕ РАБОТЫ',
    displayName: 'Строительные работы',
    tooltip: 'Капитальные работы премиального уровня: строгий контроль СНиП, сертифицированная инженерия и подготовка поверхностей.',
    subtitle: 'Все работы выполняются по СНиПам и ГОСТам. Стандарт качества малярных и шумоизоляционных работ — не ниже Q3 (Q4 — по запросу, дополнительная стоимость).',
    categories: [
      {
        key: 'const_demolition',
        title: 'Демонтаж конструкций и подготовка',
        description: 'Безопасный демонтаж перегородок, стяжки, очистка перекрытий и вывоз мусора',
        rate: 4000,
      },
      {
        key: 'const_walls',
        title: 'Возведение перегородок (ГКЛ, пеноблок)',
        description: 'Монтаж перегородок с соблюдением геометрии и армирования',
        rate: 5500,
      },
      {
        key: 'const_noise',
        title: 'Шумоизоляция стен и перекрытий',
        description: 'Шумоизоляция стен, потолков и перекрытий — современные многослойные системы с подтверждённым акустическим эффектом, соответствуют ГОСТ.',
        rate: 4200,
      },
      {
        key: 'const_screed',
        title: 'Стяжка пола (черновая + финишная)',
        description: 'Заливка ровной базы под укладку чистовых напольных покрытий',
        rate: 3500,
      },
      {
        key: 'const_plaster',
        title: 'Штукатурные работы по стенам',
        description: 'Выравнивание геометрии стен по маякам с точностью до миллиметра под Q3',
        rate: 7200,
      },
      {
        key: 'const_painting',
        title: 'Малярные работы (стандарт Q3+)',
        description: 'Подготовка под покраску, поклейка стеклохолста, многослойное шпатлевание',
        rate: 14300,
      },
      {
        key: 'const_cladding',
        title: 'Облицовка стен (керамогранит, камень)',
        description: 'Высокоточная укладка крупноформатных плит премиум-материалов',
        rate: 9800,
      },
      {
        key: 'const_flooring',
        title: 'Укладка инженерной доски и покрытий',
        description: 'Монтаж деревянных полов на клей/подложку по технологии без порогов',
        rate: 5400,
      },
      {
        key: 'const_electric_rough',
        title: 'Электромонтаж черновой (штробление, прокладка)',
        description: 'Прокладка сертифицированных кабелей в гофре, монтаж подрозетников',
        rate: 7500,
      },
      {
        key: 'const_electric_fine',
        title: 'Электромонтаж чистовой (розетки, выключатели)',
        description: 'Установка выключателей, розеток, механизмов управления и подсветки',
        rate: 3200,
      },
      {
        key: 'const_plumbing_rough',
        title: 'Сантехнические работы черновые (разводка ГВ/ХВ/канализация)',
        description: 'Монтаж коллекторных узлов, труб Rehau, Uponor, и другие проверенные европейские системы, фильтров тонкой очистки',
        rate: 7500,
      },
      {
        key: 'const_plumbing_fine',
        title: 'Сантехнические работы чистовые (монтаж сантехники)',
        description: 'Установка и подключение инсталляций, смесителей, ванны, раковины',
        rate: 3500,
      },
      {
        key: 'const_climate',
        title: 'Монтаж климатических систем (вентиляция, кондиционирование)',
        description: 'Прокладка трасс, установка внутренних блоков, приточных адаптеров',
        rate: 7200,
      },
      {
        key: 'const_doors_fine',
        title: 'Установка дверей и фурнитуры',
        description: 'Монтаж скрытых коробов инвизибл, петель и ручек на финишном этапе',
        rate: 2500,
      },
      {
        key: 'const_furniture_assembly',
        title: 'Сборка и монтаж мебели',
        description: 'Профессиональная сборка сложных встроенных шкафов, кухонь, стеновых панелей',
        rate: 8300,
      },
      {
        key: 'const_cleaning',
        title: 'Финальный клининг и сдача под ключ',
        description: 'Профессиональная обеспыливающая уборка перед заселением',
        rate: 1000,
      }
    ]
  },
  {
    id: 'sec-materials',
    num: 'III',
    title: 'МАТЕРИАЛЫ И КОНСТРУКЦИИ',
    displayName: 'Материалы и конструкции',
    tooltip: 'Комплектация премиальными финишными материалами, межкомнатными скрытыми дверьми и авторским декором стен.',
    categories: [
      {
        key: 'finishMaterials',
        title: 'Чистовые материалы',
        description: 'Керамогранит крупноформатный, инженерная доска премиум (грунт + подложка), износостойкая краска стен и потолков. Гипсокартонные потолки, парящие потолки со скрытой подсветкой.',
        rate: 35400,
      },
      {
        key: 'decorElements',
        title: 'Декоративные элементы',
        description: 'Декоративные стеновые панели под дизайн-проект, плинтус скрытого монтажа, молдинги, пробковый компенсатор',
        rate: 10500,
      },
      {
        key: 'doorsWindows',
        title: 'Двери и подоконники',
        description: 'Входная дверь с электрозамком, межкомнатные двери скрытого монтажа, подоконники премиум, фурнитура',
        rate: 12300,
      }
    ]
  },
  {
    id: 'sec-equipment',
    num: 'IV',
    title: 'ИНЖЕНЕРНОЕ ОБОРУДОВАНИЕ',
    displayName: 'Инженерное оборудование',
    tooltip: 'Профессиональное сертифицированное оборудование систем климата, вентиляции, очистки воды и премиум сантехника.',
    categories: [
      {
        key: 'climate',
        title: 'Климат и отопление',
        description: 'Тёплый пол, канальное кондиционирование, приточно-вытяжная вентиляция, увлажнение воздуха и приточная вентиляция с сапфировыми распылителями канального типа — поддержание оптимальной влажности 40-60% во всех помещениях для здоровья жителей и сохранности отделки, дизайнерские радиаторы',
        rate: 31200,
      },
      {
        key: 'electricLighting',
        title: 'Электрика и освещение',
        description: 'Шинопровод и трековые светильники, точечные светильники, дизайнерские люстры, розетки и выключатели JUNG, Berker, и другие премиальные европейские бренды, электрокарнизы',
        rate: 15600,
      },
      {
        key: 'plumbing',
        title: 'Сантехника и оборудование ванных',
        description: 'Villeroy & Boch, Laufen, Antonio Lupi, Grohe, Hansgrohe, Boheme и другие премиальные бренды: душевые комплекты, ванна, унитазы с инсталляцией, смесители, аксессуары',
        rate: 11400,
      }
    ]
  },
  {
    id: 'sec-furniture',
    num: 'V',
    title: 'МЕБЕЛЬ',
    displayName: 'Мебель',
    tooltip: 'Индивидуальное производство мебели любой сложности от фабрики Комплектация Мечты.',
    subtitle: 'Вся мебель — собственного производства Комплектация Мечты. Индивидуальные проекты, гарантия на инновационные механизмы Blum и Hettich.',
    categories: [
      {
        key: 'kitchen',
        title: 'Кухонный гарнитур со столешницей',
        description: 'Гарнитур собственного производства, столешница и фартук из кварца, скрытая европейская фурнитура Blum / Hettich',
        rate: 28400,
      },
      {
        key: 'cabinet',
        title: 'Корпусная мебель и гардеробные',
        description: 'Используем антивандальные австрийские плиты Egger (класс эмиссии E1), премиальный влагостойкий МДФ, шпон редких пород дерева, жидкий металл, декоративные покрытия любой сложности под индивидуальный дизайн-проект.',
        rate: 49600,
      },
      {
        key: 'softFurniture',
        title: 'Мягкая мебель и спальни',
        description: 'Диваны, кресла, кровати с изголовьем, прикроватные тумбы, матрасы премиум, постельное бельё',
        rate: 14000,
      }
    ]
  },
  {
    id: 'sec-complectation',
    num: 'VI',
    title: 'КОМПЛЕКТАЦИЯ И ДОСТАВКА',
    displayName: 'Комплектация и доставка',
    tooltip: 'Снабжение объекта премиальной техникой, интерьерным текстилем, полная логистика, сборка и монтаж мебели.',
    categories: [
      {
        key: 'appliances',
        title: 'Бытовая техника премиум-брендов',
        description: 'Asko, Liebherr, Elica, Omoikiri, премиальные бренды: кухонные приборы, встраиваемая техника, стиральная и сушильная машины, телевизионные панели, биокамин',
        rate: 15000,
      },
      {
        key: 'textile',
        title: 'Текстиль, шторы, декор',
        description: 'Шторы день-ночь, тюль, портьеры с эффектом Black Out (100% затемнение для спален), декоративные карнизы Эскар, пошив штор и тюль по всем комнатам, декор и авторские аксессуары, зеркала, ковры',
        rate: 10000,
      },
      {
        key: 'delivery',
        title: 'Доставка, сборка, монтаж',
        description: 'Логистика всего объёма, сборка и навеска мебели, вывоз строительного мусора',
        rate: 15000,
      },
      {
        key: 'waste_cleaning',
        title: 'Клининг и вывоз мусора',
        description: 'Постэтапная и финальная уборка, регулярный вывоз строительного мусора и упаковки на весь срок работ',
        rate: 1500,
      }
    ]
  }
];

const SECTIONS_HOUSE: Section[] = [
  {
    id: 'sec-arch',
    num: 'I',
    title: 'АРХИТЕКТУРА И ДИЗАЙН',
    displayName: 'Архитектура',
    tooltip: 'Индивидуальное архитектурно-строительное и интерьерное проектирование пассивной резиденции.',
    categories: [
      {
        key: 'house_arch',
        title: 'Индивидуальный проект резиденции',
        description: 'Разработка архитектурно-строительных решений (АР, КР), благоустройства, 3D визуализация фасадов и посадка дома на генплан.',
        rate: 9500,
      }
    ]
  },
  {
    id: 'sec-const-house',
    num: 'II',
    title: 'СТРОИТЕЛЬНЫЕ РАБОТЫ И КОРОБКА',
    displayName: 'Строительные работы',
    tooltip: 'Работы по возведению фундамента, несущих стен, плит перекрытий и кровли.',
    categories: [
      {
        key: 'house_foundation',
        title: 'Монолитный фундамент и плита',
        description: 'Анализ грунта, разметка, копка котлована, песчано-гравийная подготовка, двойной армированный каркас, заливка бетона М350.',
        rate: 18000,
      },
      {
        key: 'house_walls',
        title: 'Возведение стен и кровли',
        description: 'Кладка стен из керамических блоков, перекрытия, монтаж стропил, утепление кровли (250 мм) и укладка фальцевого клик-профиля.',
        rate: 24000,
      },
      {
        key: 'house_facade',
        title: 'Отделка фасада усадьбы',
        description: 'Премиальное утепление, облицовка клинкером, фиброцементом, декоративными вставками из натурального юрского известняка и термодерева.',
        rate: 16000,
      },
      {
        key: 'house_fence',
        title: 'Капитальный забор по периметру',
        description: 'Устройство фундаментной монолитной ленты, установка заборных столбов, калитки и откатных ворот с автоматикой Came.',
        rate: 9000,
      }
    ]
  },
  {
    id: 'sec-eng-house',
    num: 'III',
    title: 'ИНЖЕНЕРНЫЕ СЕТИ И КОТЕЛЬНАЯ',
    displayName: 'Инженерия',
    tooltip: 'Оборудование систем жизнеобеспечения дома, разводка труб и коммуникаций.',
    categories: [
      {
        key: 'house_boil',
        title: 'Отопление и профессиональная котельная',
        description: 'Установка премиального котла Viessmann/Buderus, монтаж бойлера, группы насосов, водяных теплых полов Rehau во всех зонах.',
        rate: 15000,
      },
      {
        key: 'house_sept',
        title: 'Скважина и автономная канализация',
        description: 'Бурение и обустройство скважины, монтаж кессона, установка станции биоочистки (септика) Топас/Астра и дренажного колодца.',
        rate: 12500,
      },
      {
        key: 'house_electric',
        title: 'Электромонтаж и заземление',
        description: 'ГОСТ-кабели, монтаж распределительных шкафов ABB/Legrand, силовой ввод, организация глубинного контура заземления и молниезащиты.',
        rate: 8500,
      },
      {
        key: 'house_climate',
        title: 'Канальный климат-контроль и вентиляция',
        description: 'Приточно-вытяжная вентиляция с рекуперацией тепла, очистка поступающего воздуха, увлажнение с сапфировыми распылителями.',
        rate: 11000,
      }
    ]
  },
  {
    id: 'sec-land-house',
    num: 'IV',
    title: 'ЛАНДШАФТНЫЙ ДИЗАЙН И БЛАГОУСТРОЙСТВО',
    displayName: 'Ландшафтный дизайн и благоустройство',
    tooltip: 'Организация придомовой территории, создание газона, автополив, въездные группы.',
    categories: [
      {
        key: 'house_landscape',
        title: 'Ландшафтное зонирование и планировка',
        description: 'Планировка отметок участка спецтехникой, укладка геотекстиля, засыпка плодородным грунтом, устройство дренажных лотков.',
        rate: 8000,
      },
      {
        key: 'house_paving',
        title: 'Гранитная брусчатка и газоны под ключ',
        description: 'Обустройство отмостки и дорожек, укладка гранитной плитки, настил рулонного газона премиум, посадка декоративных кустарников.',
        rate: 14000,
      },
      {
        key: 'house_irrigation',
        title: 'Автополив участка и освещение',
        description: 'Многозонный автоматический полив Hunter, монтаж накопительной емкости, установка световой ландшафтной LED подсветки дорожек.',
        rate: 7000,
      }
    ]
  },
  {
    id: 'sec-comp-house',
    num: 'V',
    title: 'ЧИСТОВАЯ КОМПЛЕКТАЦИЯ РЕЗИДЕНЦИИ',
    displayName: 'Чистовое благоустройство',
    tooltip: 'Премиальные окна, готовая отделка стен, монтаж мебели и бытовой техники под ключ.',
    categories: [
      {
        key: 'house_windows',
        title: 'Панорамное остекление Schüco',
        description: 'Энергосберегающий теплый алюминиевый профиль Schüco (Германия) с антибликовым напылением и скрытыми петлями.',
        rate: 22000,
      },
      {
        key: 'house_interior',
        title: 'Чистовые премиум материалы отделки',
        description: 'Потолочные системы, теневые швы, натуральный паркет шеврон, декоративная штукатурка, дизайнерский брендовый свет.',
        rate: 35000,
      },
      {
        key: 'house_kitchen',
        title: 'Топ-меблировка и техника «под тапочки»',
        description: 'Шкафы, гардеробные, кухонный гарнитур, премиальная техника Asko/Liebherr, пошив штор, авторский интерьерный декор.',
        rate: 55000,
      }
    ]
  }
];

// Helper to keep the custom rates list
const rates: Record<CategoryKey, number> = {
  design:           7500,
  const_demolition: 4000,
  const_walls:      5500,
  const_noise:      4200,
  const_screed:     3500,
  const_plaster:    7200,
  const_painting:   14300,
  const_cladding:   9800,
  const_flooring:   5400,
  const_electric_rough: 7500,
  const_electric_fine: 3200,
  const_plumbing_rough: 7500,
  const_plumbing_fine: 3500,
  const_climate:    7200,
  const_doors_fine: 2500,
  const_furniture_assembly: 8300,
  const_cleaning:   1000,
  finishMaterials:  35400,
  decorElements:    10500,
  doorsWindows:     12300,
  climate:          31200,
  electricLighting: 15600,
  plumbing:         11400,
  kitchen:          28400,
  cabinet:          49600,
  softFurniture:    14000,
  appliances:       15000,
  textile:          10000,
  delivery:         15000,
  waste_cleaning:   1500,
  house_arch:       9500,
  house_foundation: 18000,
  house_walls:      24000,
  house_facade:     16000,
  house_fence:      9000,
  house_boil:       15000,
  house_sept:       12500,
  house_electric:   8500,
  house_climate:    11000,
  house_landscape:  8000,
  house_paving:     14000,
  house_irrigation: 7000,
  house_windows:    22000,
  house_interior:   35000,
  house_kitchen:    55000,
};

// Custom smooth easeOutCubic animated price interpolator component
function AnimatedPrice({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number | null>(null);
  const startValueRef = useRef(value);
  const targetValueRef = useRef(value);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    targetValueRef.current = value;
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const duration = 400; // 0.4s glide transition

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing: easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValueRef.current + (targetValueRef.current - startValueRef.current) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [value]);

  const formatRubles = (val: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return <span>{formatRubles(displayValue)}</span>;
}

export default function LuxuryCalculator({ onOpenConsultation }: LuxuryCalculatorProps) {
  const [propertyType, setPropertyType] = useState<'apartment' | 'house'>('apartment');
  const [area, setArea] = useState<number>(150);
  const [format, setFormat] = useState<FormatService>('poChastyam');
  const [showFullMobileConfig, setShowFullMobileConfig] = useState<boolean>(false);
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  
  const [selectedCategories, setSelectedCategories] = useState<Record<CategoryKey, boolean>>({
    design: true,
    const_demolition: true,
    const_walls: true,
    const_noise: true,
    const_screed: true,
    const_plaster: true,
    const_painting: true,
    const_cladding: true,
    const_flooring: true,
    const_electric_rough: true,
    const_electric_fine: true,
    const_plumbing_rough: true,
    const_plumbing_fine: true,
    const_climate: true,
    const_doors_fine: true,
    const_furniture_assembly: true,
    const_cleaning: true,
    finishMaterials: true,
    decorElements: true,
    doorsWindows: true,
    climate: true,
    electricLighting: true,
    plumbing: true,
    kitchen: true,
    cabinet: true,
    softFurniture: true,
    appliances: true,
    textile: true,
    delivery: true,
    waste_cleaning: true,
    house_arch: true,
    house_foundation: true,
    house_walls: true,
    house_facade: true,
    house_fence: true,
    house_boil: true,
    house_sept: true,
    house_electric: true,
    house_climate: true,
    house_landscape: true,
    house_paving: true,
    house_irrigation: true,
    house_windows: true,
    house_interior: true,
    house_kitchen: true,
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'sec-design': true,
    'sec-construction': true,
    'sec-materials': true,
    'sec-equipment': true,
    'sec-furniture': true,
    'sec-complectation': true,
    'sec-arch': true,
    'sec-const-house': true,
    'sec-eng-house': true,
    'sec-land-house': true,
    'sec-comp-house': true,
  });

  const SECTIONS = useMemo(() => {
    return propertyType === 'apartment' ? SECTIONS_APARTMENT : SECTIONS_HOUSE;
  }, [propertyType]);

  // Handle responsive accordion initialization on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setExpandedSections({
        'sec-design': true,
        'sec-construction': false,
        'sec-materials': false,
        'sec-equipment': false,
        'sec-furniture': false,
        'sec-complectation': false,
        'sec-arch': true,
        'sec-const-house': false,
        'sec-eng-house': false,
         'sec-land-house': false,
         'sec-comp-house': false,
      });
    }
  }, []);

  // Update area range on propertyType changes
  useEffect(() => {
    if (propertyType === 'house') {
      if (area < 100) setArea(300);
    } else {
      if (area > 500) setArea(150);
    }
  }, [propertyType]);

  const totalSelectedCount = useMemo(() => {
    let count = 0;
    SECTIONS.forEach(sec => {
      sec.categories.forEach(cat => {
        if (selectedCategories[cat.key]) {
          count++;
        }
      });
    });
    return count;
  }, [SECTIONS, selectedCategories]);

  const handleSwitchToPodTapochki = () => {
    setFormat('podTapochki');
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSwitchToPoChastyam = () => {
    setFormat('poChastyam');
    setTimeout(() => {
      const element = document.getElementById('constructor-steps') || document.getElementById('sec-design') || document.getElementById('sec-arch');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleToggleCategory = (key: CategoryKey) => {
    if (format !== 'poChastyam') return;
    setSelectedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectAllInSection = (secId: string, value: boolean) => {
    if (format !== 'poChastyam') return;
    const section = SECTIONS.find(s => s.id === secId);
    if (!section) return;
    setSelectedCategories(prev => {
      const updated = { ...prev };
      section.categories.forEach(cat => {
        updated[cat.key] = value;
      });
      return updated;
    });
  };

  const toggleSectionExpanded = (secId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [secId]: !prev[secId]
    }));
  };

  // Cost calculation
  const subtotal = useMemo(() => {
    let sum = 0;
    SECTIONS.forEach(sec => {
      sec.categories.forEach(cat => {
        if (selectedCategories[cat.key]) {
          sum += cat.rate;
        }
      });
    });
    return area * sum;
  }, [area, selectedCategories, SECTIONS]);

  const agentFee = useMemo(() => {
    return subtotal * 0.0384;
  }, [subtotal]);

  const poChastyamTotal = useMemo(() => {
    return subtotal + agentFee;
  }, [subtotal, agentFee]);

  const podTapochkiTotal = useMemo(() => {
    const rate = propertyType === 'house' ? 450000 : 350000;
    return area * rate;
  }, [area, propertyType]);

  const dynamicTerm = useMemo(() => {
    if (propertyType === 'house') {
      if (area <= 300) return "10–12 месяцев";
      if (area <= 500) return "12–15 месяцев";
      return "15–18 месяцев";
    }
    if (area <= 80) return "6–8 месяцев";
    if (area <= 150) return "8–10 месяцев";
    if (area <= 250) return "10–12 месяцев";
    return "12–14 месяцев";
  }, [area, propertyType]);

  const activeTotal = format === 'podTapochki' ? podTapochkiTotal : poChastyamTotal;

  // Potential savings difference
  const potSavings = useMemo(() => {
    const activeRatesSum = SECTIONS.reduce((sum, sec) => {
      return sum + sec.categories.reduce((s, cat) => s + cat.rate, 0);
    }, 0);
    const fullPoChastyam = (area * activeRatesSum) * 1.0384;
    return Math.max(0, fullPoChastyam - podTapochkiTotal);
  }, [area, podTapochkiTotal, SECTIONS]);

  const formatTextNumber = (val: number) => {
    return new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 0,
    }).format(val) + " ₽";
  };

  const getSectionActiveStats = (section: Section) => {
    const total = section.categories.length;
    const active = section.categories.filter(cat => selectedCategories[cat.key]).length;
    const rateSum = section.categories
      .filter(cat => selectedCategories[cat.key])
      .reduce((sum, cat) => sum + cat.rate, 0);
    const cost = area * rateSum;
    return { total, active, cost };
  };

  const handleCTA = () => {
    let message = '';
    const typeLabel = propertyType === 'house' ? 'Загородный дом' : 'Квартира';
    if (format === 'podTapochki') {
      message = `Здравствуйте, прошу зафиксировать расчёт:\nТип недвижимости: ${typeLabel}\nТариф: Вариант под ключ\nПлощадь: ${area} м²\nСумма: ${formatTextNumber(activeTotal)}`;
    } else {
      const activeSectionNames = SECTIONS
        .filter(sec => sec.categories.some(cat => selectedCategories[cat.key]))
        .map(sec => sec.displayName)
        .join(', ');

      message = `Здравствуйте, прошу зафиксировать расчёт:\nТип недвижимости: ${typeLabel}\nТариф: Собрать по частям\nПлощадь: ${area} м²\nВключено категорий: ${totalSelectedCount} из ${propertyType === 'house' ? 15 : 30}\nРазделы: ${activeSectionNames || 'Не выбрано'}\nСумма: ${formatTextNumber(activeTotal)} (включая агентское сопровождение)`;
    }
    onOpenConsultation(message);
  };

  return (
    <section id="calculator" className="bg-[#1A1A1A] text-[#F5F1EA] py-24 md:py-36 relative overflow-clip border-b border-[#B8956A]/20 pb-32 md:pb-36">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#B8956A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#B8956A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-16 space-y-4">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-[#B8956A] block font-bold">
            ПРОЗРАЧНЫЙ БЮДЖЕТ ДО СТАРТА
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light">
            Калькулятор стоимости <span className="italic text-[#B8956A] font-light">проекта</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#B8956A]/40 mx-auto mt-4" />
          <p className="text-base md:text-lg text-[#C4BEB3] font-sans font-light leading-relaxed">
            Цена фиксируется в договоре и может быть изменена по соглашению сторон с учётом изменения объёмов или материалов.
          </p>
        </div>

        {/* Type selector (Квартира / Загородный дом) */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-[#0F0F0F] p-1 border border-[#B8956A]/20">
            <button
              onClick={() => setPropertyType('apartment')}
              className={`rounded-full px-6 py-2.5 text-xs uppercase tracking-widest font-sans font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                propertyType === 'apartment'
                  ? 'bg-[#B8956A] text-[#0F0F0F]'
                  : 'text-[#C4BEB3] hover:text-[#F5F1EA] bg-transparent'
              }`}
            >
              <Building size={14} />
              Квартира
            </button>
            <button
              onClick={() => setPropertyType('house')}
              className={`rounded-full px-6 py-2.5 text-xs uppercase tracking-widest font-sans font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                propertyType === 'house'
                  ? 'bg-[#B8956A] text-[#0F0F0F]'
                  : 'text-[#C4BEB3] hover:text-[#F5F1EA] bg-transparent'
              }`}
            >
              <Home size={14} />
              Загородный дом
            </button>
          </div>
        </div>

        {/* 12-Column Responsive Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Controls (Step 1-3) (7 Columns on large desktop, 8 on tablet) */}
          <div className="md:col-span-8 lg:col-span-7 space-y-12">
            
            {/* STEP 1: Area Range Slider */}
            <div className="bg-[#0F0F0F] p-6 md:p-8 border border-[#B8956A]/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4 mb-6">
                <span className="text-xs sm:text-sm uppercase tracking-widest font-sans font-bold text-[#C4BEB3]">
                  Шаг 1 · Площадь {propertyType === 'house' ? 'вашего дома' : 'вашей квартиры'}
                </span>
                <span className="font-serif text-6xl md:text-8xl text-[#B8956A] font-light leading-none">
                  {area} <span className="text-lg uppercase tracking-wider font-sans ml-1 text-[#F5F1EA]">м²</span>
                </span>
              </div>
              
              <div className="relative pt-4 pb-2">
                <input
                  type="range"
                  min={propertyType === 'house' ? '100' : '50'}
                  max={propertyType === 'house' ? '1200' : '500'}
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-[3px] bg-[#B8956A]/20 rounded-lg appearance-none cursor-pointer accent-[#B8956A]"
                  style={{
                    background: `linear-gradient(to right, #B8956A 0%, #B8956A ${((area - (propertyType === 'house' ? 100 : 50)) / (propertyType === 'house' ? 1100 : 450)) * 100}%, rgba(184, 149, 106, 0.2) ${((area - (propertyType === 'house' ? 100 : 50)) / (propertyType === 'house' ? 1100 : 450)) * 100}%, rgba(184, 149, 106, 0.2) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs font-mono text-[#C4BEB3] font-bold mt-4 shrink-0">
                  {propertyType === 'house' ? (
                    <>
                      <span>100 м²</span>
                      <span>300 м² (Стандарт)</span>
                      <span>600 м²</span>
                      <span>900 м²</span>
                      <span>1200 м²</span>
                    </>
                  ) : (
                    <>
                      <span>50 м²</span>
                      <span>150 м² (Стандарт)</span>
                      <span>250 м²</span>
                      <span>350 м²</span>
                      <span>500 м²</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] italic text-[#8B8478] mt-3">
                  Для объектов площадью менее {propertyType === 'house' ? '100' : '50'} м² расчёт стоимости производится индивидуально.
                </p>
              </div>
            </div>

            {/* STEP 2: Service Formats Comparison */}
            <div className="space-y-4">
              <span className="text-xs sm:text-sm uppercase tracking-widest font-sans font-bold text-[#C4BEB3] block">
                Шаг 2 · Формат сотрудничества
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Format Card A: "Vse Vklucheno" */}
                <div
                  onClick={() => setFormat('podTapochki')}
                  className={`bg-[#0F0F0F] p-6 md:p-8 border cursor-pointer relative flex flex-col justify-between transition-all duration-300 min-h-[420px] ${
                    format === 'podTapochki'
                      ? 'border-[#B8956A] shadow-lg shadow-[#B8956A]/5'
                      : 'border-[#B8956A]/10 hover:border-[#B8956A]/40'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-row items-center justify-between gap-2 flex-wrap sm:flex-nowrap h-7">
                      <span className="text-xs uppercase font-mono tracking-widest text-[#B8956A] font-extrabold block leading-none">
                        Вариант под ключ
                      </span>
                      <div className="bg-[#B8956A] text-[#0F0F0F] text-[10px] sm:text-xs uppercase tracking-widest font-extrabold px-2.5 py-1 whitespace-nowrap leading-none">
                        Рекомендуем
                      </div>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1EA] font-light min-h-[56px] flex items-center">
                      ВСЁ ВКЛЮЧЕНО «ПОД ТАПОЧКИ»
                    </h3>
                    
                    <div className="py-1">
                      <span className="text-xs font-mono text-[#8B8478] block">Цена за м²:</span>
                      <span className="text-2xl sm:text-3xl font-serif text-[#B8956A] font-bold">
                        {propertyType === 'house' ? '450 000 ₽ / м²' : '350 000 ₽ / м²'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#C4BEB3] leading-relaxed">
                      {propertyType === 'house'
                        ? "Индивидуальный проект + возведение коробки + фасад + забор по периметру + ландшафт с автополивом + котельная и коммуникации + премиальная отделка, дизайнерский свет и меблировка под ключ."
                        : "Дизайн + Ремонт + Инженерия + Сантехника + Кухня + Мебель + Техника + Текстиль + Декор + Клининг."
                      }
                    </p>

                    <div className="space-y-2 py-3 border-t border-[#B8956A]/10 mt-2">
                      {(propertyType === 'house'
                        ? [
                            'Архитектура, фасады, генплан',
                            'Строительные работы и коробка',
                            'Забор и благоустройство по периметру',
                            'Ландшафтный дизайн и газоны',
                            'Котельная Viessmann и коммуникации',
                            'Комплектация премиальным светом и мебелью',
                          ]
                        : [
                            'Дизайн-проект «Всё включено»',
                            'Ремонт и инженерия по СНиП',
                            'Премиальное оборудование и ванные',
                            'Кухня и встраиваемая техника',
                            'Авторская мебель Комплектация Мечты',
                            'Текстильный дизайн и декорирование',
                          ]
                      ).map((name, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-[11px] sm:text-xs text-[#C4BEB3]">
                          <Check size={12} className="text-[#B8956A] shrink-0 mt-0.5" />
                          <span className="leading-normal">
                            {name} — <span className="text-[#B8956A]/80 font-mono font-bold whitespace-nowrap font-sans font-medium">включено</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#B8956A]/15 pt-4 mt-4">
                    <p className="text-[10px] sm:text-xs font-sans text-[#8B8478] leading-normal font-medium">
                      Один договор. Фиксированная цена. Защита от подорожания. Гарантия 5 лет.
                    </p>
                  </div>
                </div>

                {/* Format Card B: Customized "Po Chastyam" */}
                <div
                  onClick={handleSwitchToPoChastyam}
                  className={`bg-[#0F0F0F] p-6 md:p-8 border cursor-pointer relative flex flex-col justify-between transition-all duration-300 min-h-[420px] ${
                    format === 'poChastyam'
                      ? 'border-[#B8956A] shadow-lg shadow-[#B8956A]/5'
                      : 'border-[#B8956A]/10 hover:border-[#B8956A]/40'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-row items-center justify-between gap-2 flex-wrap sm:flex-nowrap h-7">
                      <span className="text-xs uppercase font-mono tracking-widest text-[#C4BEB3] font-bold block leading-none">
                        Конструктор проекта
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1EA] font-light min-h-[56px] flex items-center">
                      СОБРАТЬ ПО ЧАСТЯМ
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#C4BEB3] leading-relaxed min-h-[40px]">
                      {totalSelectedCount === 0 && 'Выберите услуги, которые вам необходимы'}
                      {totalSelectedCount >= 1 && totalSelectedCount <= (propertyType === 'house' ? 5 : 10) && 'Подходит, если вам необходима только часть работ'}
                      {totalSelectedCount > (propertyType === 'house' ? 5 : 10) && totalSelectedCount <= (propertyType === 'house' ? 10 : 22) && 'Частичная сборка. Сравните выгоду с полным тарифом'}
                      {totalSelectedCount > (propertyType === 'house' ? 10 : 22) && `Вариант под ключ выгоднее на ${(potSavings / 1000000).toFixed(2).replace(/\.00$/, '')} млн ₽`}
                    </p>
                  </div>

                  <div className="border-t border-[#B8956A]/15 pt-4 mt-6">
                    <p className="text-[10px] sm:text-xs font-sans text-[#8B8478] leading-normal font-medium">
                      Гибкие опции. Настройте конфигурацию по {propertyType === 'house' ? 15 : 30} разделам сметы под конкретные требования вашего объекта.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* CONSTRUCTOR DETAILS: Step 3 (Only visible when format is 'poChastyam') */}
            <AnimatePresence>
              {format === 'poChastyam' && (
                <motion.div
                  id="constructor-steps"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-12 overflow-hidden"
                >
                  
                  {/* STEP 3: Categories by Sections */}
                  <div className="space-y-6 pt-4 border-t border-[#B8956A]/10">
                    <span className="text-xs sm:text-sm uppercase tracking-widest font-sans font-bold text-[#C4BEB3] block">
                      Шаг 3 · Категории проекта
                    </span>
                    
                    {!showFullMobileConfig && (
                      <div className="md:hidden bg-[#0F0F0F] p-4 border border-[#B8956A]/20 text-center space-y-3">
                        <p className="text-[11px] text-[#C4BEB3] leading-relaxed">
                          Все {propertyType === 'house' ? 15 : 30} разделов сметы сгруппированы для вашей площади. Вы можете открыть детальный ручной конфигуратор.
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowFullMobileConfig(true)}
                          className="w-full py-2 border border-[#B8956A] text-[#B8956A] text-[10px] uppercase tracking-wider font-bold transition-all hover:bg-[#B8956A] hover:text-[#0F0F0F] bg-transparent"
                        >
                          Открыть полный конфигуратор
                        </button>
                      </div>
                    )}
                    
                    <div className={`${!showFullMobileConfig ? 'hidden md:block' : 'space-y-6'}`}>
                      {SECTIONS.map((section) => {
                        const isExpanded = !!expandedSections[section.id];
                        const { total, active, cost } = getSectionActiveStats(section);
                        const sectionRatesSum = section.categories
                          .filter(cat => selectedCategories[cat.key])
                          .reduce((sum, cat) => sum + cat.rate, 0);

                        return (
                          <div 
                            key={section.id} 
                            className="border border-[#B8956A]/20 bg-[#0F0F0F] overflow-hidden transition-all duration-300"
                          >
                            {/* Header of Section */}
                            <div 
                              onClick={() => toggleSectionExpanded(section.id)}
                              className="flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-[#0A0A0A] hover:bg-[#121212] transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono font-bold text-[#B8956A] border border-[#B8956A]/30 w-6 h-6 flex items-center justify-center">
                                  {section.num}
                                </span>
                                <h3 className="text-xs sm:text-sm uppercase font-sans tracking-widest font-bold text-[#F5F1EA] flex items-center gap-1">
                                  {section.title}
                                  {/* Tooltip Info icon */}
                                  <span onClick={(e) => e.stopPropagation()}>
                                    <div className="relative group/tooltip inline-block ml-2">
                                      <Info size={12} className="text-[#B8956A]/70 hover:text-[#B8956A] cursor-pointer" />
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#0F0F0F] border border-[#B8956A]/30 text-[11px] text-[#C4BEB3] opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl leading-relaxed text-left font-normal font-sans normal-case tracking-normal">
                                        {section.tooltip}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0F0F0F]" />
                                      </div>
                                    </div>
                                  </span>
                                </h3>
                              </div>

                              <div className="flex items-center gap-4 animate-parent" onClick={(e) => e.stopPropagation()}>
                                {/* Select All / Deselect All Controls */}
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAllInSection(section.id, true)}
                                    className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#B8956A]/60 hover:text-[#B8956A] transition-colors bg-transparent border-none cursor-pointer"
                                  >
                                    Выбрать все
                                  </button>
                                  <span className="text-[#B8956A]/30 text-xs text-light pointer-events-none">|</span>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAllInSection(section.id, false)}
                                    className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#B8956A]/60 hover:text-[#B8956A] transition-colors bg-transparent border-none cursor-pointer"
                                  >
                                    Снять все
                                  </button>
                                </div>

                                {/* Angle icon */}
                                <button 
                                  type="button"
                                  onClick={() => toggleSectionExpanded(section.id)}
                                  className="text-[#B8956A] hover:text-[#F5F1EA] transition-colors p-1"
                                >
                                  <span className="font-mono text-base font-bold">
                                    {isExpanded ? '▼' : '▶'}
                                  </span>
                                </button>
                              </div>
                            </div>

                            {/* Section Body */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4 sm:p-5 border-t border-[#B8956A]/10 space-y-4">
                                    {section.subtitle && (
                                      <p className="text-[11px] text-[#C4BEB3]/80 italic font-sans leading-relaxed">
                                        {section.subtitle}
                                      </p>
                                    )}

                                    <div className="space-y-3">
                                      {section.categories.map((cat) => {
                                        const isChecked = !!selectedCategories[cat.key];
                                        return (
                                          <div
                                            key={cat.key}
                                            onClick={() => handleToggleCategory(cat.key)}
                                            className={`p-3 border cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
                                              isChecked
                                                ? 'bg-[#B8956A]/5 border-[#B8956A]/40'
                                                : 'bg-[#050505] border-[#B8956A]/5 hover:border-[#B8956A]/15'
                                            }`}
                                          >
                                            {/* Custom Checkbox */}
                                            <div className="pt-0.5" onClick={(e) => e.stopPropagation()}>
                                              <button
                                                type="button"
                                                onClick={() => handleToggleCategory(cat.key)}
                                                className="flex items-center justify-center w-4 h-4 rounded-none border border-[#B8956A]/40 bg-[#0F0F0F] hover:border-[#B8956A] transition-colors"
                                              >
                                                {isChecked && (
                                                  <Check size={11} className="text-[#B8956A] stroke-[3]" />
                                                )}
                                              </button>
                                            </div>

                                            <div className="space-y-1 flex-1">
                                              <div className="flex items-baseline justify-between gap-2">
                                                <span className="text-xs sm:text-xs uppercase tracking-wider font-sans font-bold text-[#F5F1EA]">
                                                  {cat.title}
                                                </span>
                                                <span className="font-serif text-[13px] sm:text-[14px] text-[#B8956A] font-medium shrink-0">
                                                  {cat.rate.toLocaleString('ru')} ₽/м²
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-[#C4BEB3] leading-relaxed font-light">
                                                {cat.description}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Section subtotal rate line */}
                                    <div className="text-[11px] text-[#8B8478] font-mono border-t border-[#B8956A]/10 pt-3 flex justify-between items-baseline mt-4">
                                      <span>Подитог раздела:</span>
                                      <span className="text-[#B8956A] font-bold">
                                        {sectionRatesSum.toLocaleString('ru')} ₽/м²
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* RIGHT COLUMN: Outcomes Sticky Summary Panel */}
          <div className="md:col-span-4 lg:col-span-5 md:sticky md:top-28 lg:top-32 self-start transition-all space-y-6">
            
            {/* Promo Banner Action */}
            <div className="bg-[#0F0F0F] border-2 border-[#B8956A] p-6 sm:p-8 text-center relative rounded-none shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#B8956A] text-[#0F0F0F] text-[10px] uppercase font-sans font-extrabold px-3.5 py-1 tracking-[0.4em] whitespace-nowrap">
                  АКЦИЯ
                </span>
              </div>
              <div className="pt-2 space-y-3">
                <h4 className="font-serif text-3xl sm:text-4xl text-[#B8956A] font-light uppercase tracking-wide leading-tight">
                  ДИЗАЙН-ПРОЕКТ В ПОДАРОК
                </h4>
                <p className="font-sans text-base sm:text-lg text-white">
                  при заказе варианта „Под ключ“.
                </p>
                <div className="h-[1px] w-16 bg-[#B8956A]/20 mx-auto my-3" />
                <p className="font-sans text-xs sm:text-sm text-[#8B8478] leading-relaxed">
                  {propertyType === 'house'
                    ? `Экономия от 2 850 000 ₽ на проекте ${area} м² — полный архитектурный консалтинг, фасадная и ландшафтная инженерия в подарок.`
                    : `Экономия от 1 125 000 ₽ на проекте ${area} м² — авторские решения на работы, мебель, технику и комплектацию в подарок.`
                  }
                </p>
              </div>
            </div>

            <div className="bg-[#0F0F0F] border border-[#B8956A] p-6 lg:p-8 space-y-6 shadow-xl relative">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#B8956A]/15 pb-4">
                <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#B8956A]">
                  СТОИМОСТЬ ВАШЕГО ПРОЕКТА
                </span>
                <Sparkles size={14} className="text-[#B8956A]" />
              </div>

              {/* Huge dynamic counter */}
              <div className="space-y-2">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#B8956A] tracking-tight block font-light leading-none">
                  <AnimatedPrice value={activeTotal} />
                </span>
                <span className="text-xs font-mono text-[#C4BEB3] uppercase tracking-wider block font-bold transition-opacity">
                  {format === 'podTapochki'
                    ? `${propertyType === 'house' ? '450 000' : '350 000'} ₽/м² × ${area} м²`
                    : `${area} м² · ${totalSelectedCount === (propertyType === 'house' ? 15 : 30) ? 'все категории включены' : `категорий: ${totalSelectedCount} из ${propertyType === 'house' ? 15 : 30}`}`}
                </span>
              </div>

              {/* Plaque "Вариант под ключ" in constructor */}
              {format === 'poChastyam' && (
                <div className="border border-[#B8956A]/20 bg-[#1A1A1A] p-4.5 space-y-3">
                  <div className="flex items-center gap-2 text-[#B8956A]">
                    <Sparkles size={13} className="stroke-[1.5]" />
                    <span className="text-xs uppercase tracking-widest font-sans font-bold">Выгода решения под ключ</span>
                  </div>
                  <p className="text-xs text-[#C4BEB3] leading-relaxed font-light">
                    Если заказать те же категории по частям у разных подрядчиков — стоимость выше примерно на 1,5–2 млн ₽ из-за координации, переделок и потерь времени. Под ключ от Mechty — на 2,3 млн ₽ ниже Конструктора.
                  </p>
                  <button
                    onClick={handleSwitchToPodTapochki}
                    className="w-full py-2 border border-[#B8956A]/30 hover:border-[#B8956A] text-[#B8956A] hover:text-[#0F0F0F] hover:bg-[#B8956A] text-[10px] uppercase tracking-wider font-sans font-bold transition-all duration-300 bg-transparent cursor-pointer"
                  >
                    Посмотреть Вариант под ключ
                  </button>
                </div>
              )}

              {/* Dynamic breakdown area switcher */}
              {format === 'podTapochki' ? (
                /* Card Flagship Features list */
                <div className="space-y-3 bg-[#1A1A1A] p-4.5 border border-[#B8956A]/10 text-xs sm:text-sm">
                  <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-[#B8956A] block mb-2">
                    Что входит в стоимость:
                  </span>
                  {(propertyType === 'house'
                    ? [
                        "Индивидуальный проект резиденции",
                        "Монолитные работы и коробка",
                        "Котельная Buderus/Viessmann",
                        "Панорамное остекление Schüco",
                        "Премиальный фасад усадьбы",
                        "Капитальный забор по периметру",
                        "Ландшафтный автополив и газоны",
                        "Чистовое благоустройство и свет",
                        "Премиум мебель и техника Asko"
                      ]
                    : [
                        "Авторский дизайн-проект «Всё включено»",
                        "Полный ремонт под ключ",
                        "Инженерные системы и климат",
                        "Сантехника и оборудование ванных",
                        "Кухня под ключ с премиум-техникой",
                        "Корпусная и мягкая мебель собственного производства",
                        "Освещение и сценарии света",
                        "Шторы, текстиль и аксессуары",
                        "Декор и предметы интерьера",
                        "Сборка, монтаж, финальный клининг"
                      ]
                  ).map((chk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[#EDE6D8] font-medium leading-tight">
                      <Check size={13} className="text-[#B8956A] shrink-0 mt-0.5" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Custom Construct parts listed */
                <div className="space-y-4 bg-[#1A1A1A] p-5 border border-[#B8956A]/10 text-xs">
                  <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-[#B8956A] block mb-2">
                    СТАТЬИ РАСХОДОВ:
                  </span>
                  
                  <div className="space-y-2 border-b border-[#B8956A]/5 pb-3">
                    {SECTIONS.map((section) => {
                      const { total, active, cost } = getSectionActiveStats(section);
                      if (active === 0) return null;
                      return (
                        <div key={section.id} className="flex justify-between items-baseline py-1">
                          <div className="flex items-baseline gap-1.5 text-[#C4BEB3]">
                            <span className="truncate">{section.displayName}</span>
                            {active < total && (
                              <span className="text-[10px] text-[#8B8478] font-mono">({active} из {total})</span>
                            )}
                          </div>
                          <span className="font-mono text-[#F5F1EA] font-semibold tracking-tight shrink-0">
                            {formatTextNumber(cost)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Agent accompaniment fee row Always appended in construction */}
                  <div className="pt-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[#C4BEB3] font-bold">Агентское сопровождение</span>
                      <span className="font-mono text-[#B8956A] font-extrabold tracking-tight">
                        {formatTextNumber(agentFee)}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8B8478] leading-normal mt-1.5 font-light">
                      Юридическое сопровождение, договор, контроль качества, выплаты подрядчикам, защита от подорожания — на условиях договора.
                    </p>
                  </div>
                </div>
              )}

              {/* Pricing Footnote (Pravka 4) */}
              <p className="text-[10px] italic text-[#8B8478] leading-relaxed mt-4 max-w-prose">
                Цена является ориентировочной и может быть изменена при детальном расчёте после замера, согласования объёмов работ и выбранных материалов.
              </p>

              {/* Additional Specs cards */}
              <div className="space-y-3 pt-2 border-t border-[#B8956A]/10">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#C4BEB3]">
                  <Calendar size={15} className="text-[#B8956A]" />
                  <span className="font-semibold">Срок реализации: <strong className="text-[#F5F1EA]">{dynamicTerm}</strong></span>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#C4BEB3]">
                  <Shield size={15} className="text-[#B8956A] shrink-0 mt-0.5" />
                  <span className="font-semibold leading-tight">Защита от подорожания материалов и работ — на условиях, указанных в договоре.</span>
                </div>
              </div>

              {/* CTAs buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleCTA}
                  className="w-full py-4 bg-[#B8956A] hover:bg-[#8B6F4E] text-[#0F0F0F] text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 transform active:scale-98 text-center block cursor-pointer border-none"
                >
                  Получить детальный расчет
                </button>
                <button
                  onClick={handleCTA}
                  className="w-full py-4 border border-[#B8956A]/40 hover:border-[#B8956A] text-[#B8956A] text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 transform active:scale-98 text-center block bg-transparent cursor-pointer"
                >
                  Записаться на встречу
                </button>
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(true)}
                  className="w-full text-center text-[12px] text-[#B8956A] hover:underline transition-all mt-3 bg-transparent border-none cursor-pointer block font-medium"
                >
                  📧 Сохранить расчёт и отправить себе на почту
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MOBILE STICKY FOOTER PANEL (visible on mobile viewport under md breakpoint) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F0F0F]/95 backdrop-blur-md border-t border-[#B8956A]/30 z-50 p-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#8B8478] block">Итоговая смета:</span>
          <span className="text-lg font-serif text-[#B8956A] font-bold">
            <AnimatedPrice value={activeTotal} />
          </span>
        </div>
        <button
          onClick={handleCTA}
          className="px-5 py-2.5 bg-[#B8956A] text-[#0F0F0F] text-xs font-bold uppercase tracking-wider rounded-none border-none cursor-pointer"
        >
          Получить расчет
        </button>
      </div>

      <AnimatePresence>
        {emailModalOpen && (
          <div className="fixed inset-0 bg-[#0F0F0F]/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A1A] border-2 border-[#B8956A] p-6 sm:p-8 max-w-md w-full relative z-[100] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => { setEmailModalOpen(false); setEmailSent(false); }}
                className="absolute top-4 right-4 text-[#C4BEB3] hover:text-[#B8956A] text-lg font-mono bg-transparent border-none cursor-pointer"
              >
                ✕
              </button>
              <h4 className="font-serif text-2xl text-[#F5F1EA] mb-4">📧 Сохранить расчёт</h4>
              {emailSent ? (
                <div className="space-y-4 py-4 text-center">
                  <p className="text-[#B8956A] font-medium text-sm sm:text-base">Расчёт успешно отправлен!</p>
                  <p className="text-xs text-[#C4BEB3] leading-relaxed">
                    Мы продублировали детализированную спецификацию на адрес <strong className="text-white font-semibold">{email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setEmailModalOpen(false); setEmailSent(false); }}
                    className="mt-2 bg-[#B8956A] text-[#0F0F0F] px-8 py-2.5 text-xs uppercase tracking-wider font-bold hover:bg-[#8B6F4E] transition-all border-none cursor-pointer"
                  >
                    Закрыть
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) {
                      setEmailSent(true);
                    }
                  }}
                  className="space-y-4"
                >
                  <p className="text-xs text-[#C4BEB3] leading-relaxed">
                    Введите ваш адрес электронной почты. Мы вышлем вам полную спецификацию по {totalSelectedCount} статьям расходов для площади {area} м² со всеми тарифами и черновой подготовкой.
                  </p>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8B8478] block mb-1 font-bold">Ваш Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.ru"
                      className="w-full bg-[#0F0F0F] border border-[#B8956A]/30 text-white p-3 text-sm focus:outline-none focus:border-[#B8956A] font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#B8956A] text-[#0F0F0F] text-xs uppercase tracking-wider font-bold hover:bg-[#8B6F4E] transition-all border-none cursor-pointer"
                  >
                    Отправить расчет
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
