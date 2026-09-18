import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RefreshCw, CheckCircle2, AlertTriangle, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Return & Exchange</span>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <RefreshCw size={14} />
              <span>Customer Care</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3">
              Return & Exchange Policy
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              গ্রাহক সন্তুষ্টিই NaharCraft-এর সর্বোচ্চ অগ্রাধিকার। কোনো কারণে পণ্য নিয়ে সন্তুষ্ট না হলে বা ক্ষতিগ্রস্ত পণ্য পেলে সহজেই এক্সচেঞ্জ বা রিটার্ন করার সুযোগ রয়েছে।
            </p>
          </div>

          {/* Detailed Policy Sections */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
            
            {/* Condition 1 */}
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-accent-green" />
                ১. রিটার্ন বা এক্সচেঞ্জের শর্তাবলী
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
                <li>ডেলিভারি গ্রহণের পর কোনো ত্রুটি পরিলক্ষিত হলে তা অবশ্যই ডেলিভারির <strong>২৪ ঘণ্টার মধ্যে</strong> ছবি/ভিডিও সহ আমাদের হোয়াটসঅ্যাপে জানাতে হবে।</li>
                <li>পণ্যটি অব্যবহৃত এবং আসল প্যাকেজিংসহ অক্ষত অবস্থায় থাকতে হবে।</li>
                <li>যদি আমাদের ভুলের কারণে ভুল পণ্য বা ত্রুটিযুক্ত পণ্য পাঠানো হয়, তবে বিনামূল্যে দ্রুত এক্সচেঞ্জ প্রদান করা হবে।</li>
              </ul>
            </div>

            <hr className="border-gray-100" />

            {/* Condition 2 */}
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" />
                ২. কাস্টমাইজড পণ্যের রিটার্ন
              </h2>
              <p className="text-gray-600 text-sm">
                যেহেতু কাস্টমাইজড পণ্যগুলো আপনার সুনির্দিষ্ট পছন্দ (রঙ, মাপ বা নাম) অনুযায়ী তৈরি করা হয়, তাই বিশেষ কারণ বা কোনো শারীরিক ক্ষতি ছাড়া কাস্টমাইজড পণ্য পরিবর্তনযোগ্য নয়। তবে যেকোনো ত্রুটির ক্ষেত্রে আমরা সংশোধন করে দেওয়ার পূর্ণ প্রতিশ্রুতি দিচ্ছি।
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Condition 3 */}
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <RefreshCw size={18} className="text-primary" />
                ৩. রিফান্ড পলিসি (Refund)
              </h2>
              <p className="text-gray-600 text-sm">
                যদি কোনো পণ্য রিটার্ন হিসেবে অনুমোদিত হয় এবং সমমানের কোনো বিকল্প পণ্য স্টকে না থাকে, সেক্ষেত্রে বিকাশ, নগদ বা ব্যাংক ট্রান্সফারের মাধ্যমে ৩ থেকে ৫ কার্যদিবসের মধ্যে আপনার প্রদত্ত অর্থ রিফান্ড করা হবে।
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* How to request */}
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <HelpCircle size={18} className="text-primary" />
                ৪. যেভাবে রিটার্ন বা এক্সচেঞ্জ রিকোয়েস্ট করবেন
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                রিটার্ন বা এক্সচেঞ্জ করতে আপনার অর্ডার নম্বর, পণ্যের স্পষ্ট ছবি বা আনবক্সিং ভিডিও সহ সরাসরি আমাদের হোয়াটসঅ্যাপ বা কল নম্বরে মেসেজ করুন:
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs sm:text-sm space-y-1">
                <p><strong>হোয়াটসঅ্যাপ সাপোর্ট:</strong> +880 1234 567890</p>
                <p><strong>ইমেইল:</strong> hello@naharcraft.com</p>
                <p><strong>সাপোর্ট সময়:</strong> সকাল ১০:০০ টা থেকে রাত ১০:০০ টা (প্রতিদিন)</p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">পণ্য এক্সচেঞ্জ নিয়ে কথা বলতে চান?</h3>
                <p className="text-xs text-gray-600 mt-0.5">সরাসরি আমাদের টিম আপনাকে দ্রুত সমাধান দেবে।</p>
              </div>
              <a
                href="https://wa.me/8801234567890?text=Hello%20I%20want%20to%20request%20return%20or%20exchange"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs shrink-0"
              >
                <MessageCircle size={16} />
                <span>হোয়াটসঅ্যাপে রিকোয়েস্ট</span>
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;
