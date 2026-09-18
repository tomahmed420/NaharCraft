import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useData } from '../context/DataContext';

const Contact = () => {
  const { contact } = useData();
  const whatsappNumber = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-primary text-white text-center px-6">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6"
        >
          আমাদের সাথে যোগাযোগ করুন
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-lg opacity-90 max-w-2xl mx-auto"
        >
          আমাদের হাতে তৈরি সৃষ্টি সম্পর্কে কোনো প্রশ্ন আছে? আমরা আপনার কথা শুনতে পছন্দ করব।
        </motion.p>
      </section>

      <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold">ফোন</h3>
                  <p className="text-gray-500 font-mono text-sm">{contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold">ইমেইল</h3>
                  <p className="text-gray-500 text-sm">{contact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold">অবস্থান</h3>
                  <p className="text-gray-500 text-sm">{contact.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-accent-green p-6 md:p-8 rounded-3xl shadow-sm text-white">
              <h3 className="text-xl font-bold mb-4">দ্রুত সহায়তা</h3>
              <p className="opacity-90 mb-6">দ্রুত সমাধান চান? হোয়াটসঅ্যাপের মাধ্যমে আমাদের সাথে যুক্ত হন।</p>
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-accent-green py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
              >
                <MessageCircle size={20} />
                <span>হোয়াটসঅ্যাপে চ্যাট করুন</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 md:mb-8">আমাদের মেসেজ পাঠান</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">আপনার নাম</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="নাহার"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">ইমেইল ঠিকানা</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="n@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">বিষয়</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="কাস্টম অর্ডার সম্পর্কে জিজ্ঞাসা"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">বার্তা</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="আপনি যা খুঁজছেন সে সম্পর্কে বিস্তারিত বলুন..."
                />
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
                <Send size={20} />
                <span>মেসেজ পাঠান</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
