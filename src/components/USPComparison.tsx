import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function USPComparison() {
  const roles = [
    'Брокер',
    'Юрист',
    'Согласование планировок',
    'Представление в управляющей компании',
    'Консьерж сервис',
    'Архитектор',
    'Дизайнер',
    'Инженер ОВ',
    'Инженер ВК',
    'Электрик-проект',
    'Слаботочник',
    'Снабженец',
    'Прораб',
    'Бригада черновых',
    'Бригада чистовых',
    'Кухня на заказ',
    'Корпусная мебель',
    'Мягкая мебель',
    'Шторы и текстиль',
    'Декоратор',
    'Поставщик света',
    'Поставщик сантехники',
    'Монтажники',
    'Авторский надзор',
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
          
          {/* LEFT COLUMN: The Chaotic 24 contacts list */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B8478] block">
                Обычный путь · 24 контакта
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
                  className="font-sans text-sm sm:text-[15px] tracking-wide text-[#BDB5A7] py-1 border-b border-white/5 hover:text-[#B8956A] transition-all duration-300"
                >
                  {role}
                </motion.div>
              ))}
            </motion.div>

            <p className="text-[11px] text-[#8B8478] italic mt-8 leading-relaxed">
              Задержка до 6 месяцев · Переплата 15–25% на стыках · Никто не отвечает за общий результат
            </p>
          </div>

          {/* MIDDLE COLUMN: Vertical line separator with Arrow action */}
          <div className="md:col-span-2 flex flex-col items-center justify-center self-stretch py-4 md:py-0">
            {/* Desktop View Divider */}
            <div className="hidden md:flex flex-col items-center justify-center h-full min-h-[400px] w-full">
              <div className="w-[1px] bg-gradient-to-b from-transparent via-[#B8956A]/45 to-transparent flex-grow" />
              <div className="my-6 relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#B8956A]/30 bg-[#0F0F0F] flex items-center justify-center z-10 shadow-lg">
                  <ArrowRight size={20} className="text-[#B8956A]" />
                </div>
                <span className="absolute top-14 text-[9px] uppercase tracking-[0.3em] text-[#B8956A] whitespace-nowrap">
                  ОДИН ДОГОВОР
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
                  ОДИН ДОГОВОР
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
                  MECHTY GROUP · ОДИН ХОЛДИНГ
                </span>
                <div className="h-[1px] w-12 bg-[#B8956A]/35 mt-2" />
              </div>

              {/* Huge Monogram Litera M with scale entrance animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="font-serif text-[180px] sm:text-[280px] md:text-[340px] font-thin text-[#B8956A] leading-[0.8] text-center select-none py-4"
              >
                M
              </motion.div>

              {/* Path of solution */}
              <span className="text-[12px] text-[#F5F1EA] font-light tracking-wider text-center block max-w-sm mx-auto">
                Подбор квартиры → дизайн → ремонт → мебель → ключи
              </span>
            </div>

            <span className="text-[11px] text-[#8B8478] italic mt-12 md:mt-auto text-center md:text-right block">
              Один договор. Фиксированная цена. Гарантия 5 лет.
            </span>
          </div>

        </div>

        {/* Bottom thin line */}
        <div className="h-[1px] bg-[#B8956A]/20 w-full my-12" />

        {/* Detailed concluding summary description texts beneath lines */}
        <div className="max-w-3xl mx-auto text-center space-y-6 text-sm md:text-[15px] text-[#8B8478] leading-relaxed font-light mt-10 md:mt-14">
          <p>
            Обычно клиент координирует от 10 до 100 подрядчиков в хаосе. Мы изменили правила. Mechty Group берёт полную ответственность за весь путь — от подбора квартиры до расстановки свечей на комоде.
          </p>
          <p>
            Свой проектный департамент. Сертифицированная инженерия. Собственный мебельный завод. Цифровой ERP-контроль.
          </p>
        </div>

      </div>
    </section>
  );
}
