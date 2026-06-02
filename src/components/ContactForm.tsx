import React, { useState } from 'react';
import { MapPin, Phone, Mail, Sparkles, Send, CheckCircle } from 'lucide-react';
import { formatPhoneNumber, isValidPhoneNumber } from '../utils';

interface ContactFormProps {
  customMessage?: string;
  onClearCustomMessage?: () => void;
}

export default function ContactForm({ customMessage, onClearCustomMessage }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState<'telegram' | 'whatsapp' | 'messenger'>('telegram');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !name || !isValidPhoneNumber(phone)) return;

    setIsSubmitting(true);
    
    // Simulate premium submission response (0.8s)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onClearCustomMessage) onClearCustomMessage();
      
      // Cleanup
      setName('');
      setPhone('');
      setEmail('');
      setArea('');
      setMessage('');
      setConsent(true);
    }, 1200);
  };

  const activeMsg = message || customMessage || '';

  return (
    <section id="contacts" className="bg-[#0F0F0F] text-[#F5F1EA] py-24 md:py-36 relative overflow-hidden border-b border-[#B8956A]/10">
      
      {/* Visual glowing gold lines */}
      <div className="absolute left-1/2 bottom-0 w-96 h-96 bg-[#B8956A]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Contact Data & Maps */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#B8956A] block">
                НАШ ХОД ХОЛДИНГА В МОСКВЕ
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
                Готовы обсудить <br />
                <span className="italic text-[#B8956A] font-light">ваш проект?</span>
              </h2>
              <p className="text-sm md:text-base text-[#C4BEB3] font-sans font-light leading-relaxed max-w-sm">
                Запишитесь на закрытую презентацию в нашем готовом объекте и оценить всё, что вас интересует.
              </p>
            </div>

            {/* Structured Contact Units List (Excluding private address and maps per rules) */}
            <div className="space-y-6">

              <div className="flex gap-4 items-start pb-4 border-b border-[#B8956A]/10 max-w-sm">
                <div className="w-10 h-10 rounded-full border border-[#B8956A]/30 flex items-center justify-center bg-[#1A1A1A]">
                  <Phone size={16} className="text-[#B8956A]" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-sans text-[#B8956A] tracking-widest block font-bold">Контакты</span>
                  <span className="text-xs text-[#C4BEB3] block">Прямой контакт с руководителем продаж — Вадим</span>
                  <a href="tel:+79055164466" className="text-base font-sans text-[#EDE6D8] font-extrabold block hover:text-[#B8956A] transition-colors">
                    +7 (905) 516-44-66
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start max-w-sm">
                <div className="w-10 h-10 rounded-full border border-[#B8956A]/30 flex items-center justify-center bg-[#1A1A1A]">
                  <Mail size={16} className="text-[#B8956A]" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-sans text-[#B8956A] tracking-widest block font-bold">Email</span>
                  <a href="mailto:hello@mechtygroup.ru" className="text-sm font-sans text-[#EDE6D8] font-bold block hover:text-[#B8956A] transition-colors">
                    hello@mechtygroup.ru
                  </a>
                </div>
              </div>

            </div>

            {/* Brass Separator Line replacing the map */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#B8956A]/45 to-transparent my-10" />
          </div>

          {/* Right Block: Conversion Contact Form */}
          <div className="lg:col-span-7 bg-[#1A1A1A] border border-[#B8956A]/30 p-8 md:p-12 shadow-2xl relative">
            
            {/* Lead transition confirm state */}
            {isSubmitted ? (
              <div className="text-center py-20 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-[#B8956A]/20 border border-[#B8956A] text-[#B8956A] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-3xl font-light text-[#F5F1EA]">
                  Заявка успешно принята
                </h3>
                <div className="h-[1px] w-12 bg-[#B8956A]/40 mx-auto" />
                <p className="text-sm text-[#C4BEB3] max-w-sm mx-auto leading-relaxed font-semibold">
                  Буря эмоций! Юрий или персональный старший архитектор Mechty Group свяжется с вами по указанному телефону <strong className="text-[#F5F1EA] font-extrabold">в течение 15 минут</strong> для предметного обсуждения концепта.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 border border-[#B8956A]/40 text-[#B8956A] uppercase tracking-widest font-sans text-xs hover:bg-[#B8956A]/5 font-bold"
                >
                  Отправить ещё одну форму
                </button>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                <div className="space-y-2 border-b border-[#B8956A]/10 pb-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#B8956A] block font-bold">
                    ЗАПРЕДМЕТНОЕ ОБРАЩЕНИЕ
                  </span>
                  <h3 className="font-serif text-2xl text-[#F5F1EA] font-light">
                    Расскажите нам о вашем объекте
                  </h3>
                </div>

                {customMessage && (
                  <div className="bg-[#B8956A]/10 border-l-2 border-[#B8956A] p-3 text-xs text-[#EDE6D8] space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold block text-[#B8956A]">Параметры из калькулятора подставлены:</span>
                    <p className="font-mono italic">{customMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Field 1 */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-sans text-[#C4BEB3] block font-bold sm:min-h-[32px] flex items-end pb-1">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Сергей Александрович"
                      className="w-full bg-[#0F0F0F] border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-3.5 text-sm text-[#F5F1EA] font-sans transition-colors font-semibold shadow-sm"
                    />
                  </div>

                  {/* Field 2 */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-sans text-[#C4BEB3] block font-bold sm:min-h-[32px] flex items-end pb-1">
                      Ваш телефон *
                      {phone && !isValidPhoneNumber(phone) && (
                        <span className="text-[#B8956A] text-[10px] normal-case ml-2 font-medium animate-pulse">Неполный номер</span>
                      )}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-[#0F0F0F] border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-3.5 text-sm text-[#F5F1EA] font-sans transition-colors font-semibold shadow-sm"
                    />
                  </div>

                  {/* Field 3 */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-sans text-[#C4BEB3] block font-bold sm:min-h-[32px] flex items-end pb-1">Ваш Email (Опционально)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@moscow.ru"
                      className="w-full bg-[#0F0F0F] border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-3.5 text-sm text-[#F5F1EA] font-sans transition-colors font-semibold shadow-sm"
                    />
                  </div>

                  {/* Field 4 */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-sans text-[#C4BEB3] block font-bold sm:min-h-[32px] flex items-end pb-1">Оценочная площадь (м²)</label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="например, 140"
                      className="w-full bg-[#0F0F0F] border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-3.5 text-sm text-[#F5F1EA] font-sans transition-colors font-semibold shadow-sm"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-sans text-[#C4BEB3] block font-bold">Комментарий или специфика объекта</label>
                  <textarea
                    rows={4}
                    value={activeMsg}
                    onChange={(e) => {
                      if (customMessage) {
                        if (onClearCustomMessage) onClearCustomMessage();
                      }
                      setMessage(e.target.value);
                    }}
                    placeholder="ЖК Knightsbridge, трехкомнатная, требуется дизайн и комплектация кухонной мебели под потолок..."
                    className="w-full bg-[#0F0F0F] border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-4 text-sm text-[#F5F1EA] font-sans transition-colors resize-none font-semibold shadow-sm"
                  />
                </div>

                {/* Preferred contact channel */}
                <div className="space-y-2 py-1">
                  <label className="text-xs uppercase tracking-widest font-sans text-[#C4BEB3] block font-bold">Где удобнее общаться? *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'telegram', label: 'Telegram' },
                      { id: 'whatsapp', label: 'WhatsApp' },
                      { id: 'messenger', label: 'Мессенджер Макс' }
                    ].map((ch) => (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => setChannel(ch.id as any)}
                        className={`py-3.5 px-2 text-xs font-sans font-bold text-center tracking-wider uppercase transition-all border cursor-pointer ${
                          channel === ch.id
                            ? 'bg-[#B8956A] text-[#0F0F0F] border-[#B8956A]'
                            : 'bg-[#0F0F0F] text-[#C4BEB3] border-[#B8956A]/20 hover:border-[#B8956A]/50'
                        }`}
                      >
                        {ch.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive checkmark privacy per Pravka 9 */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#B8956A] cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] text-[#8B8478] leading-relaxed select-none">
                    Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                    <a href="/privacy" target="_blank" className="text-[#B8956A] hover:underline">
                      Политикой конфиденциальности
                    </a>{' '}
                    и{' '}
                    <a href="/consent" target="_blank" className="text-[#B8956A] hover:underline">
                      Согласием на обработку персональных данных
                    </a>.
                  </span>
                </label>

                {/* Form CTA trigger button */}
                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !consent || !name || !isValidPhoneNumber(phone)}
                    className="w-full py-4 bg-[#B8956A] hover:bg-[#8B6F4E] disabled:bg-[#8B8478]/10 disabled:text-[#8B8478] text-[#0F0F0F] uppercase tracking-[0.2em] font-sans text-sm font-extrabold transition-all duration-300 transform active:scale-98 text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Отправка документов в зашифрованном виде...</span>
                    ) : (
                      <>
                        <span>Записаться на встречу в готовом объекте</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#C4BEB3]/80 italic font-sans leading-normal">
                    Записаться на закрытую презентацию в нашем готовом объекте — оцените вживую всё, что вас интересует.
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
