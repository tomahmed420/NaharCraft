import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const isScrollable = categories.length > 5;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Manual button scroll
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Periodic gentle auto-scroll only if scrollable
  useEffect(() => {
    if (!isScrollable || isPaused || isDragging) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 160, behavior: 'smooth' });
        }
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isScrollable, isPaused, isDragging]);

  // Mouse drag support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current || !isScrollable) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-4 sm:py-6 px-4 sm:px-6 max-w-7xl mx-auto border-b border-gray-100/80">
      {/* Compact Header Bar */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse" />
          <h2 className="text-base sm:text-lg md:text-xl font-serif font-bold text-gray-900">
            ক্যাটাগরি সমূহ
          </h2>
          {isScrollable && (
            <span className="text-[11px] sm:text-xs text-gray-400 font-sans hidden sm:inline">
              (ডানে-বামে সোয়াইপ করুন)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to="/shop"
            className="text-xs font-medium text-primary hover:underline mr-1 sm:mr-2"
          >
            সব দেখুন
          </Link>
          {isScrollable && (
            <>
              <button
                onClick={() => handleScroll('left')}
                aria-label="পূর্ববর্তী ক্যাটাগরি"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-gray-600 transition-colors shadow-2xs active:scale-90"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                aria-label="পরবর্তী ক্যাটাগরি"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-gray-600 transition-colors shadow-2xs active:scale-90"
              >
                <ChevronRight size={15} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dynamic Display: Evenly Spaced when few, Auto-scroll Carousel when many */}
      {!isScrollable ? (
        <div className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-8 w-full max-w-4xl lg:max-w-5xl mx-auto py-1">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center">
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center text-center w-full focus:outline-hidden"
              >
                <div className="relative p-1 sm:p-1.5 rounded-full border border-dashed border-primary/40 group-hover:border-solid group-hover:border-primary transition-all duration-300 bg-white shadow-2xs group-hover:shadow-md group-hover:scale-105">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 rounded-full overflow-hidden relative bg-amber-50/50">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  </div>
                </div>
                <span className="mt-2 text-xs sm:text-sm font-serif font-medium text-gray-800 group-hover:text-primary transition-colors text-center line-clamp-1">
                  {cat.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseUpOrLeave();
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-1 px-1 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="shrink-0 flex flex-col items-center w-20 sm:w-24 group"
            >
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center text-center w-full focus:outline-hidden"
                onClick={(e) => {
                  if (isDragging) e.preventDefault();
                }}
              >
                <div className="relative p-0.5 sm:p-1 rounded-full border border-dashed border-primary/40 group-hover:border-solid group-hover:border-primary transition-all duration-300 bg-white shadow-2xs group-hover:shadow-md group-hover:scale-105">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full overflow-hidden relative bg-amber-50/50">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out pointer-events-none"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  </div>
                </div>
                <span className="mt-1.5 text-[11px] sm:text-xs font-serif font-medium text-gray-800 group-hover:text-primary transition-colors text-center truncate max-w-full block leading-tight">
                  {cat.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryGrid;

