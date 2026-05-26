import React, { useState } from 'react';
import { faqItems } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section id="faq" className="bg-[#F5F1EA] text-[#1A1A1A] py-24 md:py-36 border-b border-[#1A1A1A]/5">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#B8956A] font-bold block">
            ОТВЕТЫ НА НАШИ ЧАСТЫЕ ВОПРОСЫ
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light">
            Детали, зазоры, <br />
            <span className="italic text-[#8B6F4E] font-light">гарантийные соглашения</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#B8956A]/40 mx-auto mt-4" />
        </div>

        {/* Accordions track */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#EDE6D8]/50 border border-[#1A1A1A]/10 transition-all duration-300 overflow-hidden"
              >
                {/* Header clickable button */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex gap-3 items-center">
                    <HelpCircle size={16} className="text-[#8B6F4E] shrink-0 hidden sm:block" />
                    <span className="font-serif text-lg md:text-xl text-[#1A1A1A] font-light leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-[#B8956A] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Collapsible Answer */}
                <div
                  className={`transition-all duration-[0.4s] ease-in-out ${
                    isOpen ? 'max-h-[600px] opacity-100 border-t border-[#1A1A1A]/10' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 md:p-8 text-xs md:text-sm text-[#8B8478] font-sans font-light leading-relaxed space-y-3">
                    <p>{item.answer}</p>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#B8956A] text-right pt-2">
                      Единый стандарт холдинга MECHTY GROUP
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
