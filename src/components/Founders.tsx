import React from 'react';
import { Send, Tv, Award, Users, MessageSquare } from 'lucide-react';

interface FoundersProps {
  onOpenConsultation?: (customMessage?: string, customTitle?: string, customDesc?: string) => void;
}

export default function Founders({ onOpenConsultation }: FoundersProps) {
  return (
    <section id="about" className="bg-[#F5F1EA] text-[#1A1A1A] py-24 md:py-36 border-b border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Tag */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#B8956A] font-bold block">
            ОСНОВАТЕЛИ ХОЛДИНГА МЕЧТЫ
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
            Семья, которая <br />
            <span className="italic text-[#8B6F4E]">строит мечты</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#B8956A]/40 mx-auto mt-4" />
        </div>

        {/* Prominent Quote Block */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <blockquote className="space-y-4">
            <span className="font-serif text-5xl md:text-6xl text-[#B8956A] block leading-none select-none">“</span>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] font-light leading-relaxed italic -mt-6">
              Кто-то мечтает о бизнесе, мы мечтали о надежном доме. Наша компания родилась словно сама собой... Всё, что мы делали для безопасности и комфорта своей собственной семьи, оказалось ценным и важным для сотен других людей в Москве.
            </p>
            <cite className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#8B6F4E] block mt-4">
              — Юрий и Диана Постриганевы
            </cite>
          </blockquote>
        </div>

        <hr className="border-[#B8956A]/20 max-w-4xl mx-auto mb-16" />

        {/* Sub-details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Regalia Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
              РЕГАЛИИ ДИАНЫ ПОСТРИГАНЕВОЙ:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-4 items-start bg-[#EDE6D8]/40 p-5 border border-[#1A1A1A]/5">
                <Tv size={20} className="text-[#8B6F4E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-sans font-bold text-[#1A1A1A] block">Телевизионная карьера</span>
                  <p className="text-[11px] sm:text-xs text-[#8B8478] leading-relaxed font-light">
                    Автор и ведущая флагманской программы «Эта жизнь МЕЧТА» на Europa Plus TV.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-[#EDE6D8]/40 p-5 border border-[#1A1A1A]/5">
                <Send size={20} className="text-[#8B6F4E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-sans font-bold text-[#1A1A1A] block">Личный Telegram-блог</span>
                  <p className="text-[11px] sm:text-xs text-[#8B8478] leading-relaxed font-light">
                    Полезные посты и живые репортажи о премиум-недвижимости, мебельных трендах и стройке в Москве.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-[#EDE6D8]/40 p-5 border border-[#1A1A1A]/5 sm:col-span-2">
                <Award size={20} className="text-[#8B6F4E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-sans font-bold text-[#1A1A1A] block">Бизнес-клубы Москвы</span>
                  <p className="text-[11px] sm:text-xs text-[#8B8478] leading-relaxed font-light">
                    Действующий член высших лиг «Атланты», «Клуба Первых» от Сбербанка и других.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-[#B8956A]/20 lg:pl-10">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
              КОМАНДА ЭКСПЕРТОВ:
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-xs sm:text-sm text-[#8B8478]">
                <Users size={20} className="text-[#B8956A] shrink-0 mt-0.5" />
                <p className="leading-relaxed font-light">
                  Команда управляет <strong className="text-[#1A1A1A] font-bold">180+ экспертами и подрядчиками</strong> под единым брендом: лицензированные градостроительные архитекторы, сертифицированные инженеры, юристы, прорабы-строители, снабженцы и декораторы. Работают как единый слаженный организм.
                </p>
              </div>
              <div className="bg-[#B8956A]/5 p-5 border border-[#B8956A]/10 space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#B8956A] font-bold block">Кураторы &amp; Контроль</span>
                <p className="text-[11px] text-[#8B8478] leading-relaxed font-light">
                  Юрий и Диана Постриганевы лично координируют ключевые вехи проектов, гарантируя соблюдение премиальных стандартов качества.
                </p>
              </div>

              {onOpenConsultation && (
                <button
                  onClick={() => onOpenConsultation(
                    'Запрос: Вопрос основателям холдинга (Юрию и Диане Постриганевым).',
                    'Задать вопрос Юрию и Диане',
                    'Напишите ваш вопрос Юрию и Диане. Мы передадим его основателям для обратной связи или прямого ответа.'
                  )}
                  className="w-full py-3.5 border-2 border-[#8B6F4E] hover:bg-[#8B6F4E] hover:text-white text-[#8B6F4E] transition-all duration-300 text-xs uppercase tracking-widest font-sans font-bold flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <MessageSquare size={13} />
                  <span>Задать вопрос</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Giant Interior Photo Banner (Replacing Team Photo to comply with privacy rules) */}
        <div className="mt-16 md:mt-24">
          <div className="relative h-[320px] sm:h-[450px] md:h-[550px] overflow-hidden border border-[#B8956A]/20 shadow-2xl bg-[#EDE6D8]">
            <img
              src="/site-images/photo-1600585154340-be6161a56a0c.avif"
              alt="Усадьба"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            {/* Elegant vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/15 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B8956A] font-bold block">
                  НАШИ РЕАЛИЗОВАННЫЕ ПРОЕКТЫ
                </span>
                <h4 className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-[#F5F1EA] italic leading-tight">
                  «Кто-то мечтает о бизнесе, мы мечтали о надежном доме»
                </h4>
              </div>
              <div className="bg-[#B8956A] text-[#0F0F0F] text-xs uppercase tracking-widest font-extrabold px-5 py-2.5 whitespace-nowrap">
                Эстетика и качество Mechty
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
