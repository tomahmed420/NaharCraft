import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useData } from '../context/DataContext';

const FAQSection = () => {
  const { faqs, contact } = useData();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappNumber = contact.whatsapp.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    'হ্যালো! NaharCraft পণ্য সম্পর্কে আমার একটি জিজ্ঞাসা ছিল।'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <HelpCircle size={14} />
            <span>সাধারণ জিজ্ঞাসা • Q&A</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 tracking-tight">
            সচরাচর জানতে চাওয়া প্রশ্নাবলী
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            NaharCraft-এর পণ্য, অর্ডার প্রক্রিয়া এবং ডেলিভারি সম্পর্কে আপনাদের সাধারণ প্রশ্নের উত্তর এখানে পেয়ে যাবেন।
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={cn(
                  'rounded-xl border transition-all duration-200 overflow-hidden',
                  isOpen
                    ? 'border-primary/40 bg-amber-50/20 shadow-xs'
                    : 'border-gray-200/80 bg-white hover:border-gray-300'
                )}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full min-h-[52px] px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-left gap-4 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-primary/70 shrink-0 font-mono">
                      0{index + 1}.
                    </span>
                    <span className={cn(
                      "font-serif font-bold text-sm sm:text-base leading-snug transition-colors",
                      isOpen ? "text-primary" : "text-gray-900"
                    )}>
                      {faq.question}
                    </span>
                  </span>
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                    isOpen ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
                  )}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-amber-100/60 pl-10 sm:pl-12">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900">
              আপনার কি অন্য কোনো জিজ্ঞাসা আছে?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              আমাদের টিম আপনাকে সরাসরি সাহায্য করতে সর্বদা প্রস্তুত।
            </p>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center sm:justify-end">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all shadow-xs"
            >
              <span>বিস্তারিত FAQs</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-green hover:bg-accent-green/90 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all shadow-xs shrink-0 active:scale-95"
            >
              <MessageCircle size={16} />
              <span>হোয়াটসঅ্যাপে প্রশ্ন</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
