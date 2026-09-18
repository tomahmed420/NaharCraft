import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Facebook, Instagram, Youtube, Mail, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

const Footer = () => {
  const { contact } = useData();

  return (
    <footer className="bg-footer text-white pt-8 sm:pt-12 lg:pt-20 pb-6 lg:pb-10 px-4 sm:px-6 border-t-2 border-primary/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-16">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-3 lg:mb-5">NaharCraft</h2>
            <p className="text-gray-400 leading-relaxed mb-4 lg:mb-6 text-[11px] sm:text-xs lg:text-sm">
              ভালোবাসায় হাতে তৈরি, বিশ্বজুড়ে সরবরাহ করা হয়। প্রতিটি পিস শিল্পনৈপুণ্যের গল্প বলে।
            </p>
            <div className="flex gap-2.5">
              <a href="#" aria-label="Facebook" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-gray-400 transition-all">
                <Facebook size={14} />
              </a>
              <a href="#" aria-label="Instagram" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-gray-400 transition-all">
                <Instagram size={14} />
              </a>
              <a href="#" aria-label="Youtube" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-gray-400 transition-all">
                <Youtube size={14} />
              </a>
            </div>
          </div>
          
          {/* Links Sections (2 Columns on mobile to save vertical space) */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-4 sm:gap-8">
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-bold mb-3 lg:mb-5 text-gray-100">Quick Links</h4>
              <ul className="flex flex-col gap-2 lg:gap-3 text-gray-400 text-[11px] sm:text-xs lg:text-sm">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
                <li><Link to="/our-story" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li>
                  <Link to="/admin" className="text-primary hover:underline flex items-center gap-1">
                    <ShieldCheck size={12} />
                    <span>Admin Panel</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-bold mb-3 lg:mb-5 text-gray-100">Customer Care</h4>
              <ul className="flex flex-col gap-2 lg:gap-3 text-gray-400 text-[11px] sm:text-xs lg:text-sm">
                <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Delivery</Link></li>
                <li><Link to="/returns" className="hover:text-primary transition-colors">Return & Exchange</Link></li>
                <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-sm sm:text-base lg:text-lg font-bold mb-3 lg:mb-5 text-gray-100">আমাদের সাথে যুক্ত হন</h4>
            <ul className="flex flex-col gap-2.5 lg:gap-3 text-gray-400 text-[11px] sm:text-xs lg:text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="text-primary shrink-0" />
                <span>{contact.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <span>{contact.email}</span>
              </li>
              <li className="mt-3 lg:mt-4">
                <p className="text-[10px] sm:text-xs text-gray-500 mb-1.5">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন</p>
                <div className="flex gap-1.5">
                  <input 
                    type="email" 
                    placeholder="ইমেইল ঠিকানা" 
                    className="bg-white/5 border border-white/10 rounded-lg px-2.5 sm:px-3 py-1.5 lg:py-2 w-full focus:ring-1 focus:ring-primary outline-none text-[11px] sm:text-xs lg:text-sm text-white placeholder-gray-500" 
                  />
                  <button className="bg-primary px-3 sm:px-4 py-1.5 lg:py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center shrink-0">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-5 lg:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-400 text-[10px] sm:text-xs">
          <p>© {new Date().getFullYear()} NaharCraft. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-primary transition-colors flex items-center gap-1 text-[11px]">
              <ShieldCheck size={12} />
              <span>মালিকের অ্যাডমিন প্যানেল</span>
            </Link>
            <p className="flex items-center gap-1.5 text-gray-400">
              <span>Made by</span>
              <span className="text-gray-200 font-medium tracking-wide">Shahjalal Ahmed</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
