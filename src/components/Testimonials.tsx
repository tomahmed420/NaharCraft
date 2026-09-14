import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif font-bold mb-16">আমাদের কাস্টমাররা যা বলছেন</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#E67E22" className="text-primary" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-8 leading-relaxed">"{t.text}"</p>
              <h4 className="font-serif font-bold text-lg">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
