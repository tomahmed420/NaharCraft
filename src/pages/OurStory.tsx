import React from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OurStorySection from '../components/OurStory';
import { INITIAL_CONTENT } from '../constants';

const OurStory = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-secondary text-center px-6">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6"
        >
          আমাদের গল্প
        </motion.h1>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
      </section>

      <OurStorySection content={INITIAL_CONTENT.ourStory} />

      {/* More details */}
      <section className="py-12 md:py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 md:mb-8">কারুকার্য ও ঐতিহ্য</h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 md:mb-12">
          নাহারক্রাফ্ট-এর যাত্রা শুরু হয়েছিল ঐতিহ্যবাহী ক্রুশবিদ্ধ কৌশলগুলোকে রক্ষা করার এবং সেগুলোকে আধুনিক ঘরে পৌঁছে দেওয়ার ইচ্ছা থেকে। 
          প্রতিটি পণ্য অত্যন্ত নিপুণভাবে হাতে তৈরি করা হয়, ফলে কোনো দুটি পিস হুবহু একরকম হয় না। 
          আমরা হাতের কাজের সৌন্দর্য এবং কারিগরের শ্রমের মূল্যে বিশ্বাস করি।
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h4 className="text-primary font-bold text-4xl mb-2">১০০%</h4>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">হাতে তৈরি</p>
          </div>
          <div>
            <h4 className="text-primary font-bold text-4xl mb-2">পরিবেশ</h4>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">বান্ধব</p>
          </div>
          <div>
            <h4 className="text-primary font-bold text-4xl mb-2">স্থানীয়</h4>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">কারিগর</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;
