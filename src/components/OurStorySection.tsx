import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface OurStorySectionProps {
  content: {
    title: string;
    description: string;
    image: string;
  };
}

const OurStorySection = ({ content }: OurStorySectionProps) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={content.image} 
              alt="Artisan" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-3xl shadow-xl hidden md:block">
            <p className="text-4xl font-serif font-bold">১০০%</p>
            <p className="text-sm uppercase tracking-widest">হাতে তৈরি</p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-primary mb-4">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="uppercase tracking-widest text-xs font-bold">আমাদের গল্প</span>
          </div>
          <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">{content.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            {content.description}
          </p>
          <Link to="/our-story" className="inline-flex items-center gap-2 bg-dark text-white px-8 py-4 rounded-xl font-medium hover:bg-opacity-90 transition-all group">
            <span>আমাদের গল্প পড়ুন</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;
