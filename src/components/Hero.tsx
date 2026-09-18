import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroContent } from '../types';
import { cn } from '../lib/utils';

interface HeroProps {
  content: HeroContent;
}

const Hero = ({ content }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload images to ensure seamless transitions
  useEffect(() => {
    if (content.images && content.images.length > 0) {
      content.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [content.images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % content.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [content.images.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-900">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={content.images[currentSlide]} 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignette to ensure top navbar and middle text always pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/65" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 sm:px-12 md:px-16 text-white z-10 pointer-events-none">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 sm:mb-6 max-w-4xl leading-tight pointer-events-auto drop-shadow-sm"
        >
          {content.title}
        </motion.h1>
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xs sm:max-w-xl md:max-w-2xl opacity-90 px-2 sm:px-0 pointer-events-auto leading-relaxed drop-shadow-xs"
        >
          {content.subtitle}
        </motion.p>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="pointer-events-auto"
        >
          <Link 
            to="/shop"
            className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-medium transition-all shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{content.buttonText}</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {content.images.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all",
              currentSlide === i ? "bg-white w-6 sm:w-8" : "bg-white/50"
            )}
          />
        ))}
      </div>

      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + content.images.length) % content.images.length)}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white/90 hover:text-white transition-all z-20 border border-white/10"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % content.images.length)}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white/90 hover:text-white transition-all z-20 border border-white/10"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>
    </section>
  );
};

export default Hero;
