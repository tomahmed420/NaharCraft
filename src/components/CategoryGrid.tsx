import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <span className="text-primary text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 inline-block bg-primary/10 px-3 py-1 rounded-full">
          হস্তশিল্প কালেকশন
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 sm:mb-3">
          ক্যাটাগরি অনুযায়ী শপ করুন
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base">
          আমাদের যত্ন ও নিপুণতায় তৈরি ক্রুশবিদ্ধ সৃষ্টির প্রতিটি অনন্য ক্যাটাগরি বেছে নিন
        </p>
      </div>

      {/* Circular Boutique Avatars Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="flex flex-col items-center"
          >
            <Link 
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center text-center w-full"
            >
              {/* Circular Avatar Frame */}
              <div className="relative p-1.5 sm:p-2 rounded-full border-2 border-dashed border-primary/30 group-hover:border-solid group-hover:border-primary transition-all duration-500 bg-white shadow-xs group-hover:shadow-lg group-hover:-translate-y-1.5">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden relative bg-amber-50/50">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle warm hover tint */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>

                {/* Floating micro-badge arrow */}
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md text-gray-700 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-100 group-hover:scale-110">
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Category Info */}
              <div className="mt-3 sm:mt-4 flex flex-col items-center">
                <h3 className="font-serif font-bold text-sm sm:text-base md:text-lg text-gray-800 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-gray-400 group-hover:text-primary font-medium mt-0.5 sm:mt-1 transition-colors">
                  <span>সংগ্রহ দেখুন</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;

