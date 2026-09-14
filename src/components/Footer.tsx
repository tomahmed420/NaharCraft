import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-footer text-white pt-12 lg:pt-24 pb-8 lg:pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-16 mb-12 lg:mb-20">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4 lg:mb-6">NaharCraft</h2>
            <p className="text-gray-400 leading-relaxed mb-6 lg:mb-8 text-sm lg:text-base">
              ভালোবাসায় হাতে তৈরি, বিশ্বজুড়ে সরবরাহ করা হয়। প্রতিটি পিস শিল্পনৈপুণ্যের গল্প বলে।
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white/20 rounded-sm" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-6 lg:gap-16">
            <div>
              <h4 className="text-lg font-bold mb-6 lg:mb-8">দ্রুত লিঙ্কসমূহ</h4>
              <ul className="flex flex-col gap-3 lg:gap-4 text-gray-400 text-sm lg:text-base">
                <li><Link to="/shop" className="hover:text-primary transition-colors">শপ</Link></li>
                <li><Link to="/our-story" className="hover:text-primary transition-colors">আমাদের গল্প</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">যোগাযোগ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 lg:mb-8">কাস্টমার কেয়ার</h4>
              <ul className="flex flex-col gap-3 lg:gap-4 text-gray-400 text-sm lg:text-base">
                <li><a href="#" className="hover:text-primary transition-colors">শিপিং তথ্য</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">রিটার্ন ও এক্সচেঞ্জ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">এফএকিউ (FAQ)</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">গোপনীয়তা নীতি</a></li>
              </ul>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 lg:mb-8">আমাদের সাথে যুক্ত হন</h4>
            <ul className="flex flex-col gap-3 lg:gap-4 text-gray-400 text-sm lg:text-base">
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="text-primary" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary/20 rounded-sm" />
                <span>hello@naharcraft.com</span>
              </li>
              <li className="mt-4">
                <p className="text-sm mb-4">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="ইমেইল ঠিকানা" className="bg-white/5 border-none rounded-lg px-4 py-2 w-full focus:ring-1 focus:ring-primary outline-none" />
                  <button className="bg-primary p-2 rounded-lg hover:bg-opacity-90 transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 lg:pt-12 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NaharCraft. সর্বস্বত্ব সংরক্ষিত। ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
