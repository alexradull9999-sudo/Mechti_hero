import React from 'react';
import { Send, MessageSquare, Sparkles, Building, Phone, Youtube } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const socialHandles = [
    { name: "Telegram", label: "t.me/Vadim_Yastrebov", iconType: 'telegram', url: 'https://t.me/Vadim_Yastrebov' },
    { name: "Мессенджер Макс", label: "Мессенджер Макс", iconType: 'messenger', url: 'https://max.ru/u/f9LHodD0cOI3kLephDN2gD-mh2-FWe968N1MDGmz9ix6ZNJJPru11CPCRc0' },
    { name: "Яндекс.Дзен", label: "Дзен", iconType: 'zen', url: 'https://dzen.ru/mechti_group' },
    { name: "YouTube", label: "YouTube", iconType: 'youtube', url: 'https://www.youtube.com/@mechti_group' }
  ];

  return (
    <footer className="bg-[#0F0F0F] text-[#F5F1EA]/80 py-16 border-t border-[#B8956A]/10 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#B8956A]/10 pb-12 mb-12">
          
          {/* Column 1: Company stamp & handles */}
          <div className="space-y-4">
            <div
              onClick={() => onScrollToSection('hero')}
              className="cursor-pointer flex items-center group"
            >
              <Logo 
                className="h-9 md:h-11 w-auto opacity-95 group-hover:opacity-100 transition-all duration-300 text-[#B8956A] hover:text-[#EDE6D8]"
              />
            </div>
            
            <p className="text-[#8B8478] leading-relaxed max-w-xs text-[11px]">
              Проектируем, строим и полностью комплектуем премиум-интерьеры в Москве с 2009 года. Полная ответственность за ведомости и результаты в рамках контракта.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {socialHandles.map((soc, i) => (
                <a 
                  key={i} 
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] bg-[#1A1A1A] p-2 border border-[#B8956A]/10 hover:border-[#B8956A]/30 text-[#EDE6D8] transition-colors leading-none cursor-pointer"
                >
                  {soc.iconType === 'telegram' && <Send size={11} className="text-[#B8956A]" />}
                  {soc.iconType === 'messenger' && <MessageSquare size={11} className="text-[#B8956A]" />}
                  {soc.iconType === 'youtube' && <Youtube size={11} className="text-[#B8956A]" />}
                  {soc.iconType === 'zen' && <Sparkles size={11} className="text-[#B8956A]" />}
                  <span>{soc.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Directions links (anchors) */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#B8956A] font-semibold">
              Направления холдинга
            </h4>
            <div className="flex flex-col gap-3">
              <button onClick={() => onScrollToSection('real-estate')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Недвижимость в продаже
              </button>
              <button onClick={() => onScrollToSection('design-section')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Дизайн интерьеров
              </button>
              <button onClick={() => onScrollToSection('renovation-section')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Ремонт под ключ
              </button>
              <button onClick={() => onScrollToSection('furniture-section')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Мебелирование, полная комплектация
              </button>
            </div>
          </div>

          {/* Column 3: Corporate links (anchors) */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#B8956A] font-semibold">
              Компания в Мск
            </h4>
            <div className="flex flex-col gap-3">
              <button onClick={() => onScrollToSection('about')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Юрий и Диана Постриганевы
              </button>
              <button onClick={() => onScrollToSection('usp')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Преимущества холдинга
              </button>
              <button onClick={() => onScrollToSection('portfolio')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Кейсы портфолио в ЖК
              </button>
              <button onClick={() => onScrollToSection('faq')} className="hover:text-[#B8956A] text-left transition-colors font-sans text-xs">
                Детали гарантий & Смета
              </button>
            </div>
          </div>

          {/* Column 4: Contact details summary */}
          <div className="space-y-4 bg-[#1A1A1A] p-5 border border-[#B8956A]/15">
            <div className="flex items-center gap-1.5 text-xs text-[#B8956A] font-semibold font-serif">
              <Sparkles size={12} />
              <span>КОНТАКТЫ ХОЛДИНГА</span>
            </div>
            
            <div className="space-y-2">
              <a href="tel:+79055164466" className="font-sans text-base text-[#EDE6D8] font-bold block hover:text-[#B8956A] transition-colors">
                +7 (905) 516-44-66
              </a>
              <a
                href="mailto:hello@mechtygroup.ru"
                className="font-mono text-xs text-[#EDE6D8] block hover:text-[#B8956A] transition-colors"
              >
                hello@mechtygroup.ru
              </a>
            </div>
            <p className="text-[10px] text-[#8B8478] leading-relaxed">
              Запись на презентации и консультации в Москве осуществляется заблаговременно.
            </p>
          </div>

        </div>

        {/* Footer Base Legal details row */}
        <div className="space-y-6 pt-6 border-t border-[#B8956A]/10">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 text-[#8B8478] text-[11px] text-center lg:text-left">
            <div className="space-y-1.5">
              <span className="block font-medium text-[#EDE6D8]/90">© 2026 ГК «Всё начинается с Мечты». Все права защищены.</span>
              <span className="block text-[10px]">ИП Постриганев Ю.В. &nbsp;|&nbsp; ИНН: 235701234508, ОГРНИП: 312231120100045</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-[10px] items-center lg:items-end">
              <a href="/privacy" className="hover:text-[#B8956A] transition-colors underline decoration-[#B8956A]/30 underline-offset-4">Политика обработки персональных данных</a>
              <a href="/consent" className="hover:text-[#B8956A] transition-colors underline decoration-[#B8956A]/30 underline-offset-4">Согласие на обработку персональных данных</a>
            </div>
          </div>
          
          <p className="text-[10px] text-[#8B8478] leading-relaxed max-w-7xl text-justify">
            Информация на настоящем интернет-сайте носит исключительно ознакомительный характер, не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса РФ, и ни при каких условиях не может трактоваться как публичное обещание, оферта или гарантия заключения сделки. Конкретные условия сотрудничества, цены, сроки и параметры оказываемых услуг фиксируются исключительно в двусторонних договорах.
          </p>
        </div>

      </div>
    </footer>
  );
}
