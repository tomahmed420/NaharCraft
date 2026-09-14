import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const total = testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-scroll every 5.5 seconds (comfortable reading time)
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex, total]);

  // Handle touch swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      nextSlide(); // Swiped left -> next
    } else if (distance < -50) {
      prevSlide(); // Swiped right -> prev
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  // Desktop visible items (window of 3)
  const desktopItems = [
    testimonials[currentIndex % total],
    testimonials[(currentIndex + 1) % total],
    testimonials[(currentIndex + 2) % total]
  ];

  return (
    <section 
      className="py-8 sm:py-12 px-4 sm:px-6 bg-secondary/50 border-t border-amber-900/5 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <span className="text-primary text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-1 inline-block bg-primary/10 px-2.5 py-0.5 rounded-full">
              গ্রাহকদের আস্থা
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">
              আমাদের কাস্টমাররা যা বলছেন
            </h2>
          </div>

          {/* Navigation Controls & Indicators */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`রিভিউ ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx 
                      ? 'w-5 bg-primary' 
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={prevSlide}
                aria-label="পূর্ববর্তী রিভিউ"
                className="w-8 h-8 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center text-gray-600 transition-all shadow-xs active:scale-95 border border-gray-100"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="পরবর্তী রিভিউ"
                className="w-8 h-8 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center text-gray-600 transition-all shadow-xs active:scale-95 border border-gray-100"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View: Exactly 1 Sleek Card with Swipe and Transition */}
        <div 
          className="block md:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-5 rounded-2xl shadow-2xs border border-amber-900/10 flex flex-col justify-between"
            >
              {/* Rating + Verified Badge */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex gap-0.5">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#E67E22" className="text-primary" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  <BadgeCheck size={12} className="text-emerald-600" />
                  যাচাইকৃত ক্রেতা
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-xs sm:text-sm italic leading-relaxed my-2">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-2.5 pt-2.5 mt-1 border-t border-gray-100">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center font-serif">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-gray-900">
                  {testimonials[currentIndex].name}
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop View: Sleek Row of 3 Compact Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {desktopItems.map((t, idx) => (
              <motion.div
                key={`${t.id}-${(currentIndex + idx) % total}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white p-5 lg:p-6 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 border border-amber-900/10 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Rating + Verified Badge */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#E67E22" className="text-primary" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">
                      <BadgeCheck size={11} className="text-emerald-600" />
                      যাচাইকৃত
                    </span>
                  </div>

                  {/* Compact Review Quote */}
                  <p className="text-gray-700 text-xs sm:text-sm italic leading-relaxed line-clamp-3 my-2 min-h-[44px] flex items-center">
                    "{t.text}"
                  </p>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-2.5 pt-2.5 mt-2 border-t border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center font-serif">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                      {t.name}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
