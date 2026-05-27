import React from 'react';
import { Check, ShieldCheck, HeartHandshake, Eye, Award, Droplet, Zap, Wind, Shield } from 'lucide-react';

interface RenovationDetailsProps {
  onScrollToSection?: (id: string) => void;
}

export default function RenovationDetails({ onScrollToSection }: RenovationDetailsProps) {
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

  const standards = [
    {
      icon: <Shield size={20} className="text-[#B8956A]" />,
      title: "Штукатурка и геометрия (Q3/Q4)",
      desc: "Стандарт подготовки стен Q3 (под обои и высококачественную покраску) с допусками до 1 мм на 2 погонных метра. Возведение перегородок с обязательной проклейкой армирующей сетки и демпферной ленты Knauf по периметру."
    },
    {
      icon: <ShieldCheck size={20} className="text-[#B8956A]" />,
      title: "Шумоизоляция и акустика",
      desc: "Интегрированная звукоизоляция полов (плавающая стяжка с минеральной плитой ТЗИ / Шуманет) и перегородок (двойной каркас ГКЛ с акустической ватой Acoustic Group). Уровень гашения шума до 58 дБ."
    },
    {
      icon: <Droplet size={20} className="text-[#B8956A]" />,
      title: "Инженерия и водоснабжение",
      desc: "Коллекторные узлы из нержавеющей стали Far, трубы с защитой от протечек Rehau Frost (сшитый полиэтилен), редукторы мембранного типа Honeywell, система автоперекрытия воды Neptun/Gidrolock с беспроводными датчиками в мокрых зонах."
    },
    {
      icon: <Zap size={20} className="text-[#B8956A]" />,
      title: "Электрика и автоматика",
      desc: "Использование безгалогенных негорючих кабелей ГОСТ (ВВГнг-LS Конкорд), автоматика ABB (серия System pro M compact), распределительные шкафы со слаботочным отсеком для Wi-Fi роутера и автоматическими блоками питания светодиодных лент."
    },
    {
      icon: <Wind size={20} className="text-[#B8956A]" />,
      title: "Премиальная вентиляция и климат",
      desc: "Распределённая система кондиционирования Daikin / Mitsubishi Electric с щелевыми адаптерами Schiberg, исключающими сквозняки и гармонично интегрированными в теневой профиль потолка."
    }
  ];

  return (
    <section id="renovation-section" className="bg-[#0F0F0F] text-[#F5F1EA] py-24 md:py-36 relative overflow-hidden border-b brass-border">
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
            <div key={i} className="flex gap-5 border-b pb-6 group hover:border-[#B8956A]/50 transition-colors duration-300 brass-border items-start">
              <div className="font-serif text-3xl md:text-4xl text-[#B8956A] font-light leading-none shrink-0 select-none tracking-tight pt-0.5">
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

        {/* Standards of Excellence Section */}
        <div className="mb-24">
          <div className="border-l-2 border-[#B8956A] pl-6 mb-12">
            <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-[#B8956A] block mb-2">
              MECHTY STANDARDS
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#F5F1EA] font-light">
              Технологические стандарты и материалы
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((std, i) => (
              <div key={i} className="bg-[#1A1A1A] p-6 border border-[#B8956A]/10 hover:border-[#B8956A]/30 transition-all duration-300 relative group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full border border-[#B8956A]/25 flex items-center justify-center bg-[#0F0F0F] text-[#B8956A] group-hover:bg-[#B8956A]/15 transition-all">
                    {std.icon}
                  </div>
                  <h4 className="font-sans text-base sm:text-lg font-semibold text-[#F5F1EA]">
                    {std.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C4BEB3] font-sans font-light leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
