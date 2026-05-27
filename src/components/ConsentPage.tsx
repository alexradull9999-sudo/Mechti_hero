import React, { useEffect } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ConsentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Согласие на обработку персональных данных — Mechty Group";
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F1EA] py-20 px-6 md:px-12 font-sans selection:bg-[#B8956A]/30">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8956A] hover:text-[#EDE6D8] transition-colors"
          >
            <ArrowLeft size={14} /> На главную страницу
          </a>
          <div className="flex items-center gap-3 pt-4">
            <ShieldAlert className="text-[#B8956A]" size={28} />
            <h1 className="font-serif text-3xl md:text-5xl font-light">
              Согласие на <span className="italic text-[#B8956A]">обработку данных</span>
            </h1>
          </div>
          <p className="text-xs text-[#8B8478] font-mono uppercase">
            Действует бессрочно · ГК «Все начинается с Мечты»
          </p>
        </div>

        <div className="h-[1px] bg-[#B8956A]/20" />

        {/* Content */}
        <div className="space-y-8 text-sm text-[#C4BEB3] leading-relaxed font-light text-justify">
          
          <p className="italic">
            Пользователь, заполняя любую форму обратной связи на интернет-сайте, выражает свое согласие на обработку персональных данных (далее — Согласие) на условиях, изложенных ниже.
          </p>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#F5F1EA] font-light uppercase tracking-wider">
              1. Объект согласия
            </h2>
            <p>
              Я, действуя свободно, своей волей и в своем интересе, выражаю свое согласие ГК «Все начинается с Мечты» (Оператор), ОГРН 1097746822233, адрес: 123317, г. Москва, Пресненская наб., д. 6, стр. 2, на автоматизированную и неавтоматизированную обработку моих персональных данных.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#F5F1EA] font-light uppercase tracking-wider">
              2. Перечень персональных данных
            </h2>
            <p>
              Согласие дается на обработку следующих персональных данных, не являющихся специальными или биометрическими:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Фамилия, имя, отчество;</li>
              <li>Номер контактного телефона;</li>
              <li>Адрес электронной почты;</li>
              <li>Ориентировочная проектная площадь и характеристики жилого или коммерческого помещения;</li>
              <li>Пользовательские данные (сведения о местоположении, тип операционной системы, тип браузера, источник входа на Сайт, сведения о посещаемых страницах и действиях на них).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#F5F1EA] font-light uppercase tracking-wider">
              3. Способы обработки персональных данных
            </h2>
            <p>
              Под обработкой персональных данных понимается любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#F5F1EA] font-light uppercase tracking-wider">
              4. Цели и сроки обработки
            </h2>
            <p>
              Целью обработки персональных данных является предоставления Пользователю индивидуальной консультации, ориентировочного расчета сметы, организации встреч в шоу-руме и информирования о ходе выполнения проектов по дизайну и ремонту.
            </p>
            <p>
              Персональные данные обрабатываются до достижения целей обработки или до момента отзыва согласия Пользователем (в зависимости от того, какое событие наступит раньше).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#F5F1EA] font-light uppercase tracking-wider">
              5. Порядок отзыва
            </h2>
            <p>
              Настоящее согласие может быть отозвано в любой момент путем направления письменного заявления в адрес Оператора по электронной почте: <a href="mailto:hello@mechtygroup.ru" className="text-[#B8956A] hover:underline">hello@mechtygroup.ru</a>.
            </p>
            <p>
              В случае отзыва согласия Оператор вправе продолжить обработку персональных данных без согласия только при наличии оснований, указанных в пунктах 2–11 части 1 статьи 6 Федерального закона № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <hr className="border-[#B8956A]/20" />

          <p className="text-xs text-[#8B8478]">
            Подтверждая данное Согласие, вы подтверждаете достоверность указанных данных и гарантируете, что данные принадлежат лично вам.
          </p>

        </div>

      </div>
    </div>
  );
}
