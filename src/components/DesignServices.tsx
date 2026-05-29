import React, { useState } from 'react';
import { designServices } from '../data';
import { Check, ClipboardList, HelpingHand } from 'lucide-react';

interface DesignServicesProps {
  onOpenConsultation: (msg?: string) => void;
  onScrollToSection?: (id: string) => void;
}

export default function DesignServices({ onOpenConsultation, onScrollToSection }: DesignServicesProps) {
  const [activePackage, setActivePackage] = useState<string>("ds-3");

  const selectedPack = designServices.find(s => s.id === activePackage);

  return (
    <section id="design-section" className="bg-[#F5F1EA] text-[#1A1A1A] py-24 md:py-36 border-b border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back navigation button */}
        {onScrollToSection && (
          <button
            onClick={() => onScrollToSection('directions')}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold text-[#8B6F4E] hover:text-[#1A1A1A] transition-colors mb-8 cursor-pointer bg-transparent border-none p-0 inline-flex"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Назад к направлениям
          </button>
        )}
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4">
          <span className="text-sm uppercase font-sans tracking-[0.2em] text-[#8B6F4E] font-bold block">
            ИНЖЕНЕРНО-ДИЗАЙНЕРСКОЕ ПРОЕКТИРОВАНИЕ
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
            Дизайн, в котором учтена <br />
            <span className="italic text-[#8B6F4E]">кажная монтажная деталь</span>
          </h2>
          <p className="text-base md:text-lg text-[#322F2A] font-sans font-normal leading-relaxed max-w-2xl">
            Мы не рисуем «картинки из интернета», которые невозможно построить. Каждый дизайн-проект изначально разрабатывается под кураторством главного инженера строительного департамента холдинга.
          </p>
        </div>

        {/* Content Gridsplit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Large rendering photo with overlay */}
          <div className="lg:col-span-5 space-y-6 relative">
            <div className="relative h-[480px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
                alt="3D Visualization Render of Luxury Kitchen"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[4s]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0F0F0F]/15" />
              <div className="absolute bottom-6 left-6 right-6 bg-[#0F0F0F]/95 text-[#F5F1EA] p-5 backdrop-blur-sm border border-[#B8956A]/30">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B8956A] block mb-1 font-bold">
                  ЭТАЛОН КРАСОТЫ
                </span>
                <p className="text-sm font-normal text-[#EDE6D8]">
                  «Чертеж — это закон, визуализация — его объемное воплощение. Если в проекте начерчен зазор в 2 мм, мы возведем стену именно так.»
                </p>
              </div>
            </div>
            
            <div className="p-5 bg-[#EDE6D8] border border-[#B8956A]/20 flex items-start gap-4">
              <ClipboardList size={22} className="text-[#8B6F4E] mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-sm uppercase font-sans tracking-widest font-bold text-[#1A1A1A]">
                  Бесплатный выезд на обмер
                </h4>
                <p className="text-sm text-[#4E473F] leading-relaxed mt-1 font-normal">
                  Используем современные лазерные линейки повышенной точности для формирования детального обмерного плана помещений.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Services Table */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              {designServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setActivePackage(service.id)}
                  className={`p-6 border cursor-pointer transition-all duration-300 relative ${
                    activePackage === service.id
                      ? 'bg-white border-[#B8956A] shadow-md'
                      : 'bg-transparent border-[#1A1A1A]/10 hover:border-[#B8956A]/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-light">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#4A453F] mt-1 leading-relaxed max-w-lg font-normal">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-right sm:shrink-0">
                      <span className="text-lg sm:text-2xl font-serif text-[#8B6F4E] font-bold block">
                        {service.price}
                      </span>
                      <span className="text-xs uppercase tracking-wider font-sans text-[#4D4841] font-bold">
                        стоимость пакета
                      </span>
                    </div>
                  </div>

                  {/* Features list (expanded if active) */}
                  {activePackage === service.id && (
                    <div className="mt-6 pt-6 border-t border-[#1A1A1A]/10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fadeIn">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-[#1A1A1A] font-semibold">
                          <Check size={14} className="text-[#B8956A] mt-1" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Discount promo badge */}
            <div className="bg-[#B8956A]/10 border border-[#B8956A]/30 p-5 mt-6 mb-2">
              <div className="flex gap-4 items-start">
                <HelpingHand className="text-[#8B6F4E] shrink-0 mt-0.5" size={20} />
                <div className="space-y-1">
                  <span className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-wider block">
                    Проектирование в подарок при ремонте
                  </span>
                  <p className="text-xs sm:text-sm text-[#4E473F] leading-relaxed font-light">
                    Если мы беремся за реализацию и ремонт вашего объекта, мы возвращаем <strong className="text-[#1A1A1A] font-semibold">100% стоимости проекта</strong> в виде скидки на сам ремонт. В этом случае разработка дизайн-проекта обходится вам бесплатно!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-between border-t border-[#1A1A1A]/15">
              <div className="text-center sm:text-left">
                <span className="text-sm text-[#4D4841] block font-semibold">Выбранный пакет услуг</span>
                <span className="font-serif text-lg text-[#1A1A1A] font-light italic">
                  {selectedPack?.title}
                </span>
              </div>
              <button
                onClick={() => onOpenConsultation(`Здравствуйте, интересует пакет услуг проектирования: "${selectedPack?.title}". Прошу связаться со мной.`)}
                className="px-6 py-4 bg-[#1A1A1A] hover:bg-[#B8956A] text-[#F5F1EA] hover:text-[#0F0F0F] text-sm uppercase tracking-widest font-sans font-bold transition-all duration-300 transform active:scale-95 whitespace-nowrap"
              >
                Узнать, какой пакет подходит вашей квартире
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
