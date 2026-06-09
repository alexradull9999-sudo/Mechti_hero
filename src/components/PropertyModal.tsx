import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, MapPin, ChevronLeft, ChevronRight, Phone, Calendar } from 'lucide-react';
import { PropertyItem } from '../types';
import { propertyDetailsMap } from '../propertyDetails';
import { getFallbackImage } from '../utils/imageFallback';

interface PropertyModalProps {
  property: PropertyItem | null;
  onClose: () => void;
  onOpenConsultation: (msg: string) => void;
}

export default function PropertyModal({ property, onClose, onOpenConsultation }: PropertyModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (property) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [property]);

  if (!property) return null;

  // Retrieve details for this property (contains description and images list)
  const details = propertyDetailsMap[property.id];
  let images = (details && details.images && details.images.length > 0) 
    ? details.images 
    : [property.image];

  // If this is a premium catalog property, only show authentic images from the catalog site (under /properties/ or /site/)
  if (property.id.match(/^prop-a-\d+$/)) {
    images = images.filter(img => img.startsWith('/properties/') || img.startsWith('/site/'));
    if (images.length === 0) {
      images = [property.image];
    }
  }

  const description = details ? details.description : 'Описание подготавливается специалистом по недвижимости.';

  const [activeIndex, setActiveIndex] = useState(0);

  // Reset image index when switching property
  useEffect(() => {
    setActiveIndex(0);
  }, [property]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBooking = () => {
    onOpenConsultation(`Здравствуйте! Меня интересует объект "${property.title}" (Код: ${details?.code || 'уточняется'}). Хочу получить презентацию и обсудить просмотр.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ backdropFilter: 'blur(8px)' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#121212] border border-[#B8956A]/30 text-[#F5F1EA] flex flex-col md:flex-row overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#0F0F0F]/80 text-[#C4BEB3] hover:text-[#B8956A] border border-[#F5F1EA]/10 hover:border-[#B8956A]/40 transition-all rounded-full cursor-pointer focus:outline-none"
          title="Закрыть"
        >
          <X size={18} />
        </button>

        {/* Left Side: Images Swiper Gallery */}
        <div className="w-full md:w-[50%] h-[320px] sm:h-[420px] md:h-auto bg-[#0A0A0A] relative flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-[#B8956A]/15 shrink-0">
          
          {/* Main Photo Slider */}
          <div className="relative flex-grow flex items-center justify-center overflow-hidden group">
            <img
              src={images[activeIndex]}
              alt={`${property.title} - фото ${activeIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const fallback = getFallbackImage(images[activeIndex] || '');
                if (e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
            />
            
            {/* Gradient Overlay for aesthetic fade and readable captions */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Nav Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 p-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-[#F5F1EA]/10 text-white hover:text-[#B8956A] transition-all cursor-pointer focus:outline-none"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-[#F5F1EA]/10 text-white hover:text-[#B8956A] transition-all cursor-pointer focus:outline-none"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Slider Counter Badge */}
            <div className="absolute bottom-4 left-4 bg-black/75 border border-[#B8956A]/30 text-xs font-mono px-2.5 py-1 text-[#C4BEB3]">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Badge Indicator top left */}
            <div className="absolute top-4 left-4 bg-[#0F0F0F]/95 border border-[#B8956A]/50 text-[#B8956A] text-[10px] uppercase tracking-widest px-3 py-1 font-sans font-semibold">
              {property.badge}
            </div>
          </div>

          {/* Thumbnails row (If multiple images) */}
          {images.length > 1 && (
            <div className="h-[76px] bg-[#0F0F0F] border-t border-[#B8956A]/10 p-2 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-800 shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative w-16 h-[58px] overflow-hidden border transition-all cursor-pointer focus:outline-none shrink-0 ${
                    activeIndex === i 
                      ? 'border-[#B8956A] scale-[0.96] ring-1 ring-[#B8956A]' 
                      : 'border-[#F5F1EA]/10 hover:border-[#B8956A]/40'
                  }`}
                >
                  <img
                    src={img}
                    alt="миниатюра"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      const fallback = getFallbackImage(img || '');
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details and action */}
        <div className="w-full md:w-[50%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-none md:h-auto">
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="space-y-2 pr-6">
              <div className="flex items-center gap-2 text-[#A8A196] text-[11px] font-mono tracking-widest uppercase">
                <span>Код: {details?.code || property.id.replace('prop-', '')}</span>
                <span>•</span>
                <span>В наличии</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-[#F5F1EA] leading-tight">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-[#C4BEB3] font-sans">
                <MapPin size={14} className="text-[#B8956A]" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Core specs table */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-[#B8956A]/15 bg-white/[0.02] px-4">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A196]">Общая Площадь</span>
                <p className="text-base font-sans font-medium text-[#F5F1EA]">{property.area}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A196]">Стоимость лота</span>
                <p className="text-base font-mono font-semibold text-[#B8956A]">{property.price}</p>
              </div>
            </div>

            {/* Scrollable Description text */}
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase font-sans tracking-widest text-[#B8956A] font-bold">ОПИСАНИЕ ОБЪЕКТА</h4>
              <div className="text-sm font-sans font-light text-[#C4BEB3] leading-relaxed max-h-[160px] md:max-h-[200px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

          </div>

          {/* Action button card footer */}
          <div className="pt-6 mt-6 border-t border-[#B8956A]/10 space-y-4">
            <div className="flex items-center gap-3 text-xs text-[#C4BEB3]">
              <Calendar size={14} className="text-[#B8956A] shrink-0" />
              <span>Организуем индивидуальный просмотр в удобное для вас время.</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBooking}
                className="flex-1 px-5 py-3.5 bg-[#B8956A] hover:bg-[#8B6F4E] text-[#0F0F0F] text-xs uppercase tracking-widest font-sans font-bold flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] select-none cursor-pointer"
              >
                <Phone size={13} />
                <span>Запросить презентацию</span>
              </button>
              
              <button
                onClick={onClose}
                className="px-5 py-3.5 border border-[#F5F1EA]/10 hover:border-[#B8956A]/30 text-[#F5F1EA] hover:text-[#B8956A] text-xs uppercase tracking-widest font-sans font-medium flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                Вернуться назад
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
