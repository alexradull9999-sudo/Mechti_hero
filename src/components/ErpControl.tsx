import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  Shield, 
  Calendar, 
  CheckSquare, 
  Sparkles, 
  Smartphone, 
  Download, 
  Check, 
  Bell, 
  BookOpen, 
  Clock, 
  RefreshCw, 
  Sliders, 
  Search, 
  Menu,
  CheckCircle2,
  ChevronRight,
  User,
  Wrench,
  ChevronLeft,
  KeyRound
} from 'lucide-react';

interface ErpControlProps {
  onOpenConsultation?: (customMessage?: string, customTitle?: string, customDesc?: string) => void;
}

export default function ErpControl({ onOpenConsultation }: ErpControlProps) {
  const [activeTab, setActiveTab] = useState<'readiness' | 'schedule' | 'reports'>('readiness');
  
  // Tab 1 state: Task completion toggler for realism
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);

  // Tab 2 state: schedule filters
  const [deptFilter, setDeptFilter] = useState<'all' | 'designer' | 'stroyka'>('all');
  const [scheduleSearch, setScheduleSearch] = useState<string>('');

  // Tab 3 state: reports search
  const [reportSearch, setReportSearch] = useState<string>('');

  // Tab 2 (Schedule) mock data exactly replica of screenshot 3
  const scheduleData = [
    { id: "2441", dept: "designer", deptLabel: "Дизайнер", task: "Визуализации" },
    { id: "2412", dept: "designer", deptLabel: "Дизайнер", task: "Обмерный план и планировочное решение с расстановкой мебели" },
    { id: "2442", dept: "designer", deptLabel: "Дизайнер", task: "Рабочие чертежи" },
    { id: "2443", dept: "designer", deptLabel: "Дизайнер", task: "Спецификация материалов и мебели" },
    { id: "2505", dept: "stroyka", deptLabel: "Стройка", task: "Демонтаж перегородок" },
    { id: "2506", dept: "stroyka", deptLabel: "Стройка", task: "Монтаж перегородок" },
    { id: "2507", dept: "stroyka", deptLabel: "Стройка", task: "Разводка черновой сантехники" },
    { id: "2510", dept: "stroyka", deptLabel: "Стройка", task: "Разводка черновой электрики" },
    { id: "2508", dept: "stroyka", deptLabel: "Стройка", task: "Шумоизоляция пола" },
    { id: "2509", dept: "stroyka", deptLabel: "Стройка", task: "Стяжка пола" },
    { id: "2511", dept: "stroyka", deptLabel: "Стройка", task: "Штукатурные работы" },
    { id: "2512", dept: "stroyka", deptLabel: "Стройка", task: "Разводка трасс кондиционирования" },
    { id: "2513", dept: "stroyka", deptLabel: "Стройка", task: "Монтаж ГКЛ конструкций" },
    { id: "2514", dept: "stroyka", deptLabel: "Стройка", task: "Монтаж теплого пола" },
    { id: "2515", dept: "stroyka", deptLabel: "Стройка", task: "Плиточные работы" },
  ];

  // Tab 3 (Reports) mock data exactly replica of screenshot 2
  const reportsData = [
    { id: "1626", date: "23.05.2026", object: "ОФИС УЛ. ЕФРЕМОВА д.18 (РЕМОНТ)", desc: "Завершаем облицовку, финишные штрихи по клинингу." },
    { id: "1625", date: "22.05.2026", object: "ЖК ПРАЙМ ПАРК КВ. 160 (РЕМОНТ)", desc: "Продолжаем монтаж крупноформатных керамогранитных плит." },
    { id: "1624", date: "22.05.2026", object: "ЖК ХЕДЛАЙНЕР КВ. 882 (РЕМОНТ)", desc: "Завершаем монтаж потолков, монтаж освещения и подготовку к покраске." },
    { id: "1623", date: "22.05.2026", object: "ЖК РИВЕР ПАРК КВ.325 (РЕМОНТ)", desc: "Закончили укладку инженерной доски, монтаж плинтуса продолжается." },
    { id: "1622", date: "21.05.2026", object: "ОФИС УЛ. ЕФРЕМОВА д.18 (РЕМОНТ)", desc: "Приступили к укладке шумоизоляционного пирога перекрытий." },
    { id: "1621", date: "20.05.2026", object: "ЖК ХЕДЛАЙНЕР № 750 (РЕМОНТ)", desc: "Завершен монтаж гипсокартонных систем по лазерному осепостроителю." }
  ];

  const filteredSchedule = useMemo(() => {
    return scheduleData.filter(item => {
      const matchesDept = deptFilter === 'all' || item.dept === deptFilter;
      const matchesSearch = item.task.toLowerCase().includes(scheduleSearch.toLowerCase()) || item.id.includes(scheduleSearch);
      return matchesDept && matchesSearch;
    });
  }, [deptFilter, scheduleSearch]);

  const filteredReports = useMemo(() => {
    return reportsData.filter(item => {
      return item.object.toLowerCase().includes(reportSearch.toLowerCase()) || 
             item.desc.toLowerCase().includes(reportSearch.toLowerCase()) ||
             item.id.includes(reportSearch);
    });
  }, [reportSearch]);

  return (
    <section id="erp-control" className="bg-[#1A1A1A] text-[#F5F1EA] py-24 md:py-36 relative border-b border-[#B8956A]/10 overflow-hidden">
      {/* Background ambient gold shade behind */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-[#B8956A]/5 rounded-full blur-3xl" />
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-[#8B6F4E]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CLUSTER: Explanatory Copy & Value Props */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#B8956A]/20 bg-[#0F0F0F] rounded-full text-xs uppercase tracking-widest text-[#B8956A] font-bold">
              <Sparkles size={11} className="animate-pulse" />
              <span>Технологичная прозрачность</span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-7xl font-light leading-tight text-[#F5F1EA]">
              Цифровой контроль <br />
              <span className="italic text-[#B8956A] font-light">в реальном времени</span>
            </h2>
            
            <p className="text-sm md:text-base text-[#C4BEB3] font-sans font-light leading-relaxed max-w-xl">
              Мы перенесли весь процесс ремонта, проектирования и снабжения в интуитивно понятное цифровое пространство Группы компаний. Наш клиентский портал в реальном времени подтягивает данные со стройплощадки, позволяя отслеживать прогресс, утверждать локальные сметные акты и контролировать график прямо со смартфона.
            </p>

            {/* Core features columns layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#B8956A]/10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#B8956A]">
                  <CheckSquare size={14} className="shrink-0" />
                  <h4 className="text-sm font-sans font-extrabold text-[#F5F1EA] uppercase tracking-wider">
                    Живой прогресс
                  </h4>
                </div>
                <p className="text-xs text-[#C4BEB3] leading-relaxed">
                  Процентная готовность каждого этапа вычисляется автоматически на основе закрытых прорабом ведомостей.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#B8956A]">
                  <Calendar size={14} className="shrink-0" />
                  <h4 className="text-sm font-sans font-extrabold text-[#F5F1EA] uppercase tracking-wider">
                    Интерактивный график
                  </h4>
                </div>
                <p className="text-xs text-[#C4BEB3] leading-relaxed">
                  Полная технологическая цепочка СНиП с детализацией по отделам: дизайн, общестрой, инженерия, чистовая отделка.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#B8956A]">
                  <Shield size={14} className="shrink-0" />
                  <h4 className="text-sm font-sans font-extrabold text-[#F5F1EA] uppercase tracking-wider">
                    Еженедельный фотоотчёт
                  </h4>
                </div>
                <p className="text-xs text-[#C4BEB3] leading-relaxed">
                  Еженедельный фотоотчёт скрытых инженерных работ и высококачественные панорамы прямо в приложении.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#B8956A]">
                  <Eye size={14} className="shrink-0" />
                  <h4 className="text-sm font-sans font-extrabold text-[#F5F1EA] uppercase tracking-wider">
                    Быстрое согласование
                  </h4>
                </div>
                <p className="text-xs text-[#C4BEB3] leading-relaxed">
                  Мгновенное подписание актов выполненных работ и этапов снабжения. Полная интеграция с мебельной фабрикой Mechty.
                </p>
              </div>
            </div>

            {/* Note instruction card */}
            <div className="bg-[#111] border border-[#B8956A]/15 p-4 text-xs font-sans text-[#C4BEB3] flex items-center justify-between gap-3">
              <span className="italic">
                Попробуйте интерактивно переключить вкладки на макете смартфона справа, чтобы посмотреть реальные экраны нашей CRM-системы. <span className="text-[#B8956A] inline-block font-extrabold animate-pulse ml-1 text-base">🡲</span>
              </span>
              <Smartphone size={24} className="text-[#B8956A] shrink-0 animate-pulse" />
            </div>
          </div>

          {/* RIGHT CLUSTER: Exquisite smartphone viewport replica of actual screenshots */}
          <div className="lg:col-span-7 flex flex-col items-center gap-6">
            
            {/* High-fidelity Phone Frame Wrapper */}
            <div className="w-full max-w-[420px] bg-[#121212] border-[6px] border-[#2E2C28] rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative aspect-[9/18.5]">
              
              {/* Speaker & camera slot indicator */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#080808] rounded-full z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-[#222] rounded-full mr-2" />
                <div className="w-2.5 h-2.5 bg-[#111] rounded-full border border-[#222]" />
              </div>

              {/* Status bar emulation */}
              <div className="bg-white text-black px-6 pt-7 pb-1.5 flex justify-between items-center text-[11px] font-sans font-semibold border-b border-gray-100 shrink-0 z-20">
                <span>11:55 \</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-black rounded-sm" />
                    <span className="w-1.5 h-2 bg-black rounded-sm" />
                    <span className="w-1.5 h-2.5 bg-black rounded-sm" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase bg-green-500 text-white px-1 py-0.5 rounded-sm shrink-0">80%</span>
                </div>
              </div>

              {/* CRM App Native Header Area */}
              <div className="bg-white text-[#1A1A1A] px-4 py-3 border-b border-gray-200 shrink-0 flex items-center justify-between z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <button className="text-gray-600 hover:text-black">
                    <Menu size={18} className="stroke-[2.5]" />
                  </button>
                  <span className="font-sans font-bold text-base text-gray-800 tracking-tight">
                    {activeTab === 'readiness' && 'Главная'}
                    {activeTab === 'schedule' && 'График работ'}
                    {activeTab === 'reports' && 'Последние отчеты'}
                  </span>
                </div>

                {/* Badges system */}
                <div className="flex items-center gap-2">
                  <div className="relative bg-gray-100 p-1 rounded-full cursor-pointer">
                    <Bell size={15} className="text-gray-700" />
                    <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white font-mono text-[9px] font-extrabold px-1 rounded-full scale-90">
                      296
                    </span>
                  </div>
                  <div className="bg-gray-100 p-1 rounded-full">
                    <BookOpen size={15} className="text-gray-700" />
                  </div>
                  <div className="w-7 h-7 bg-[#B8956A] rounded-full flex items-center justify-center font-extrabold text-[10px] text-white overflow-hidden border border-gray-200">
                    <span className="font-mono">AG</span>
                  </div>
                </div>
              </div>

              {/* LIVE TABS BAR (To emulate clicking through screenshots) */}
              <div className="bg-gray-50 border-b border-gray-200 py-1 px-2 shrink-0 grid grid-cols-3 gap-1.5 text-center">
                <button
                  onClick={() => setActiveTab('readiness')}
                  className={`py-1.5 text-[10px] uppercase font-sans tracking-wider font-bold rounded-md transition-all duration-300 ${
                    activeTab === 'readiness'
                      ? 'bg-[#B8956A] text-[#0F0F0F] shadow-[0_2px_6px_rgba(184,149,106,0.3)]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Готовность
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`py-1.5 text-[10px] uppercase font-sans tracking-wider font-bold rounded-md transition-all duration-300 ${
                    activeTab === 'schedule'
                      ? 'bg-[#B8956A] text-[#0F0F0F] shadow-[0_2px_6px_rgba(184,149,106,0.3)]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  График работ
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`py-1.5 text-[10px] uppercase font-sans tracking-wider font-bold rounded-md transition-all duration-300 ${
                    activeTab === 'reports'
                      ? 'bg-[#B8956A] text-[#0F0F0F] shadow-[0_2px_6px_rgba(184,149,106,0.3)]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Отчеты
                </button>
              </div>

              {/* INTERACTIVE CRM MAIN VIEW CANVAS (Clean white apps theme exactly matching screenshots) */}
              <div className="flex-1 bg-white text-[#1a1a1a] p-4 overflow-y-auto font-sans scrollbar-thin select-none">
                
                {/* 1. TAB: READINESS (Gotovnost po napravleniyam) */}
                {activeTab === 'readiness' && (
                  <div className="space-y-4 animate-fadeIn">
                    
                    {/* Top urgent workflow element */}
                    <div className="border border-red-200 bg-red-50/75 rounded-lg p-3 space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-2 text-red-900">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[9px] font-extrabold uppercase bg-red-100 text-red-600 px-1.5 py-0.5 rounded-sm">
                            № 25598 · Срочная задача
                          </span>
                          <p className="font-bold font-sans mt-1 leading-snug">
                            {taskCompleted 
                              ? "✓ Задача «Шпатлевка черновая, подготовка под стеклохолст» помечена выполненной!"
                              : "Завершить работу «Шпатлевка черновая, подготовка под стеклохолст» нужно до 10.01.2026."}
                          </p>
                        </div>
                        <span className="text-gray-400 font-mono text-[10px] shrink-0 mt-0.5">23.05.2026</span>
                      </div>
                      
                      {!taskCompleted && (
                        <button 
                          onClick={() => setTaskCompleted(true)}
                          className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold uppercase tracking-widest text-[9px] transition-all cursor-pointer text-center"
                        >
                          Завершить работу
                        </button>
                      )}
                    </div>

                    {/* Progress disciplines block */}
                    <div className="border border-gray-200 rounded-xl p-3.5 space-y-4 bg-[#FAF9F6]">
                      <div className="flex items-center justify-between border-b border-gray-200/80 pb-2.5">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                            текущий проект контроля:
                          </span>
                          <h4 className="font-serif font-bold text-sm tracking-tight text-gray-800">
                            ЖК «Крылья», 135 м²
                          </h4>
                        </div>
                        <div className="p-1 text-gray-500 bg-gray-100 rounded">
                          <Sliders size={13} />
                        </div>
                      </div>

                      {/* Heading "Готовность по направлениям" */}
                      <div className="space-y-3.5">
                        <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-gray-700 block bg-gray-200/40 p-1.5 pl-2 border-l-2 border-amber-600">
                          Готовность по направлениям
                        </span>

                        {/* Tracks list with perfect graphics */}
                        <div className="space-y-3">
                          {/* Стройка */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-gray-700">
                              <span>Стройка</span>
                              <span className="text-[#B8956A]">65% В процессе</span>
                            </div>
                            <div className="w-full bg-gray-200 h-6.5 rounded overflow-hidden relative border border-gray-300 shadow-inner">
                              <div className="bg-[#B8956A] h-full w-[65%] transition-all duration-500 relative">
                                <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-extrabold text-white">65%</span>
                              </div>
                            </div>
                          </div>

                          {/* Дизайнер */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-gray-700">
                              <span>Дизайнер</span>
                              <span className="text-green-600">100%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-6.5 rounded overflow-hidden relative border border-gray-300 shadow-inner">
                              <div className="bg-green-600 h-full w-[100%] transition-all duration-500 relative">
                                <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-extrabold text-white">100%</span>
                              </div>
                            </div>
                          </div>

                          {/* Снабжение */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-gray-700">
                              <span>Снабжение</span>
                              <span className="text-amber-800">88%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-6.5 rounded overflow-hidden flex border border-gray-300 shadow-inner">
                              <div className="bg-green-600 h-full w-[88%] transition-all duration-500 relative">
                                <span className="absolute inset-y-0 right-2.5 flex items-center text-[10px] font-extrabold text-white">88%</span>
                              </div>
                              <div className="bg-red-200 h-full w-[12%] transition-all duration-500 relative flex items-center justify-center">
                                <span className="text-[8px] font-bold text-red-800">12%</span>
                              </div>
                            </div>
                          </div>

                          {/* Мебель */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-gray-400">
                              <span>Мебель</span>
                              <span>0%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-6.5 rounded overflow-hidden shadow-inner border border-gray-200 relative flex items-center pl-3 text-gray-400 text-[10px] italic">
                              В очереди после стяжки
                            </div>
                          </div>

                          {/* Комплектация */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-gray-400">
                              <span>Комплектация</span>
                              <span>0%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-6.5 rounded overflow-hidden shadow-inner border border-gray-200 relative flex items-center pl-3 text-gray-400 text-[10px] italic">
                              В очереди
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gauge circle area total ready percentage */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-[#FAF9F6] flex flex-col items-center justify-center space-y-3.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-extrabold text-center block">
                        Общая готовность объекта:
                      </span>

                      {/* SVG Gauge circle */}
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          {/* Inner gray trail track */}
                          <circle
                            cx="80"
                            cy="80"
                            r="66"
                            stroke="#e2e8f0"
                            strokeWidth="15"
                            fill="transparent"
                          />
                          {/* Colored path gradient 94% indicator */}
                          <circle
                            cx="80"
                            cy="80"
                            r="66"
                            stroke="#10b981"
                            strokeWidth="15"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 66}
                            strokeDashoffset={2 * Math.PI * 66 * (1 - 0.94)}
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Overlay label overall percentage */}
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-3xl font-serif font-bold text-gray-800 tracking-tight leading-none bg-emerald-50 px-2 py-1 rounded">
                            {taskCompleted ? '96%' : '94%'}
                          </span>
                          <span className="text-[8px] uppercase tracking-widest font-mono text-emerald-800 font-bold mt-1.5">
                            ВЫСОКИЙ ТЕМП
                          </span>
                        </div>
                      </div>

                      <div className="text-center text-[10px] text-gray-500 font-medium">
                        ЖК «Крылья», 135 м² · ШАГ 7 ИЗ 10
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. TAB: SCHEDULE (Grafik rabot) */}
                {activeTab === 'schedule' && (
                  <div className="space-y-4 animate-fadeIn">
                    
                    {/* Title identifier of real estate item */}
                    <div className="bg-gray-800 text-white p-3 rounded-lg flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-amber-500 font-bold block">
                          ИНЖЕНЕРНЫЙ ГРАФИК
                        </span>
                        <h4 className="font-semibold text-xs sm:text-xs">
                          (399) ЖК «Крылья», 135 м² (ДИЗАЙН)
                        </h4>
                      </div>
                      
                      {/* Top icons panel replica of screen 3 */}
                      <div className="flex gap-1 bg-gray-700/60 p-1 rounded">
                        <div className="p-0.5 bg-gray-600 hover:text-amber-400 text-white rounded cursor-pointer">
                          <Clock size={11} />
                        </div>
                        <div className="p-0.5 bg-gray-650 text-amber-400 rounded">
                          <CheckCircle2 size={11} />
                        </div>
                        <div className="p-0.5 bg-gray-600 text-white rounded">
                          <Sliders size={11} />
                        </div>
                        <div className="p-0.5 bg-gray-600 text-white rounded">
                          <RefreshCw size={11} />
                        </div>
                      </div>
                    </div>

                    {/* Department Filtering Selector replica */}
                    <div className="flex gap-1.5 items-center justify-between bg-gray-50 border p-1.5 rounded-md">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                        Отдел:
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setDeptFilter('all')}
                          className={`text-[10px] font-sans font-bold px-2 py-1 rounded transition-colors ${
                            deptFilter === 'all' 
                              ? 'bg-gray-800 text-white' 
                              : 'text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Все
                        </button>
                        <button
                          onClick={() => setDeptFilter('designer')}
                          className={`text-[10px] font-sans font-bold px-2 py-1 rounded transition-colors ${
                            deptFilter === 'designer' 
                              ? 'bg-gray-800 text-white' 
                              : 'text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Дизайнер
                        </button>
                        <button
                          onClick={() => setDeptFilter('stroyka')}
                          className={`text-[10px] font-sans font-bold px-2 py-1 rounded transition-colors ${
                            deptFilter === 'stroyka' 
                              ? 'bg-gray-800 text-white' 
                              : 'text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Стройка
                        </button>
                      </div>
                    </div>

                    {/* Filter local Search bar */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Найти этап по названию или ID..."
                        value={scheduleSearch}
                        onChange={(e) => setScheduleSearch(e.target.value)}
                        className="w-full text-xs p-2 pl-7 border border-gray-300 rounded focus:ring-1 focus:ring-[#B8956A] focus:outline-none placeholder-gray-400 font-sans"
                      />
                      <Search size={12} className="absolute left-2.5 top-3 text-gray-400" />
                    </div>

                    {/* Layout Grid of table from Screenshot 3 */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden text-[10px] font-sans shadow-sm">
                      <table className="w-full text-left border-collapse bg-white">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 uppercase font-bold border-b border-gray-200 text-[9px] tracking-wider">
                            <th className="p-2 border-r border-gray-200/85 w-10">#</th>
                            <th className="p-2 border-r border-gray-200/85 w-16">Отдел</th>
                            <th className="p-2">Наименование</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 text-gray-800">
                          {filteredSchedule.map((row) => (
                            <tr key={row.id} className="hover:bg-amber-50/40 transition-colors">
                              <td className="p-2 border-r border-gray-200 font-mono text-gray-400">
                                {row.id}
                              </td>
                              <td className="p-2 border-r border-gray-200">
                                <span className={`px-1.5 py-0.5 rounded font-bold text-[8px] uppercase tracking-wide ${
                                  row.dept === 'designer' 
                                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/50' 
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                                }`}>
                                  {row.deptLabel}
                                </span>
                              </td>
                              <td className="p-2 font-medium leading-tight text-gray-700">
                                {row.task}
                              </td>
                            </tr>
                          ))}
                          
                          {filteredSchedule.length === 0 && (
                            <tr>
                              <td colSpan={3} className="text-center p-6 text-gray-400 italic">
                                Ничего не найдено по запросу
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium px-1">
                      <span>Показано: {filteredSchedule.length} из 15</span>
                      <span>Статус: Синхронизовано</span>
                    </div>

                  </div>
                )}

                {/* 3. TAB: REPORTS (Poslednie otchety) */}
                {activeTab === 'reports' && (
                  <div className="space-y-4 animate-fadeIn">
                    
                    {/* Header identifier from screenshot 2 */}
                    <div className="border border-gray-200 rounded-lg p-3 bg-[#FAF9F6]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block mb-1">
                        Журнал учета скрытых работ:
                      </span>
                      <h4 className="font-serif text-sm font-bold text-gray-800">
                        Последние отчеты технадзора
                      </h4>
                    </div>

                    {/* Search reports bar */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Фильтр по объектам, ЖК или описанию..."
                        value={reportSearch}
                        onChange={(e) => setReportSearch(e.target.value)}
                        className="w-full text-xs p-2 pl-7 border border-gray-300 rounded focus:ring-1 focus:ring-[#B8956A] focus:outline-none placeholder-gray-400 font-sans"
                      />
                      <Search size={12} className="absolute left-2.5 top-3 text-gray-400" />
                    </div>

                    {/* Table element exactly matching layout of Screenshot 2 */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden text-[10px] font-sans shadow-sm">
                      <table className="w-full text-left border-collapse bg-white">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 uppercase font-extrabold border-b border-gray-200 text-[9px] tracking-wider">
                            <th className="p-2 border-r border-gray-200/80 w-10">#</th>
                            <th className="p-2 border-r border-gray-200/80 w-16">Дата</th>
                            <th className="p-2 border-r border-gray-200/80 w-28">Объект</th>
                            <th className="p-2">Описание</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 text-gray-800">
                          {filteredReports.map((row) => (
                            <tr key={row.id} className="hover:bg-amber-50/40 transition-all font-sans leading-tight">
                              <td className="p-2 border-r border-gray-150 font-mono text-gray-400 font-bold">
                                {row.id}
                              </td>
                              <td className="p-2 border-r border-gray-150 text-gray-600 font-medium whitespace-nowrap">
                                {row.date}
                              </td>
                              <td className="p-2 border-r border-gray-150 font-semibold text-gray-800 text-[8.5px] uppercase tracking-tight">
                                {row.object}
                              </td>
                              <td className="p-2 text-gray-600 font-light max-w-xs truncate">
                                {row.desc}
                              </td>
                            </tr>
                          ))}

                          {filteredReports.length === 0 && (
                            <tr>
                              <td colSpan={4} className="text-center p-6 text-gray-400 italic">
                                Нет отчетов по заданному фильтру
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom action controls panel replica of screen 2 */}
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-extrabold px-1 border-t pt-2 border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full referee bg-green-500 animate-ping shrink-0" />
                        <span>Показано: 401 отчет</span>
                      </div>
                      
                      <button className="flex items-center gap-1 text-[#B8956A] hover:text-[#8B6F4E] font-sans font-bold uppercase text-[9px]">
                        <span>Скачать журнал</span>
                        <Download size={10} />
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Bottom hardware touch bar emulated icon */}
              <div className="bg-white border-t border-gray-150 py-2.5 flex items-center justify-around text-gray-500 text-xs shrink-0 z-10 font-sans font-bold">
                <div className="flex flex-col items-center">
                  <span className="w-5 h-1 bg-gray-400 rounded-full" />
                </div>
              </div>

            </div>

            {onOpenConsultation && (
              <button
                onClick={() => onOpenConsultation(
                  'Доступ к CRM-системе прозрачного контроля ремонта Mechty.',
                  'Получить доступ к CRM',
                  'Заполните форму для оформления временного гостевого демо-доступа к личному кабинету инвестора.'
                )}
                className="w-full max-w-[420px] py-4 bg-[#B8956A] hover:bg-[#8B6F4E] hover:text-white text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-extrabold transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 cursor-pointer rounded-sm"
              >
                <KeyRound size={14} />
                <span>Получить доступ к системе</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
