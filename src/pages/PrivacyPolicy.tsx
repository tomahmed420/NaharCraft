import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Lock, Eye, ShieldCheck, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Lock size={14} />
              <span>Customer Care</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              NaharCraft গ্রাহকের ব্যক্তিগত তথ্যের গোপনীয়তাকে সর্বোচ্চ মূল্যায়ন করে। আপনার ব্যক্তিগত তথ্যাবলী কীভাবে সুরক্ষিত রাখা হয় তা এই নীতিমালায় সুস্পষ্টভাবে উল্লেখ করা হয়েছে।
            </p>
          </div>

          {/* Detailed Policy Sections */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Eye size={18} className="text-primary" />
                ১. আমরা কি কি তথ্য সংগ্রহ করি
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                শুধুমাত্র আপনার কাঙ্ক্ষিত পণ্যটি সঠিকভাবে ডেলিভারি দেওয়ার উদ্দেশ্যে আমরা প্রয়োজনীয় কিছু তথ্য সংগ্রহ করি:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li>গ্রাহকের পূর্ণ নাম</li>
                <li>সঠিক ডেলিভারি ঠিকানা (জেলা, উপজেলা বা থানা সহ)</li>
                <li>যোগাযোগের মোবাইল নম্বর</li>
                <li>ইমেইল ঠিকানা (ঐচ্ছিক, অর্ডার ট্র্যাকিং ও ইনভয়েসের জন্য)</li>
              </ul>
            </div>

            <hr className="border-gray-100" />

            {/* Section 2 */}
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" />
                ২. তথ্যের নিরাপত্তা ও গোপনীয়তার নিশ্চয়তা
              </h2>
              <p className="text-gray-600 text-sm">
                আপনার কোনো ব্যক্তিগত তথ্য (নাম, মোবাইল নম্বর বা ঠিকানা) কোনো তৃতীয় পক্ষ বা বিজ্ঞাপনী সংস্থার কাছে কখনো বিক্রি, ভাড়া বা অপব্যবহারের জন্য হস্তান্তর করা হয় না। আপনার তথ্য শুধুমাত্র ডেলিভারি সম্পন্ন করার জন্য আমাদের অনুমোদিত কুরিয়ার পার্টনারের সাথে শেয়ার করা হয়।
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Section 3 */}
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                ৩. পেমেন্ট সংক্রান্ত তথ্যের নিরাপত্তা
              </h2>
              <p className="text-gray-600 text-sm">
                আমরা সরাসরি কোনো ক্রেডিট কার্ড বা ব্যাংকিং পিন সংরক্ষণ করি না। ক্যাশ অন ডেলিভারি অথবা বিকাশ/নগদের মাধ্যমে পেমেন্ট করার সময় তা সুরক্ষিত ও ভেরিফাইড চ্যানেলে সম্পন্ন হয়।
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Section 4 */}
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Phone size={18} className="text-primary" />
                ৪. যেকোনো জিজ্ঞাসা বা তথ্যের অধিকার
              </h2>
              <p className="text-gray-600 text-sm">
                আপনার প্রদত্ত তথ্য সংশোধন, মুছে ফেলা বা এই সম্পর্কিত যেকোনো তথ্যের জন্য সরাসরি আমাদের অফিসিয়াল ইমেইল <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">hello@naharcraft.com</code> অথবা হেল্পলাইনে যোগাযোগ করতে পারেন।
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
