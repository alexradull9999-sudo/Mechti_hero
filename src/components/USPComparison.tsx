import React from 'react';
import { motion } from 'motion/react';

export default function USPComparison() {
  return (
    <section id="usp" className="bg-[#F2EDE4] text-[#121212] pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
      {/* Subtle ambient light dot in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8956A]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header label */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#B8956A] block">
            ГЛАВНАЯ ФИЛОСОФИЯ ХОЛДИНГА
          </span>
          
          {/* Main heading slogan with sequential animations */}
          <div className="font-serif text-[44px] sm:text-[80px] md:text-[110px] font-light leading-[0.95] text-[#121212] space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Один партнёр.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Один договор.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Один <span className="italic text-[#B8956A]">результат.</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
