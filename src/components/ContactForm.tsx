import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Sparkles, Send, CheckCircle } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

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
                Запишитесь на закрытую презентацию в нашем центральном шоу-руме в Москва-Сити. Коллеги предложат вам зерновой кофе, покажут образцы фасадов и сметные ведомости.
              </p>
            </div>

            {/* Structured Contact Units List */}
            <div className="space-y-6">
              
              <div className="flex gap-4 items-start pb-4 border-b border-[#B8956A]/10 max-w-sm">
                <div className="w-10 h-10 rounded-full border border-[#B8956A]/30 flex items-center justify-center bg-[#1A1A1A]">
                   <MapPin size={16} className="text-[#B8956A]" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-sans text-[#B8956A] tracking-widest block font-bold">Наш Адрес</span>
                  <span className="text-sm font-sans text-[#EDE6D8] font-bold block">
                    Пресненская наб., 6, стр. 2, башня «Империя», Москва
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-[#B8956A]/10 max-w-sm">
                <div className="w-10 h-10 rounded-full border border-[#B8956A]/30 flex items-center justify-center bg-[#1A1A1A]">
                  <Phone size={16} className="text-[#B8956A]" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-sans text-[#B8956A] tracking-widest block font-bold">Телефон</span>
                  <a href="tel:+79250999333" className="text-sm font-sans text-[#EDE6D8] font-extrabold block hover:text-[#B8956A] transition-colors">
                    +7 (925) 0999-333
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

            {/* Stylized custom map holder */}
            <div className="border border-[#B8956A]/20 bg-[#1A1A1A] h-64 relative group overflow-hidden">
              {/* Clean Google Maps stylized dark frame */}
              <iframe
                title="Шоу-рум в Сити"
                className="w-full h-full grayscale opacity-60 group-hover:opacity-85 transition-opacity duration-500"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5415849841804!2d37.53503527715697!3d55.74735227308236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bddb281f6eb%3A0xc6cb69ab1264c7e4!2z0J_RgNC10YHQvdC10L3RgdC60LDRjyDQvdCw0LEuLCA2INGB0YLRgMC-0LnRgtC10LvRjNGB0YLQstC_IDIsINCd0L7QstC60LA!5e0!3m2!1sru!2sru!4v1703000000000!5m2!1sru!2sru"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 bg-[#0F0F0F] border border-[#B8956A]/30 text-white font-mono text-xs uppercase tracking-widest px-2.5 py-1.5 pointer-events-none font-bold flex items-center gap-1.5">
                <MapPin size={12} className="text-[#B8956A]" />
                <span>Башня Федерация Империя</span>
              </div>
            </div>
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
                    Оставьте параметры объекта
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
                    <label className="text-xs uppercase tracking-widest font-sans text-[#C4BEB3] block font-bold sm:min-h-[32px] flex items-end pb-1">Ваш телефон *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                    placeholder="ЖК Knightsbridge, трехкомнатная, требуется дизайн и производство кухонной мебели под потолок..."
                    className="w-full bg-[#0F0F0F] border border-[#B8956A]/20 focus:border-[#B8956A] focus:outline-none p-4 text-sm text-[#F5F1EA] font-sans transition-colors resize-none font-semibold shadow-sm"
                  />
                </div>

                {/* Interactive checkmark privacy */}
                <div className="text-xs text-[#C4BEB3] font-medium leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с Политикой обработки персональных данных и неразглашении конфиденциальных сведений о параметрах вашего жилья в Мск.
                </div>

                {/* Form CTA trigger button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !name || !phone}
                  className="w-full py-4 bg-[#B8956A] hover:bg-[#8B6F4E] disabled:bg-[#8B8478]/10 disabled:text-[#8B8478] text-[#0F0F0F] uppercase tracking-[0.2em] font-sans text-sm font-extrabold transition-all duration-300 transform active:scale-98 text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <span>Отправка документов в зашифрованном виде...</span>
                  ) : (
                    <>
                      <span>Записаться в шоу-рум</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
