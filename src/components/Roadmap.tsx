import React from 'react';
import { roadmapSteps } from '../data';
import { HelpCircle, Calendar, ArrowDown } from 'lucide-react';

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-[#F5F1EA] text-[#1A1A1A] py-24 md:py-36 border-b border-[#1A1A1A]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header content */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4">
          <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#B8956A] font-bold block">
            КАК СТРОИТСЯ СОТРУДНИЧЕСТВО
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
            Семь шагов к <br />
            <span className="italic text-[#8B6F4E]">интерьеру вашей мечты</span>
          </h2>
          <p className="text-sm md:text-base text-[#8B8478] font-sans font-light leading-relaxed max-w-xl">
            Понятный, прозрачный и пошагово регламентированный процесс. Вы всегда знаете, на какой точке находимся прямо сейчас и что делаем дальше.
          </p>
        </div>

        {/* Steps track visual representation */}
        <div className="relative border-l border-[#B8956A]/20 ml-6 pl-10 md:pl-16 space-y-12 py-4">
          {roadmapSteps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Gold dot with number inside */}
              <div className="absolute -left-[61px] md:-left-[85px] top-1.5 w-10 h-10 rounded-full bg-[#F5F1EA] border-2 border-[#B8956A] flex items-center justify-center font-serif text-sm font-bold text-[#8B6F4E] group-hover:bg-[#B8956A] group-hover:text-[#F5F1EA] transition-all duration-300 shadow-sm z-10">
                {step.number}
              </div>

              {/* Step info content card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-4 lg:col-span-3">
                  <h3 className="font-serif text-xl md:text-2xl font-light text-[#1A1A1A] group-hover:text-[#B8956A] transition-colors leading-tight">
                    {step.title}
                  </h3>
                </div>
                <div className="md:col-span-8 lg:col-span-9 max-w-2xl bg-[#EDE6D8]/30 p-5 border border-[#1A1A1A]/5 group-hover:bg-[#EDE6D8]/50 transition-colors">
                  <p className="text-xs md:text-sm text-[#8B8478] font-sans font-light leading-relaxed">
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
            ВЕЗДЕ СОБЛЮДАЕТСЯ АВТОРСКИЙ НАДЗОР КАНАЛОВ СМЕТНЫХ ГАРАНТИЙ
          </p>
        </div>

      </div>
    </section>
  );
}
