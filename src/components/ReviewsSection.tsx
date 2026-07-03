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
    <section id="reviews" className="bg-[#F2EDE4] text-[#121212] py-24 md:py-36 border-b border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-[#B8956A] block font-bold">
            РЕПУТАЦИЯ И ДОВЕРИЕ
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#121212]">
            Что говорят <span className="italic text-[#8B6F4E] font-light">наши клиенты</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#B8956A]/40 mx-auto mt-4" />
          <p className="text-base md:text-lg text-[#3D3A34] font-sans font-semibold leading-relaxed">
            Каждое новоселье — это праздник и подтвержденный результат премиального качества Mechty Group. Посмотрите видеообзоры непосредственно из готовых резиденций.
          </p>
        </div>

        {/* 5 Stories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
          {reviewsList.map((rev) => {
            // Get initials for profile bubble
            const initials = rev.name.split(' ').map(n => n[0]).join('');
            
            return (
              <div
                key={rev.id}
                onClick={() => setActiveVideo(rev.id)}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-[#B8956A]/20 hover:border-[#B8956A]/60 bg-[#0F0F0F] cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 ease-out"
              >
                {/* Visual Stories Progress Bars at Top (Simulated) */}
                <div className="absolute top-2.5 inset-x-3 z-20 flex gap-1">
                  <div className="h-[2px] flex-1 bg-[#B8956A]/80 rounded-full" />
                  <div className="h-[2px] flex-1 bg-white/20 rounded-full" />
                  <div className="h-[2px] flex-1 bg-white/20 rounded-full" />
                </div>

                {/* Full-bleed background image with modern hover transitions */}
                <img
                  src={rev.videoPlaceholder}
                  alt={`${rev.name} - Видеоотзыв`}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[0.8s] ease-out select-none"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Elegant Ambient Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/10 to-[#0F0F0F]/45 z-10" />

                {/* Header HUD: Avatar Profile Bubble & Project */}
                <div className="absolute top-5 left-3 right-3 z-20 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9c7b4f] to-[#d6b78d] p-[1px] shadow-md shrink-0">
                    <div className="w-full h-full rounded-full bg-[#0F0F0F] flex items-center justify-center">
                      <span className="text-[10px] font-mono tracking-wider text-[#B8956A] font-extrabold">
                        {initials || "C"}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-white font-extrabold block truncate leading-none">
                      {rev.name}
                    </span>
                    <span className="text-[8px] text-[#B8956A] font-mono uppercase tracking-widest block truncate mt-0.5 leading-none">
                      {rev.project}
                    </span>
                  </div>
                </div>

                {/* Center Circle Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-[#0F0F0F]/65 border border-[#B8956A]/50 backdrop-blur-md flex items-center justify-center text-[#B8956A] group-hover:bg-[#B8956A] group-hover:text-[#0F0F0F] group-hover:border-transparent group-hover:scale-110 shadow-2xl transition-all duration-300">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>

                {/* Bottom Story HUD: Stars, Quote snippet, and details */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 pt-12 z-20 space-y-2 select-none">
                  <div className="flex gap-0.5 text-[#B8956A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} fill="#B8956A" className="text-[#B8956A]" />
                    ))}
                  </div>

                  <p className="text-[10px] lg:text-[11px] text-[#F5F1EA]/85 font-sans leading-relaxed line-clamp-3 italic">
                    “{rev.quote}”
                  </p>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-white/[0.08] text-[8px] font-mono tracking-wider text-[#B8956A] uppercase">
                    <span>СМОТРЕТЬ ОБЗОР</span>
                    <span>{rev.area}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ending disclaimer */}
        <div className="mt-16 text-center text-xs text-[#3D3A34] font-mono font-bold uppercase tracking-widest">
          Все видеообзоры записаны на завершенных объектах Mechty Group в высоком разрешении.
        </div>

      </div>

      {/* Real YouTube / Rutube Embed Video Modal player */}
      {activeVideo && activeReviewInfo && (
        <div className="fixed inset-0 z-[120] bg-[#0F0F0F]/98 backdrop-blur-md flex flex-col justify-center items-center p-4">
          {/* Modal Header Controls */}
          <div className="w-full flex justify-between items-center max-w-4xl text-[#F5F1EA] mb-3 px-2">
            <div className="text-left">
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#B8956A]">
                РЕАЛЬНЫЙ ОБЗОР ОБЪЕКТА • MECHTY GROUP
              </span>
              <h3 className="font-serif text-lg font-light leading-tight">
                {activeReviewInfo.name} — {activeReviewInfo.project}
              </h3>
            </div>
            
            <button
              onClick={() => setActiveVideo(null)}
              className="text-[#8B8478] hover:text-[#B8956A] p-2 hover:bg-[#1A1A1A] border border-[#B8956A]/20 rounded transition-all text-xs flex items-center gap-1 cursor-pointer"
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
                src={activeReviewInfo.youtubeUrl ? `${activeReviewInfo.embedUrl}?autoplay=1&rel=0` : `${activeReviewInfo.embedUrl}?backUrl=${encodeURIComponent(window.location.href)}&mute=0&autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title={`${activeReviewInfo.name} - Video Review`}
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-[#F5F1EA]">
                <p className="text-sm font-sans mb-4">Видеофайл временно недоступен</p>
                <a 
                  href={activeReviewInfo.youtubeUrl || activeReviewInfo.rutubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#B8956A] text-[#0F0F0F] text-xs font-bold uppercase tracking-widest"
                >
                  Открыть видео
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
