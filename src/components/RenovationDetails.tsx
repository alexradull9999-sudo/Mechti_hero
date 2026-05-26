import React from 'react';
import { Check, ShieldCheck, HeartHandshake, Eye, Award } from 'lucide-react';

export default function RenovationDetails() {
  const steps = [
    { title: "Демонтаж и капитальная подготовка", desc: "Снос перегородок, возведение гипсокартонных и пеноблочных стен строго под геометрию 90°." },
    { title: "Черновые работы согласно всем СНиП и нормам", desc: "Выравнивание пола с шумо-гидро изоляцией. Малярные работы согласно стандарту Q3." },
    { title: "Инженерные решения высокой надежности", desc: "Слаботочные трассы, вентиляция чиллеров, прокладка труб Rehau, щиты АББ." },
    { title: "Сверхточная чистовая отделка", desc: "Укладка инженерной паркетной доски, подрезка и шлифовка плит мрамора под углом 45°." },
    { title: "Сантехника и финишная электрика", desc: "Установка сантехнического элитного фаянса (Laufen, Antonio Lupi), розеток Jung." },
    { title: "Инсталляция мебели Mechty", desc: "Сборка и монтаж встроенной кухонной и гардеробной систем по лазерным координатам." },
    { title: "Комплексное декорирование", desc: "Размещение настенных панелей, инсталляция зеркал с интегрированными контурами подсветки." },
    { title: "Текстиль и финальные аксессуары", desc: "Навеска гардин, штор, подбор акцентного коврового покрытия в гостиные." },
    { title: "Генеральный клининг", desc: "Промышленное удаление строительной мелкодисперсной пыли, чистка углов." },
    { title: "Сдача под ключ по чек-листу", desc: "Передача ключей от готовой квартиры, папки исполнительной документации под заезд." }
  ];

  const corePillars = [
    { icon: <HeartHandshake size={18} className="text-[#B8956A]" />, text: "Один договор на всё" },
    { icon: <Award size={18} className="text-[#B8956A]" />, text: "Фиксированный бюджет" },
    { icon: <Eye size={18} className="text-[#B8956A]" />, text: "Цифровой ERP контроль" },
    { icon: <ShieldCheck size={18} className="text-[#B8956A]" />, text: "Защита от удорожаний" }
  ];

  return (
    <section id="renovation-section" className="bg-[#0F0F0F] text-[#F5F1EA] py-24 md:py-36 relative border-b brass-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4">
          <span className="text-sm uppercase font-sans tracking-[0.2em] text-[#B8956A] font-semibold block">
            ФЛАГМАНСКАЯ СТРОИТЕЛЬНАЯ РЕАЛИЗАЦИЯ
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
            Ремонт, в котором <br />
            <span className="italic text-[#B8956A] font-light">всё уже включено</span>
          </h2>
          <p className="text-base md:text-lg text-[#C4BEB3] font-sans font-light leading-relaxed max-w-xl">
            Никаких дозакупок мешков со смесями, никаких скрытых согласований и платных выносов мусора. Весь цикл строительной комплектации учтен изначально.
          </p>
        </div>

        {/* Steps Double Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-20">
          {steps.map((st, i) => (
            <div key={i} className="flex gap-4 border-b pb-6 group hover:border-[#B8956A]/50 transition-colors duration-300 brass-border">
              <div className="p-1 px-1.5 h-6 rounded-full bg-[#B8956A]/15 text-[#B8956A] flex items-center justify-center font-serif text-xs shrink-0 font-bold mt-1">
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-sans text-lg md:text-xl font-medium text-[#F5F1EA]">
                  {st.title}
                </h3>
                <p className="text-sm text-[#C4BEB3] font-sans font-normal leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Core Principles */}
        <div className="bg-[#1A1A1A]/80 border brass-border p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {corePillars.map((pill, i) => (
              <div key={i} className="flex flex-col items-center gap-3 pt-4 sm:pt-0">
                <div className="w-10 h-10 rounded-full border border-[#B8956A]/30 flex items-center justify-center bg-[#0F0F0F] hover:bg-[#B8956A]/10 transition-colors">
                  {pill.icon}
                </div>
                <span className="text-xs md:text-sm uppercase font-sans tracking-widest text-[#EDE6D8] font-bold">
                  {pill.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
