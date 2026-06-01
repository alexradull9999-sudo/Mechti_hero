import React, { useState } from 'react';
import { HelpCircle, Calendar, ArrowDown, Building2, Home, CheckCircle2 } from 'lucide-react';

interface RoadmapProps {
  onOpenConsultation?: (customMessage?: string, customTitle?: string, customDesc?: string) => void;
}

export default function Roadmap({ onOpenConsultation }: RoadmapProps) {
  const [objType, setObjType] = useState<'apartment' | 'villa'>('apartment');
  const [objSize, setObjSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Dynamic step duration calc
  const getStepDuration = (stepNumber: string) => {
    if (stepNumber === "01") return "1 день";
    if (stepNumber === "02") return "2–4 дня";
    if (stepNumber === "03") return "3–5 дней";
    
    if (stepNumber === "04") {
      if (objSize === 'small') return "7–10 дней";
      if (objSize === 'medium') return "12–15 дней";
      return "15–22 дней";
    }
    
    if (stepNumber === "05") {
      if (objType === 'apartment') {
        if (objSize === 'small') return "15–20 дней";
        if (objSize === 'medium') return "20–30 дней";
        return "30–45 дней";
      } else {
        if (objSize === 'small') return "20–25 дней";
        if (objSize === 'medium') return "25–35 дней";
        return "40–60 дней";
      }
    }
    
    if (stepNumber === "06") {
      if (objType === 'apartment') {
        if (objSize === 'small') return "15–20 дней";
        if (objSize === 'medium') return "20–25 дней";
        return "25–35 дней";
      } else {
        if (objSize === 'small') return "20–25 дней";
        if (objSize === 'medium') return "25–30 дней";
        return "30–45 дней";
      }
    }
    
    if (stepNumber === "07") {
      if (objType === 'apartment') {
        if (objSize === 'small') return "5–7 месяцев";
        if (objSize === 'medium') return "7–9 месяцев";
        return "9–12 месяцев";
      } else {
        if (objSize === 'small') return "6–8 месяцев";
        if (objSize === 'medium') return "8–11 месяцев";
        return "11–15 месяцев";
      }
    }
    return "";
  };

  const getFullTerm = () => {
    if (objType === 'apartment') {
      if (objSize === 'small') return "около 6–8 месяцев";
      if (objSize === 'medium') return "около 8–10 месяцев";
      return "около 10–13 месяцев";
    } else {
      if (objSize === 'small') return "около 7–9 месяцев";
      if (objSize === 'medium') return "около 9–12 месяцев";
      return "около 12–16 месяцев";
    }
  };

  const steps = [
    {
      number: "01",
      title: "Стартовая встреча",
      description: "Знакомство в удобном для вас формате — офлайн или онлайн. Презентация готовых объектов и объектов на стадии реализации."
    },
    {
      number: "02",
      title: "Юридический договор",
      description: "Фиксация этапов, сроков работы и финальной стоимости. Все обязательства по проектированию, ремонту и мебели в одном документе."
    },
    {
      number: "03",
      title: "Глубокое анкетирование",
      description: "Анализируем ваш сценарий жизни: от привычки утреннего кофе до тонкостей хранения вещей и высоты выключателей под ваш рост."
    },
    {
      number: "04",
      title: "Планировочные решения",
      description: "Создаем до 3 вариантов идеальной планировки. Добиваемся максимальной эргономики каждого сантиметра площади."
    },
    {
      number: "05",
      title: "Визуализация & Концепт",
      description: "Отрисовка фотореалистичных 3D-изображений. Вы видите будущую квартиру с точно подобранными фактурами, тканями и светом."
    },
    {
      number: "06",
      title: "Смета и рабочие чертежи",
      description: "Разрабатываем детальный инженерный проект. До шелкографии и раскладки швов камня. Фиксируем полную смету работ и материалов."
    },
    {
      number: "07",
      title: "Реализация под ключ",
      description: "Реализацию проекта можем начинать уже после согласования планировочного решения — параллельно с разработкой остального дизайн-проекта. Это экономит от 2,5 месяцев на старте. Передача готового объекта, полностью готового для жизни."
    }
  ];

  return (
    <section id="roadmap" className="bg-[#F5F1EA] text-[#1A1A1A] py-24 md:py-36 border-b border-[#1A1A1A]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#B8956A] font-bold block">
              КАК СТРОИТСЯ СОТРУДНИЧЕСТВО С MECHTY
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-[#1A1A1A]">
              Семь шагов к <br />
              <span className="italic text-[#8B6F4E]">интерьеру вашей мечты</span>
            </h2>
            <p className="text-sm md:text-base text-[#5E584F] font-sans font-light leading-relaxed max-w-xl">
              Команда Mechty напрямую руководит 180+ профильными экспертами и подрядчиками на всех стадиях. Понятный, прозрачный и пошагово регламентированный процесс реализации с гибко адаптируемыми сроками в зависимости от площади и типа недвижимости.
            </p>

            {onOpenConsultation && (
              <button
                onClick={() => onOpenConsultation(
                  'Заявка: Сделать первый шаг к интерьеру мечты. Запись на аудит планировки или встречу в офисе.',
                  'Сделать первый шаг к мечте',
                  'Заполните форму, и наш ведущий де-люкс архитектор проконсультирует вас по всем шагам разработки проекта и зафиксирует начальный этап.'
                )}
                className="mt-4 px-6 py-3.5 bg-[#8B6F4E] hover:bg-[#1A1A1A] text-white hover:text-[#EDE6D8] font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md cursor-pointer rounded-none inline-flex items-center gap-2"
              >
                <span>Сделать первый шаг</span>
                <span>→</span>
              </button>
            )}
          </div>

          <div className="lg:col-span-4 bg-[#EDE6D8] border border-[#B8956A]/20 p-5 rounded-sm space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-[#B8956A] font-extrabold uppercase">
              <Calendar size={12} />
              <span>Расчетный общий срок:</span>
            </div>
            <p className="font-serif text-2xl text-[#1A1A1A] font-light italic">
              {getFullTerm()}
            </p>
          </div>
        </div>

        {/* Timeline Interactive Controllers Block */}
        <div className="bg-[#EDE6D8]/60 border border-[#B8956A]/15 p-6 md:p-8 mb-16 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Object class Selector */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-sans tracking-widest text-[#8B8478] font-bold">
              1. Выберите тип недвижимости:
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setObjType('apartment')}
                className={`p-4 flex items-center justify-center gap-3 border text-xs sm:text-sm uppercase tracking-wider font-sans font-bold transition-all ${
                  objType === 'apartment'
                    ? 'border-[#B8956A] bg-[#B8956A] text-[#0F0F0F]'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/30 hover:bg-[#EDE6D8]/30'
                }`}
              >
                <Building2 size={16} />
                <span>Квартира</span>
              </button>
              <button
                onClick={() => setObjType('villa')}
                className={`p-4 flex items-center justify-center gap-3 border text-xs sm:text-sm uppercase tracking-wider font-sans font-bold transition-all ${
                  objType === 'villa'
                    ? 'border-[#B8956A] bg-[#B8956A] text-[#0F0F0F]'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/30 hover:bg-[#EDE6D8]/30'
                }`}
              >
                <Home size={16} />
                <span>Резиденция / Дом</span>
              </button>
            </div>
          </div>

          {/* Area Selector */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-sans tracking-widest text-[#8B8478] font-bold">
              2. Укажите площадь объекта:
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setObjSize('small')}
                className={`p-4 text-center border text-[11px] sm:text-xs uppercase tracking-wider font-sans font-bold transition-all ${
                  objSize === 'small'
                    ? 'border-[#B8956A] bg-[#B8956A] text-[#0F0F0F]'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/30 hover:bg-[#EDE6D8]/30'
                }`}
              >
                До 100 м²
              </button>
              <button
                onClick={() => setObjSize('medium')}
                className={`p-4 text-center border text-[11px] sm:text-xs uppercase tracking-wider font-sans font-bold transition-all ${
                  objSize === 'medium'
                    ? 'border-[#B8956A] bg-[#B8956A] text-[#0F0F0F]'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/30 hover:bg-[#EDE6D8]/30'
                }`}
              >
                100 – 250 м²
              </button>
              <button
                onClick={() => setObjSize('large')}
                className={`p-4 text-center border text-[11px] sm:text-xs uppercase tracking-wider font-sans font-bold transition-all ${
                  objSize === 'large'
                    ? 'border-[#B8956A] bg-[#B8956A] text-[#0F0F0F]'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/30 hover:bg-[#EDE6D8]/30'
                }`}
              >
                Свыше 250 м²
              </button>
            </div>
          </div>
        </div>

        {/* Steps track visual representation with dynamic durations */}
        <div className="relative border-l border-[#B8956A]/20 ml-6 pl-10 md:pl-16 space-y-12 py-4">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Gold dot with number inside */}
              <div className="absolute -left-[61px] md:-left-[85px] top-1.5 w-10 h-10 rounded-full bg-[#F5F1EA] border-2 border-[#B8956A] flex items-center justify-center font-serif text-sm font-bold text-[#8B6F4E] group-hover:bg-[#B8956A] group-hover:text-[#F5F1EA] transition-all duration-300 shadow-sm z-10">
                {step.number}
              </div>

              {/* Step info content card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-4 lg:col-span-3 space-y-1.5">
                  <h3 className="font-serif text-xl md:text-2xl font-light text-[#1A1A1A] group-hover:text-[#B8956A] transition-colors leading-tight">
                    {step.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 bg-[#B8956A]/15 border border-[#B8956A]/35 text-[#8B6F4E] text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                    <Calendar size={10} />
                    <span>{getStepDuration(step.number)}</span>
                  </div>
                </div>
                <div className="md:col-span-8 lg:col-span-9 max-w-2xl bg-[#EDE6D8]/30 p-5 border border-[#1A1A1A]/5 group-hover:bg-[#EDE6D8]/50 transition-colors">
                  <p className="text-xs md:text-sm text-[#5E584F] font-sans font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ending note */}
        <div className="mt-16 text-center max-w-xl mx-auto space-y-4">
          <div className="inline-flex p-2 rounded-full border border-[#B8956A]/20 bg-[#EDE6D8]/50">
            <ArrowDown size={14} className="text-[#8B6F4E] animate-bounce" />
          </div>
          <p className="text-xs font-mono tracking-widest text-[#8B8478] uppercase">
            ВЕЗДЕ СОБЛЮДАЕТСЯ АВТОРСКИЙ НАДЗОР КАНАЛОВ СМЕТНЫХ ГАРАНТИЙ И ТЕХНАДЗОР
          </p>
        </div>

      </div>
    </section>
  );
}
