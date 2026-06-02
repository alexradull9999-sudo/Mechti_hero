import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function USPComparison() {
  const roles = [
    'Брокер (подбор и оценка недвижимости)',
    'Юрист (проверка сделок и договоров)',
    'Специалист по согласованию планировок (МЖИ)',
    'Представитель в УК (защита интересов в Управляющей Компании)',
    'Архитектор (конструктивные решения КР/АР)',
    'Дизайнер интерьера (эскизы, стилистика, ведомости)',
    'Инженер вентиляции и кондиционирования (ВиК)',
    'Инженер водопровода и отопления (ВК/ОВ)',
    'Электропроектировщик (проект электроснабжения ЭОМ)',
    'Инженер слаботочных систем (СС и Умный Дом)',
    'Сметчик-калькулятор (расчет объёмов и бюджетов)',
    'Технадзор (независимый контроль строительных решений)',
    'Снабженец (логистика, поиск и закупка отделочных материалов)',
    'Прораб (управление строительным процессом на объекте)',
    'Бригада черновых строителей (демонтаж, стяжка, перегородки)',
    'Бригада чистовых отделочников (плиточники, маляры)',
    'Замерщик мебельных изделий (использование лазерных линеек)',
    'Технолог по мебельной комплектации (конструкторские карты)',
    'Поставщик дверей, порталов и стеновых панелей',
    'Производитель кухонных гарнитуров на заказ',
    'Производитель корпусной мебели (гардеробные, шкафы)',
    'Поставщик мягкой мебели (диваны, спальные системы)',
    'Поставщик светотехники (люстры, трековые системы)',
    'Поставщик сантехнического оборудования и инсталляций',
    'Монтажники климатического оборудования и кондиционеров',
    'Текстильный декоратор (пошив штор и оформление)',
    'Специалист по финальному клинингу и сдаче',
    'Авторский надзор (контроль соответствия концепции)',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 20 } 
    },
  };

  return (
    <section id="usp" className="bg-[#0F0F0F] text-[#F5F1EA] pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      {/* Subtle ambient light dot in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8956A]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header label */}
        <div className="space-y-4 mb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#B8956A] block">
            ГЛАВНАЯ ФИЛОСОФИЯ ХОЛДИНГА
          </span>
          
          {/* Main heading slogan with sequential animations */}
          <div className="font-serif text-[44px] sm:text-[80px] md:text-[110px] font-light leading-[0.95] text-[#F5F1EA] space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Один партнёр.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Один договор.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Один <span className="italic text-[#B8956A]">результат.</span>
            </motion.div>
          </div>
        </div>

        {/* Top thin line */}
        <div className="h-[1px] bg-[#B8956A]/20 w-full my-12" />

        {/* Comparison columns in 12-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-stretch">
          
          {/* LEFT COLUMN: The Chaotic 24 contacts list */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B8478] block">
                  ОБЫЧНЫЙ ПУТЬ КЛИЕНТА · 28 контактов в одиночку
                </span>
                <span className="text-xs text-[#8B8478] mt-2 block font-sans">
                  Если делать ремонт самостоятельно, через эти 28 ролей придётся пройти лично — найти, согласовать договоры, контролировать, переплачивать на стыках.
                </span>
                <div className="h-[1px] w-12 bg-[#B8956A]/35 mt-2" />
              </div>

              {/* A dense wall of roles appearing staggered */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 md:grid-cols-1 gap-x-4 md:gap-x-0 gap-y-[3px]"
              >
                {roles.map((role, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="font-sans text-xs tracking-wide text-[#BDB5A7] py-0.5 border-b border-white/5 hover:text-[#B8956A] transition-all duration-300"
                  >
                    {role}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="mt-8 p-5 border-l-2 border-[#E13A3E]/60 bg-[#161616]/60 backdrop-blur-sm rounded-r-lg">
              <p className="font-serif text-[15px] md:text-[17px] text-[#EDE6D8] font-light italic leading-relaxed">
                «Срок — непредсказуем. Качество — на удачу. Ответственный за общий результат — никто.»
              </p>
            </div>
          </div>

          {/* MIDDLE COLUMN: Vertical line separator with Arrow action */}
          <div className="md:col-span-2 flex flex-col items-center justify-center py-4 md:py-0">
            {/* Desktop View Divider */}
            <div className="hidden md:flex flex-col items-center justify-center h-full min-h-[400px] w-full">
              <div className="w-[1px] bg-gradient-to-b from-transparent via-[#B8956A]/45 to-transparent flex-grow" />
              <div className="my-6 relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#B8956A]/30 bg-[#0F0F0F] flex items-center justify-center z-10 shadow-lg">
                  <ArrowRight size={20} className="text-[#B8956A]" />
                </div>
                <span className="absolute top-14 text-[9px] uppercase tracking-[0.3em] text-[#B8956A] whitespace-nowrap">
                  ЕДИНЫЙ КОНТРАКТ
                </span>
              </div>
              <div className="w-[1px] bg-gradient-to-b from-transparent via-[#B8956A]/45 to-transparent flex-grow" />
            </div>

            {/* Mobile View Divider */}
            <div className="flex md:hidden flex-col items-center my-6 w-full">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B8956A]/35 to-transparent" />
              <div className="my-4 relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-[#B8956A]/30 bg-[#0F0F0F] flex items-center justify-center z-10">
                  <ArrowDown size={16} className="text-[#B8956A]" />
                </div>
                <span className="text-[8px] uppercase tracking-[0.3em] text-[#B8956A] mt-2 block">
                  ЕДИНЫЙ КОНТРАКТ
                </span>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B8956A]/35 to-transparent" />
            </div>
          </div>

          {/* RIGHT COLUMN: The Mechty Group Seamless Single Point Monogram */}
          <div className="md:col-span-5 flex flex-col justify-between self-stretch py-2">
            <div className="space-y-6">
              <div className="flex flex-col md:items-start items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8956A] block">
                  С НАМИ · одна команда, один контакт
                </span>
                <span className="text-xs text-[#B8956A] mt-2 block font-sans">
                  С одной компанией и личным менеджером.
                </span>
                <div className="h-[1px] w-12 bg-[#B8956A]/35 mt-2" />
              </div>

              {/* Huge Monogram Litera M with scale entrance animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="font-serif text-[180px] sm:text-[280px] md:text-[340px] font-thin text-[#B8956A] leading-[0.8] text-center select-none py-2"
              >
                M
              </motion.div>

              {/* Path of solution */}
              <div className="space-y-4 text-center">
                <span className="text-sm md:text-base text-[#F5F1EA] font-medium tracking-wider block max-w-xl mx-auto">
                  Подбор/строительство объекта → дизайн → ремонт → комплектация → ключи
                </span>
                <p className="text-base md:text-[19px] font-serif font-medium text-[#B8956A] tracking-wider leading-relaxed text-center">
                  Пожизненная гарантия на несущие конструкции и инженерию*
                </p>
                <p className="text-xs md:text-sm text-[#C4BCB1] leading-relaxed max-w-lg mx-auto text-center font-sans font-light">
                  *На стены, перегородки, стяжку, штукатурку, гипсокартонные потолки, черновую электрику, шумоизоляцию, инженерные трубопроводы Rehau — на весь срок эксплуатации дома. Условия и исключения — в договоре.
                </p>
              </div>
            </div>

            <span className="text-xs md:text-sm text-[#A59E92] italic mt-12 md:mt-auto text-center md:text-right block">
              Все условия фиксируются в договоре с возможностью изменения по соглашению сторон.
            </span>
          </div>

        </div>

        {/* Bottom thin line */}
        <div className="h-[1px] bg-[#B8956A]/20 w-full my-12" />

        {/* Detailed concluding summary description texts beneath lines */}
        <div className="max-w-3xl mx-auto text-center space-y-6 text-sm md:text-lg text-[#C4BCB1] leading-relaxed font-light mt-10 md:mt-14">
          <p>
            Обычно клиент координирует более 100 подрядчиков, поставщиков услуг и товаров в хаосе. Mechty берёт полную ответственность за весь путь — от подбора квартиры до расстановки декора.
          </p>
          <p>
            Свой проектный департамент. Сертифицированная инженерия. Цифровой ERP-контроль.
          </p>
        </div>

      </div>
    </section>
  );
}
