import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HelpCircle, Search, ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useData } from '../context/DataContext';

const FAQPage = () => {
  const { faqs, contact } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappNumber = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">FAQs</span>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <HelpCircle size={14} />
              <span>Customer Care</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6">
              NaharCraft-এর পণ্য, অর্ডার, ডেলিভারি ও হ্যান্ডক্রাফট সংক্রান্ত সাধারণ প্রশ্ন ও সমাধান
            </p>

            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="প্রশ্ন বা বিষয় লিখে খুঁজুন..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-gray-50/50"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
            {[
              { id: 'all', label: 'সব প্রশ্ন (All)' },
              { id: 'order', label: 'অর্ডার ও পেমেন্ট' },
              { id: 'delivery', label: 'ডেলিভারি সংক্রান্ত' },
              { id: 'craft', label: 'হস্তশিল্প ও যত্ন' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all',
                  activeCategory === tab.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3 mb-10">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 text-gray-500">
                <HelpCircle size={32} className="mx-auto text-gray-300 mb-2" />
                <p>কোনো তথ্য পাওয়া যায়নি। সরাসরি হোয়াটসঅ্যাপে প্রশ্ন করতে পারেন।</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={cn(
                      'rounded-xl border transition-all duration-200 overflow-hidden',
                      isOpen ? 'border-primary/40 bg-amber-50/20 shadow-xs' : 'border-gray-200/80 bg-white hover:border-gray-300'
                    )}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-primary/70 font-mono">
                          0{index + 1}.
                        </span>
                        <span className={cn(
                          'font-serif font-bold text-sm sm:text-base leading-snug',
                          isOpen ? 'text-primary' : 'text-gray-900'
                        )}>
                          {faq.question}
                        </span>
                      </span>
                      <div className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300',
                        isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-500'
                      )}>
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-amber-100/60 pl-11">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Support Banner */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900">
                উত্তর খুঁজে পাননি? সরাসরি প্রশ্ন করুন
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                আমাদের কাস্টমার কেয়ার টিম হোয়াটসঅ্যাপে সার্বক্ষণিক সহায়তা প্রদানে প্রস্তুত।
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello! I have a question about NaharCraft')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all shadow-xs shrink-0 active:scale-95"
            >
              <MessageCircle size={18} />
              <span>হোয়াটসঅ্যাপে মেসেজ দিন</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
