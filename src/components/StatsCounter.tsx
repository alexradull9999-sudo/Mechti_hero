import React, { useState, useEffect, useRef } from 'react';

interface StatFieldProps {
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
}

function CounterItem({ target, suffix, label, sublabel }: StatFieldProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun) {
          setHasRun(true);
          let start = 0;
          const end = target;
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * (end - start) + start);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, hasRun]);

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center text-center p-6 md:p-8"
    >
      <div className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-light text-[#F5F1EA] mb-2 md:mb-4 tracking-tight min-h-[1.1em] flex items-baseline justify-center whitespace-nowrap">
        <span>{count.toLocaleString('ru')}</span>
        <span className={`text-[#B8956A] font-serif ${
          suffix.length > 2 
            ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ml-1 md:ml-2 font-light uppercase tracking-wider' 
            : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl'
        }`}>
          {suffix}
        </span>
      </div>
      <div className="h-[1px] w-12 bg-[#B8956A]/40 mb-3 md:mb-4" />
      <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-sans font-semibold text-[#F5F1EA]">
        {label}
      </span>
      <span className="text-xs md:text-sm text-[#C4BEB3] uppercase tracking-[0.1em] mt-1.5 font-medium">
        {sublabel}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section
      id="stats"
      className="relative bg-[#0F0F0F] border-y brass-border py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 md:divide-[#B8956A]/20">
          <CounterItem
            target={15}
            suffix="+"
            label="15+ лет"
            sublabel="на рынке High-End сегмента"
          />
          <CounterItem
            target={1500}
            suffix="+"
            label="1500+ проектов"
            sublabel="Создано квартир и вилл"
          />
          <CounterItem
            target={180}
            suffix="+"
            label="180+ экспертов"
            sublabel="Штатных специалистов в Мск"
          />
        </div>
      </div>
    </section>
  );
}
