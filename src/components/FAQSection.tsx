import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'order',
    question: 'NaharCraft-এ কিভাবে অর্ডার কনফার্ম করব?',
    answer:
      'আমাদের ওয়েবসাইট থেকে খুব সহজেই আপনার পছন্দের পণ্যটি কার্টে (Cart) যুক্ত করে "চেকআউট" অপশন থেকে অর্ডার করতে পারবেন। এছাড়াও সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপ নম্বরে পণ্যের নাম বা স্ক্রিনশট পাঠিয়ে ঠিকানা প্রদান করে নিমেষেই অর্ডার কনফার্ম করতে পারবেন।'
  },
  {
    id: 'delivery-time',
    question: 'ডেলিভারি পেতে কতদিন সময় লাগে?',
    answer:
      'রেডি-স্টক পণ্যের ক্ষেত্রে ঢাকা সিটির ভেতর সাধারণত ২ থেকে ৩ কার্যদিবস এবং ঢাকার বাইরে ৩ থেকে ৫ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়। কোনো পণ্য যদি স্পেশালভাবে তৈরি (Made-to-order) করিয়ে নিতে চান, তবে অতিরিক্ত ২-৩ দিন সময় লাগতে পারে।'
  },
  {
    id: 'cod-charge',
    question: 'ডেলিভারি চার্জ কত এবং ক্যাশ অন ডেলিভারি (COD) সুবিধা আছে কি?',
    answer:
      'হ্যাঁ, সারা বাংলাদেশে সম্পূর্ণ ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করতে পারবেন। ডেলিভারি চার্জ: ঢাকা সিটির ভেতরে মাত্র ৭০ টাকা এবং ঢাকা সিটির বাইরে ১৩০ টাকা।'
  },
  {
    id: 'handmade-quality',
    question: 'পণ্যগুলো কি সম্পূর্ণ হাতে তৈরি ও টেকসই?',
    answer:
      'অবশ্যই! NaharCraft-এর প্রতিটি পণ্য শতভাগ নিখুঁত হাতে বোনা। আমরা প্রিমিয়াম ও টেকসই কটন সুতা এবং মানসম্মত কাঁচামাল ব্যবহার করি। প্রতিটি পণ্যের ফিনিশিংয়ে বিশেষ যত্ন নেওয়া হয় যেন তা দীর্ঘস্থায়ী হয় এবং এর রঙ ও আকার অপরিবর্তিত থাকে।'
  },
  {
    id: 'customization',
    question: 'পছন্দমতো রঙ, সাইজ বা ডিজাইনে কাস্টমাইজ করে নেওয়া যাবে কি?',
    answer:
      'হ্যাঁ, আমরা কাস্টমাইজড অর্ডারের সুবিধা দিয়ে থাকি। আপনি চাইলে নির্দিষ্ট কোনো রঙ, বিশেষ কোনো সাইজ কিংবা পছন্দের কোনো বিশেষ উপহারের জন্য কাস্টমাইজ করে অর্ডার করতে পারেন। এর জন্য সরাসরি আমাদের হোয়াটসঅ্যাপে যোগাযোগ করলেই আমাদের টিম আপনাকে সহায়তা করবে।'
  },
  {
    id: 'return-policy',
    question: 'পণ্য পছন্দ না হলে বা ক্ষতিগ্রস্ত পেলে কি রিটার্ন/এক্সচেঞ্জ করা যাবে?',
    answer:
      'ডেলিভারি ম্যান উপস্থিত থাকাকালীন সময়ে পণ্যটি ভালোভাবে দেখে বুঝে নিন। কোনো কারণে পণ্য ক্ষতিগ্রস্ত থাকলে বা ত্রুটিপূর্ণ হলে তৎক্ষণাৎ ডেলিভারি ম্যানের কাছে ফেরত দিতে পারেন অথবা ২৪ ঘণ্টার মধ্যে ছবিসহ আমাদের হোয়াটসঅ্যাপে জানালে আমরা দ্রুত ফ্রি এক্সচেঞ্জের ব্যবস্থা করব।'
  }
];

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>('order');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappMessage = encodeURIComponent(
    'হ্যালো! NaharCraft পণ্য সম্পর্কে আমার একটি জিজ্ঞাসা ছিল।'
  );
  const whatsappUrl = `https://wa.me/8801234567890?text=${whatsappMessage}`;

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
          {FAQS.map((faq, index) => {
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
