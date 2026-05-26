import React, { useState } from 'react';
import { reviewsList } from '../data';
import { Play, X, User, Star, ExternalLink } from 'lucide-react';

interface ReviewsSectionProps {
  onOpenConsultation: (msg?: string) => void;
}

export default function ReviewsSection({ onOpenConsultation }: ReviewsSectionProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const activeReviewInfo = activeVideo ? reviewsList.find(r => r.id === activeVideo) : null;
  const isShort = activeReviewInfo?.rutubeUrl?.includes('/shorts/') || false;

  return (
    <section id="reviews" className="bg-[#F5F1EA] text-[#1A1A1A] py-24 md:py-36 border-b border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-[#B8956A] block">
            РЕПУТАЦИЯ И ДОВЕРИЕ
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light">
            Что говорят <span className="italic text-[#8B6F4E] font-light">наши клиенты</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#B8956A]/40 mx-auto mt-4" />
          <p className="text-base md:text-lg text-[#1A1A1A]/75 font-sans font-light leading-relaxed">
            Каждое новоселье — это праздник и подтвержденный результат премиального качества Mechty Group. Посмотрите видеообзоры непосредственно из готовых резиденций.
          </p>
        </div>

        {/* 5 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#EDE6D8] p-6 md:p-8 border border-[#B8956A]/25 flex flex-col justify-between space-y-8 h-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Visual stars rating */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-[#B8956A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="#B8956A" className="text-[#B8956A]" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8956A]/80 font-bold bg-[#F5F1EA]/80 px-2 py-0.5 border border-[#B8956A]/10">
                    {rev.area}
                  </span>
                </div>

                <blockquote className="text-sm md:text-base font-sans font-medium text-[#1A1A1A] italic leading-relaxed">
                  “ {rev.quote} ”
                </blockquote>
              </div>

              {/* Video Thumbnail and Author Info Bottom block */}
              <div className="space-y-4 pt-4 border-t border-[#1A1A1A]/10">
                {/* Custom Elegant play cover */}
                <div
                  onClick={() => setActiveVideo(rev.id)}
                  className="relative h-44 border border-[#B8956A]/20 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={rev.videoPlaceholder}
                    alt={`${rev.name} - Видеоотзыв`}
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0F0F0F]/30 group-hover:bg-[#0F0F0F]/15" />
                  
                  {/* Play circle */}
                  <div className="absolute inset-x-0 inset-y-0 m-auto w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#B8956A] shadow-md group-hover:scale-105 group-hover:bg-[#B8956A] group-hover:text-white transition-all duration-300">
                    <Play size={16} fill="currentColor" className="ml-0.5 animate-pulse" />
                  </div>
                  
                  <span className="absolute bottom-2 left-2 text-[9px] font-mono uppercase bg-[#0F0F0F] text-[#F5F1EA] tracking-widest px-2.5 py-1 font-bold flex items-center gap-1.5">
                    <span>СМОТРЕТЬ НА RUTUBE</span>
                    <ExternalLink size={10} className="text-[#B8956A]" />
                  </span>
                </div>

                {/* Author text */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A]/10 border border-[#B8956A]/20 flex items-center justify-center text-[#8B6F4E] shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest font-extrabold text-[#1A1A1A]">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] text-[#8B6F4E] font-mono uppercase block font-bold mt-0.5 leading-tight">
                      {rev.project}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ending disclaimer */}
        <div className="mt-16 text-center text-xs text-[#1A1A1A]/55 font-mono uppercase tracking-widest">
          Все видеоотзывы записаны на завершенных объектах Mechty Group в Кино-формате.
        </div>

      </div>

      {/* Real Rutube Embed Video Modal player */}
      {activeVideo && activeReviewInfo && (
        <div className="fixed inset-0 z-[120] bg-[#0F0F0F]/98 backdrop-blur-md flex flex-col justify-center items-center p-4">
          {/* Modal Header Controls */}
          <div className="w-full flex justify-between items-center max-w-4xl text-[#F5F1EA] mb-3 px-2">
            <div className="text-left">
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#B8956A]">
                РЕАЛЬНЫЙ ОТЗЫВ КЛИЕНТА • MECHTY GROUP
              </span>
              <h3 className="font-serif text-lg font-light leading-tight">
                {activeReviewInfo.name} — {activeReviewInfo.project}
              </h3>
            </div>
            
            <button
              onClick={() => setActiveVideo(null)}
              className="text-[#8B8478] hover:text-[#B8956A] p-2 hover:bg-[#1A1A1A] border border-[#B8956A]/20 rounded transition-all text-xs flex items-center gap-1"
            >
              <span>Закрыть</span>
              <X size={14} />
            </button>
          </div>

          {/* Player Wrapper Box according to landscape vs portrait layout */}
          <div 
            className={`relative bg-black border-2 border-[#B8956A]/30 shadow-2xl overflow-hidden w-full ${
              isShort 
                ? 'max-w-[400px] aspect-[9/16] max-h-[80vh]' 
                : 'max-w-4xl aspect-video'
            }`}
          >
            {activeReviewInfo.embedUrl ? (
              <iframe
                src={`${activeReviewInfo.embedUrl}?backUrl=${encodeURIComponent(window.location.href)}&mute=0&autoplay=1`}
                frameBorder="0"
                allow="clipboard-write; autoplay; encrypted-media; fullscreen; picture-in-picture;"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title={`${activeReviewInfo.name} - Rutube Video`}
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-[#F5F1EA]">
                <p className="text-sm font-sans mb-4">Видеофайл временно недоступен</p>
                <a 
                  href={activeReviewInfo.rutubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#B8956A] text-[#0F0F0F] text-xs font-bold uppercase tracking-widest"
                >
                  Открыть на RuTube
                </a>
              </div>
            )}
          </div>

          {/* Quick Action under the player */}
          <div className="w-full max-w-md text-center mt-4">
            <button
              onClick={() => {
                setActiveVideo(null);
                onOpenConsultation(`Здравствуйте, посмотрел видеоотзыв "${activeReviewInfo.name}" в ЖК "${activeReviewInfo.project}". Хочу проконсультироваться по аналогичным решениям.`);
              }}
              className="px-6 py-2.5 bg-[#B8956A] hover:bg-[#977853] text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-extrabold transition-all active:scale-95 shadow-md"
            >
              Заказать персональный расчет по проекту
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
