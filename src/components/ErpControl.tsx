import React, { useState } from 'react';
import { Eye, Shield, Calendar, CheckSquare, Sparkles, Smartphone, Download, Check } from 'lucide-react';

export default function ErpControl() {
  const [activeTab, setActiveTab] = useState<'gantt' | 'photos' | 'estimates'>('gantt');

  const milestones = [
    { name: "Демонтаж перекрытий", date: "24.05 - 02.06", status: "Выполнено", progress: 100 },
    { name: "Узел отопления & Рехау", date: "04.06 - 15.06", status: "В процессе", progress: 65 },
    { name: "Стяжка полов & Акустика", date: "16.06 - 22.06", status: "В очереди", progress: 0 },
    { name: "Чистовая укладка шпона", date: "25.06 - 10.07", status: "В очереди", progress: 0 },
  ];

  return (
    <section id="erp-control" className="bg-[#1A1A1A] text-[#F5F1EA] py-24 md:py-36 relative border-b border-[#B8956A]/10 overflow-hidden">
      {/* Background ambient shade */}
      <div className="absolute right-0 top-1/2 w-80 h-80 bg-[#B8956A]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Description COPY */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#B8956A]/20 bg-[#0F0F0F] rounded-full text-xs uppercase tracking-widest text-[#B8956A] font-bold">
              <Sparkles size={11} />
              <span>Технологичная прозрачность</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
              Цифровой контроль <br />
              <span className="italic text-[#B8956A] font-light">на каждом этапе</span>
            </h2>
            
            <p className="text-base md:text-lg text-[#C4BEB3] font-sans font-light leading-relaxed">
              Мы разработали собственную ERP-систему для клиентов Mechty Group. Вам больше не нужно выезжать на объект или спорить с прорабом. Вся отчетность — плановая, юридическая и визуальная — доступна в одном окне на вашем смартфоне.
            </p>

            {/* 4 guarantees items list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-2.5 items-start">
                <CheckSquare size={14} className="text-[#B8956A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-sm font-sans font-extrabold text-[#F5F1EA] block">Фиксированная цена</span>
                  <span className="text-xs md:text-sm text-[#C4BEB3] font-medium block">Цена сметы не повышается по ходу проекта.</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <Calendar size={14} className="text-[#B8956A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-sm font-sans font-extrabold text-[#F5F1EA] block">Сдача день в день</span>
                  <span className="text-xs md:text-sm text-[#C4BEB3] font-medium block">Выплата пени по договору за каждый день просрочки.</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <Shield size={14} className="text-[#B8956A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-sm font-sans font-extrabold text-[#F5F1EA] block">Юридическая гарантия 5 лет</span>
                  <span className="text-xs md:text-sm text-[#C4BEB3] font-medium block">Защита на финишную электроку и трубы.</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <Eye size={14} className="text-[#B8956A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-sm font-sans font-extrabold text-[#F5F1EA] block">Прозрачные отчёты</span>
                  <span className="text-xs md:text-sm text-[#C4BEB3] font-medium block">Каждый день фотофиксация скрытых кабелей.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: High-fidelity CSS ERP dashboard mock representational widget */}
          <div className="lg:col-span-7 bg-[#0F0F0F] border border-[#B8956A]/20 p-5 md:p-8 rounded shadow-2xl relative">
            {/* Header of ERP */}
            <div className="flex items-center justify-between border-b border-[#B8956A]/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-[#C4BEB3] uppercase tracking-widest ml-3 font-semibold">
                  MECHTY.CLIENT-PORTAL v4.28
                </span>
              </div>
              <div className="flex items-center gap-1 bg-[#1A1A1A] px-2.5 py-1 text-xs uppercase tracking-wider text-[#B8956A] border border-[#B8956A]/15 font-mono font-bold">
                <Smartphone size={10} />
                <span>Окт-2026</span>
              </div>
            </div>

            {/* Simulated Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button
                onClick={() => setActiveTab('gantt')}
                className={`py-2 text-xs uppercase font-sans tracking-widest text-center border font-bold transition-all duration-300 ${
                  activeTab === 'gantt'
                    ? 'border-[#B8956A] text-[#B8956A] bg-[#B8956A]/5'
                    : 'border-transparent text-[#C4BEB3] hover:text-[#F5F1EA]'
                }`}
              >
                Гранд график
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`py-2 text-xs uppercase font-sans tracking-widest text-center border font-bold transition-all duration-300 ${
                  activeTab === 'photos'
                    ? 'border-[#B8956A] text-[#B8956A] bg-[#B8956A]/5'
                    : 'border-transparent text-[#C4BEB3] hover:text-[#F5F1EA]'
                }`}
              >
                Фото-видео фид
              </button>
              <button
                onClick={() => setActiveTab('estimates')}
                className={`py-2 text-xs uppercase font-sans tracking-widest text-center border font-bold transition-all duration-300 ${
                  activeTab === 'estimates'
                    ? 'border-[#B8956A] text-[#B8956A] bg-[#B8956A]/5'
                    : 'border-transparent text-[#C4BEB3] hover:text-[#F5F1EA]'
                }`}
              >
                Сметные акты
              </button>
            </div>

            {/* TAB Area */}
            <div className="min-h-52 font-mono">
              {activeTab === 'gantt' && (
                <div className="space-y-4 text-sm animate-fadeIn">
                  {milestones.map((ms, idx) => (
                    <div key={idx} className="space-y-2 bg-[#1A1A1A] p-3.5 border border-[#B8956A]/10">
                      <div className="flex items-center justify-between text-[#EDE6D8]">
                        <span className="font-extrabold">{ms.name}</span>
                        <span className="text-xs text-[#B8956A] font-bold">{ms.date}</span>
                      </div>
                      
                      {/* Bar progress */}
                      <div className="w-full bg-[#0F0F0F] h-1.5 mt-2 rounded overflow-hidden">
                        <div
                          className="bg-[#B8956A] h-full transition-all duration-1000"
                          style={{ width: `${ms.progress}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-xs text-[#C4BEB3] pt-1 font-semibold">
                        <span>Прогресс: {ms.progress}%</span>
                        <span className={ms.status === 'Выполнено' ? 'text-[#B8956A] font-bold' : 'text-yellow-500 font-bold'}>
                          {ms.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn text-sm">
                  <div className="border border-[#B8956A]/10 bg-[#1A1A1A] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80"
                      alt="Webcam 1 - Living room"
                      className="w-full h-32 object-cover opacity-75"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-2 text-xs text-[#C4BEB3] flex justify-between font-bold">
                      <span>Камера 1 (Гостиная)</span>
                      <span className="text-[#B8956A] flex items-center gap-1 font-extrabold">⏱ LIVE</span>
                    </div>
                  </div>

                  <div className="border border-[#B8956A]/10 bg-[#1A1A1A] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
                      alt="Webcam 2 - Bath slab alignment"
                      className="w-full h-32 object-cover opacity-75"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-2 text-xs text-[#C4BEB3] flex justify-between font-bold">
                      <span>Камера 2 (Кухня-холл)</span>
                      <span className="text-yellow-500 font-extrabold">2 ч назад</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'estimates' && (
                <div className="space-y-3.5 text-sm animate-fadeIn">
                  <div className="p-3 bg-[#1A1A1A] border border-[#B8956A]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[#F5F1EA] block font-extrabold">Акт №12 - МонтажRehau</span>
                      <span className="text-xs text-[#C4BEB3] font-medium">Сверено технадзором: Иванов А.В.</span>
                    </div>
                    <span className="text-[#B8956A] font-bold">Оплачено</span>
                  </div>

                  <div className="p-3 bg-[#1A1A1A] border border-[#B8956A]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[#F5F1EA] block font-extrabold">Акт №13 - Оштукатуривание стен в 90°</span>
                      <span className="text-xs text-[#C4BEB3] font-medium">Внутренний дефекто-контроль: Успех</span>
                    </div>
                    <span className="text-[#B8956A] font-bold flex items-center gap-1 font-extrabold">
                      <Check size={12} />
                      Согласовано
                    </span>
                  </div>

                  <button className="w-full py-2.5 border border-[#B8956A]/40 hover:border-[#B8956A] text-xs uppercase text-[#B8956A] text-center flex items-center justify-center gap-2 transition-colors font-bold">
                    <Download size={12} />
                    <span>Скачать полный комплект исполнительных чертежей</span>
                  </button>
                </div>
              )}
            </div>

            {/* Digital control subtitle */}
            <div className="mt-6 pt-4 border-t border-[#B8956A]/10 text-center">
              <span className="text-xs md:text-sm font-sans uppercase tracking-[0.15em] text-[#C4BEB3] font-bold">
                Вся папка скрытых работ и сертификаты качества хранятся бессрочно в облаке
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
