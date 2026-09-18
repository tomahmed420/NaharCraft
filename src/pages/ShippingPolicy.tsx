import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Truck, Clock, ShieldCheck, MapPin, AlertCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shipping & Delivery</span>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Truck size={14} />
              <span>Customer Care</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3">
              Shipping & Delivery Information
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              NaharCraft-এর প্রতিটি হস্তশিল্পিত পণ্য অতি যত্ন সহকারে নিরাপদে আপনার ঠিকানায় পৌঁছে দেওয়ার জন্য আমরা দায়বদ্ধ। নিচে আমাদের শিপিং ও ডেলিভারি সংক্রান্ত যাবতীয় তথ্য তুলে ধরা হলো।
            </p>
          </div>

          {/* Key Rates & Timing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <MapPin size={20} />
              </div>
              <h3 className="font-serif font-bold text-gray-900 text-base mb-1">ঢাকা মেট্রো</h3>
              <p className="text-2xl font-bold text-primary mb-2">৳৭০</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                হোম ডেলিভারি সময়: সাধারণত ২ থেকে ৩ কার্যদিবস।
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Truck size={20} />
              </div>
              <h3 className="font-serif font-bold text-gray-900 text-base mb-1">ঢাকার বাইরে (সারা দেশ)</h3>
              <p className="text-2xl font-bold text-primary mb-2">৳১৩০</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                হোম ডেলিভারি সময়: সাধারণত ৩ থেকে ৫ কার্যদিবস।
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl border border-amber-200 bg-amber-50/30 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif font-bold text-gray-900 text-base mb-1">ফ্রি ডেলিভারি অফার</h3>
              <p className="text-2xl font-bold text-emerald-700 mb-2">৳০</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                ৳১০০০ বা তার বেশি মূল্যের অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি প্রযোজ্য।
              </p>
            </div>
          </div>

          {/* Detailed Policy Content */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                ১. অর্ডার প্রসেসিং ও ডেলিভারি সময়সীমা
              </h2>
              <p className="text-gray-600 text-sm">
                আমরা অর্ডার কনফার্ম হওয়ার পর দ্রুততম সময়ে পণ্য প্যাকিং সম্পন্ন করি।
                রেডি-স্টক আইটেমগুলো সাধারণত ২৪ ঘণ্টার মধ্যে কুরিয়ারে হস্তান্তর করা হয়।
                তবে কোনো পণ্য যদি স্পেশাল কাস্টমাইজড বা বড় আকারের ক্রোশে সেট হয়, তবে তা তৈরি করতে অতিরিক্ত ২-৩ দিন সময় লাগতে পারে (অর্ডারের সময় জানিয়ে দেওয়া হবে)।
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" />
                ২. ক্যাশ অন ডেলিভারি (Cash on Delivery)
              </h2>
              <p className="text-gray-600 text-sm">
                সারা বাংলাদেশে শতভাগ ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। পণ্য হাতে পাওয়ার পর কুরিয়ার কর্মীকে মূল্য পরিশোধ করতে পারবেন। কোনো হিডেন বা অতিরিক্ত চার্জ নেই।
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle size={18} className="text-primary" />
                ৩. পার্সেল রিসিভ করার নিয়মাবলী
              </h2>
              <p className="text-gray-600 text-sm">
                ডেলিভারি ম্যানের সামনে পার্সেলটি চেক করে নেওয়ার জন্য বিশেষভাবে অনুরোধ করা হচ্ছে। যদি কোনো কারণে পণ্য ক্ষতিগ্রস্ত দেখতে পান বা ভুল আইটেম আসে, তাহলে সাথে সাথে ডেলিভারি ম্যানকে ফেরত দিন অথবা আমাদের কাস্টমার কেয়ারে যোগাযোগ করুন।
              </p>
            </div>

            {/* Support Box */}
            <div className="mt-8 p-5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">ডেলিভারি নিয়ে কোনো প্রশ্ন আছে?</h3>
                <p className="text-xs text-gray-600 mt-0.5">আমাদের টিম আপনাকে তাৎক্ষণিক সহায়তা প্রদান করবে।</p>
              </div>
              <a
                href="https://wa.me/8801234567890?text=Hello%20I%20have%20a%20question%20about%20shipping"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs shrink-0"
              >
                <MessageCircle size={16} />
                <span>হোয়াটসঅ্যাপে যোগাযোগ</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
