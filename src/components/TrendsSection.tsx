import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, RotateCcw, Youtube } from 'lucide-react';

interface VideoItem {
  id: string;
  num: string;
  title: string;
  image: string;
  duration: string;
  youtubeUrl: string;
}

export default function TrendsSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoProjects: VideoItem[] = [
    {
      id: "vid-1",
      num: "01",
      title: "Интерьер в стиле современной классики. Обзор КВАРТИРЫ с террасой в ЖК «D1» г. Москва",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      duration: "14:20",
      youtubeUrl: "https://www.youtube.com/@MechtyGroup"
    },
    {
      id: "vid-2",
      num: "02",
      title: "СОВРЕМЕННАЯ квартира за 77,000,000 рублей рядом с Москва-Сити! ОБЗОР. ЖК \"HEADLINER\"",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      duration: "18:45",
      youtubeUrl: "https://www.youtube.com/@MechtyGroup"
    },
    {
      id: "vid-3",
      num: "03",
      title: "Построили дом МЕЧТЫ! Обзор особняка 470 кв.м с гостевым домом, сауной и бассейном",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      duration: "22:15",
      youtubeUrl: "https://www.youtube.com/@MechtyGroup"
    }
  ];

  // Simulated video playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeVideo && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const totalSeconds = parseDuration(activeVideo.duration);
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeVideo, isPlaying]);

  useEffect(() => {
    if (activeVideo) {
      const total = parseDuration(activeVideo.duration);
      setProgress(total > 0 ? (currentTime / total) * 100 : 0);
    }
  }, [currentTime, activeVideo]);

  const parseDuration = (dur: string) => {
    const parts = dur.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 600; // fallback 10 mins
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOpenVideo = (video: VideoItem) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const skipToPercent = (percent: number) => {
    if (!activeVideo) return;
    const total = parseDuration(activeVideo.duration);
    setCurrentTime(Math.floor((percent / 100) * total));
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
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
              Смотрите, как <br />
              <span className="italic font-light text-[#B8956A]">мы работаем</span>
            </h2>
          </div>
          
          <div>
            <a 
              href="https://youtube.com"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoProjects.map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpenVideo(video)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              {/* Aspect Ratio Video Card with Play buttons */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#B8956A]/15 bg-[#1A1A1A] mb-5">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-103 group-hover:opacity-95 transition-all duration-[0.8s] ease-out select-none"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/40 to-transparent" />
                
                {/* Overlay Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0F0F0F]/70 border border-[#B8956A] flex items-center justify-center group-hover:bg-[#B8956A] group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <Play className="text-[#B8956A] m-0 w-5 h-5 group-hover:text-[#0F0F0F] fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 text-[10px] font-mono tracking-widest bg-[#0F0F0F]/85 px-2 py-0.5 text-[#B8956A] border border-[#B8956A]/10">
                  {video.duration}
                </span>
              </div>

              {/* Title and metadata */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-[#F5F1EA] group-hover:text-[#B8956A] transition-colors leading-snug font-light min-h-[56px] line-clamp-2">
                  {video.title}
                </h3>
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#B8956A]/60 flex items-center gap-2">
                  <span>Watch Episode</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8956A]" />
                  <span>{video.num}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deluxe Simulated Immersive Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[110] bg-[#0F0F0F]/98 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12 animate-fadeIn">
          
          {/* Top Bar controls */}
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-2">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#B8956A] block">
                MECHTY.STUDIO • EPISODE {activeVideo.num}
              </span>
              <h4 className="font-serif text-lg md:text-xl font-light text-[#F5F1EA] mt-1 line-clamp-1 max-w-xl">
                {activeVideo.title}
              </h4>
            </div>

            <button
              onClick={handleCloseVideo}
              className="text-[#8B8478] hover:text-[#B8956A] p-3 border border-[#B8956A]/20 bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 transition-all text-xs flex items-center gap-2"
            >
              <span>ЗАКРЫТЬ</span>
              <X size={15} />
            </button>
          </div>

          {/* Central Screen simulated content */}
          <div className="relative flex-grow flex items-center justify-center max-w-5xl w-full mx-auto my-6 md:my-10 aspect-video bg-[#131313] border border-[#B8956A]/20 shadow-2xl overflow-hidden group">
            <img
              src={activeVideo.image}
              alt={activeVideo.title}
              className={`w-full h-full object-cover transition-all duration-[3s] ${isPlaying ? 'scale-[1.05] grayscale-[20%] blur-[1px] opacity-40' : 'opacity-20 grayscale'}`}
            />
            
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

            {/* Simulating moving overlay if playing */}
            {isPlaying && (
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#B8956A]/35 to-transparent animate-laserPulse" />
            )}

            {/* Central Play/Pause controls overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors duration-300">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-[#B8956A] hover:bg-[#8B6F4E] text-[#0F0F0F] flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-2xl"
              >
                {isPlaying ? (
                  <Pause size={28} className="fill-current" />
                ) : (
                  <Play size={28} className="fill-current translate-x-0.5" />
                )}
              </button>
              
              <span className="text-xs uppercase font-mono tracking-widest text-[#B8956A] mt-4 opacity-75">
                {isPlaying ? "Идёт воспроизведение" : "Воспроизведение приостановлено"}
              </span>
            </div>

            {/* Scanlines / Retro video shader overlay */}
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-[0.03]" />
          </div>

          {/* Bottom Bar progress HUD */}
          <div className="w-full max-w-7xl mx-auto space-y-4">
            {/* Custom Interactive timeline bar */}
            <div className="relative w-full h-1 bg-[#1A1A1A] cursor-pointer" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const width = rect.width;
              skipToPercent((clickX / width) * 100);
            }}>
              <div 
                className="absolute left-0 top-0 h-full bg-[#B8956A] transition-all duration-300 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -right-1.5 -top-1 w-3 h-3 bg-white border border-[#B8956A] rounded-full scale-0 group-hover:scale-100 transition-all" />
              </div>
            </div>

            {/* Controls interface bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8B8478]">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-[#F5F1EA] hover:text-[#B8956A] transition-colors font-bold uppercase tracking-widest"
                >
                  {isPlaying ? "PAUSE" : "PLAY"}
                </button>

                <div className="flex items-center gap-2">
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-[#F5F1EA]">
                    {isMuted ? <VolumeX size={14} className="text-[#B8956A]" /> : <Volume2 size={14} />}
                  </button>
                  <span>{isMuted ? "MUTED" : "STEREO 2.0"}</span>
                </div>

                <button onClick={() => setCurrentTime(0)} className="hover:text-[#F5F1EA] flex items-center gap-1">
                  <RotateCcw size={12} />
                  <span>RESTART</span>
                </button>
              </div>

              {/* Timestamp counters */}
              <div className="flex items-center gap-3 text-right">
                <span className="text-[#B8956A] font-bold">{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{activeVideo.duration}</span>
                <span className="px-1.5 py-0.5 border border-[#8B8478]/30 rounded text-[9px] uppercase font-bold tracking-wider">
                  1080P HD
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
