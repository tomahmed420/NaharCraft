import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Check, Sparkles, Gift } from 'lucide-react';
import { useData } from '../context/DataContext';

const OfferBanner = () => {
  const { promos } = useData();
  const [copied, setCopied] = useState(false);
  const couponCode = promos.banner1.couponCode || 'NAHAR20';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      {/* 2 Banners Grid: Side by side on desktop/tablet, sleek compact horizontal cards on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
        
        {/* Banner 1: কুপন ও ছাড় */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-100/90 via-orange-50/90 to-rose-50/80 border border-amber-200/80 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-3 group transition-all hover:shadow-sm">
          <div className="flex-1 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2">
                <Sparkles size={12} className="text-primary" />
                <span>{promos.banner1.tag}</span>
              </div>
              <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg lg:text-xl leading-snug mb-1">
                {promos.banner1.title}
              </h3>
              <p className="text-gray-600 text-xs line-clamp-1 mb-3">
                {promos.banner1.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Quick Copy Coupon */}
              <button
                onClick={handleCopy}
                title="কুপন কোড কপি করুন"
                className="inline-flex items-center gap-1.5 bg-white/90 border border-amber-200 px-2 py-1 rounded-lg text-xs font-mono font-bold text-primary hover:bg-white transition-all active:scale-95"
              >
                <span>{couponCode}</span>
                {copied ? (
                  <Check size={13} className="text-accent-green" />
                ) : (
                  <Copy size={13} className="text-gray-400" />
                )}
              </button>

              <Link
                to={promos.banner1.link || '/shop'}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 group-hover:translate-x-0.5 transition-all ml-1"
              >
                <span>{promos.banner1.buttonText || 'অফার দেখুন'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Compact Right Visual */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden shrink-0 shadow-xs border border-white/80">
            <img
              src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=300&h=300"
              alt="হস্তশিল্প ছাড়"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>

        {/* Banner 2: ফ্রি ডেলিভারি */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-50/95 via-teal-50/80 to-amber-50/60 border border-emerald-200/80 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-3 group transition-all hover:shadow-sm">
          <div className="flex-1 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-700/10 text-emerald-800 border border-emerald-700/20 px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2">
                <Gift size={12} className="text-emerald-700" />
                <span>{promos.banner2.tag}</span>
              </div>
              <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg lg:text-xl leading-snug mb-1">
                {promos.banner2.title}
              </h3>
              <p className="text-gray-600 text-xs line-clamp-1 mb-3">
                {promos.banner2.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-emerald-100/80 text-emerald-900 border border-emerald-300">
                {promos.banner2.minAmountText}
              </span>

              <Link
                to={promos.banner2.link || '/shop'}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-0.5 transition-all ml-1"
              >
                <span>{promos.banner2.buttonText || 'কেনাকাটা করুন'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Compact Right Visual */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden shrink-0 shadow-xs border border-white/80">
            <img
              src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=300&h=300"
              alt="উপহার কালেকশন"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default OfferBanner;

