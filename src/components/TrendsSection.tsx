import React, { useState } from 'react';
import { Play, X, Youtube, ExternalLink } from 'lucide-react';

interface VideoItem {
  id: string;
  num: string;
  title: string;
  image: string;
  duration: string;
  youtubeUrl: string;
  embedUrl: string;
  description: string;
}

export default function TrendsSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const videoProjects: VideoItem[] = [
    {
      id: "vid-1",
      num: "01",
      title: "ЖК Крылья. Дизайнерский ремонт премиум-класса",
      image: "https://img.youtube.com/vi/nZeFt_yXIy0/maxresdefault.jpg",
      duration: "12:45",
      youtubeUrl: "https://youtu.be/nZeFt_yXIy0?si=BjHgNsjOXTwB0jac",
      embedUrl: "https://www.youtube.com/embed/nZeFt_yXIy0",
      description: "Элегантное современное пространство с мягкой палитрой и умными световыми решениями. Продуманное планирование обеспечивает бескомпромиссный комфорт и функциональность."
    },
    {
      id: "vid-2",
      num: "02",
      title: "ЖК Событие. Современный интерьер с использованием натурального шпона",
      image: "https://img.youtube.com/vi/L5wbX-3ZyOw/maxresdefault.jpg",
      duration: "11:15",
      youtubeUrl: "https://youtu.be/L5wbX-3ZyOw?si=OJfrS_EEpzaagVcY",
      embedUrl: "https://www.youtube.com/embed/L5wbX-3ZyOw",
      description: "Минималистичный проект в Раменках. В отделке применили изысканные текстуры натурального камня, радиально распиленного шпона и бесшовные натяжные системы."
    },
    {
      id: "vid-3",
      num: "03",
      title: "ЖК Прайм парк. Премиальный дизайн-проект с кастомной меблировкой",
      image: "https://img.youtube.com/vi/mloSg9Ju8sI/maxresdefault.jpg",
      duration: "14:30",
      youtubeUrl: "https://youtu.be/mloSg9Ju8sI?si=eopwVK4MXRzHUCMz",
      embedUrl: "https://www.youtube.com/embed/mloSg9Ju8sI",
      description: "Флагманский ремонт в престижном Prime Park. Проект включает высокие двери 2.7м, просторную мастер-спальню, шпонированные настенные панели и мебель собственного производства."
    },
    {
      id: "vid-4",
      num: "04",
      title: "ЖК Хедлайнер. Видовая панорамная квартира в Сити",
      image: "https://img.youtube.com/vi/h238gp_3Iv4/maxresdefault.jpg",
      duration: "13:50",
      youtubeUrl: "https://youtu.be/h238gp_3Iv4?si=wL-6gJ6YrKHZbiwa",
      embedUrl: "https://www.youtube.com/embed/h238gp_3Iv4",
      description: "Реализация светлого и просторного ремонта с идеальной логистикой зон. Предусмотрели вместительные гардеробные, кастомную мягкую мебель и акцентные графитовые элементы."
    },
    {
      id: "vid-5",
      num: "05",
      title: "ЖК Крылья. Высокотехнологичная квартира с системой Умный Дом",
      image: "https://img.youtube.com/vi/8SA8cvHthXg/maxresdefault.jpg",
      duration: "15:10",
      youtubeUrl: "https://youtu.be/8SA8cvHthXg?si=wNLJQ0eFPn3UzWNW",
      embedUrl: "https://www.youtube.com/embed/8SA8cvHthXg",
      description: "Сложная инженерия и вентиляция, интегрированные в безупречный дизайн интерьера. Разработаны мультисценарные световые решения для комфортных вечеров."
    },
    {
      id: "vid-6",
      num: "06",
      title: "ЖК Д1. Воздушный панорамный пентхаус на высоте птичьего полета",
      image: "https://img.youtube.com/vi/idL286_w44w/maxresdefault.jpg",
      duration: "16:50",
      youtubeUrl: "https://youtu.be/idL286_w44w?si=TcRneBPI5pm3j_R7",
      embedUrl: "https://www.youtube.com/embed/idL286_w44w",
      description: "Баланс легкости и функциональности на самом верху башни. Использованы парящие гипсокартонные ниши, теневой профиль стен и ультрасовременный декор."
    }
  ];

  const handleOpenVideo = (video: VideoItem) => {
    setActiveVideo(video);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section id="trends" className="bg-[#0F0F0F] text-[#F5F1EA] py-24 md:py-36 border-b border-[#B8956A]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div className="space-y-4">
            <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#B8956A] block">
              ВИДЕОПРОЕКТЫ
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Смотрите, как <br />
              <span className="italic font-light text-[#B8956A]">мы работаем</span>
            </h2>
          </div>
          
          <div>
            <a 
              href="https://www.youtube.com/@mechti_group"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4.5 border border-[#B8956A]/40 text-[#B8956A] hover:bg-[#B8956A] hover:text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300"
            >
              <Youtube size={14} className="shrink-0" />
              <span>Перейти на наш YouTube</span>
            </a>
          </div>
        </div>

        {/* Video Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {videoProjects.map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpenVideo(video)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Aspect Ratio Video Card with Play buttons */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#B8956A]/15 bg-[#1A1A1A] mb-5">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-103 group-hover:opacity-95 transition-all duration-[0.8s] ease-out select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/65 to-transparent" />
                  
                  {/* Overlay Play Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0F0F0F]/70 border border-[#B8956A] flex items-center justify-center group-hover:bg-[#B8956A] group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="text-[#B8956A] m-0 w-5 h-5 group-hover:text-[#0F0F0F] fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* YouTube Brand Badge */}
                  <span className="absolute top-3 left-3 text-[9px] font-mono tracking-widest bg-black/85 px-2 py-0.5 text-[#B8956A] border border-[#B8956A]/15 flex items-center gap-1">
                    <Youtube size={10} className="text-red-500 fill-current" />
                    <span>YOUTUBE</span>
                  </span>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono tracking-widest bg-[#0F0F0F]/85 px-2 py-0.5 text-[#B8956A] border border-[#B8956A]/10">
                    {video.duration}
                  </span>
                </div>

                {/* Title and description */}
                <div className="space-y-3">
                  <h3 className="font-serif text-lg text-[#F5F1EA] group-hover:text-[#B8956A] transition-colors leading-snug font-light min-h-[56px] line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-[#A8A196] line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="text-[10px] uppercase font-mono tracking-widest text-[#B8956A]/60 flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.03]">
                <span>Открыть обзор</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8956A]" />
                <span>Эпизод {video.num}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Real YouTube Embed Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[110] bg-[#0F0F0F]/98 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12 animate-fadeIn">
          
          {/* Top Bar controls */}
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-2">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#B8956A] block">
                MECHTY.STUDIO • ЭПИЗОД {activeVideo.num}
              </span>
              <h4 className="font-serif text-lg md:text-xl font-light text-[#F5F1EA] mt-1 line-clamp-1 max-w-xl">
                {activeVideo.title}
              </h4>
            </div>

            <button
              onClick={handleCloseVideo}
              className="text-[#8B8478] hover:text-[#B8956A] p-3 border border-[#B8956A]/20 bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 transition-all text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>ЗАКРЫТЬ</span>
              <X size={15} />
            </button>
          </div>

          {/* Central Screen genuine embed */}
          <div className="relative flex-grow flex items-center justify-center max-w-5xl w-full mx-auto my-6 md:my-10 aspect-video bg-[#131313] border border-[#B8956A]/20 shadow-2xl overflow-hidden">
            <iframe
              src={`${activeVideo.embedUrl}?autoplay=1&rel=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              title={`${activeVideo.title} - Video Tour`}
            ></iframe>
          </div>

          {/* Bottom Bar Details HUD */}
          <div className="w-full max-w-5xl mx-auto border-t border-[#B8956A]/15 pt-6 text-[#A8A196]">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
              <div className="space-y-1 max-w-2xl">
                <span className="text-[9px] font-mono uppercase text-[#B8956A] tracking-wider block">ОПИСАНИЕ ОБЪЕКТА</span>
                <p className="text-sm font-sans font-light text-[#C4BEB3] leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>
              <div className="shrink-0 pt-2 font-mono text-[11px] tracking-widest text-[#B8956A] uppercase flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 font-bold">
                <span>Длительность: {activeVideo.duration}</span>
                <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-[#B8956A]" />
                <a 
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1.5 text-[#F5F1EA] hover:text-[#B8956A] border border-[#B8956A]/30 px-3 py-1 bg-white/5 transition-all"
                >
                  <span>На YouTube</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
