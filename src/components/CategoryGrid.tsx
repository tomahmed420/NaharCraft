import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-14">
        <div>
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1.5 block">
            সংগ্রহ ব্রাউজ করুন
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
            ক্যাটাগরি অনুযায়ী শপ করুন
          </h2>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1 md:mt-0 max-w-md">
          আমাদের যত্ন ও নিপুণতায় তৈরি প্রতিটি অনন্য ক্যাটাগরির ক্রুশবিদ্ধ সংগ্রহ আবিষ্কার করুন
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="group"
          >
            <Link 
              to="/shop" 
              className="block relative aspect-[4/5] sm:aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 shadow-xs hover:shadow-md transition-all duration-300 border border-gray-100/80"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

              {/* Hover highlight ring */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all pointer-events-none" />

              {/* Floating arrow icon button */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Category details bottom */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                <h3 className="text-sm sm:text-base md:text-lg font-serif font-bold leading-snug drop-shadow-xs group-hover:text-amber-100 transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-white/80 font-medium mt-1">
                  সংগ্রহ দেখুন
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

